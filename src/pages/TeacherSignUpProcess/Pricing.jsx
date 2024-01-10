import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Pricing = ({ setActivePage, setActiveComponent }) => {
  const [hourlyRate, setHourlyRate] = useState("");

  useEffect(() => {
    // Load pricing data from local storage when the component mounts
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const { pricing } = userData;

    if (pricing) {
      setHourlyRate(pricing.hourlyRate || "");
    }
  }, []);

  const handleNext = () => {
    // Validate input here if needed
    if (!hourlyRate) {
      alert("Please enter your hourly rate.");
      return;
    }

    // Continue with 'Next' logic
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const updatedUserData = {
      ...userData,
      pricing: {
        hourlyRate: hourlyRate,
      },
    };

    // Save pricing data in local storage
    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    console.log("User entered data:", { hourlyRate });
    setActivePage((prevPage) => prevPage + 1);
    // Replace with the appropriate component for the next step
    setActiveComponent("Completion");
  };

  const backHandler = () => {
    // Add logic for handling 'Back' button click
    setActivePage((prevPage) => prevPage - 1);
    setActiveComponent("Availability"); // Replace with the appropriate component
  };
  return (
    <div className="container mt-4" style={{ padding: "0em 10em" }}>
      <div className="mb-3">
        <div className="bg-light text-black p-0">
          <h1 style={{ fontWeight: "bold" }}>Set Your Hourly Rate</h1>
        </div>
        <input
          type="number"
          className="form-control mt-4"
          placeholder="Enter your hourly rate"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
        />
        <p style={{ marginTop: "10px", fontSize: "14px" }}>Price in USD only</p>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
            style={{
              fontWeight: "bold",
              color: "black",
              background: "white",
            }}
          >
            EduMentor AI Commission
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#descriptionAccordion"
        >
          <div className="accordion-body ">
            <p>
              We use the funds for getting more students and for constant
              improvements of our learning platform
            </p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg
                style={{ color: "green", width: "35px", marginTop: "-15px" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <p style={{ marginLeft: "8px" }}>
                For every trial lesson with a new student Edu Mentor Ai
                commission will be 15%
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg
                style={{ color: "green", width: "35px", marginTop: "-15px" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <p style={{ marginLeft: "8px" }}>
                For all the subsequent lessons, Edu Mentor Ai charges a
                percentage (10%-15%) of the hourly rate
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg
                style={{ color: "green", width: "35px", marginTop: "-15px" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <p style={{ marginLeft: "8px" }}>
                The more hours you teach, the lower your rate of commission will
                be
              </p>
            </div>
            <div
              style={{
                background: "#f2f2f2",
                padding: "20px",
                margin: "50px",
                width: "50%",
                borderRadius: "10px",
              }}
            >
              <div style={{ display: "flex" }}>
                {/* Left Side */}
                <div style={{ flex: 1, paddingRight: "10px" }}>
                  <p style={{ fontWeight: "bold" }}>Completed Hours</p>
                  <p>0 - 20 hours</p>
                  <p>21 - 50 hours</p>
                  <p>51 - 200 hours</p>
                  <p>201 - 400 hours</p>
                  <p>400+ hours</p>
                </div>

                {/* Right Side */}
                <div style={{ flex: 1, paddingLeft: "10px" }}>
                  <p style={{ fontWeight: "bold" }}>Commission Rate</p>
                  <p>10%</p>
                  <p>13%</p>
                  <p>16%</p>
                  <p>19%</p>
                  <p>22%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          Complete Registration
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

Pricing.propTypes = {
  setActivePage: PropTypes.func.isRequired,
  setActiveComponent: PropTypes.func.isRequired,
};

export default Pricing;
