//imports
import { useState, useEffect } from "react";
import NavBar from "../../ui/NavBar";

//material-ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, CircularProgress } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { DoneOutline } from "@mui/icons-material";

//toastify
import { ToastContainer, toast } from "react-toastify";

//axios
import axios from "axios";

function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [showVerificationCard, setShowVerificationCard] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationDone, setVerificationDone] = useState(false);
  const [isVerificationCodeCorrect, setIsVerificationCodeCorrect] =
    useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setValidEmail(emailPattern.test(enteredEmail));
  };

  const handleSubmit = async () => {
    if (validEmail) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/resetPassword",
          {
            email: email,
          }
        );

        if (response.status === 200) {
          toast.success("Verification Code Sent!");

          setTimeout(() => {
            setLoading(false);
            setShowVerificationCard(true);
          }, 2000);
        } else {
          if (response.status === 400) {
            toast.error("Invalid email");
          } else {
            toast.error(response.data.error);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("Sending verification email error: " + error);
        toast.error(error.response.data.error);
        setLoading(false);
      }
    } else {
      console.log("Invalid email format");
    }
  };

  const handleVerificationSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/validateResetPassword",
        {
          email: email,
          verificationCode: verificationCode,
        }
      );

      if (response.status === 200) {
        toast.success("Verification successful");
        setIsVerificationCodeCorrect(true);
        setVerificationDone(true);
      } else {
        if (response.status === 400) {
          toast.error("Invalid email or verification code");
        } else {
          toast.error("Failed to validate verification code");
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Verification error: " + error);
      toast.error("Failed to validate verification code");
      setLoading(false);
    }
  };

  const handlePasswordResetSubmit = async () => {
    if (newPassword.length < 8) {
      setPasswordErrors(["Password must be at least 8 characters long"]);
      return;
    }

    if (!/[A-Z]/.test(newPassword)) {
      setPasswordErrors(["Password must contain at least one capital letter"]);
      return;
    }

    if (!/[@$!%*#?&]/.test(newPassword)) {
      setPasswordErrors([
        "Password must contain at least one special character",
      ]);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/finalResetPassword",
        {
          email: email,
          newPassword: newPassword,
        }
      );

      if (response.status === 200) {
        toast.success("Password Updated");
        setPasswordUpdated(true);
        setPasswordErrors([""]);
      } else {
        toast.error("Failed to validate verification code");

        setLoading(false);
      }
    } catch (error) {
      console.error("Verification error: " + error);
      toast.error("Failed to updated password");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (verificationDone) {
      setTimeout(() => {
        setShowVerificationCard(false);
      }, 1000);
    }
  }, [verificationDone]);

  return (
    <>
      <div>
        <NavBar currentImageIndex={0} />
        {showVerificationCard ? (
          <Card
            sx={{
              maxWidth: 585,
              margin: "0 auto",
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1em 10em",
            }}
          >
            <CardMedia
              component="img"
              alt="Verification Code"
              height="250"
              image="https://img.freepik.com/free-vector/enter-otp-concept-illustration_114360-7887.jpg?w=740&t=st=1696877399~exp=1696877999~hmac=3b95b36105acc0448153bd120be5fd6bfb8b2c3228b7be90e31ab060a02e6fb2"
            />
            <CardContent>
              <Typography
                style={{
                  marginTop: "0.5em",
                  marginBottom: "0.9em",
                  fontSize: "1em",
                  fontWeight: "bold",
                }}
                color="text.secondary"
              >
                WORRY NOT, WE HAVE GOT YOU COVERED
              </Typography>
              <TextField
                label="Enter 6-digit code, sent to your email"
                variant="outlined"
                fullWidth
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                inputProps={{ maxLength: 6 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleVerificationSubmit}
                style={{ marginTop: "10px", outline: "none" }}
                disabled={loading || verificationCode.length !== 6}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : verificationDone ? (
                  <CheckCircleOutlineIcon />
                ) : (
                  "Submit"
                )}
              </Button>
            </CardContent>
          </Card>
        ) : isVerificationCodeCorrect ? (
          <Card
            sx={{
              maxWidth: 585,
              margin: "0 auto",
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1em 10em",
            }}
          >
            <CardMedia
              component="img"
              alt="Password Reset"
              height="250"
              image="https://img.freepik.com/free-vector/access-control-system-illustration_335657-4640.jpg?w=740&t=st=1696924452~exp=1696925052~hmac=1d985de52e673f2004e794d45b292438a6a5b4f9093d64325bd59aaf88d2f3ea"
            />
            <CardContent>
              {!passwordUpdated && (
                <>
                  <Typography
                    style={{
                      marginTop: "0.5em",
                      marginBottom: "0.9em",
                      fontSize: "0.8em",
                    }}
                    color="text.secondary"
                  >
                    RESET YOUR PASSWORD - 8 characters, 1 Special, 1 Capital
                    Letter
                  </Typography>
                  <TextField
                    style={{ marginBottom: "1em" }}
                    label="New Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <TextField
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </>
              )}
              <div style={{ color: "red" }}>
                {passwordErrors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
              {passwordUpdated ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handlePasswordResetSubmit}
                    style={{ marginTop: "10px", outline: "none" }}
                    disabled
                  >
                    <DoneOutline />
                  </Button>
                  <Typography
                    style={{
                      marginTop: "0.5em",
                      marginBottom: "0.9em",
                      fontSize: "0.8em",
                    }}
                    color="text.secondary"
                  >
                    Sign in to your account using the recently updated password.
                  </Typography>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handlePasswordResetSubmit}
                  style={{ marginTop: "10px", outline: "none" }}
                  disabled={newPassword !== confirmPassword}
                >
                  Submit
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card
            sx={{
              maxWidth: 585,
              margin: "0 auto",
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1em 10em",
            }}
          >
            <ToastContainer />
            <CardMedia
              component="img"
              alt="No Worries, We Got You"
              height="250"
              image="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg?w=740&t=st=1696876416~exp=1696877016~hmac=1e117efa9ba9eca9fa6bb5496d34da7204d09a08d11dee941ffe7e75cbfa49ae"
            />
            <CardContent>
              <Typography
                style={{
                  marginTop: "0.8em",
                  marginBottom: "0.9em",
                  fontSize: "0.7em",
                  fontWeight: "bold",
                }}
                color="text.secondary"
              >
                WORRY NOT, WE HAVE GOT YOU COVERED
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                disabled={loading || !validEmail}
                style={{ marginTop: "10px", outline: "none" }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Submit"
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}

export default ForgetPasswordPage;
