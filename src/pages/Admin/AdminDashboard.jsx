import  { useState, useEffect } from "react";
import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Box,
  Button,
  Modal,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
} from "@mui/material";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("Mentor");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");

    if (adminLoggedIn !== "true") {
      navigate("/admin");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/get-all-users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/get-all-students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchUsers();
    fetchStudents();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin");
  };

  const handleVerifyUser = async (userId) => {
    console.log(`User with ID ${userId} is being verified`);
    try {
      await axios.post(`http://localhost:8080/admin/verify-teacher/${userId}`);
      console.log(`User with ID ${userId} verified successfully`);
      window.location.reload();
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

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
  const renderContent = () => {
    if (selectedButton === "Mentor") {
      return (
        <Paper style={{ background: "#fff", marginTop: "1em", border: "0.5px solid grey",marginLeft:"6em" }}>
          <ToastContainer />
          <List>
            {users?.map((user) => (
              <div key={user?._id}>
                <ListItem>
                <ListItemText
                    primary={`Name: ${user?.firstName ?? "N/A"} ${user?.lastName ?? "N/A"}`}
                    secondary={`Email: ${user?.email ?? "N/A"}`}
                  />
                  <Button
                    onClick={() => handleVerifyUser(user?._id)}
                    disabled={user?.isRegistered}
                    style={{
                      background: user?.isRegistered ? "#4798CC" : "#00A65F",
                      color: user?.isRegistered ? "yellow" : "white"
                    }}
                  >
                    {user?.isRegistered ? "Verified" : "Verify"}
                  </Button>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Paper>
      );
    } else if (selectedButton === "Students") {
      return (
        <Paper style={{ background: "#fff", marginTop: "1em", border: "0.5px solid grey",marginLeft:"6em" }}>
          <ToastContainer />
          <List>
            {students?.map((student) => (
              <div key={student?._id}>
                <ListItem>
                  <ListItemText
                    primary={`Name: ${student?.name ?? "N/A"}`}
                    secondary={`Email: ${student?.email ?? "N/A"}`}
                  />
                  <Button onClick={() => handleOpenModal(student)}>View Details</Button>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Paper>
      );
    }
  };
  

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <div className={clsx("appBar", { appBarShift: open })}>
        <AppBar style={{ background: "#4798CC", fontFamily: "Monsterat, sans-serif" }} position="fixed">
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx("menuButton", open && "hide")}>
              {/* <MenuIcon /> */}
            </IconButton>
            <img src="../../../public/logo.png" style={{ width: "50px", marginRight: "10px" }} alt="Logo" />
            <Typography style={{ fontFamily: "Monsterat, sans-serif", fontWeight: "bold" }} variant="h6" noWrap>Dashboard</Typography>
            <div style={{ marginLeft: "auto" }}>
              <svg
                width="36px"
                height="36px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: "pointer", background: "#00A65F", borderRadius: "50%", padding: "0.4em" }}
                onClick={handleLogout}
              >
                <path d="M12 15L15 12M15 12L12 9M15 12H4M9 7.24859V7.2002C9 6.08009 9 5.51962 9.21799 5.0918C9.40973 4.71547 9.71547 4.40973 10.0918 4.21799C10.5196 4 11.0801 4 12.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H12.1969C11.079 20 10.5192 20 10.0918 19.7822C9.71547 19.5905 9.40973 19.2839 9.21799 18.9076C9 18.4798 9 17.9201 9 16.8V16.75" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Toolbar>
        </AppBar>
      </div>

      <main className={clsx("content", { contentShift: open })}>
        <div className="drawerHeader" />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div style={{ padding: "0.5em", marginTop: "3em", width: "1290px" }}>
              <div style={{ margin: "1em 0", padding: "1em" }}>
                <Button style={{ marginRight: "1em" }} variant={selectedButton === "Mentor" ? "contained" : "outlined"} onClick={() => handleButtonSelect("Mentor")}>Mentors</Button>
                <Button variant={selectedButton === "Students" ? "contained" : "outlined"} onClick={() => handleButtonSelect("Students")}>Students</Button>
              </div>
              {renderContent()}
            </div>
          </Grid>
        </Grid>
      </main>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} aria-labelledby="student-modal-title" aria-describedby="student-modal-description">
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24, p: 4, borderRadius: "0.5em" }}>
          <Typography style={{ fontWeight: "bold", marginBottom: "1em" }} id="student-modal-title" variant="h6" component="h2">Student Details</Typography>
          {selectedStudent && (
            <div id="student-modal-description">
              <p>Email: {selectedStudent.email}</p>
              <p>Name: {selectedStudent.name}</p>
              <p>Username: {selectedStudent.username}</p>
            </div>
          )}
          <div style={{ marginTop: "3em" }}>
            <Button style={{ marginRight: "0.5em" }} variant="contained" color="primary" size="small">Action 1</Button>
            <Button style={{ marginRight: "0.5em" }} variant="contained" color="secondary" size="small">Action 2</Button>
            <Button size="small" style={{ marginRight: "0.5em" }} variant="outlined">Action 3</Button>
          </div>
        </Box>
      </Modal>

      <footer style={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "#00A65F", textAlign: "center" }}>
        <Typography style={{ fontFamily: "Monsterat, sans-serif" }} variant="caption" color="textSecondary">&copy; 2024 EDU MENTOR AI</Typography>
      </footer>
    </div>
  );
};

export default AdminDashboard;
