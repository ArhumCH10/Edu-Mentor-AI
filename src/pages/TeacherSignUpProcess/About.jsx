import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
const About = ({ activePage, setActivePage, setActiveComponent }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    subject: "",
    languages: [{ language: "", level: "" }],
  });
  const [isOver18, setIsOver18] = useState(false);
  const [value, setValue] = useState();

  const handleCheckboxChange = () => {
    setIsOver18(!isOver18);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = [...formData.languages];
    updatedLanguages[index][field] = value;
    setFormData({ ...formData, languages: updatedLanguages });
  };

  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [...formData.languages, { language: "", level: "" }],
    });
  };
  const handleNext = () => {
    for (const key in formData) {
      if (!formData[key]) {
        alert(
          `Please fill in the ${key
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} field.`
        );
        return;
      }
    }
    if (
      formData.languages.some(
        (language) => !language.language || !language.level
      )
    ) {
      alert("Please fill in all the language details.");
      return; // Stop execution if any language detail is missing
    }

    // Check if the phone number is entered
    if (!value || !isValidPhoneNumber(value)) {
      alert("Please enter a valid phone number.");
      return; // Stop execution if the phone number is missing or invalid
    }

    // Check if the checkbox is checked
    if (!isOver18) {
      alert("Please confirm that you are over 18 years old.");
      return; // Stop execution if the checkbox is not checked
    }

    // If all checks pass, proceed with form submission or navigation
    setActivePage((prevPage) => prevPage + 1);
    switch (activePage) {
      case 1:
        setActiveComponent("Photo");
        break;
      // Add cases for other pages/components as needed
      default:
        setActiveComponent("About");
    }

    console.log("Form Data:", formData);
  };

  return (
    <div className="container mt-4">
      <div className="bg-light text-black p-0">
        <h1 style={{ fontWeight: "bold" }}>About</h1>
        <p>
          Start creating your public tutor profile. Your progress will be
          automatically saved as you complete each section. You can return at
          any time to finish your registration.
        </p>
      </div>

      <form className="mt-0">
        <div className="mb-3" style={{ width: "50%" }}>
          <label
            htmlFor="firstName"
            className="form-label"
            style={{ fontWeight: "bold" }}
          >
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mt-4" style={{ width: "50%" }}>
          <label
            htmlFor="lastName"
            className="form-label"
            style={{ fontWeight: "bold" }}
          >
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3 mt-5" style={{ width: "50%" }}>
          <label
            htmlFor="country"
            className="form-label"
            style={{ fontWeight: "bold" }}
          >
            Choose Country:
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
            className="form-select"
            required
            style={{ color: "grey" }}
          >
            <option value="" disabled selected>
              Select Country
            </option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
          </select>
        </div>

        <div className="mb-3 mt-5" style={{ width: "50%" }}>
          <label className="form-label" style={{ fontWeight: "bold" }}>
            Languages Spoken:
          </label>
          {formData.languages.map((language, index) => (
            <div
              key={index}
              className="mb-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <label style={{ marginRight: "8px" }}>Language</label>
              <select
                value={language.language}
                onChange={(e) =>
                  handleLanguageChange(index, "language", e.target.value)
                }
                className="form-select me-2"
                required
                style={{ color: "grey" }}
              >
                <option value="" disabled>
                  Select Language
                </option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
              </select>

              <label style={{ marginLeft: "16px", marginRight: "8px" }}>
                Level
              </label>
              <select
                value={language.level}
                onChange={(e) =>
                  handleLanguageChange(index, "level", e.target.value)
                }
                className="form-select mt-0"
                required
                style={{ color: "grey" }}
              >
                <option value="" disabled>
                  Select Level
                </option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          ))}
          <a
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "grey",
            }}
            onClick={addLanguage}
          >
            Add Another Language
          </a>
        </div>

        <div className="mb-3 mt-5" style={{ width: "50%" }}>
          <label
            htmlFor="subject"
            className="form-label"
            style={{ fontWeight: "bold" }}
          >
            Subject taught:
          </label>
          <select
            id="subject"
            name="choose subject"
            value={formData.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            className="form-select"
            required
            style={{ color: "grey" }}
          >
            <option value="" disabled selected>
              Select Subject
            </option>
            <option value="science">Science</option>
            <option value="maths">Maths</option>
            <option value="arts">Arts</option>
          </select>
        </div>

        <div className="mb-3 mt-5" style={{ width: "50%" }}>
          <label htmlFor="phone" style={{ fontWeight: "bold" }}>
            Phone Number:
          </label>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="my-2"
          >
            <PhoneInput
              international
              value={value}
              onChange={setValue}
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <div className="mb-3 mt-5" style={{ width: "50%" }}>
          <input
            type="checkbox"
            id="over18"
            checked={isOver18}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="over18" style={{ fontWeight: "bold" }}>
            I confirm that I am over 18 years old
          </label>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="btn btn-primary mb-4 mt-4"
          style={{
            background: "#7CFC00",
            color: "black",
            fontWeight: "bold",
            border: 0,
            float: "left",
          }}
        >
          Next
        </button>
      </form>
    </div>
  );
};
About.propTypes = {
  activePage: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setActiveComponent: PropTypes.func.isRequired,
};
export default About;
