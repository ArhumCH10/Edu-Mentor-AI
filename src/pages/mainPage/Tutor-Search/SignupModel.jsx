import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";

export default function SignupModel({
  setSignUpShowModal,
  profilePic,
  firstNameSignup,
  lastNameSignup,
  setVerifyshowModal,
  handleShowLoginModal,
  SignUpshowModal,
  Backend_URI,
}) {
  const [signUpStudentName, setSignUpStudentName] = useState("");
  const [signUpStudentEmail, setSignUpStudentEmail] = useState("");
  const [signUpStudentPassword, setSignUpStudentPassword] = useState("");

  const handleCloseSignUpModal = () => {
    setSignUpShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { signupName, signupEmail, signupPassword } = event.target.elements;

    try {
      // Make a POST request to the backend
      const response = await axios.post(
        "http://localhost:8080/student/signup",
        {
          name: signupName.value,
          email: signupEmail.value,
          password: signupPassword.value,
        }
      );

      console.log("Response from backend:", response.data);

      if (response.status === 200) {
        // Show success toast and navigate to verify page
        toast.success("Verification code sent on email");
        localStorage.setItem("email", signupEmail.value);
        setSignUpShowModal(false);
        setSignUpStudentEmail("");
        setSignUpStudentPassword("");
        setSignUpStudentName("");
        setVerifyshowModal(true);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          // Show toast message for already registered as a student
          toast.error("User   already registered");
          console.log("User   already registered");
        } else if (error.response.status === 400) {
          // Show toast message for already registered as a teacher
          toast.error("This email is already registered as a teacher");
          console.log("Email already registered as teacher");
        } else if (error.response.status === 401) {
          // Show toast message for already registered as a teacher
          toast.error(
            "Password must be at least 8 characters long and contain at least one capital letter and one special character."
          );
          console.log("Email already registered as teacher");
        }
      } else {
        // Handle the case where error.response is undefined
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="modal"
        style={{
          display: SignUpshowModal ? "block" : "none",
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        }}
        onClick={handleCloseSignUpModal}
      >
        <div
          className="modal-content"
          style={{
            backgroundColor: "#fefefe",
            margin: "15% auto",
            padding: "20px",
            border: "1px solid #888",
            width: "80%",
            overflowY: "auto",
            maxHeight: "90vh",
            zIndex: 1001,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>Sign up to start learning</h2>
            <button
              type="button"
              className="close"
              onClick={handleCloseSignUpModal}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <img
              src={
                profilePic
                  ? `${Backend_URI}/${profilePic}`
                  : "User DpNotFound.jpg"
              }
              alt="userProfile"
              style={{
                margin: "auto",
                borderRadius: "10% 1%",
              }}
              height={100}
              width={90}
              onError={(e) => {
                e.target.src = `./User DpNotFound.jpg`;
                e.target.style.border = "1px solid #ccc";
              }}
            />
            <span>
              <small>
                Only one step left to book your lesson with &nbsp;
                {firstNameSignup} {lastNameSignup}
              </small>
            </span>

            <button className="google-signup-btn">
              <img
                src="/google-icon.png"
                alt="Google Icon"
                className="google-icon"
              />
              Continue with Google
            </button>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label id="signupNameLabel">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  name="signupName"
                  value={signUpStudentName}
                  onChange={(e) => setSignUpStudentName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label id="signupEmail Label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="signupEmail"
                  value={signUpStudentEmail}
                  onChange={(e) => setSignUpStudentEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label id="signupPasswordLabel">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="signupPassword"
                  value={signUpStudentPassword}
                  onChange={(e) => setSignUpStudentPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="google-signup-btn"
                style={{
                  background: "linear-gradient(to top, #3661a0, #57cbf5)",
                  marginTop: "10px",
                }}
              >
                Submit
              </button>
            </form>
            <div className="modal-auth-content">
              <small>
                By clicking Continue or Sign up, you agree to{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  Terms of Use
                </span>
                , including{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  Subscription Terms
                </span>{" "}
                and{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  Privacy Policy
                </span>
                .
              </small>
            </div>
            <div className="modal-auth-footer">
              <span>Already have an account?</span>
              <button
                onClick={handleShowLoginModal}
                className="modal-auth-footer-login-btn"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

SignupModel.propTypes = {
  setSignUpShowModal: PropTypes.func.isRequired,
  profilePic: PropTypes.string,
  firstNameSignup: PropTypes.string,
  lastNameSignup: PropTypes.string,
  setVerifyshowModal: PropTypes.func.isRequired,
  handleShowLoginModal: PropTypes.func.isRequired,
  SignUpshowModal: PropTypes.bool.isRequired,
  Backend_URI: PropTypes.string,
};
