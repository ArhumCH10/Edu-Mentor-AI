import AppBar from "@mui/material/AppBar";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";


const gradients = [
  ["#3661a0", "#57cbf5"],
  ["#00ff0a", "#009e66"],
  ["black", "#00ff0a"],
];

function VerificationPageNavbar({ currentImageIndex }) {
  const [backgroundGradient, setBackgroundGradient] = React.useState(
    gradients[0]
  );

  React.useEffect(() => {
    setBackgroundGradient(gradients[currentImageIndex % gradients.length]);
  }, [currentImageIndex]);

 
  
  return (
    <AppBar position="sticky">
      <Container
        maxWidth="2xl"
        sx={{
          paddingTop: "20px",
          background: `linear-gradient(to bottom, ${backgroundGradient[0]}, ${backgroundGradient[1]})`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Toolbar disableGutters>
          <a
            href="/"
            style={{
              marginRight: "4em",
              marginLeft: "1rem",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
              fontSize: "1.5em",
            }}
          >
            EDU MENTOR AI
          </a>
        </Toolbar>

        {/* Button with SVG and Dropdown */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "8px", marginBottom: "10px" }} // Adjust the spacing between the icon and text
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M8.95043 20.6471C6.17301 19.9956 4.00437 17.827 3.35287 15.0496C2.88237 13.0437 2.88237 10.9563 3.35287 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35287C17.827 4.00437 19.9956 6.173 20.6471 8.95043C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95043 20.6471Z"
                stroke="#AAFF00"
                strokeWidth="1.5"
              ></path>
              <path
                d="M8.95043 20.6471C10.9563 21.1176 13.0437 21.1176 15.0496 20.6471C17.827 19.9956 19.9956 17.827 20.6471 15.0496C21.1176 13.0437 21.1176 10.9563 20.6471 8.95043C19.9956 6.173 17.827 4.00437 15.0496 3.35288C13.0437 2.88237 10.9563 2.88237 8.95043 3.35288C6.173 4.00437 4.00437 6.17301 3.35287 8.95043"
                stroke="#AAFF00"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
              <path
                d="M9.25 11.75L11.25 13.75L14.75 10"
                stroke="#AAFF00"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <p>Email Verification</p>
        </div>
      </Container>
    </AppBar>
  );
}

export default VerificationPageNavbar;

VerificationPageNavbar.propTypes = {
  currentImageIndex: PropTypes.number.isRequired,
};
