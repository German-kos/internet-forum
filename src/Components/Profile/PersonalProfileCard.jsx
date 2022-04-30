// import "../../App.css";
// import { Avatar } from "@mui/material";
// import { Divider } from "@mui/material";
// function PersonalProfileCard({ user }) {
//   return (
//     <div className="profileContainer">
//       <div className="profileContainerAvatar">
//         <Avatar src={user?.pfp} />
//         <h3>{user?.username}</h3>
//       </div>
//       <Divider />
//       <div style={{ display: "block" }}>
//         <h3>Personal Information:</h3>
//         <p>Username: {user?.username}</p>
//         <p>
//           Name: {user?.fname} {user?.lname}
//         </p>
//         <p>Email: {user?.email}</p>
//       </div>
//     </div>
//   );
// }
// export default PersonalProfileCard;
import "./ProfileCards.css";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import BasicInfo from "./BasicInfo";

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

function PersonalProfileCard({ user }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="personalProfileCard">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="Info" {...a11yProps(0)} />
            <Tab label="My Threads" {...a11yProps(1)} />
            <Tab label="My Comments" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <BasicInfo user={user} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </div>
  );
}
export default PersonalProfileCard;
