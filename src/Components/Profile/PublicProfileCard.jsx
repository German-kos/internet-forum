import "./CSS-Files/ProfileCards.css";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import BasicInfo from "./BasicInfo";
import MyThreads from "./MyThreads";
import MyComments from "./MyComments";
import { tabStyle } from "./CSS-Files/MuiTabStyle";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserByID } from "../../Resources/functions";
//
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function PublicProfileCard({ loggedUser }) {
  const [user, setUser] = useState();
  const [value, setValue] = React.useState(0);
  const params = useParams();
  const navigate = useNavigate();
  //
  useEffect(() => {
    parseInt(loggedUser?.userID) === parseInt(params.userID)
      ? navigate("/profile")
      : setUser(getUserByID(params.userID));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="personalProfileCard">
      <Box sx={{ width: "100%" }}>
        <Box sx={tabStyle}>
          <Tabs
            sx={{ fontFamily: "Poppins, sans-serif" }}
            value={value}
            onChange={handleChange}
            centered
          >
            <Tab sx={tabStyle} label="Info" {...a11yProps(0)} />
            <Tab sx={tabStyle} label="Threads" {...a11yProps(1)} />
            <Tab sx={tabStyle} label="Comments" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <BasicInfo user={user} loggedUser={loggedUser} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MyThreads user={user} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MyComments user={user} />
        </TabPanel>
      </Box>
    </div>
  );
}
export default PublicProfileCard;
