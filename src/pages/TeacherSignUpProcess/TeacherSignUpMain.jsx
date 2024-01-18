import { useState } from "react";
import About from "./About";
import Photo from "./Photo";
import TeacherSignUpNavbar from "./TeacherSignUpNavbar";
import Certification from "./Certification";
import Education from "./Education";
import Description from "./Description";
import Video from "./Video";
import Availability from "./Availability";
import Pricing from "./Pricing";
import Completion from "./Completion";

function TeacherSignUpMain() {
  const [activePage, setActivePage] = useState(1);
  const [activeComponent, setActiveComponent] = useState("About");

  const handlePageChange = (page) => {
    setActivePage(page);
    setActiveComponent(getActiveComponent(page));
  };

  const getActiveComponent = (page) => {
    switch (page) {
      case 1:
        return "About";
      case 2:
        return "Photo";
      case 3:
        return "Certification";
      case 4:
        return "Education";
      case 5:
        return "Description";
      case 6:
        return "Video";
      case 7:
        return "Availability";
      case 8:
        return "Pricing";
      case 9:
        return "Completion";
      default:
        return "About";
    }
  };

  return (
    <>
        <TeacherSignUpNavbar currentImageIndex={0} />
      

      {activeComponent !== "Completion" && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "40px",
            background: "black",
            marginTop: "20px",
            whiteSpace: "nowrap",
            color: "white",
            overflowX: "hidden",
            margin: "20px 0",
            padding: "4px 100px",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((page) => (
            <div
              key={page}
              style={{
                borderBottom: activePage === page ? "1px solid white" : "none",
                cursor: "pointer",
                color: activePage === page ? "white" : "grey",
              }}
              onClick={() => handlePageChange(page)}
            >
              <h5>{`${page} ${getActiveComponent(page)}`}</h5>
            </div>
          ))}
        </div>
      )}

      {activeComponent === "About" && (
        <About
          activePage={activePage}
          setActivePage={handlePageChange}
          setActiveComponent={setActiveComponent}
        />
      )}
      {activeComponent === "Photo" && (
        <Photo
          activePage={activePage}
          setActivePage={handlePageChange}
          setActiveComponent={setActiveComponent}
        />
      )}
      {activeComponent === "Certification" && (
        <Certification
          activePage={activePage}
          setActivePage={handlePageChange}
          setActiveComponent={setActiveComponent}
        />
      )}
      {activeComponent === "Education" && (
        <Education
          activePage={activePage}
          setActivePage={handlePageChange}
          setActiveComponent={setActiveComponent}
        />
      )}
      {activeComponent === "Description" && (
        <Description
          activePage={activePage}
          setActivePage={handlePageChange}
          setActiveComponent={setActiveComponent}
        />
      )}
      {activeComponent === "Video" && (
        <Video
          activePage={activePage}
          setActivePage={handlePageChange}
          setActiveComponent={setActiveComponent}
        />
      )}
      {activeComponent === "Availability" && (
        <Availability
          activePage={activePage}
          setActivePage={handlePageChange}
          setActiveComponent={setActiveComponent}
        />
      )}
      {activeComponent === "Pricing" && (
        <Pricing
          activePage={activePage}
          setActivePage={handlePageChange}
          setActiveComponent={setActiveComponent}
        />
      )}
      {activeComponent === "Completion" && (
        <Completion
          activePage={activePage}
          setActivePage={handlePageChange}
          setActiveComponent={setActiveComponent}
        />
      )}
    </>
  );
}

export default TeacherSignUpMain;
