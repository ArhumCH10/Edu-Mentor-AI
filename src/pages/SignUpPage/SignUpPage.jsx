import NavBar from "../../ui/NavBar";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

function SignUpPage() {
  return (
    <>
      <NavBar currentImageIndex={0} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#4283BB",
          minHeight: "100vh",
          alignItems: "center",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ marginBottom: "-20em" }}>
            <img src="Home.png" alt="Image 1" style={{ width: "45em" }} />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <Container
            maxWidth="sm"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Paper
              elevation={3}
              style={{
                padding: "20px",
                borderRadius: "15px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                paddingRight: "3.5em",
                paddingLeft: "3.5em",
                paddingTop: "2em",
              }}
            >
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                style={{
                  fontWeight: "bold",
                  fontSize: "2.5em",
                  marginBottom: "1em",
                }}
              >
                Mentor Online
              </Typography>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      fullWidth
                      variant="outlined"
                      required
                      InputProps={{
                        style: {
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "15px",
                          border: "none",
                          outline: "none",
                        },
                      }}
                      // Add input props and state handling here
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Password"
                      type="password"
                      fullWidth
                      variant="outlined"
                      required
                      InputProps={{
                        style: {
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "15px",
                          border: "none",
                          outline: "none",
                        },
                      }}
                      // Add input props and state handling here
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{
                    marginTop: "3em",
                    backgroundColor: "#4DFF00",
                    color: "black",
                    fontWeight: "bold",
                    borderRadius: "1em",
                  }}
                >
                  Sign Up with Email
                </Button>
              </form>
            </Paper>
          </Container>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
