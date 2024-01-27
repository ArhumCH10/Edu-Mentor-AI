//imports
// import { useEffect } from "react";
//material-ui
import { Alert, Avatar, Card } from "@mui/material";

//hooks
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
//store

//axios

//toastify
import { ToastContainer } from "react-toastify";

const cardStyles = {
  width: "100%",
  padding: "50px",
  textAlign: "center",
  background: "#4798CC",
};

const stepContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
};

const stepStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  //   const adminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  useEffect(() => {
    const storedAdminLoggedIn = localStorage.getItem("adminLoggedIn");

    if (storedAdminLoggedIn && JSON.parse(storedAdminLoggedIn)) {
      toast.success("Welcome Back Admin!");
      navigate("/admin-dashboard"); // Change this to the appropriate route
    }
  }, [navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();

    if (email !== "admin@edumentor.com" || password !== "admin") {
      setShowError(true);
    } else {
      localStorage.setItem("adminLoggedIn", JSON.stringify(true));
      navigate("/admin-dashboard");
    }
  };
  return (
    <>
      <Card style={cardStyles}>
        <h2 style={{ color: "#FFFFFF", fontWeight: "bold" }}>EDU MENTOR AI</h2>
        <p style={{ color: "#FFFFFF" }}>Admin Login</p>
        <div style={stepContainerStyles}>
          <div style={stepStyles}>
            <Avatar
              style={{ width: "100px", height: "100px" }}
              alt="Logo"
              src="../../public/logo.png"
            />
          </div>
        </div>
      </Card>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 p-4">
            <form onSubmit={loginHandler}>
              <div className="form-group">
                <label htmlFor="loginEmail">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="loginEmail"
                  placeholder="username@email.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <ToastContainer />

              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="loginPassword"
                  placeholder="Enter your password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="log"
                style={{
                  color: "white",
                  backgroundColor: "#00A65F",
                  border: "0px solid rgba(0, 19, 111, 1)",
                  cursor: "pointer",
                  borderRadius: "4px",
                  fontWeight: "600",
                  margin: "20px 0",
                  width: "200px",
                  padding: "10px 0",
                  boxShadow: "0 0 20px rgba(0, 19, 111, 0.2)",
                  transition: "0.4s",
                }}
              >
                Login
              </button>
              {showError && <Alert severity="error">Invalid Credentials</Alert>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
