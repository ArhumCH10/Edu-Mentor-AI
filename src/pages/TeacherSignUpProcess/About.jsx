import { useState } from "react";

const About = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    languages: [{ language: "", level: "" }],
  });

  //   const isFormValid = () => {
  //     return (
  //       formData.firstName &&
  //       formData.lastName &&
  //       formData.country &&
  //       formData.languages.every(
  //         (language) => language.language && language.level
  //       )
  //     );
  //   };

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
    // Check if the form is valid before proceeding
    // if (isFormValid()) {
    //   // Handle form submission or navigation to the next step
    //   console.log("Form Data:", formData);
    // } else {
    // }
  };

  return (
    <div className="container">
      <div className="bg-light text-black p-4" style={{ width: "100%" }}>
        <h2>About me</h2>
        <p>
          Start creating your public tutor profile. Your progress will be
          automatically saved as you complete each section. You can return at
          any time to finish your registration.
        </p>
      </div>

      <form
        className="mt-0 d-flex flex-column align-items-right"
        style={{ width: "400px", margin: "auto" }}
      >
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
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

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
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

        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Choose Country:
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select Country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Languages Spoken:</label>
          {formData.languages.map((language, index) => (
            <div key={index} className="mb-2">
              <select
                value={language.language}
                onChange={(e) =>
                  handleLanguageChange(index, "language", e.target.value)
                }
                className="form-select me-2"
                required
              >
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
              </select>

              <select
                value={language.level}
                onChange={(e) =>
                  handleLanguageChange(index, "level", e.target.value)
                }
                className="form-select mt-2"
                required
              >
                <option value="">Select Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          ))}
          <button
            type="button"
            onClick={addLanguage}
            className="btn btn-secondary"
          >
            Add Another Language
          </button>
        </div>

        <button
          type="submit"
          onClick={handleNext}
          className="btn btn-primary mb-5"
          //   disabled={!isFormValid()}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default About;
