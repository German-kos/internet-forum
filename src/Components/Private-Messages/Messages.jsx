import "./CSS-Files/Messages.css";
import { useState } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { tabStyle } from "../Profile/CSS-Files/MuiTabStyle";
import RecievedMessages from "./RecievedMessages";
import SentMessages from "./SentMessages";
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

function Messages({ user }) {
  const [value, setValue] = useState(0);
  //
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="messagesContainer">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            sx={{ fontFamily: "Poppins, sans-serif" }}
            value={value}
            onChange={handleChange}
            centered
          >
            <Tab sx={tabStyle} label="Incoming Messages" {...a11yProps(0)} />
            <Tab sx={tabStyle} label="Sent Messages" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <RecievedMessages user={user} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SentMessages user={user} />
        </TabPanel>
      </Box>
    </div>
  );
}
export default Messages;
