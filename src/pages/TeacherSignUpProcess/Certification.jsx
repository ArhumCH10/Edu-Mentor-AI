import { useState } from "react";
import "react-phone-number-input/style.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, selectUser } from "../../../store/userSlice";

const Certification = ({ activePage, setActivePage, setActiveComponent }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [formData, setFormData] = useState({
    certificate: user.certificate || "",
    subject: user.certificateSubject || "",
    description: user.certificateDescription || "",
    issuer: user.certificateIssuer || "",
    yearsOfStudy: user.certificateYearsOfStudy || "",
  });

  const [teachingCertificates, setTeachingCertificates] = useState(
    user.teachingCertificates || false
  );

  const [file, setFile] = useState(null); // Add new state for the file

  const handleCheckboxChange = () => {
    setTeachingCertificates(!teachingCertificates);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const handleNext = () => {
    // Check if the user object is already filled
    if (
      user.firstName &&
      user.lastName &&
      user.country &&
      user.subject &&
      user.certificate &&
      user.description &&
      user.issuer &&
      user.yearsOfStudy &&
      user.file
    ) {
      // The user object is already filled, so just update the active page and component
      setActivePage((prevPage) => prevPage + 1);
      switch (activePage) {
        case 1:
          setActiveComponent("Photo");
          break;
        // Add cases for other pages/components as needed
        default:
          setActiveComponent("Certification");
      }
      return; // Exit the function early
    }

    // Your validation and dispatch logic remains the same
    if (
      !formData.subject ||
      !formData.certificate ||
      !formData.description ||
      !formData.issuer ||
      !formData.yearsOfStudy ||
      !file
    ) {
      alert(
        "Please fill in all required fields and upload a Certificate picture."
      );
      return; // Stop execution if validation fails
    }

    // Add the file data to userData
    const userData = {
      ...user, // Spread the existing user object
      certificateSubject: formData.subject,
      certificate: formData.certificate,
      certificateDescription: formData.description,
      certificateIssuer: formData.issuer,
      certificateYearsOfStudy: formData.yearsOfStudy,
      file: file, // Add file data to userData
    };

    console.log(userData);

    dispatch(updateUser(userData));

    // Log the updated user object after dispatching
    console.log("Updated User Object:", userData);

    setActivePage((prevPage) => prevPage + 1);
    switch (activePage) {
      case 1:
        setActiveComponent("Photo");
        break;
      // Add cases for other pages/components as needed
      default:
        setActiveComponent("Certification");
    }
  };

  const backHandler = () => {
    setActivePage((prevPage) => prevPage - 1);
    switch (activePage) {
      case 1:
        setActiveComponent("Photo");
        break;
      // Add cases for other pages/components as needed
      default:
        setActiveComponent("Photo");
    }
  };

  return (
    <div className="container mt-4" style={{ padding: "0em 10em" }}>
      <div className="bg-light text-black p-0">
        <h1 style={{ fontWeight: "bold" }}>Teaching Certification</h1>
        <p>
          Do you have teaching certificates? If so, describe them to enhance
          your profile credibility and get more students.
        </p>
      </div>
      <div className="mb-3 mt-5" style={{ width: "50%" }}>
        <input
          type="checkbox"
          checked={!teachingCertificates}
          id="over18"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="over18" style={{ fontWeight: "bold" }}>
          I dont have any teaching certificates yet.
        </label>
      </div>
      {teachingCertificates && (
        <form className="mt-0">
          {/* ... (unchanged code) */}

          <div className="mb-3 mt-5" style={{ width: "50%" }}>
            <label
              htmlFor="subject"
              className="form-label"
              style={{ fontWeight: "bold" }}
            >
              Subject
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

          <div className="mb-3" style={{ width: "50%" }}>
            <label
              htmlFor="certificate"
              className="form-label"
              style={{ fontWeight: "bold" }}
            >
              Certificate
            </label>
            <input
              style={{ border: "1px solid black" }}
              type="text"
              id="certificate"
              name="certificate"
              value={formData.certificate}
              onChange={(e) => handleChange("certificate", e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="mt-4" style={{ width: "50%" }}>
            <label
              htmlFor="description"
              className="form-label"
              style={{ fontWeight: "bold" }}
            >
              Description
            </label>
            <input
              style={{ border: "1px solid black" }}
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3 mt-5" style={{ width: "50%" }}>
            <label
              htmlFor="issuer"
              className="form-label"
              style={{ fontWeight: "bold" }}
            >
              Issued By
            </label>
            <select
              id="issuer"
              name="issuer"
              value={formData.issuer}
              onChange={(e) => handleChange("issuer", e.target.value)}
              className="form-select"
              required
              style={{ border: "1px solid black" }}
            >
              <option value="" disabled selected>
                Select Issuer
              </option>
              <option value="issuer1">Issuer 1</option>
              <option value="issuer2">Issuer 2</option>
            </select>
          </div>

          <div className="mb-3 mt-5" style={{ width: "50%" }}>
            <label
              htmlFor="yearsOfStudy"
              className="form-label"
              style={{ fontWeight: "bold" }}
            >
              Years of Study
            </label>
            <input
              style={{ border: "1px solid black" }}
              type="number"
              id="yearsOfStudy"
              name="yearsOfStudy"
              value={formData.yearsOfStudy}
              onChange={(e) => handleChange("yearsOfStudy", e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div
            className="p-4 mb-4"
            style={{ borderRadius: "4px", width: "50%", background: "#F0F0F0" }}
          >
            <p style={{ fontWeight: "bold", fontSize: "16px" }}>
              Get a &quot;Diploma Verified&quot; badge
            </p>
            <p>
              Upload your diploma to boost your credibility! Our team will
              review it and add the badge to your profile. Once reviewed, your
              files will be deleted.
            </p>

            <input
              type="file"
              className="btn btn-primary mb-4 mt-4"
              style={{
                background: "#F0F0F0",
                color: "black",
                fontWeight: "normal",
                border: "2px solid black",
                marginRight: "1em",
              }}
              onChange={handleFileChange}
            />
          </div>
        </form>
      )}
      <div className="mb-3 mt-5" style={{ width: "50%" }}>
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

Certification.propTypes = {
  activePage: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setActiveComponent: PropTypes.func.isRequired,
};

export default Certification;
