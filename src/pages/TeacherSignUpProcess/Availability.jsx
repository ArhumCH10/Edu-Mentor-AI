import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, selectUser } from "../../../store/userSlice";

const Availability = ({ setActivePage, setActiveComponent }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    console.log("User updated:", user);
  }, [user]);
  const [timezone, setTimezone] = useState("");
  const [availability, setAvailability] = useState([
    {
      day: "Monday",
      from: "",
      to: "",
    },
  ]);

  const handleNext = async () => {
    // Validate input here if needed
    if (!timezone) {
      alert("Please choose your timezone.");
      return;
    }

    // Check if any availability slot is not filled
    if (availability.some((day) => !day.from || !day.to)) {
      alert("Please fill in all availability slots.");
      return;
    }

    // Continue with 'Next' logic
    const updatedUser = {
      ...user,
      timezone: timezone,
      availability: availability,
    };

    await dispatch(updateUser(updatedUser));

    console.log("User entered data:", { timezone, availability });
    setActivePage((prevPage) => prevPage + 1);
    setActiveComponent("Pricing"); // Replace with the appropriate component
  };

  const backHandler = () => {
    // Add logic for handling 'Back' button click
    setActivePage((prevPage) => prevPage - 1);
    setActiveComponent("Video"); // Replace with the appropriate component
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
      {availability.map((day, index) => (
        <div key={index} className="mb-3">
          <p style={{ fontWeight: "bold" }}>{day.day}</p>
          <div className="row">
            <div className="col">
              <label htmlFor={`from-${index}`} className="form-label">
                From
              </label>
              <select
                className="form-select"
                id={`from-${index}`}
                value={day.from}
                onChange={(e) => {
                  const updatedAvailability = [...availability];
                  updatedAvailability[index].from = e.target.value;
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
              <label htmlFor={`to-${index}`} className="form-label">
                To
              </label>
              <select
                className="form-select"
                id={`to-${index}`}
                value={day.to}
                onChange={(e) => {
                  const updatedAvailability = [...availability];
                  updatedAvailability[index].to = e.target.value;
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
