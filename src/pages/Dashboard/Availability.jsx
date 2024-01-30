import Header from "./header";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";

const localizer = momentLocalizer(moment);

const EventComponent = ({ event, onEditClick, onDeleteClick }) => (
  <div>
    <div>{event.title}</div>
    <span>
      <FaEdit onClick={() => onEditClick(event)} />
      <MdDelete onClick={() => onDeleteClick(event)} />
    </span>
  </div>
);

export default function Availability() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "English",
      start: new Date(2024, 0, 22, 10, 0),
      end: new Date(2024, 0, 22, 12, 0),
    },
    {
      id: 2,
      title: "Programming",
      start: new Date(2024, 0, 24, 14, 0),
      end: new Date(2024, 0, 24, 16, 0),
    },
  ]);

  const handleSelect = ({ start, end }) => {
    const isSlotFree = events.every(
      (event) => end <= event.start || start >= event.end
    );

    if (isSlotFree) {
      const title = window.prompt("New Event Name");
      if (title) {
        const newEvent = {
          id: events.length + 1,
          title,
          start,
          end,
        };
        setEvents([...events, newEvent]);
      }
    } else {
      alert("Selected time slot is not available.");
    }
  };

  const handleEventDelete = (event) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmed) {
      setEvents((prevEvents) => prevEvents.filter((ev) => ev.id !== event.id));
    }
  };

  const handleEventClick = (event) => {
    const newTitle = window.prompt("Edit Event Name", event.title);
    if (newTitle !== null) {
      const updatedEvent = { ...event, title: newTitle };
      setEvents((prevEvents) =>
        prevEvents.map((ev) => (ev.id === event.id ? updatedEvent : ev))
      );
    }
  };
  return (
    <>
      <Header />
      <div className="Availability-container mx-5 my-3">
        <div className="Availability mx-2" style={{ marginBottom: "3rem" }}>
          <div className="Availability-container mx-5 my-3">
            <div className="Availability mx-2" style={{ marginBottom: "3rem" }}>
              <h2>Availability</h2>
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
                  defaultView="week"
                  style={{ height: 450 }}
                  eventPropGetter={(event) => ({
                    className: `class-${event.id}`,
                  })}
                  components={{
                    event: ({ event }) => (
                      <EventComponent
                        event={event}
                        onEditClick={handleEventClick}
                        onDeleteClick={handleEventDelete}
                      />
                    ),
                  }}
                  min={new Date(2024, 1, 21, 9, 0)}
                  max={new Date(2024, 1, 21, 22, 0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

EventComponent.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};
