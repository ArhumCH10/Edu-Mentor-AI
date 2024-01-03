import AppBar from "@mui/material/AppBar";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Logo2 from "./Logo2";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const gradients = [
  ["#3661a0", "#57cbf5"],
  ["#00ff0a", "#009e66"],
  ["black", "#00ff0a"],
];

function TeacherSignUpNavbar({ currentImageIndex }) {
  const [backgroundGradient, setBackgroundGradient] = React.useState(
    gradients[0]
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

        {/* Button with SVG and Dropdown */}
        <Button
          onClick={handleClick}
          style={{ color: "white", marginRight: "1em" }}
        >
          <svg
            viewBox="0 0 1024 1024"
            className="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M691.573 338.89c-1.282 109.275-89.055 197.047-198.33 198.331-109.292 1.282-197.065-90.984-198.325-198.331-0.809-68.918-107.758-68.998-106.948 0 1.968 167.591 137.681 303.31 305.272 305.278C660.85 646.136 796.587 503.52 798.521 338.89c0.811-68.998-106.136-68.918-106.948 0z"
                fill="#4A5699"
              ></path>
              <path
                d="M294.918 325.158c1.283-109.272 89.051-197.047 198.325-198.33 109.292-1.283 197.068 90.983 198.33 198.33 0.812 68.919 107.759 68.998 106.948 0C796.555 157.567 660.839 21.842 493.243 19.88c-167.604-1.963-303.341 140.65-305.272 305.278-0.811 68.998 106.139 68.919 106.947 0z"
                fill="#C45FA0"
              ></path>
              <path
                d="M222.324 959.994c0.65-74.688 29.145-144.534 80.868-197.979 53.219-54.995 126.117-84.134 201.904-84.794 74.199-0.646 145.202 29.791 197.979 80.867 54.995 53.219 84.13 126.119 84.79 201.905 0.603 68.932 107.549 68.99 106.947 0-1.857-213.527-176.184-387.865-389.716-389.721-213.551-1.854-387.885 178.986-389.721 389.721-0.601 68.991 106.349 68.933 106.949 0.001z"
                fill="#E5594F"
              ></path>
            </g>
          </svg>
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Log Out</MenuItem>
        </Menu>
      </Container>
    </AppBar>
  );
}

export default TeacherSignUpNavbar;

TeacherSignUpNavbar.propTypes = {
  currentImageIndex: PropTypes.number.isRequired,
};
