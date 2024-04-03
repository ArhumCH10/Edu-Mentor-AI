import AppBar from "@mui/material/AppBar";
import React,{ useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Logo2 from "../pages/TeacherSignUpProcess/Logo2";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Heading = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  color: white;
  margin-top: 12px;
  margin-left: 500px;
`;

const gradients = [
  ["#3661a0", "#57cbf5"],
  ["#00ff0a", "#009e66"],
  ["black", "#00ff0a"],
];

function AlternativeNavbar({ currentImageIndex }) {

  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Get the user object from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      // Update the user name and level in state
      setUserName(storedUser.name);
    }
  }, []);

  const [backgroundGradient, setBackgroundGradient] = React.useState(
    gradients[0]
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    setBackgroundGradient(gradients[currentImageIndex % gradients.length]);
  }, [currentImageIndex]);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
    navigate("/tutors-search/*");
    };

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

        <Heading>Welcome, {userName || "Guest"}</Heading>

        {/* Button with SVG and Dropdown */}
        <Button
          onClick={handleClick}
          style={{ color: "white", marginRight: "1em" }}
        >
          <svg
            width="34px"
            height="34px"
            viewBox="0 0 16 16"
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
                d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0"
                fill="#2e3436"
              ></path>
            </g>
          </svg>
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>
          Log Out
          </MenuItem>
        </Menu>
      </Container>
    </AppBar>
  );
}

export default AlternativeNavbar;

AlternativeNavbar.propTypes = {
  currentImageIndex: PropTypes.number.isRequired,
};
