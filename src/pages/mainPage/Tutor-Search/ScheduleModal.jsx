import { Modal } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Backend_URI } from '../../../Config/Constant'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const localizer = momentLocalizer(moment);


const ScheduleModal = ({ availability, showScheduleModal, handleCloseScheduleModal, profilePhoto, tutorProfileData }) => {

    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    const fetchConfirmLessons = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/confirmed-trial-lessons`);
            const confirmedLessons = response.data;

            const updatedEvents = events.map(event => {
                const foundLesson = confirmedLessons.find(lesson =>
                    moment(lesson.trialLessonDate).isSame(event.start, 'day')
                );
                if (foundLesson) {
                    const { studentId, lessonType } = foundLesson;
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
            }).filter(event => !confirmedLessons.find(lesson =>
                moment(lesson.trialLessonDate).isSame(event.start, 'day')
            ));

            console.log('confirmedLessons', confirmedLessons);
            console.log('updatedEvents', updatedEvents);

            setEvents(updatedEvents);
        } catch (error) {
            console.error('Error fetching confirmed trial lessons:', error);
        } finally {
            setFlag(false);
        }
    };


    const [flag, setFlag] = useState(false);
    useEffect(() => {
        if (flag) {
            fetchConfirmLessons();
        }
    }, [flag]);

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
                availability.forEach(day => {
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
                                start: startDateTime.toDate(),
                                end: endDateTime.toDate(),
                                // title: `${startDateTime.format('LT')} – ${endDateTime.format('LT')}`,
                            });
                        }
                    });
                });
            });

            setEvents(newEvents);
            if(newEvents){
                setFlag(true)
            }
        };
        generateEvents();


    }, [showScheduleModal]);

    useEffect(() => {
        const removeUnnecessary = () => {
            const allDayCell = document.querySelector('.rbc-allday-cell');
            const alltimegutter = document.querySelector('.rbc-time-gutter');
            const allrbcEventContent = document.querySelectorAll('.rbc-event-content');
            if (allDayCell) {
                allDayCell.remove();
            }
            if (alltimegutter) {
                alltimegutter.remove();
            }

            if (allrbcEventContent) {
                allrbcEventContent.forEach((element) => {
                    element.remove();
                });
            }

        };
        const adjustHeight = () => {
            const rbcEvent = document.querySelector('.rbc-event');
            if (rbcEvent && events) {
                rbcEvent.style.height = 'auto';
                const modalContent = document.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.width = '100%';
                }
            }
        };
        if (events) {
            removeUnnecessary();
            adjustHeight();
         }
    }, [showScheduleModal, events]);

    const [date, setDate] = useState(new Date());

    const onNavigate = (newDate) => {
        setDate(newDate);
    };

    const handleEventClick = (event) => {
        const teacherId = tutorProfileData._id;
        if (teacherId) {
            const eventDataToSend = {
                event: event,
                tutorData: tutorProfileData,
            };
            navigate(`/checkout-page/${teacherId}`, { state: { eventData: eventDataToSend } });
        } else {
            console.error("Teacher ID is missing or undefined in the URL.");
        }
    };

    return (
        <Modal show={showScheduleModal} onHide={handleCloseScheduleModal} centered className="modal-schedule">
            <Modal.Header closeButton>
                <img src={profilePhoto ? `${Backend_URI}/${profilePhoto}` : 'UserDpNotFound.jpg'} alt="userProfile" style={{ marginLeft: '5px', marginRight: '5px', borderRadius: '10% 1%' }} height={40} width={40} onError={(e) => {
                    e.target.src = `./UserDpNotFound.jpg`;
                    e.target.style.border = '1px solid #ccc';

                }} />
                <Modal.Title>Book a trial lesson</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row" style={{ height: '600px' }}  >

                    <div>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            defaultView="week"
                            views={['week']}
                            date={date}
                            onNavigate={onNavigate}
                            style={{ height: 450 }}
                            onSelectEvent={handleEventClick}
                        />
                        <style>
                            {`
.rbc-time-gutter {
display: none;
}
.rbc-label {
padding: 0 ;
}
.rbc-row,.rbc-time-content, .rbc-event, .rbc-time-view,.rbc-time-header-content, .rbc-time-header, .rbc-timeslot-group,.rbc-day-slot, .rbc-time-slot {
border: none !important;
}

.rbc-toolbar-label{
padding: 10px 10px;
text-align: justify;
}
.rbc-time-content > * + * > *{
border: none !important;
}
.rbc-events-container{
position: static;
}
.rbc-event.rbc-selected, .rbc-event{
background-color: white;
color: black;


}
.rbc-event{
font-size: 16px;
font-weight: 500;
text-decoration: underline;
}
.rbc-event:focus{
outline: none;
}
.rbc-today {
background-color: white;
}
.rbc-header{
height: 29px;
border-top: 7px solid green;
border-radius: 3px;
margin-right: 3px;
margin-bottom: 3px;
padding:4px;
fontSize: 16px;
border-bottom: none  ;
border-right: none  ;
border-left: none !important;
}
`}
                        </style>
                        <hr />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ScheduleModal;

ScheduleModal.propTypes = {
    availability: PropTypes.array.isRequired,
    showScheduleModal: PropTypes.bool.isRequired,
    profilePhoto: PropTypes.string, handleCloseScheduleModal: PropTypes.func.isRequired,
    tutorProfileData: PropTypes.object.isRequired
};