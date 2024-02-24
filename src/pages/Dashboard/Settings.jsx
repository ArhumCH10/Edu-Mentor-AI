import { useState } from "react";
import Header from "./header";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Settings() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div>
        <Header />
        <div
          className={classes.root}
          style={{
            marginTop: "1.5em",
            padding: "5px 0",
            borderRadius: "1em",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab
              style={{ fontWeight: "bold" }}
              label="Account"
              {...a11yProps(0)}
            />
            <Tab
              style={{ fontWeight: "bold" }}
              label="Security"
              {...a11yProps(1)}
            />
            {/* <Tab label="Item Three" {...a11yProps(2)} />
            <Tab label="Item Four" {...a11yProps(3)} />
            <Tab label="Item Five" {...a11yProps(4)} />
            <Tab label="Item Six" {...a11yProps(5)} />
            <Tab label="Item Seven" {...a11yProps(6)} /> */}
          </Tabs>
          <TabPanel value={value} index={0}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: "1em 2em",
              }}
            >
              <div style={{ flex: 1, marginRight: "25px" }}>
                <div style={{ marginBottom: "25px" }}>Name</div>
                <div style={{ marginBottom: "25px" }}>Email</div>
                <div style={{ marginBottom: "25px" }}>Online Status</div>
                <div style={{ marginBottom: "25px" }}>Account Deactivation</div>
                <div style={{ marginBottom: "25px", marginTop: "9em" }}>
                  Im Leaving Because
                </div>
              </div>
              <div style={{ flex: 2, marginLeft: "25px" }}>
                <div style={{ marginBottom: "25px" }}>
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    value="Ghous Ali"
                  />
                </div>
                <div style={{ marginBottom: "25px" }}>
                  <input type="email" value="Ghous@gmail.com" disabled />
                </div>
                <div style={{ marginBottom: "25px" }}>
                  <select>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                <div>
                  <p style={{ fontWeight: "bold", color: "grey" }}>
                    What happens when you deactivate your account?{" "}
                  </p>
                  <p>
                    • Your profile and Gigs wont be shown on Fiverr anymore.
                  </p>
                  <p>• Active orders will be cancelled. </p>
                  <p>• You wont be able to re-activate your Gigs.</p>
                </div>
                <div style={{ marginBottom: "25px" }}>
                  <textarea
                    rows="4"
                    cols="50"
                    placeholder="Enter reason for deactivation"
                  ></textarea>
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: "25px",
                display: "inline-block",
              }}
            >
              <button
                className="btn"
                style={{
                  background: "#22F550",
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginBottom: "4em",
                }}
              >
                Save Changes
              </button>
            </div>
            <div
              style={{
                marginTop: "25px",
                display: "inline-block",
                marginLeft: "10px",
              }}
            >
              <button
                className="btn"
                style={{
                  background: "#F50057",
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginBottom: "4em",
                }}
              >
                Deactivate Account
              </button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: "1em 2em",
              }}
            >
              <div style={{ flex: 1, marginRight: "25px" }}>
                <div style={{ marginBottom: "25px" }}>Current Password</div>
                <div style={{ marginBottom: "25px" }}>New Password</div>
                <div style={{ marginBottom: "25px" }}>Confirm New Password</div>
              </div>
              <div style={{ flex: 2, marginLeft: "25px" }}>
                <div style={{ marginBottom: "25px" }}>
                  <input type="text" placeholder="Old Password" />
                </div>
                <div style={{ marginBottom: "25px" }}>
                  <input type="text" placeholder="New Password" />
                </div>
                <div style={{ marginBottom: "25px" }}>
                  <input type="text" placeholder="Confirm Password" />
                </div>
              </div>
            </div>
            <div>
              <button
                className="btn"
                style={{
                  background: "#22F550",
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginBottom: "4em",
                }}
              >
                Save Changes
              </button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
          <TabPanel value={value} index={4}>
            Item Five
          </TabPanel>
          <TabPanel value={value} index={5}>
            Item Six
          </TabPanel>
          <TabPanel value={value} index={6}>
            Item Seven
          </TabPanel>
        </div>
      </div>
    </>
  );
}
