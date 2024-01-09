import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, selectUser } from "../../../store/userSlice";

const Certification = ({ activePage, setActivePage, setActiveComponent }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    console.log("User updated:", user);
    if (user.certificates ) {
      console.log("yes")
    }
  }, [user]);
  const [certificates, setCertificates] = useState([
    {
      certificate: user.certificate || "",
      subject: user.certificateSubject || "",
      description: user.certificateDescription || "",
      issuer: user.certificateIssuer || "",
      yearsOfStudy: user.certificateYearsOfStudy || "",
      file: user.file || null,
    },
  ]);

  useEffect(() => {
    if (user.certificates && user.certificates.length > 0) {
      setCertificates(user.certificates);
      setTeachingCertificates(true);
    }
  }, [user]);
  const [teachingCertificates, setTeachingCertificates] = useState(
    user.teachingCertificates || false
  );

  const handleCheckboxChange = () => {
    if (user.user.photo) {
      setTeachingCertificates(!teachingCertificates);
    } else {
      alert("Please fill previous sections first.");
    }
  };

  const handleChange = (index, field, value) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index][field] = value;
    setCertificates(updatedCertificates);
  };

  const handleFileChange = (index, event) => {
    const selectedFile = event.target.files[0];
    const updatedCertificates = [...certificates];
    updatedCertificates[index].file = selectedFile;
    setCertificates(updatedCertificates);
  };

  const handleNext = async () => {
    if (!teachingCertificates) {
      // Handle the case when there are no teaching certificates
      setActivePage((prevPage) => prevPage + 1);
      // Add the necessary logic for other pages/components
      return;
    }

    const isAnyCertificateIncomplete = certificates.some(
      (cert) =>
        !cert.subject ||
        !cert.certificate ||
        !cert.description ||
        !cert.issuer ||
        !cert.yearsOfStudy ||
        !cert.file
    );

    if (isAnyCertificateIncomplete) {
      alert("Please fill in all required fields for the current certificate.");
      return;
    }

    // Extract file information and create a serializable payload
    const certificatesPayload = certificates.map((cert) => ({
      ...cert,
      file: cert.file
        ? {
            name: cert.file.name,
            size: cert.file.size,
            type: cert.file.type,
          }
        : null,
    }));

    // Save the certificates to the user object
    let userData = { ...user };

    if (user.certificates) {
      userData = {
        ...user,
        certificates: [...user.certificates, ...certificatesPayload],
      };
    } else {
      userData = {
        ...user,
        certificates: certificatesPayload,
      };
    }

    await dispatch(updateUser(userData));

    setActivePage((prevPage) => prevPage + 1);
    switch (activePage) {
      case 1:
        setActiveComponent("Education");
        break;
      // Add cases for other pages/components as needed
      default:
        setActiveComponent("Education");
    } // Add cases for other pages/components as needed
    return;
  };

  const backHandler = () => {
    setActivePage((prevPage) => prevPage - 1);
    // Add cases for other pages/components as needed
    setActiveComponent("Photo");
  };
  const addCertificate = () => {
    // Check if the current certificate is incomplete before adding a new one
    const currentCertificate = certificates[certificates.length - 1];
    if (
      !currentCertificate.subject ||
      !currentCertificate.certificate ||
      !currentCertificate.description ||
      !currentCertificate.issuer ||
      !currentCertificate.yearsOfStudy ||
      !currentCertificate.file
    ) {
      alert("Please fill in all required fields for the current certificate.");
      return;
    }

    // Add a new empty certificate
    setCertificates([
      ...certificates,
      {
        certificate: "",
        subject: "",
        description: "",
        issuer: "",
        yearsOfStudy: "",
        file: null,
      },
    ]);
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
          {certificates.map((certificate, index) => (
            <div key={index}>
              <div className="mb-3 mt-5" style={{ width: "50%" }}>
                <label
                  htmlFor={`subject-${index}`}
                  className="form-label"
                  style={{ fontWeight: "bold" }}
                >
                  Subject
                </label>
                <select
                  id={`subject-${index}`}
                  name={`choose subject ${index}`}
                  value={certificate.subject}
                  onChange={(e) =>
                    handleChange(index, "subject", e.target.value)
                  }
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
                  htmlFor={`certificate-${index}`}
                  className="form-label"
                  style={{ fontWeight: "bold" }}
                >
                  Certificate
                </label>
                <input
                  style={{ border: "1px solid black" }}
                  type="text"
                  id={`certificate-${index}`}
                  name={`certificate ${index}`}
                  value={certificate.certificate}
                  onChange={(e) =>
                    handleChange(index, "certificate", e.target.value)
                  }
                  className="form-control"
                  required
                />
              </div>

              <div className="mt-4" style={{ width: "50%" }}>
                <label
                  htmlFor={`description-${index}`}
                  className="form-label"
                  style={{ fontWeight: "bold" }}
                >
                  Description
                </label>
                <input
                  style={{ border: "1px solid black" }}
                  type="text"
                  id={`description-${index}`}
                  name={`description ${index}`}
                  value={certificate.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3 mt-5" style={{ width: "50%" }}>
                <label
                  htmlFor={`issuer-${index}`}
                  className="form-label"
                  style={{ fontWeight: "bold" }}
                >
                  Issued By
                </label>
                <select
                  id={`issuer-${index}`}
                  name={`issuer ${index}`}
                  value={certificate.issuer}
                  onChange={(e) =>
                    handleChange(index, "issuer", e.target.value)
                  }
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
                  htmlFor={`yearsOfStudy-${index}`}
                  className="form-label"
                  style={{ fontWeight: "bold" }}
                >
                  Years of Study
                </label>
                <input
                  style={{ border: "1px solid black" }}
                  type="number"
                  id={`yearsOfStudy-${index}`}
                  name={`yearsOfStudy ${index}`}
                  value={certificate.yearsOfStudy}
                  onChange={(e) =>
                    handleChange(index, "yearsOfStudy", e.target.value)
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3 mt-5" style={{ width: "50%" }}>
                <label
                  htmlFor={`file-${index}`}
                  className="form-label"
                  style={{ fontWeight: "bold" }}
                >
                  Upload Certificate
                </label>
                <input
                  type="file"
                  id={`file-${index}`}
                  name={`file ${index}`}
                  className="btn btn-primary mb-4 mt-4"
                  style={{
                    background: "#F0F0F0",
                    color: "black",
                    fontWeight: "normal",
                    border: "2px solid black",
                    marginRight: "1em",
                  }}
                  onChange={(event) => handleFileChange(index, event)}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary mb-4 mt-4"
            style={{
              background: "#7CFC00",
              color: "black",
              fontWeight: "bold",
              border: 0,
              marginRight: "1em",
            }}
            onClick={() => addCertificate()}
          >
            Add a New Certificate
          </button>
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
