import Header from "./header";
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import axios from 'axios';
import './Availability.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const localizer = momentLocalizer(moment);

const EventComponent = ({ event,
  // onEditClick, 
  onDeleteClick }) => (
  <div >
    <div >{event.title}</div>
    <span>
      {/* <FaEdit onClick={() => onEditClick(event)} /> */}
      <MdDelete onClick={() => onDeleteClick(event)} />
    </span>
  </div>
);

import { useTutorProfile } from '../mainPage/Tutor-Search/Tutor-Profile/useTutorProfile'
import Spinner from '../TeacherSignUpProcess/startSpinner'



const formatAvailabilityData = (events, timezone) => {
  const startOfWeek = moment().startOf('week');
  const endOfWeek = moment().endOf('week');
  const filteredEvents = events.filter(event =>
    moment(event.start).isBetween(startOfWeek, endOfWeek, undefined, '[]')
  );

  const availability = filteredEvents.map(event => {
    const day = moment(event.start).format('dddd'); 
    const from = moment(event.start).format('HH:mm');
    const to = moment(event.end).format('HH:mm');

    return {
      day,
      slots: [{ from, to }],
      timezone
    };
  });

  return { timezone, availability };
};


const EventModal = ({ selectedEvent, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   if (selectedEvent) {
  //     setShowModal(true);
  //   } else {
  //     setShowModal(false);
  //   }
  // }, [selectedEvent]);

  useEffect(() => {
    setShowModal(!!selectedEvent); 
  }, [selectedEvent]);

  const handleClose = () => {
    setShowModal(false);
    onClose(); 
  };
  const { title, start, end, studentId, lessonType } = selectedEvent || {};

  return (
    <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title || 'Event Modal'}</h5>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Start Time: {start && start.toLocaleString()}</p>
            <p>End Time: {end && end.toLocaleString()}</p>
            <p>Event Details:</p>
            <pre>{selectedEvent && JSON.stringify(selectedEvent, null, 2)}</pre>
            {selectedEvent.status && selectedEvent.status === 'booked' && (
              <div >
                {studentId && <p><div  className="btn btn-success">Booked by: </div> {studentId}</p>}
                {lessonType && <p>Lesson Type: {lessonType}</p>}
                

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default function Availability() {

  const [tutorProfileData, setTutorProfileData] = useState();
  const [isLoading, setIsLoading] = useState(true);


  const { mutate } = useTutorProfile(setTutorProfileData, setIsLoading);


  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [id, setId] = useState();
  useEffect(() => {

    const userDataString = localStorage.getItem('userData');
    const userDataObject = JSON.parse(userDataString);
    const Id = userDataObject.userData._id;

    console.log("Id", Id);
    setId(Id);


  }, []);

 
  const fetchConfirmLessons = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/confirmed-trial-lessons`);
      const confirmedLessons = response.data;

      const updatedEvents = events.map(event => {
        const foundLesson = confirmedLessons.find(lesson =>
          moment(lesson.trialLessonDate).isSame(event.start, 'day')
        );
        if (foundLesson) {
          const { studentId, lessonType } = foundLesson
          return {
            ...event,
            title: 'Booked Lesson',
            status: 'booked',
            className: 'booked-lesson',
            studentId: studentId,
            lessonType: lessonType,


          };
        }

        return event; 
      });

      console.log('confirmedLessons', confirmedLessons);
      console.log('updatedEvents', updatedEvents);

      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error fetching confirmed trial lessons:', error);
    }
  };

  useEffect(() => {

    if (id) {
      const newSearchParams = {};
      newSearchParams.id = id;
      mutate({ searchParams: newSearchParams });
     
    }

  }, [id]);

  const [flag,setFlag]= useState(false);
  useEffect(()=>{
    if(flag){
      fetchConfirmLessons();
    }
  },[flag])


  useEffect(() => {
    const generateEvents = () => {
      const newEvents = [];
      const today = moment();
      const twoMonthsLater = moment().add(2, 'months');

      const datesUntilTwoMonthsLater = [];
      while (today.isBefore(twoMonthsLater)) {
        datesUntilTwoMonthsLater.push(today.clone());
        today.add(1, 'week');
      }

      datesUntilTwoMonthsLater.forEach(date => {
        tutorProfileData.availability.forEach(day => {
          const dayOfWeek = date.clone().day(day.day);
          day.slots.forEach(slot => {
            const startDateTime = dayOfWeek.clone().set({
              hour: parseInt(slot.from.split(':')[0]),
              minute: parseInt(slot.from.split(':')[1]),
            });
            const endDateTime = dayOfWeek.clone().set({
              hour: parseInt(slot.to.split(':')[0]),
              minute: parseInt(slot.to.split(':')[1]),
            });

            if (startDateTime.isSameOrAfter(moment(), 'day')) {
              newEvents.push({
                id: `${startDateTime}-${endDateTime}`,
                start: startDateTime.toDate(),
                end: endDateTime.toDate(),
                // title: `${startDateTime.format('LT')} – ${endDateTime.format('LT')}`,
              });
            }
          });
        });
      });

      setEvents(newEvents);
      setFlag(true);
    };

    if (tutorProfileData) {
      if (tutorProfileData.availability) {
        generateEvents();
        
      }

    }

  }, [tutorProfileData]);
  

  


  const updateAvailability = async (formattedData) => {
    const userDataString = localStorage.getItem('userData');
    const userDataObject = JSON.parse(userDataString);
    const userId = userDataObject.userData._id;
    try {
      const response = await axios.post('http://localhost:8080/Update-Availability', formattedData, {
        headers: {
          'Content-Type': 'application/json' 
        },
        params: {
          userId 
        }
      });
  
      console.log('User information updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };
  
  
  const handleSelect = ({ start, end }) => {
    const isSlotFree = events.every(
      (event) => end <= event.start || start >= event.end
    );

    if (isSlotFree) {
      const formattedStartTime = start.toLocaleString(undefined, {
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      const formattedEndTime = end.toLocaleString(undefined, {
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      const confirmed = window.confirm(
        `Your slots timing:
        Start-Time: ${formattedStartTime}
        End-Time: ${formattedEndTime}`
      );
      if (confirmed) {
        const newEvent = {
          id: events.length + 1,
          start,
          end,
        };
        const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const formattedData = formatAvailabilityData(updatedEvents, timezone);
      console.log('formattedData:',formattedData);
      updateAvailability(formattedData);
      }
    } else {
      alert("Clash with the others slots.");
    }
  };

  const handleEventDelete = (event) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmed) {
      setEvents((prevEvents) => prevEvents.filter((ev) => ev.id !== event.id));
    }
    setSelectedEvent(null);
  };

  // const handleEventClick = (event) => {
  //   const newTitle = window.prompt("Edit Event Name", event.title);
  //   if (newTitle !== null) {
  //     const updatedEvent = { ...event, title: newTitle };
  //     setEvents((prevEvents) =>
  //       prevEvents.map((ev) => (ev.id === event.id ? updatedEvent : ev))
  //     );
  //   }
  // };

  const handleEventOpen = (event) => {
    setSelectedEvent(event);
   
  };
  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <Header />
      {isLoading ? <Spinner /> :
        <div className="Availability-container mx-5 my-3">
          <div className="Availability mx-2" style={{ marginBottom: "3rem" }}>
            <h2>Availability: <span style={{ fontWeight: 'lighter', }}>It will auto schedule for next two month.</span> </h2>
            <div
              id="schedule"
              style={{ margin: "1rem", marginBottom: "3rem" }}
            >
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelect}
                onSelectEvent={handleEventOpen}
                defaultView="week"
                style={{ height: 450 }}
                views={['week', 'day', 'agenda']}
                eventPropGetter={(event) => ({
                  className: event.className || '',
                })}
                components={{
                  event: ({ event }) => (
                    <EventComponent
                      event={event}
                      // onEditClick={handleEventClick}
                      
                      onDeleteClick={handleEventDelete}
                    />
                  ),
                }}
                min={new Date(2024, 1, 21, 9, 0)}
                max={new Date(2024, 1, 21, 22, 0)}
              />
              {selectedEvent && <EventModal selectedEvent={selectedEvent} onClose={handleCloseModal} />}
            </div>
          </div>
        </div>
      }
      
    </>
  );
}

EventModal.propTypes = {
  selectedEvent: PropTypes.shape({
    title: PropTypes.string,
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    status: PropTypes.string,
    studentId: PropTypes.string,
    lessonType: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

EventComponent.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
    studentId: PropTypes.string,
    lessonType: PropTypes.string,
  }).isRequired,
  // onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};
