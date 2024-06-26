import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import styled, { keyframes } from "styled-components";
import NavBar from "../../ui/NavBar";
import { useSignin } from "./useSignin";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedContainer = styled.div`
  animation: ${fadeIn} 0.6s ease-in-out;
`;

const styles = {
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
    background: "linear-gradient(to bottom, #00ff0a, #009e66)",
    height: "100%",
    width: "60%",
  },
  leftImage: {
    width: "25em",
    zIndex: 3,
    marginLeft: "8rem",
    transform: "scale(1.3)",
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
    width: "fit-content",
  },
  heading: {
    fontWeight: "bold",
    fontSize: "2rem",
    marginLeft: "1rem",
    marginBottom: "0.5rem",
    whiteSpace: "nowrap",
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
    marginBottom: "1em",
    padding: "0.5em",
  },
  submitBtn: {
    marginTop: "1em",
    margin: "auto",
    backgroundColor: "#4DFF00",
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
  forgetBtn: {
    cursor: "pointer",
    marginBottom: "1rem",
    textDecoration: "underline",
    backgroundColor: "transparent",
    borderRadius: "1em",
  },
  backgroundImage: {
    position: "absolute",
    top: 100,
    marginLeft: "-4rem",
    marginTop: "-3rem",
    width: "58%",
    opacity: 0.2,
    zIndex: 1,
  },
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [role, setRole] = useState("tutor");

  const toggleRole = () => {
    setRole(role === "student" ? "tutor" : "student");
  };

  const { mutate } = useSignin();
  const navigate = useNavigate();

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
      clearErrors("email");
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
      clearErrors("password");
    }
  };

  const onSubmit = ({ email, password }) => {
    mutate({ email, password })
      .then(() => {
        reset();
      })
      .catch((error) => {
        console.error("Mutation failed:", error);
      });
  };

  const onSubmitStudent = async ({ studentemail, studentpassword }) => {
    try {
      const response = await axios.post("http://localhost:8080/student/login", {
        email: studentemail,
        password: studentpassword,
      });

      const token = response.data.token;

      localStorage.setItem('token', token);
      document.cookie = `token=${token}; path=/; samesite=strict; secure`;

      if (response.status === 200 && response.data.isVerified === false) {
        toast.error("Verification pending. Please verify your account.");
        setTimeout(() => {
          navigate("/verify");
        }, 3000);
        return;
      }

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem('verified', true);

      toast.success("Login Successfully");
      navigate("/studentdashboard");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid email or password.");
      } else if (error.response && error.response.status === 401) {
        toast.error("User not Registered");
      }
      if (error.response && error.response.status === 300 && error.response.data.isVerified === false) {
        toast.error("Verification pending. Please verify your account.");
        setTimeout(() => {
          navigate("/verify");
        }, 3000);
        return;
      }
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
      document.documentElement.style.overflowY = "auto";
    };
  }, []);

  const forgetHandler = () => {
    navigate("/forget-password");
  };

  return (
    <>
      <NavBar currentImageIndex={0} />
      <AnimatedContainer>
        <div style={styles.mainContainer}>
          <div style={styles.leftSection}>
            <div
              style={{
                marginLeft: "10rem",
                marginTop: "2rem",
                display: "flex",
                flexDirection: "row",
              }}
            ></div>
            <img
              src="d1.png"
              alt="design1"
              style={{
                height: "20%",
                width: "20%",
                margin: "auto",
                zIndex: 3,
                marginTop: "1rem",
              }}
            />
            <div style={styles.greenBox}></div>
            {role === "student" ? (
              <img src="student.png" alt="Image 1" style={styles.leftImage} />
            ) : (
              <img src="mentor.png" alt="Image 1" style={styles.leftImage} />
            )}
          </div>
          <div style={styles.rightSection}>
            <img
              src="d3.png"
              alt="design3"
              style={{ height: "20%", width: "20%", marginTop: "-5rem" }}
            />
            <img
              src="d4.png"
              alt="design3"
              style={{
                height: "20%",
                width: "20%",
                marginTop: "-2rem",
                marginLeft: "24rem",
              }}
            />
            <div style={styles.formContainer}>
              <div style={styles.paperContainer}>
                <h1 style={styles.heading}>
                  {role === "student" ? "Login as Student" : "Login as Mentor"}
                </h1>
                <h6
                  onClick={toggleRole}
                  style={{
                    cursor: "pointer",
                    marginBottom: "1rem",
                    textDecoration: "underline",
                  }}
                >
                  {role === "student" ? "Login as a tutor" : "Login as a student"}
                </h6>
                {role === "student" ? (
                  <>
                    <form
                      style={styles.formContent}
                      onSubmit={handleSubmit(onSubmitStudent)}
                    >
                      <input
                        type="text"
                        style={styles.formInput}
                        placeholder="student@gmail.com"
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
                      <div>
                        <div
                          style={{ display: "inline-block", marginRight: "4em" }}
                        >
                          <button
                            type="submit"
                            style={{
                              ...styles.submitBtn,
                              backgroundColor: isLoginHovered
                                ? "#55c703"
                                : "#4DFF00",
                            }}
                            onMouseEnter={() => setIsLoginHovered(true)}
                            onMouseLeave={() => setIsLoginHovered(false)}
                          >
                            Login as Student
                          </button>
                        </div>
                        <div style={{ display: "inline-block" }}>
                          <a
                            onClick={forgetHandler}
                            style={{
                              ...styles.forgetBtn,
                            }}
                          >
                            Forgot Password ?
                          </a>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  <form
                    style={styles.formContent}
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
                    <div>
                      <div
                        style={{ display: "inline-block", marginRight: "4em" }}
                      >
                        <button
                          type="submit"
                          style={{
                            ...styles.submitBtn,
                            backgroundColor: isLoginHovered
                              ? "#55c703"
                              : "#4DFF00",
                          }}
                          onMouseEnter={() => setIsLoginHovered(true)}
                          onMouseLeave={() => setIsLoginHovered(false)}
                        >
                          Login as Mentor
                        </button>
                      </div>
                      <div style={{ display: "inline-block" }}>
                        <a
                          onClick={forgetHandler}
                          style={{
                            ...styles.forgetBtn,
                          }}
                        >
                          Forgot Password ?
                        </a>
                      </div>
                    </div>
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
                marginTop: "2rem",
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
      </AnimatedContainer>
    </>
  );
}

export default LoginPage;