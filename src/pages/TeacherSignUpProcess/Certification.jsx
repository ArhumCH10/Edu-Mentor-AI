import { useEffect, useMemo, useState } from "react";
import "react-phone-number-input/style.css";
import PropTypes from "prop-types";
import { useCertificate } from "./useCertificate";

const Certification = ({ activePage, setActivePage, setActiveComponent }) => {
  const userData = useMemo(
    () => JSON.parse(localStorage.getItem("userData")) || {},
    []
  );
  const { mutate } = useCertificate();

  const [certificates, setCertificates] = useState(
    userData.userData.certifications && userData.userData.certifications.length > 0
      ? userData.userData.certifications.map(cert => ({
          certificate: cert.certificate || "",
          subject: cert.subject || "",
          description: cert.description || "",
          issuer: cert.issuedBy || "",
          yearsOfStudy: cert.yearsOfStudyFrom || "",
          file: cert.certificationPhoto || null, // Store the file path as a string
        }))
      : [
          {
            certificate: "",
            subject: "",
            description: "",
            issuer: "",
            yearsOfStudy: "",
            file: null,
          },
        ]
  );  

  useEffect(() => {
    if (userData.certificates && userData.certificates.length > 0) {
      setCertificates(userData.certificates);
      setTeachingCertificates(true);
    }
  }, [userData]);
  
  const [teachingCertificates, setTeachingCertificates] = useState(
    userData.teachingCertificates || false
  );

  const handleCheckboxChange = () => {
    if (userData.userData.profilePhoto) {
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

  const handleNext = () => {
    if (!teachingCertificates) {
      setActivePage((prevPage) => prevPage + 1);
      setActiveComponent("Education");
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
    // Save the certificates to the user object in local storage
    const updatedUserData = {
      ...userData,
      certificates: userData.certificates
        ? [...userData.certificates, ...certificatesPayload]
        : certificatesPayload,
    };

    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    try {
      certificates.forEach(cert => {

        mutate({
          subject: cert.subject,
          certificate: cert.certificate,
          description: cert.description,
          issuedBy: cert.issuer,
          yearsOfStudyFrom: cert.yearsOfStudy,
          certificationPhoto: cert.file,
        });
      });

    setActivePage((prevPage) => prevPage + 1);
    switch (activePage) {
      case 1:
        setActiveComponent("Education");
        break;
      default:
        setActiveComponent("Education");
    }
  } catch (error) {
    console.error("Mutation failed:", error);
  }
    return;
  };

  const deleteCertificate = (index) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      setCertificates(certificates.filter((_, idx) => idx !== index));
    }
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

      {/* {userData?.certificates && userData?.certificates.length === 0 && ( */}
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
      {/* )} */}
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
              <div>
              <button
      type="button"
      className="btn btn-danger mb-4 mt-4"
      onClick={() => deleteCertificate(index)}
      style={{
        fontWeight: "bold",
        border: "1px solid black",
        marginRight: "1em",
      }}
    >
      Delete Certificate
    </button>
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
