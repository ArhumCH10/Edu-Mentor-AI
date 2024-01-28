import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PropTypes from "prop-types";
import { useAbout } from "./useAbout";
import {useUser} from '../../UserContext';
import Spinner from '../../ui/Spinner';
import toast from "react-hot-toast";
import axios from "axios";

const About = ({ activePage, setActivePage, setActiveComponent }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    subject: "",
    languages: [{ language: ""}], // Ensure proper initialization
    levels: [{ level: ""}],
  });
  
  const userData = useUser();
  const [isOver18, setIsOver18] = useState(false);
  const [value, setValue] = useState("");
  const { mutate } = useAbout();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
  
    if (storedUserData && storedUserData.userData) {
      const storedLanguages = storedUserData.userData.LanguageSpoken;
      const storedLevel = storedUserData.userData.levelsTaught;
  
      setFormData({
        firstName: storedUserData.userData.firstName || "",
        lastName: storedUserData.userData.lastName || "",
        country: storedUserData.userData.countryOrigin || "",
        subject: storedUserData.userData.subjectsTaught || "",
        languages: Array.isArray(storedLanguages)
          ? storedLanguages.map((lang) => ({ language: lang }))
          : [],
        levels: Array.isArray(storedLevel)
          ? storedLevel.map((level) => ({ level: level }))
          : [],
      });
      setIsOver18(storedUserData.userData.isGreaterThan18 || false);
      setValue(storedUserData.userData.phoneNumber || "");
      setLoading(false);
    } else if (userData) {
      // If userData from context is available, use it
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        country: userData.countryOrigin || "",
        subject: userData.subjectsTaught || "",
        languages: userData?.LanguageSpoken || [{ language: "", level: "" }],
      });
      setIsOver18(userData.isGreaterThan18 || false);
      setValue(userData.phoneNumber || "");
      setLoading(false);
    }else {
      setLoading(false); // Data loading failed
    }
  
  }, [userData]);
  
  const handleCheckboxChange = () => {
    setIsOver18(!isOver18);
  };

  const deleteLanguage = async (index) => {
    try {
      const updatedLanguages = [...formData.languages];
      const updatedLevels = [...formData.levels];
      updatedLanguages.splice(index, 1);
      updatedLevels.splice(index, 1);
  
      // Delete language and level from the backend
      await deleteLanguageAndLevelFromBackend(index);
  
      // Update the local state
      setFormData({ ...formData, languages: updatedLanguages, levels: updatedLevels });
    } catch (error) {
      console.error('Error deleting language and level:', error);
    }
  };

  const deleteLanguageAndLevelFromBackend = async (index) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:8080/delete-language-and-level/${index}`, // replace with your actual delete endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        // Language and level deleted successfully from the backend
        toast.success("Deleted Successfully");
      } else {
        toast.error('Failed to delete language and level from backend');
      }
    } catch (error) {
      toast.error('Error deleting language and level from backend:', error);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = [...formData.languages];
    const updatedLevels = [...formData.levels];
  
    // Ensure the language array has an entry at the specified index
    if (!updatedLanguages[index]) {
      updatedLanguages[index] = { language: "" };
    }
  
    // Ensure the levels array has an entry at the specified index
    if (!updatedLevels[index]) {
      updatedLevels[index] = { level: "" };
    }
  
    if (field === "language") {
      updatedLanguages[index][field] = value;
    } else if (field === "level") {
      updatedLevels[index][field] = value;
    }
  
    // Set the updated arrays in the form data
    setFormData({ ...formData, languages: updatedLanguages, levels: updatedLevels });
  };  
  
  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [...formData.languages, { language: "" }],
      levels: [...formData.levels, { level: "" }],
    });
  };

  const handleNext = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.country ||
      !formData.subject
    ) {
      return alert("Please fill in all required fields");
    }

    if (!isOver18) {
      return alert("Please check the checkbox to confirm you are over 18");
    }

   // Extract languages and levels separately
  const languages = formData.languages.map((lang) => lang.language);
  const levels = formData.levels.map((lang) => lang.level);

  try {
    mutate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      country: formData.country,
      subject: formData.subject,
      languages,
      levels,
      phone: value,
      isOver18,
    });

    setActivePage((prevPage) => prevPage + 1);
    switch (activePage) {
      case 1:
        setActiveComponent("Photo");
        break;
      default:
        setActiveComponent("About");
    }
  } catch (error) {
    console.error("Mutation failed:", error);
  }
  };

  return (
    <div className="container mt-4" style={{ padding: "0em 10em" }}>
      <div className="bg-light text-black p-0">
        <h1 style={{ fontWeight: "bold" }}>About</h1>
        <p>
          Start creating your public tutor profile. Your progress will be
          automatically saved as you complete each section. You can return at
          any time to finish your registration.
        </p>
      </div>
      {loading ? (
      <Spinner/>
    ) : (
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
            style={{ border: "1px solid black" }}
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
            style={{ border: "1px solid black" }}
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
            style={{ border: "1px solid black" }}
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
          {formData.languages && formData.languages.map((language, index) => (
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
      style={{ border: "1px solid black" }}
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
      value={formData.levels && formData.levels[index]?.level}
      onChange={(e) =>
        handleLanguageChange(index, "level", e.target.value)
      }
      className="form-select mt-0"
      required
      style={{ border: "1px solid black" }}
    >
      <option value="" disabled>
        Select Level
      </option>
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="advanced">Advanced</option>
    </select>

    <button
      type="button"
      onClick={() => deleteLanguage(index)}
      className="btn btn-danger btn-sm ms-2"
    >
      Delete
    </button>
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
            style={{ border: "1px solid black" }}
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
         )}
    </div>
  );
};
About.propTypes = {
  activePage: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setActiveComponent: PropTypes.func.isRequired,
};
export default About;
