import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDescription } from "./useDescription";
import {useUser} from '../../UserContext';

const Description = ({ setActivePage, setActiveComponent }) => {
  const userInfo = useUser();
  const [textAreas, setTextAreas] = useState(
    userInfo.userData.userData.profileDescription && userInfo.userData.userData.profileDescription.length > 0
    ? userInfo.userData.userData.profileDescription.map(cert => ({
    introduction: cert.introduceYourself || "",
    teachingExperience: cert.teachingExperience ||"",
    motivation: cert.motivateStudents ||"",
    headline: cert.catchyHeadline || "",

  }))
    : [{
      introduction: "",
      teachingExperience: "",
      motivation: "",
      headline: "",
  },
]
  );
  const { mutate } = useDescription();

  useEffect(() => {
    if (userInfo?.userData?.userData?.profileDescription) {
      const { introduceYourself, teachingExperience, motivateStudents, catchyHeadline } = userInfo.userData.userData.profileDescription;
      setTextAreas({
        introduction: introduceYourself || "",
        teachingExperience: teachingExperience || "",
        motivation: motivateStudents || "",
        headline: catchyHeadline || "",
      });
    }
  }, [userInfo]);


  // useEffect(() => {
  //   // Load data from local storage when the component mounts
  //   const userData = JSON.parse(localStorage.getItem("userData")) || {};
  //   const { introduction, teachingExperience, motivation, headline } = userData;

  //   setTextAreas({
  //     introduction: introduction || "",
  //     teachingExperience: teachingExperience || "",
  //     motivation: motivation || "",
  //     headline: headline || "",
  //   });
  // }, []);

  const handleNext = () => {
    // Save textAreas in the userData object in local storage
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const updatedUserData = { ...userData, ...textAreas };

    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    try {
      mutate({
        introduceYourself: textAreas.introduction,
        teachingExperience: textAreas.teachingExperience,
        motivateStudents: textAreas.motivation,
        catchyHeadline: textAreas.headline,
      });  

    // Continue with 'Next' logic
    setActivePage((prevPage) => prevPage + 1);
    setActiveComponent("Video"); // Replace with the appropriate component
    // Add necessary logic for other pages/components
  } catch (error) {
    console.error("Mutation failed:", error);
  }
  };

  const backHandler = () => {
    // Add logic for handling 'Back' button click
    setActivePage((prevPage) => prevPage - 1);
    // Add necessary logic for other pages/components
    setActiveComponent("Education"); // Replace with the appropriate component
  };

  const handleTextAreaChange = (field, value) => {
    // Update the state when a textarea value changes
    setTextAreas((prevTextAreas) => ({ ...prevTextAreas, [field]: value }));
  };

  return (
    <div className="container mt-4" style={{ padding: "0em 10em" }}>
      <div className="bg-light text-black p-0">
        <h1 style={{ fontWeight: "bold" }}>Profile description</h1>
        <p>
          This info will go on your public profile. Write it in the language you
          will be teaching
        </p>
      </div>

      <div className="accordion mt-5" id="descriptionAccordion">
        {/* Accordion 1 */}
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
              1. Introduce Yourself
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
                Show potential students who you are! Share your teaching
                experience and passion for education and briefly mention your
                interests and hobbies
              </p>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Minimum 300 Words"
                value={textAreas.introduction}
                onChange={(e) =>
                  handleTextAreaChange("introduction", e.target.value)
                }
              ></textarea>
            </div>
          </div>
        </div>

        {/* Accordion 2, 3, 4 ... */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
              style={{
                fontWeight: "bold",
                color: "black",
                background: "white",
              }}
            >
              2. Teaching Experience
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse "
            aria-labelledby="headingTwo"
            data-bs-parent="#descriptionAccordion"
          >
            <div className="accordion-body">
              <p>
                Provide a detailed description of your relevant teaching
                experience. Include certifications, teaching methodology,
                education and subject expertise.
              </p>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Minimum 300 Words"
                value={textAreas.teachingExperience}
                onChange={(e) =>
                  handleTextAreaChange("teachingExperience", e.target.value)
                }
              ></textarea>
              {/* Add any other content for Accordion 2 */}
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseThree"
              style={{
                fontWeight: "bold",
                color: "black",
                background: "white",
              }}
            >
              3. Motivate potential students
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse "
            aria-labelledby="headingThree"
            data-bs-parent="#descriptionAccordion"
          >
            <div className="accordion-body">
              <p>
                Encourage students to book their first lesson. Highlight the
                benefits of learning with you.
              </p>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Minimum 300 Words"
                value={textAreas.motivation}
                onChange={(e) =>
                  handleTextAreaChange("motivation", e.target.value)
                }
              ></textarea>
              {/* Add any other content for Accordion 3 */}
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="true"
              aria-controls="collapseFour"
              style={{
                fontWeight: "bold",
                color: "black",
                background: "white",
              }}
            >
              4. Write a catchy headline
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#descriptionAccordion"
          >
            <div className="accordion-body">
              <p>
                Your headline is the first thing students see about you. Make it
                attention-grabbing, mention your specific teaching language and
                encourage students to read your full description.
              </p>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Minimum 5 Words"
                value={textAreas.headline}
                onChange={(e) =>
                  handleTextAreaChange("headline", e.target.value)
                }
              ></textarea>
              {/* Add any other content for Accordion 4 */}
            </div>
          </div>
        </div>

        {/* Add more accordion items as needed */}
      </div>

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

Description.propTypes = {
  setActivePage: PropTypes.func.isRequired,
  setActiveComponent: PropTypes.func.isRequired,
};

export default Description;
