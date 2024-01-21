import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Availability = ({ setActivePage, setActiveComponent }) => {
  const [timezone, setTimezone] = useState("");
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
    // Load data from local storage when the component mounts
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const { timezone, availability: savedAvailability } = userData;

    setTimezone(timezone || "");

    if (savedAvailability) {
      setAvailability(savedAvailability);
    }
  }, []);

  const handleNext = () => {
    // Save availability in the userData object in local storage
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const updatedUserData = { ...userData, timezone, availability };

    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    // Continue with 'Next' logic
    setActivePage((prevPage) => prevPage + 1);
    setActiveComponent("Pricing"); // Replace with the appropriate component
    // Add necessary logic for other pages/components
  };

  const backHandler = () => {
    // Add logic for handling 'Back' button click
    setActivePage((prevPage) => prevPage - 1);
    setActiveComponent("Description"); // Replace with the appropriate component
  };

  const addDay = () => {
    // Check if the current day's time slots are filled
    if (availability.some((day) => !day.from || !day.to)) {
      alert("Please fill in the current availability slot.");
      return;
    }

    // Get the next day of the week
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const lastDay = availability[availability.length - 1].day;
    const nextDayIndex = (daysOfWeek.indexOf(lastDay) + 1) % 7;
    const nextDay = daysOfWeek[nextDayIndex];

    setAvailability((prevAvailability) => [
      ...prevAvailability,
      {
        day: nextDay,
        from: "",
        to: "",
      },
    ]);
  };
  const addTimeSlot = (index) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index].slots.push({ from: "", to: "" });
    setAvailability(updatedAvailability);
  };
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 8; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        options.push(
          <option key={time} value={time}>
            {time}
          </option>
        );
      }
    }
    return options;
  };

  return (
    <div className="container mt-4" style={{ padding: "0em 10em" }}>
      <div className="mb-3">
        <div className="bg-light text-black p-0">
          <h1 style={{ fontWeight: "bold" }}>Availability</h1>
        </div>
        <h4 style={{ marginTop: "30px", fontWeight: "bold" }}>
          Set Your timezone
        </h4>
        <p>
          Correct timezone is essential to coordinate lessons with international
          students
        </p>
        <label
          style={{ fontWeight: "bold" }}
          htmlFor="timezone"
          className="form-label"
        >
          Choose your timezone
        </label>
        <select
          className="form-select"
          id="timezone"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
        >
          <option value="" disabled>
            Select Timezone
          </option>
          <option value="Asia/Karachi">
            Pakistan Standard Time (PKT) - UTC+5
          </option>
          <option value="Asia/Kolkata">
            Indian Standard Time (IST) - UTC+5:30
          </option>
          <option value="Asia/Dubai">Gulf Standard Time (GST) - UTC+4</option>
          <option value="Asia/Tehran">
            Iran Standard Time (IRST) - UTC+3:30
          </option>
          <option value="Asia/Baku">
            Azerbaijan Standard Time (AZT) - UTC+4
          </option>
        </select>
      </div>

      <h4 style={{ marginTop: "70px", fontWeight: "bold" }}>
        Set Your Availability
      </h4>

      {availability.map((day, dayIndex) => (
        <div key={dayIndex} className="mb-3">
          <p style={{ fontWeight: "bold" }}>{day.day}</p>
          {day.slots.map((slot, slotIndex) => (
            <div key={slotIndex} className="row">
              <div className="col">
                <label
                  htmlFor={`from-${dayIndex}-${slotIndex}`}
                  className="form-label"
                >
                  From
                </label>
                <select
                  className="form-select"
                  id={`from-${dayIndex}-${slotIndex}`}
                  value={slot.from}
                  onChange={(e) => {
                    const updatedAvailability = [...availability];
                    updatedAvailability[dayIndex].slots[slotIndex].from =
                      e.target.value;
                    setAvailability(updatedAvailability);
                  }}
                >
                  <option value="" disabled>
                    Select Time
                  </option>
                  {generateTimeOptions()}
                </select>
              </div>
              <div className="col">
                <label
                  htmlFor={`to-${dayIndex}-${slotIndex}`}
                  className="form-label"
                >
                  To
                </label>
                <select
                  className="form-select"
                  id={`to-${dayIndex}-${slotIndex}`}
                  value={slot.to}
                  onChange={(e) => {
                    const updatedAvailability = [...availability];
                    updatedAvailability[dayIndex].slots[slotIndex].to =
                      e.target.value;
                    setAvailability(updatedAvailability);
                  }}
                >
                  <option value="" disabled>
                    Select Time
                  </option>
                  {generateTimeOptions()}
                </select>
              </div>
            </div>
          ))}
          <button
            type="button"
            style={{
              background: "transparent",
              border: 0,
              color: "grey",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
            className="btn btn-primary mb-2 mt-2"
            onClick={() => addTimeSlot(dayIndex)}
          >
            Add Time Slot
          </button>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-primary mb-4 mt-4"
        onClick={addDay}
        style={{
          textDecoration: "underline",
          color: "black",
          fontWeight: "bold",
          background: "transparent",
          border: 0,
        }}
      >
        Add Next Day
      </button>

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
    </div>
  );
};

Availability.propTypes = {
  setActivePage: PropTypes.func.isRequired,
  setActiveComponent: PropTypes.func.isRequired,
};

export default Availability;
