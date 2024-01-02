// Assuming you want to export TeacherSignUpNavbar
import AppBar from "@mui/material/AppBar";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Logo2 from "./Logo2";
import PropTypes from "prop-types";

const gradients = [
  ["#3661a0", "#57cbf5"],
  ["#00ff0a", "#009e66"],
  ["black", "#00ff0a"],
];

function TeacherSignUpNavbar({ currentImageIndex }) {
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
        }}
      >
        <Toolbar disableGutters>
          <Logo2 />
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
      </Container>
    </AppBar>
  );
}

export default TeacherSignUpNavbar;

TeacherSignUpNavbar.propTypes = {
  currentImageIndex: PropTypes.number.isRequired,
};
