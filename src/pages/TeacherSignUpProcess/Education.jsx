import { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

const Education = ({ activePage, setActivePage, setActiveComponent }) => {
  const [noHigherDegree, setNoHigherDegree] = useState(false);

  const userData = useMemo(
    () => JSON.parse(localStorage.getItem("userData")) || {},
    []
  );

  const initialDegrees = useMemo(() => {
    if (userData.noHigherDegree) {
      return [];
    }
    return userData.degrees ? [...userData.degrees] : [];
  }, [userData]);

  const [degrees, setDegrees] = useState(initialDegrees);

  useEffect(() => {
    setNoHigherDegree(userData.noHigherDegree || false);
  }, [userData]);

  const handleCheckboxChange = () => {
    setNoHigherDegree(!noHigherDegree);
  };

  const handleChange = (index, field, value) => {
    const updatedDegrees = [...degrees];
    updatedDegrees[index][field] = value;
    setDegrees(updatedDegrees);
  };

  const handleFileChange = (index, event) => {
    const selectedFile = event.target.files[0];
    const updatedDegrees = [...degrees];
    updatedDegrees[index].file = selectedFile;
    setDegrees(updatedDegrees);
  };

  const handleNext = async () => {
    if (noHigherDegree) {
      // Handle the case when there is no higher degree
      setActivePage((prevPage) => prevPage + 1);
      // Add necessary logic for other pages/components
      return;
    }

    const isAnyDegreeIncomplete = degrees.some(
      (degree) =>
        !degree.universityName ||
        !degree.degreeName ||
        !degree.degreeType ||
        !degree.specialization ||
        !degree.yearsOfStudy ||
        !degree.file
    );

    if (isAnyDegreeIncomplete) {
      alert("Please fill in all required fields for the current degree.");
      return;
    }

    // Extract file information and create a serializable payload
    const degreesPayload = degrees.map((degree) => ({
      ...degree,
      file: degree.file
        ? {
            name: degree.file.name,
            size: degree.file.size,
            type: degree.file.type,
          }
        : null,
    }));

    // Save the education data to the user object in local storage
    const updatedUserData = {
      ...userData,
      noHigherDegree,
      degrees: userData.degrees
        ? [...userData.degrees, ...degreesPayload]
        : degreesPayload,
    };

    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    setActivePage((prevPage) => prevPage + 1);
    switch (activePage) {
      case 1:
        setActiveComponent("Description"); // Replace with the appropriate component
        break;
      // Add cases for other pages/components as needed
      default:
        setActiveComponent("Description"); // Replace with the appropriate component
    }
  };

  const backHandler = () => {
    setActivePage((prevPage) => prevPage - 1);
    // Add cases for other pages/components as needed
    setActiveComponent("Certification"); // Replace with the appropriate component
  };

  const addDegree = () => {
    // Check if the current degree is incomplete before adding a new one
    const currentDegree = degrees[degrees.length - 1];
    if (
      !currentDegree.universityName ||
      !currentDegree.degreeName ||
      !currentDegree.degreeType ||
      !currentDegree.specialization ||
      !currentDegree.yearsOfStudy ||
      !currentDegree.file
    ) {
      alert("Please fill in all required fields for the current degree.");
      return;
    }

    // Add a new empty degree
    setDegrees([
      ...degrees,
      {
        universityName: "",
        degreeName: "",
        degreeType: "",
        specialization: "",
        yearsOfStudy: "",
        file: null,
      },
    ]);
  };

  return (
    <div className="container mt-4" style={{ padding: "0em 10em" }}>
      <div className="bg-light text-black p-0">
        <h1 style={{ fontWeight: "bold" }}>Higher Education</h1>
        <p>
          Tell students more about the higher education that you have completed
          or are working on
        </p>
      </div>
      {/* {userData?.degrees && userData?.degrees.length === 0 && ( */}
      <div className="mb-3 mt-5" style={{ width: "50%" }}>
        <input
          type="checkbox"
          checked={noHigherDegree}
          id="noHigherDegree"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="noHigherDegree" style={{ fontWeight: "bold" }}>
          I dont have a higher degree
        </label>
      </div>
      {/* )} */}
      {!noHigherDegree && (
        <form className="mt-0">
          {degrees?.map((degree, index) => (
            <div key={index}>
              {/* Render form fields for each degree */}
              <div className="mb-3 mt-5" style={{ width: "50%" }}>
                <label
                  htmlFor={`universityName-${index}`}
                  className="form-label"
                  style={{ fontWeight: "bold" }}
                >
                  University Name
                </label>
                <input
                  style={{ border: "1px solid black" }}
                  type="text"
                  id={`universityName-${index}`}
                  name={`universityName ${index}`}
                  value={degree.universityName}
                  onChange={(e) =>
                    handleChange(index, "universityName", e.target.value)
                  }
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3 mt-5" style={{ width: "50%" }}>
                <label
                  htmlFor={`degreeName-${index}`}
                  className="form-label"
                  style={{ fontWeight: "bold" }}
                >
                  Degree Name
                </label>
                <input
                  style={{ border: "1px solid black" }}
                  type="text"
                  id={`degreeName-${index}`}
                  name={`degreeName ${index}`}
                  value={degree.degreeName}
                  onChange={(e) =>
                    handleChange(index, "degreeName", e.target.value)
                  }
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3 mt-5" style={{ width: "50%" }}>
                <label
                  htmlFor={`degreeType-${index}`}
                  className="form-label"
                  style={{ fontWeight: "bold" }}
                >
                  Degree Type
                </label>
                <input
                  style={{ border: "1px solid black" }}
                  type="text"
                  id={`degreeType-${index}`}
                  name={`degreeType ${index}`}
                  value={degree.degreeType}
                  onChange={(e) =>
                    handleChange(index, "degreeType", e.target.value)
                  }
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3 mt-5" style={{ width: "50%" }}>
                <label
                  htmlFor={`specialization-${index}`}
                  className="form-label"
                  style={{ fontWeight: "bold" }}
                >
                  Specialization
                </label>
                <input
                  style={{ border: "1px solid black" }}
                  type="text"
                  id={`specialization-${index}`}
                  name={`specialization ${index}`}
                  value={degree.specialization}
                  onChange={(e) =>
                    handleChange(index, "specialization", e.target.value)
                  }
                  className="form-control"
                  required
                />
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
                  value={degree.yearsOfStudy}
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
                  Upload Degree Certificate
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
            onClick={() => addDegree()}
          >
            Add a New Degree
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

Education.propTypes = {
  activePage: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setActiveComponent: PropTypes.func.isRequired,
};

export default Education;
