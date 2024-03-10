import { FaArrowUp } from "react-icons/fa";

const TutorSearchFooter = () => {

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
  return (
    <>
      <div
        style={{
            marginTop: "1rem",
          background: "#52B9E7",
          padding: "20px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        
       

        <div style={{ flex: 1, padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="logo.png" alt="Image 1" style={{ width: "25%" }} />
            <h4>
              <strong>Edu Mentor AI</strong>
            </h4>
          </div>
        </div>

        <div style={{ flex: 1, padding: "20px" }}>
          <strong>For Students</strong>
          <p>Find a Mentor</p>
        </div>

        <div style={{ flex: 1, padding: "20px" }}>
          <strong>For Mentors</strong>
          <p>Become a Mentor</p>
        </div>

        <div style={{ flex: 1, padding: "20px" }}>
          <strong>Our Contact</strong>
          <p>Edumentorai10@gmail.com </p>
          <p>Lahore, Pakistan</p>
        </div>
        <div style={{ marginTop:'-2rem'}}>
        <button onClick={scrollToTop} style={{ background: "white", border: "2px solid #ccc",  marginTop: '-1rem', padding: '8px', borderRadius: '10px', width: '110%' }}>
        <FaArrowUp />

        </button>
      </div>
      </div>
      <div style={{ background: "black", height: "30px", textAlign: "center" }}>
        <p style={{ color: "white" }}>
          Copyright, Edu Mentor Ai 2030, All rights reserved.
        </p>
      </div>
      
    </>
  );
};

export default TutorSearchFooter;
