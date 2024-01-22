import AppBar from "@mui/material/AppBar";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Logo2 from "./Logo2";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import toast from "react-hot-toast";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
import { useAuth } from '../../AuthContext';
import { Navigate } from 'react-router-dom';

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

  React.useEffect(() => {
    setBackgroundGradient(gradients[currentImageIndex % gradients.length]);
  }, [currentImageIndex]);

  const { isAuthenticated} = useAuth();
  const {mutate: logoutMutate , isLoading} = useLogout();
  const {logoutFrontend } = useAuth();

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleLogout = async () => {
      try {
        // Trigger the logout mutation
        await logoutMutate();
       logoutFrontend();
      } catch (error) {
        toast.error("Logout failed. Please try again.");
      }
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
          <MenuItem disabled={isLoading} onClick={handleLogout}>
          {!isLoading ? "Log Out": <SpinnerMini/>}
          </MenuItem>
        </Menu>
      </Container>
    </AppBar>
  );
}

export default TeacherSignUpNavbar;

TeacherSignUpNavbar.propTypes = {
  currentImageIndex: PropTypes.number.isRequired,
};
