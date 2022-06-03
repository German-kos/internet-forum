import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useNavigate, Outlet } from "react-router-dom";
import "../../App.css";
import MenuIcon from "@mui/icons-material/Menu";
import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  CardMedia,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Greeter from "./Greeter";
import SearchBar from "../Forum/SearchBar";
import { useContext } from "react";
import { ThreadContextProvider } from "../../Resources/Context-Providers/ThreadContextProvider";
import "./Layout.css";
import { createTheme } from "@mui/system";
import { ThemeProvider } from "styled-components";
import { buttonStyle } from "./LayoutMuiStyle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PersonIcon from "@mui/icons-material/Person";
import { listStyle } from "./LayoutMuiStyle";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import Footer from "./Footer";
import GavelIcon from "@mui/icons-material/Gavel";
import { Gavel } from "@mui/icons-material";
//
const theme = createTheme({
  components: {
    Button: {
      variants: [
        {
          props: {
            variant: "signButton",
          },
          style: {
            backgroundColor: "#797EAB",
          },
        },
      ],
    },
  },
});
//
function Layout({ user, setUser, users, children }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const closeDrawer = () => setState({ ...state, left: false });
  const drawerWidth = 240;
  const toggleDrawer = (anchor, open) => (event) => {
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
    return user === undefined ? navigate("/login") : navigate("/");
  };
  const handleSignOut = () => {
    localStorage.removeItem("currUser");
    if (user !== undefined) {
      setUser(undefined);
      return navigate("/");
    }
  };
  //
  const handleProfileClick = () => {
    closeDrawer();
    return user === undefined ? navigate("/login") : navigate("/profile");
  };
  //
  const handleUsersListClick = () => {
    closeDrawer();
    return navigate("/userslist");
  };
  //
  const handleMsgClick = () => {
    closeDrawer();
    return navigate("/pms");
  };
  //
  const handleGuidelinesClick = () => {
    closeDrawer();
    return navigate("/guidelines");
  };
  return (
    <>
      <ThreadContextProvider>
        <ThemeProvider theme={theme}>
          <div
            style={{
              // verticalAlign: "middle",
              display: "flex",
              flexDirection: "row",
              // alignItems: "center",
              // alignContent: "center",
              // alignItems: "center",
              // justifyContent: "center",
              margin: "0px",
              padding: "0px",
            }}
          >
            <AppBar
              sx={{
                // verticalAlign: "middle",
                // alignSelf: "center",
                backgroundColor: "#53598d",
                display: "flex",
                justifyContent: "space-between",
              }}
              position="fixed"
            >
              <Toolbar sx={{ justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <IconButton
                    color="inherit"
                    aria-label="Menu"
                    onClick={toggleDrawer("left", true)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <img src={"./files/Images/asdf.png"} />
                  {/* <CardMedia
                    component="img"
                    height="140"
                    image={"./files/Images/asdf.png"}
                  /> */}
                </div>
                <IconButton
                  color="inherit"
                  aria-label="Menu"
                  onClick={toggleDrawer("left", true)}
                  edge="start"
                  sx={{ mr: 2, ...{ display: "none" } }}
                >
                  <MenuIcon />
                </IconButton>

                <div>
                  <SearchBar />
                </div>
                <div
                  style={{ display: "flex", flexDireciton: "row", gap: "8px" }}
                  //  style={{ float: "right", marginLeft: "auto" }}
                >
                  <Greeter user={user} />
                  {user === undefined ? (
                    <Button
                      sx={buttonStyle}
                      variant="contained"
                      onClick={handleSignIn}
                    >
                      Sign In
                    </Button>
                  ) : (
                    <Button
                      sx={buttonStyle}
                      variant="contained"
                      onClick={handleSignOut}
                    >
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
                  backgroundColor: "#DBDEFA",
                },
              }}
              anchor="left"
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
            >
              <List sx={listStyle}>
                <ListItem button onClick={toggleDrawer("left", false)}>
                  <ArrowBackIosIcon />
                </ListItem>
                <Divider />
                <ListItem button onClick={handleHomeClick}>
                  <HomeIcon sx={{ marginRight: "4px" }} />
                  Home
                </ListItem>
                <Divider />
                <ListItem button onClick={handleProfileClick}>
                  <PersonIcon sx={{ marginRight: "4px" }} />
                  Profile
                </ListItem>
                <Divider />
                <ListItem button onClick={handleMsgClick}>
                  <MailIcon sx={{ marginRight: "4px" }} />
                  Messages
                </ListItem>
                <Divider />
                <ListItem button onClick={handleGuidelinesClick}>
                  <Gavel sx={{ marginRight: "4px" }} />
                  Guidelines
                </ListItem>
                {user?.admin ? (
                  <>
                    <Divider />
                    <ListItem button onClick={handleUsersListClick}>
                      <FormatListBulletedIcon sx={{ marginRight: "4px" }} />
                      Users List
                    </ListItem>
                  </>
                ) : null}
              </List>
            </Drawer>
          </div>
          <div className="layoutBody">
            <Outlet />
          </div>
        </ThemeProvider>
      </ThreadContextProvider>
      <Footer />
    </>
  );
}
export default Layout;
