import { useState, useEffect } from "react";

import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Paper,
} from "@material-ui/core";
import { Modal, Box, Button } from "@mui/material";

import clsx from "clsx";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("Mentor"); // Default selected button
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleButtonSelect = (buttonName) => {
    setSelectedButton(buttonName);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (open && e.target.closest(".appBar") === null) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [open]);

  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");

    // Check if admin is logged in
    if (adminLoggedIn === "true") {
      const backendEndpoint = "http://localhost:8080/admin/get-all-users";

      // Make a GET request to fetch all users
      axios
        .get(backendEndpoint)
        .then((response) => {
          console.log(response.data);
          // Update the state with the fetched users
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          // Handle errors if needed
        });
    } else {
      // Admin not logged in, navigate to "/admin"
      navigate("/admin");
    }
  }, [navigate]);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");

    // Check if admin is logged in
    if (adminLoggedIn === "true") {
      const backendEndpoint = "http://localhost:8080/admin/get-all-students";

      // Make a GET request to fetch all users
      axios
        .get(backendEndpoint)
        .then((response) => {
          console.log(response.data);
          // Update the state with the fetched users
          setStudents(response.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          // Handle errors if needed
        });
    } else {
      // Admin not logged in, navigate to "/admin"
      navigate("/admin");
    }
  }, [navigate]);

  const handleVerifyUser = async (userId) => {
    console.log(`User with ID ${userId} is being verified`);

    try {
      // Send a POST request to the backend endpoint with the user ID
      await axios.post(`http://localhost:8080/admin/verify-teacher/${userId}`);

      // Optionally, you can update the state or perform any other actions upon successful verification
      console.log(`User with ID ${userId} verified successfully`);
      window.location.reload();
    } catch (error) {
      console.error("Error verifying user:", error);
      // Handle errors if needed
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin");
  };

  const renderContent = () => {
    if (selectedButton === "Mentor") {
      return (
        <TableContainer
          style={{
            background: "#F2F3F3",
            marginTop: "-1em",
            border: "2px solid grey",
          }}
          component={Paper}
        >
          <Table>
            <ToastContainer />
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>First Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Last Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Country Origin
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Language Spoken
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Subjects Taught
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Phone Number
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Hourly Price USD
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Certifications
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Educations</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Availability
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>

                {/* Add other fields based on your user data */}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.countryOrigin}</TableCell>
                  <TableCell>
                    {user.LanguageSpoken && user.LanguageSpoken.join(", ")}
                  </TableCell>
                  <TableCell>{user.subjectsTaught}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.hourlyPriceUSD}</TableCell>

                  <TableCell>
                    {user.certifications && user.certifications.length > 0 ? (
                      user.certifications.map((certification, index) => (
                        <div key={index}>{certification}</div>
                      ))
                    ) : (
                      <div>No Certifications</div>
                    )}
                  </TableCell>

                  <TableCell>
                    {user.educations &&
                      user.educations.map((education, index) => (
                        <div key={index}>
                          University: {education.university}, Degree:{" "}
                          {education.degree}
                        </div>
                      ))}
                  </TableCell>
                  <TableCell>
                    {user.availability &&
                      user.availability.map((availability, index) => (
                        <div key={index}>
                          Day: {availability.day}, Timezone:{" "}
                          {availability.timezone}, Slots:{" "}
                          {availability.slots.map((slot) => (
                            <span key={slot._id}>
                              {slot.from} - {slot.to}
                            </span>
                          ))}
                        </div>
                      ))}
                  </TableCell>
                  {/* Add other fields based on your user data */}
                  {user.isRegistered ? (
                    <button
                      style={{
                        background: "#4798CC",
                        borderRadius: "2em",
                        padding: "0.4em",
                        border: "0",
                        color: "yellow",
                        margin: "12px 5px",
                      }}
                      disabled
                    >
                      Verified
                    </button>
                  ) : (
                    <button
                      onClick={() => handleVerifyUser(user._id)}
                      style={{
                        background: "#00A65F",
                        borderRadius: "2em",
                        padding: "0.4em",
                        border: "0",
                        margin: "12px 5px",
                      }}
                    >
                      Verify
                    </button>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } else if (selectedButton === "Students") {
      return (
        <TableContainer
          style={{
            background: "#F2F3F3",
            marginTop: "-1em",
            border: "2px solid grey",
          }}
          component={Paper}
        >
          <Table>
            <ToastContainer />
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Username</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.username}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpenModal(student)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <div
        className={clsx("appBar", {
          appBarShift: open,
        })}
      >
        <AppBar
          style={{ background: "#4798CC", fontFamily: "Monsterat, sans-serif" }}
          position="fixed"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx("menuButton", open && "hide")}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <img
              src="../../public/logo.png"
              style={{ width: "50px", marginRight: "10px" }}
            />
            <Typography
              style={{
                fontFamily: "Monsterat, sans-serif",
                fontWeight: "bold",
              }}
              variant="h6"
              noWrap
            >
              Dashboard
            </Typography>

            {/* Add the button here */}
            <div style={{ marginLeft: "auto" }}>
              <svg
                width="36px"
                height="36px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  cursor: "pointer",
                  background: "#00A65F",
                  borderRadius: "50%",
                  padding: "0.4em",
                }}
                onClick={() => {
                  handleLogout();
                }}
              >
                <path
                  d="M12 15L15 12M15 12L12 9M15 12H4M9 7.24859V7.2002C9 6.08009 9 5.51962 9.21799 5.0918C9.40973 4.71547 9.71547 4.40973 10.0918 4.21799C10.5196 4 11.0801 4 12.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H12.1969C11.079 20 10.5192 20 10.0918 19.7822C9.71547 19.5905 9.40973 19.2839 9.21799 18.9076C9 18.4798 9 17.9201 9 16.8V16.75"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Toolbar>
        </AppBar>
      </div>

      <main
        className={clsx("content", {
          contentShift: open,
        })}
      >
        <div className="drawerHeader" />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div
              style={{
                padding: "0.5em",
                marginTop: "3em",
                width: "1290px",
              }}
            >
              <div style={{ margin: "1em 0", padding: "1em" }}>
                <Button
                  style={{ marginRight: "1em" }}
                  variant={
                    selectedButton === "Mentor" ? "contained" : "outlined"
                  }
                  onClick={() => handleButtonSelect("Mentor")}
                >
                  Mentors
                </Button>
                <Button
                  variant={
                    selectedButton === "Students" ? "contained" : "outlined"
                  }
                  onClick={() => handleButtonSelect("Students")}
                >
                  Students
                </Button>
              </div>

              {renderContent()}
            </div>
          </Grid>
        </Grid>
      </main>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="student-modal-title"
        aria-describedby="student-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "0.5em",
          }}
        >
          <Typography
            style={{ fontWeight: "bold", marginBottom: "1em" }}
            id="student-modal-title"
            variant="h6"
            component="h2"
          >
            Student Details
          </Typography>
          {selectedStudent && (
            <div id="student-modal-description">
              <p>Email: {selectedStudent.email}</p>
              <p>Name: {selectedStudent.name}</p>
              <p>Username: {selectedStudent.username}</p>
              {/* Add other student details as needed */}
            </div>
          )}
          <div style={{ marginTop: "3em" }}>
            <Button
              style={{ marginRight: "0.5em" }}
              variant="contained"
              color="primary"
              size="small"
            >
              Action 1
            </Button>
            <Button
              style={{ marginRight: "0.5em" }}
              variant="contained"
              color="secondary"
              size="small"
            >
              Action 2
            </Button>
            <Button
              size="small"
              style={{ marginRight: "0.5em" }}
              variant="outlined"
            >
              Action 3
            </Button>
          </div>
          {/* <Button onClick={() => setIsModalOpen(false)}>Close</Button> */}
        </Box>
      </Modal>

      <footer
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "#00A65F",
          textAlign: "center",
        }}
      >
        <Typography
          style={{ fontFamily: "Monsterat, sans-serif" }}
          variant="caption"
          color="textSecondary"
        >
          &copy; 2024 EDU MENTOR AI
        </Typography>
      </footer>
    </div>
  );
};

export default AdminDashboard;
