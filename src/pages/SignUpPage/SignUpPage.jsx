import NavBar from "../../ui/NavBar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import toast from "react-hot-toast";

function SignUpPage({ role, setRole }) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [isHovered, setIsHovered] = useState(false);
  const { mutate } = useSignup();
  const navigate = useNavigate();

  const toggleRole = () => {
    setRole(role === "student" ? "tutor" : "student");
  };

  const validateName = (value, setError, clearErrors) => {
    if (!/^[a-zA-Z]+$/.test(value)) {
      setError("name", {
        type: "manual",
        message:
          "Please provide a valid name containing only alphabetic characters",
      });
    } else {
      clearErrors("name");
    }
  };
  // Validation functions
  const validateEmail = (value) => {
    if (!/\S+@\S+\.\S+/.test(value)) {
      setError("email", {
        type: "manual",
        message: "Please provide a valid email address",
      });
    } else {
      clearErrors("email");
    }
  };

  const validateEmailStudent = (value) => {
    if (!/\S+@\S+\.\S+/.test(value)) {
      setError("studentemail", {
        type: "manual",
        message: "Please provide a valid email address",
      });
    } else {
      clearErrors("studentemail");
    }
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      setError("password", {
        type: "manual",
        message: "Password needs a minimum of 8 characters",
      });
    } else {
      clearErrors("password");
    }
  };

  const validatePasswordStudent = (value) => {
    if (value.length < 8) {
      setError("studentpassword", {
        type: "manual",
        message: "Password needs a minimum of 8 characters",
      });
    } else {
      clearErrors("studentpassword");
    }
  };

  // Form submission handler for Student to be used by backend not the part of frontend
  const onSubmitStudent = async (formData) => {
    const { name, studentemail, studentpassword } = formData;

    try {
      // Make a POST request to the backend
      const response = await axios.post(
        "http://localhost:8080/student/signup",
        {
          name: name,
          email: studentemail,
          password: studentpassword,
        }
      );

      // Handle the response as needed
      console.log("Response from backend:", response.data);

      // Reset the form if needed
      reset();

     if (response.status === 200) {
        // Show success toast and navigate to verify page
        toast.success("Verification code sent on email");
        localStorage.setItem("email", studentemail);
        navigate("/verify");
      }
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error sending data to backend:", error);
      if (error.response && error.response.status === 409) {
        // Show toast message for already registered as a student
        toast.error("This email is already registered");
        console.log("Email already registered");
      } else if (error.response && error.response.status === 400) {
        // Show toast message for already registered as a teacher
        toast.error("This email is already registered as a teacher");
        console.log("Email already registered as teacher");
      }
      else if (error.response && error.response.status === 401) {
        toast.error("Password must contain at least one capital letter and one special character.");
      }
    }
  };

  //for teacher
  const onSubmit = ({ email, password }) => {
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          reset();
          if (data && data.redirectUrl) {
            navigate(data.redirectUrl, { replace: true });
          }
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  const styles = {
    body: {
      margin: 0,
      fontFamily: "Arial, sans-serif",
    },
    mainContainer: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#4283BB",
      minHeight: "100vh",
      alignItems: "center",
    },
    leftSection: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      position: "relative",
    },
    greenBox: {
      position: "absolute",
      marginLeft: "8rem",
      backgroundColor: "#4DFF00",
      height: "100%",
      width: "60%",
    },
    leftImage: {
      width: "25em",
      zIndex: 3,
      marginLeft: "8rem",
      transform: "scale(1.7)",
      marginTop: "3rem",
      marginBottom: "90px",
      position: "relative",
    },
    RightImage: {
      width: "20rem",
      zIndex: 3,
      marginLeft: "8rem",
      transform: "scale(1.7)",
      marginTop: "2rem",
      marginBottom: "90px",
      position: "relative",
    },
    rightSection: {
      flex: 1,
    },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "60%",
      margin: "auto",
    },
    paperContainer: {
      padding: "20px",
      borderRadius: "15px",
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      paddingRight: "3.5em",
      paddingLeft: "3.5em",
      paddingTop: "2em",
      zIndex: 100,
    },
    heading: {
      fontWeight: "bold",
      fontSize: "2em",
      marginBottom: "0.5rem",
      textAlign: "center",
    },
    formContent: {
      width: "100%",
    },
    formInput: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: "15px",
      border: "none",
      outline: "none",
      width: "100%",
      marginBottom: "2em",
      padding: "0.5em",
    },
    submitBtn: {
      marginTop: "1em",
      margin: "auto",
      backgroundColor: isHovered ? "#55c703" : "#4DFF00",
      color: "black",
      fontWeight: "bold",
      borderRadius: "1em",
      padding: "0.5em 1em",
      cursor: "pointer",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.3s",
    },
    backgroundImage: {
      position: "absolute",
      top: 100,
      marginLeft: "-4rem",
      marginTop: "-3rem",
      width: "56%",
      opacity: 0.2,
      zIndex: 1,
    },
  };

  return (
    <>
      <NavBar currentImageIndex={0} />
      <div style={styles.mainContainer}>
        <div style={styles.leftSection}>
          <h3
            style={{
              color: "white",
              zIndex: 2,
              margin: "auto",
              marginTop: "2rem",
            }}
          >
            {role === "student"
              ? "We Will Transform the"
              : "Start Earning Money On"}{" "}
          </h3>
          <h3 style={{ color: "white", zIndex: 2, margin: "auto" }}>
            {role === "student" ? "New you" : "your Schedule"}
          </h3>
          <img
            src="d1.png"
            alt="design1"
            style={{
              height: "10%",
              width: "20%",
              margin: "auto",
              zIndex: 3,
              marginTop: "3rem",
            }}
          />
          <div style={styles.greenBox}></div>
          {role === "student" ? (
            <img src="learner.png" alt="Image 1" style={styles.RightImage} />
          ) : (
            <img src="Home.png" alt="Image 1" style={styles.leftImage} />
          )}
        </div>
        <ToastContainer />
        <div style={styles.rightSection}>
          <img
            src="d3.png"
            alt="design3"
            style={{ height: "20%", width: "20%", marginTop: "-7rem" }}
          />
          <img
            src="d4.png"
            alt="design3"
            style={{ height: "20%", width: "20%", marginLeft: "24rem" }}
          />
          <div style={styles.formContainer}>
            <div style={styles.paperContainer}>
              <h2 style={styles.heading}>
                {role === "student" ? "Student Online" : "Mentor Online"}
              </h2>
              <h6
                onClick={toggleRole}
                style={{
                  cursor: "pointer",
                  marginBottom: "1rem",
                  textDecoration: "underline",
                }}
              >
                {role === "student"
                  ? "Signup as a tutor"
                  : "Signup as a student"}
              </h6>
              {role === "student" ? (
                <>
                  <form
                    style={styles.formContent}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onSubmit={handleSubmit(onSubmitStudent)}
                  >
                    <input
                      type="text"
                      style={styles.formInput}
                      placeholder="Enter your Name"
                      {...register("name", {
                        required: "This field is required",
                      })}
                      onBlur={(e) => validateName(e.target.value)} // it is not completed, Complete it Bilal
                    />
                    {errors.name && (
                      <p style={{ color: "red" }}>{errors.name.message}</p>
                    )}
                    <input
                      type="text"
                      style={styles.formInput}
                      placeholder="name@gmail.com"
                      {...register("studentemail", {
                        required: "This field is required",
                      })}
                      onBlur={(e) => validateEmailStudent(e.target.value)}
                    />
                    {errors.studentemail && (
                      <p style={{ color: "red" }}>
                        {errors.studentemail.message}
                      </p>
                    )}

                    <input
                      type="password"
                      style={styles.formInput}
                      placeholder="Your Password"
                      {...register("studentpassword", {
                        required: "This field is required",
                      })}
                      onBlur={(e) => validatePasswordStudent(e.target.value)}
                    />
                    {errors.studentpassword && (
                      <p style={{ color: "red" }}>
                        {errors.studentpassword.message}
                      </p>
                    )}

                    <button type="submit" style={styles.submitBtn}>
                      Sign Up as Student
                    </button>
                  </form>
                </>
              ) : (
                <form
                  style={styles.formContent}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    type="text"
                    style={styles.formInput}
                    placeholder="name@gmail.com"
                    {...register("email", {
                      required: "This field is required",
                    })}
                    onBlur={(e) => validateEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p style={{ color: "red" }}>{errors.email.message}</p>
                  )}

                  <input
                    type="password"
                    style={styles.formInput}
                    placeholder="Your Password"
                    {...register("password", {
                      required: "This field is required",
                    })}
                    onBlur={(e) => validatePassword(e.target.value)}
                  />
                  {errors.password && (
                    <p style={{ color: "red" }}>{errors.password.message}</p>
                  )}

                  <button type="submit" style={styles.submitBtn}>
                    Sign Up as Mentor
                  </button>
                </form>
              )}
            </div>
          </div>
          <img
            className="background-image"
            src="logo.png"
            alt="Background Image"
            style={styles.backgroundImage}
          />
          <img
            src="d2.png"
            alt="design3"
            style={{
              height: "20%",
              width: "20%",
              marginTop: "5rem",
              marginLeft: "-2rem",
            }}
          />
          <img
            src="d5.png"
            alt="design3"
            style={{
              height: "20%",
              width: "25%",
              marginTop: "3rem",
              marginLeft: "15rem",
            }}
          />
        </div>
      </div>
    </>
  );
}

SignUpPage.propTypes = {
  role: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
};

export default SignUpPage;
