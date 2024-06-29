import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import styled, { keyframes } from "styled-components";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";
import PropTypes from "prop-types";

const pages = ["Find a mentor", "Become a Mentor"];

const gradients = [
  ["#3661a0", "#57cbf5"],
  ["#00ff0a", "#009e66"],
  ["black", "#00ff0a"],
];

const buttonAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const AnimatedButton = styled.button`
  margin: 0 15px;
  padding: 10px;
  color: white;
  font-family: Poppins;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    animation: ${buttonAnimation} 0.5s ease-in-out infinite;
    color: #00ff00;
  }
`;

function ResponsiveAppBar({ currentImageIndex }) {
  const navigate = useNavigate();
  const [backgroundGradient, setBackgroundGradient] = React.useState(gradients[0]);

  React.useEffect(() => {
    setBackgroundGradient(gradients[currentImageIndex % gradients.length]);
  }, [currentImageIndex]);

  const handleButtonClick = (page) => {
    if (page === "Find a mentor") {
      navigate("/get-started");
    } else if (page === "Become a Mentor") {
      navigate("/sign-up");
    }
  };

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
          <Logo />
          <a
            href="/"
            style={{
              marginRight: "4em",
              marginLeft: '1rem',
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

          <div style={{ flexGrow: 1, marginLeft: "100px" }}>
            {pages.map((page) => (
              <AnimatedButton key={page} onClick={() => handleButtonClick(page)}>
                {page}
              </AnimatedButton>
            ))}
          </div>

          <Box style={{ marginRight: "1em" }}>
            <LoginButton />
          </Box>
          <Box>
            <SignUpButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

ResponsiveAppBar.propTypes = {
  currentImageIndex: PropTypes.number.isRequired,
};