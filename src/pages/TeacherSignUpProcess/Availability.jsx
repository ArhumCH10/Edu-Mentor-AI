import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaTrash } from 'react-icons/fa';
import { useAvailability } from "./useAvailability";
import { useUser } from '../../UserContext';
import StyledSpinner from "./startSpinner";

const Availability = ({ activePage, setActivePage, setActiveComponent }) => {
  const [timezone, setTimezone] = useState("");
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false);
  const { mutate } = useAvailability(setFlag, setLoading);
  const userInfo = useUser();
  const [availability, setAvailability] = useState([
    {
      day: "Monday",
      slots: [
        {
          from: "",
          to: "",
        },
      ],
    },
  ]);

  useEffect(() => {
    if (flag) {
      setActivePage((prevPage) => prevPage + 1);
      switch (activePage) {
        case 1:
          setActiveComponent("Pricing");
          break;
        // Add cases for other pages/components as needed
        default:
          setActiveComponent("Pricing");
      }
      setLoading(false);
    }
  }, [flag]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    setTimezone(userData.timezone || (userInfo.userData && userInfo.userData.userData.availability.length > 0 ? userInfo.userData.userData.availability[0].timezone : ""));
    setAvailability(userData.availability || (userInfo.userData && userInfo.userData.userData.availability));
    setLoading(false);
  }, [userInfo]);

  const handleTimeChange = (dayIndex, slotIndex, value, field) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].slots[slotIndex][field] = value;
    setAvailability(updatedAvailability);
  };

  const generateTimeOptions = (minTime = "00:00") => {
    const options = [];
    for (let hour = 8; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        if (time >= minTime) {
          options.push(
            <option key={time} value={time}>{time}</option>
          );
        }
      }
    }
    return options;
  };

  const addDay = () => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    // Check if availability array is not empty
    if (availability.length > 0) {
      const lastDay = availability[availability.length - 1].day;
      const nextDayIndex = (daysOfWeek.indexOf(lastDay) + 1) % daysOfWeek.length;
      const nextDay = daysOfWeek[nextDayIndex];
      setAvailability(prevAvailability => [...prevAvailability, { day: nextDay, slots: [{ from: "", to: "" }] }]);
    } else {
      // If the availability array is empty, add the first day of the week
      setAvailability([{ day: daysOfWeek[0], slots: [{ from: "", to: "" }] }]);
    }
  };
  
  const addTimeSlot = (dayIndex) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].slots.push({ from: "", to: "" });
    setAvailability(updatedAvailability);
  };

  const removeTimeSlot = (dayIndex, slotIndex) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].slots.splice(slotIndex, 1);
    setAvailability(updatedAvailability);
  };

  const removeDay = (dayIndex) => {
    const updatedAvailability = [...availability];
    updatedAvailability.splice(dayIndex, 1);
    setAvailability(updatedAvailability);
  };

  const handleNext = () => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    userData.timezone = timezone;
    userData.availability = availability;
    localStorage.setItem("userData", JSON.stringify(userData));
    mutate({ timezone, availability });
    setActivePage(activePage + 1);
  };

  const backHandler = () => {
    setActivePage(activePage - 1);
  };

  return (
    <div className="container mt-4" style={{ padding: "0em 10em" }}>
      <div className="bg-light text-black p-0">
        <h1 style={{ fontWeight: "bold" }}>Availability</h1>
      </div>
      <h4 style={{ marginTop: "30px", fontWeight: "bold" }}>
        Set Your timezone
      </h4>
      {loading ? (<StyledSpinner/>):(
        <>
      <div className="mb-3">
        <label style={{ fontWeight: "bold" }} htmlFor="timezone" className="form-label">
          Choose your timezone
        </label>
        <select
          className="form-select"
          id="timezone"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
        >
          <option value="" disabled>Select Timezone</option>
          <option value="Asia/Karachi">Pakistan Standard Time (PKT) - UTC+5</option>
          <option value="Asia/Kolkata">Indian Standard Time (IST) - UTC+5:30</option>
          <option value="Asia/Dubai">Gulf Standard Time (GST) - UTC+4</option>
          <option value="Asia/Tehran">Iran Standard Time (IRST) - UTC+3:30</option>
          <option value="Asia/Baku">Azerbaijan Standard Time (AZT) - UTC+4</option>
        </select>
      </div>

      <h4 style={{ marginTop: "70px", fontWeight: "bold" }}>Set Your Availability</h4>
      {availability.map((day, dayIndex) => (
        <div key={dayIndex} className="mb-3">
          <div className="d-flex justify-content-start align-items-center">
            <h5 style={{ fontWeight: "bold", marginBottom: 0 }}>{day.day}</h5>
            <button type="button" className="btn btn-danger btn-sm" onClick={() => removeDay(dayIndex)} aria-label="Delete day">
              <FaTrash />
            </button>
          </div>
          {day.slots.map((slot, slotIndex) => (
            <div key={slotIndex} className="d-flex align-items-center mb-2">
              <div className="flex-fill mr-2">
                <label htmlFor={`from-${dayIndex}-${slotIndex}`} className="form-label">From</label>
                <select
                  className="form-select"
                  id={`from-${dayIndex}-${slotIndex}`}
                  value={slot.from}
                  onChange={(e) => handleTimeChange(dayIndex, slotIndex, e.target.value, 'from')}
                >
                  <option value="" disabled>Select Time</option>
                  {generateTimeOptions()}
                </select>
              </div>
              <div className="flex-fill mx-2">
                <label htmlFor={`to-${dayIndex}-${slotIndex}`} className="form-label">To</label>
                <select
                  className="form-select"
                  id={`to-${dayIndex}-${slotIndex}`}
                  value={slot.to}
                  onChange={(e) => handleTimeChange(dayIndex, slotIndex, e.target.value, 'to')}
                  disabled={!slot.from}
                >
                  <option value="" disabled>Select Time</option>
                  {generateTimeOptions(slot.from)}
                </select>
              </div>
              <button type="button" className="btn btn-danger" onClick={() => removeTimeSlot(dayIndex, slotIndex)}>Delete</button>
            </div>
          ))}
          <button type="button" className="btn btn-primary" onClick={() => addTimeSlot(dayIndex)}>Add Time Slot</button>
        </div>
      ))}
      <button type="button" className="btn btn-primary" onClick={addDay}>Add Next Day</button>
      <div className="mb-3" style={{ width: "50%" }}>
          <button
            type="button"
            onClick={handleNext}
            className="btn btn-primary mb-4 mt-4"
            style={{
              background: "#7CFC00",
              color: "black",
              fontWeight: "bold",
              border: 0,
              float: "right",
            }}
          >
            Next
          </button>
          <button
            className="btn btn-primary mb-4 mt-4"
            style={{
              background: "grey",
              color: "black",
              fontWeight: "bold",
              border: 0,
              marginRight: "1em",
            }}
            onClick={backHandler}
          >
            Back
          </button>
        </div>

      </>
      )}
    </div>
  );
};

Availability.propTypes = {
  activePage: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setActiveComponent: PropTypes.func.isRequired,
};

export default Availability;
