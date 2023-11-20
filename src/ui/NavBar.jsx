import AppBar from "@mui/material/AppBar";
import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import PropTypes from "prop-types";
import SignUpButton from "./SignUpButton";

const pages = ["Find a mentor", "Become a Mentor"];

const gradients = [
  ["#3661a0", "#57cbf5"],
  ["#00ff0a", "#009e66"],
  ["black", "#00ff0a"],
];

function ResponsiveAppBar({ currentImageIndex }) {
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
              <button
                key={page}
                style={{
                  margin: "0 15px",
                  padding: "10px",
                  color: "white",
                  fontFamily: "Poppins",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {page}
              </button>
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
