import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate, Outlet } from "react-router-dom";
import "../../App.css";
import Layout from "./Layout";
import MenuIcon from "@mui/icons-material/Menu";
import { Icon, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ArrowBack, ArrowBackIos } from "@mui/icons-material";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import Greeter from "./greeter";
//
function LayoutTest({ user, setUser, users, children }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const closeDrawer = () => setState({ ...state, left: false });
  const drawerWidth = 240;
  const toggleDrawer = (anchor, open) => (event) => {
    console.log(event);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const navigate = useNavigate();
  const handleHomeClick = (e) => {
    closeDrawer();
    return navigate("/");
  };
  const handleSignIn = () => {
    console.log("handleSignIn");
    return user === undefined ? navigate("/login") : navigate("/");
  };
  const handleSignOut = () => {
    console.log("handleSignOut");
    localStorage.removeItem("currUser");
    if (user !== undefined) {
      setUser(undefined);
      return navigate("/");
    }
  };
  const handleProfileClick = () => {
    closeDrawer();
    console.log("handleProfileClick");
    return user === undefined ? navigate("/login") : navigate("/profile");
  };
  //
  //
  //
  //
  //

  return (
    <>
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={toggleDrawer("left", true)}
              edge="start"
              sx={{ mr: 2, ...{ display: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <Greeter user={user} />
            </Typography>
            <div style={{ float: "right", marginLeft: "auto" }}>
              {user === undefined ? (
                <Button variant="contained" onClick={handleSignIn}>
                  Sign In
                </Button>
              ) : (
                <Button variant="contained" onClick={handleSignOut}>
                  Sign Out
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          <List>
            <ListItem button onClick={toggleDrawer("left", false)}>
              <ArrowBackIosIcon />
            </ListItem>
            <ListItem button onClick={handleHomeClick}>
              Home
            </ListItem>
            <ListItem button onClick={handleProfileClick}>
              Profile
            </ListItem>
          </List>
        </Drawer>
      </div>
      <div style={{ paddingTop: 100 }}>
        <Outlet />
      </div>
    </>
  );
}
export default LayoutTest;