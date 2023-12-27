import NavBar from "../../ui/NavBar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SignUpPage() {
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

  // Form submission handler
  const onSubmit = ({ email, password }) => {
    mutate({ email, password })
      .then(
        (data) => {
          reset();
          if (data && data.redirectUrl) {
            toast.success("Email Verified Successfully");
            navigate(data.redirectUrl, { replace: true });
          }
        },
        (error) => {
          console.error(error);
        }
      )
      .finally(() => {
        reset();
      });
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
      marginBottom: "1em",
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
            Start Earning Money On{" "}
          </h3>
          <h3 style={{ color: "white", zIndex: 2, margin: "auto" }}>
            Your Schedule
          </h3>
          <img
            src="d1.png"
            alt="design1"
            style={{
              height: "20%",
              width: "20%",
              margin: "auto",
              zIndex: 3,
              marginTop: "3rem",
            }}
          />
          <div style={styles.greenBox}></div>
          <img src="Home.png" alt="Image 1" style={styles.leftImage} />
        </div>
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
              <h2 style={styles.heading}>Mentor Online</h2>
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
                  Sign Up with Email
                </button>
              </form>
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

export default SignUpPage;
