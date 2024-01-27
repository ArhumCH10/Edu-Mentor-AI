import { useState, useEffect } from "react";

import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Paper,
} from "@material-ui/core";

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

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
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

  useEffect(() => {
    // Define your backend endpoint to fetch all users
    const backendEndpoint = "http://localhost:8080/admin/get-all-users";

    // Make a GET request to fetch all users
    axios
      .get(backendEndpoint)
      .then((response) => {
        // Update the state with the fetched users
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        // Handle errors if needed
      });
  }, []);

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
          {" "}
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
              {/* {selectedMenuItem === "Dashboard"
                ? "Dashboard"
                : selectedMenuItem} */}
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      {/*
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: "drawerPaper",
        }}
      >
        <div
          className="drawerHeader"
          style={{ marginTop: "20px", width: "200px" }}
        >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            style={{
              marginLeft: "-130px",
            }}
            button
            selected={selectedMenuItem === "Dashboard"}
            onClick={() => handleMenuItemClick("Dashboard")}
          >
            <ListItemIcon>
              <DashboardIcon />
              <p>Dashboard</p>
            </ListItemIcon>
          </ListItem>
          <ListItem
            style={{
              marginLeft: "-130px",
            }}
            button
            selected={selectedMenuItem === "Add Product"}
            onClick={() => handleMenuItemClick("Add Product")}
          >
            <ListItemIcon>
              <PostAddIcon />
              <p>Add Product</p>
            </ListItemIcon>
          </ListItem>
        </List>

        <Divider />
        <List style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <ListItem button key="Log Out" onClick={LogOutHandler}>
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>      
      </Drawer>
      */}
      <main
        className={clsx("content", {
          contentShift: open,
        })}
      >
        <div className="drawerHeader" />
        <Grid container spacing={1}>
          {/* ... (other components) */}

          {/* Section to display user's products */}
          <Grid item xs={12}>
            <div
              style={{
                padding: "1em",
                marginTop: "4em",
              }}
            >
              <Typography variant="h5">Your Products</Typography>
              <TableContainer
                style={{ background: "#F2F3F3", marginTop: "1em" }}
                component={Paper}
              >
                <Table>
                  <ToastContainer />
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontSize: "1em" }}>Name</TableCell>
                      <TableCell style={{ fontSize: "1em" }}>Price</TableCell>
                      <TableCell style={{ fontSize: "1em" }}>
                        Description
                      </TableCell>
                      <TableCell style={{ fontSize: "1em" }}>Images</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>
                          {product.images.map((image, imageIndex) => (
                            <div
                              key={imageIndex}
                              style={{
                                flex: "0 0 calc(35% - 5px)",
                                marginBottom: "10px",
                                border: "2px solid lightgrey",
                                justifyContent: "center",
                                textAlign: "center",
                                padding: "5px",
                                borderRadius: "5px",
                                margin: "3px",
                              }}
                            >
                              <img
                                src={`http://localhost:5555${product.images[0]}`}
                                alt={`Preview ${imageIndex + 1}`}
                                style={{
                                  width: "80%",
                                  maxHeight: "300px",
                                }}
                              />
                            </div>
                          ))}
                        </TableCell>
                        {/* Add actions if needed */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>

          {/* ... (other components) */}
        </Grid>
        {/* {selectedMenuItem === "Dashboard" && <DashboardContent />}
        {selectedMenuItem === "Add Product" && <AddProductForm />} */}

        {/* {selectedMenuItem === "Users" && <UsersView />}
        {selectedMenuItem === "Cars" && <VehicleView />}
        {selectedMenuItem === "Bikes" && <BikesView />}

        {selectedMenuItem === "View Products" && <ProductsView />}
        {selectedMenuItem === "Videos" && <VideosView />}
        {selectedMenuItem === "Orders" && <OrdersView />}

        {selectedMenuItem === "Log Out" && LogOutHandler} */}
      </main>
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
