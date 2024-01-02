import About from "./About";
import TeacherSignUpNavbar from "./TeacherSignUpNavbar";
function TeacherSignUpMain() {
  return (
    <>
      <TeacherSignUpNavbar currentImageIndex={0} />
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
          margin: "20px",
          borderRadius: "5px",
          padding: "4px",
        }}
      >
        <div>
          <h5>1 About</h5>
        </div>
        <div>
          <h5>2 Photo</h5>
        </div>
        <div>
          <h5>3 Certification</h5>
        </div>
        <div>
          <h5>4 Education</h5>
        </div>
        <div>
          <h5>5 Description</h5>
        </div>
        <div>
          <h5>6 Video</h5>
        </div>
        <div>
          <h5>7 Availability</h5>
        </div>
        <div>
          <h5>8 About</h5>
        </div>
      </div>
      <About />
    </>
  );
}

export default TeacherSignUpMain;
