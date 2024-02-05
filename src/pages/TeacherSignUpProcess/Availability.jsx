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
    // Load data from local storage or user info when the component mounts
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const localTimezone = userData.timezone;
    const localAvailability = userData.availability;

    // Set timezone either from local storage or from userInfo
    setTimezone(localTimezone || (userInfo.userData.userData.availability.length > 0 && userInfo.userData.userData.availability[0].timezone) || "");


    // Set availability either from local storage or from userInfo
    setAvailability(localAvailability || userInfo.userData.userData.availability || []);
    //console.log(userInfo.userData.userData.availability);
    setLoading(false);
  }, [userInfo]);

  const handleNext = () => {
    setLoading(true);
    // Save availability in the userData object in local storage
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const updatedUserData = { ...userData, timezone, availability };

    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    try {
      mutate({ timezone, availability });


    }
    catch (error) {
      console.error("Mutation failed:", error);
    }
  };

  const backHandler = () => {
    setActivePage((prevPage) => prevPage - 1);
    switch (activePage) {
      case 1:
        setActiveComponent("Video");
        break;
      // Add cases for other pages/components as needed
      default:
        setActiveComponent("Video");
    }
  };

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
  const removeTimeSlot = (dayIndex, slotIndex) => {
    const updatedAvailability = availability.map((day, index) => {
      if (index === dayIndex) {
        return {
          ...day,
          slots: day.slots.filter((_, sIndex) => sIndex !== slotIndex),
        };
      }
      return day;
    });

    setAvailability(updatedAvailability);
  };

  const removeDay = (dayIndex) => {
    setAvailability((prevAvailability) => prevAvailability.filter((_, index) => index !== dayIndex));
  };

  const addDay = () => {
    // Check if the current day's time slots are filled
    // if (availability.some((day) => !day.from || !day.to)) {
    //   alert("Please fill in the current availability slot.");
    //   return;
    // }

    if (availability.some((day) => day.day === 'Sunday')) {
      alert("The week's schedule is already complete.");
      return;
    }

    // Get the next day of the week
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    setAvailability((prevAvailability) => {
      const lastDay = prevAvailability.length > 0 ? prevAvailability[prevAvailability.length - 1].day : '';
      const nextDayIndex = (daysOfWeek.indexOf(lastDay) + 1) % daysOfWeek.length;
      const nextDay = daysOfWeek[nextDayIndex];

      return [
        ...prevAvailability,
        {
          day: nextDay,
          slots: [
            {
              from: "",
              to: "",
            },
          ],
        },
      ];
    });
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
      <div className="bg-light text-black p-0">
        <h1 style={{ fontWeight: "bold" }}>Availability</h1>
      </div>
      <h4 style={{ marginTop: "30px", fontWeight: "bold" }}>
        Set Your timezone
      </h4>
      {loading ? (<StyledSpinner/>):(
        <>
        <div className="mb-3">
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
            <div className="d-flex justify-content-start align-items-center">
              <h5 style={{ fontWeight: "bold", marginBottom: 0 }}>{day.day}</h5>
              <button
                type="button"
                className="btn btn-danger btn-sm mr-2"
                onClick={() => removeDay(dayIndex)}
                aria-label="Delete day"
                style={{ marginRight: '30px' }}
              >
                <FaTrash />
              </button>
            </div>
            {day.slots.map((slot, slotIndex) => (

              <div key={slotIndex} className="d-flex align-items-center mb-2">

                <div className="flex-fill mr-2">

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
                <div className="flex-fill mx-2">
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
                <div className="ml-6">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                  >
                    Delete
                  </button>
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
