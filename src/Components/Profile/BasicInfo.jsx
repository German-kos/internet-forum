import "./ProfileCards.css";
import { Avatar, Box } from "@mui/material";
import { ClassNames } from "@emotion/react";

function BasicInfo({ user }) {
  return (
    // <p className="basicInfo">
    //   <Avatar src={user?.pfp} />
    // </p>
    <Box>
      <div className="basicInfo">
        <Avatar sx={{ width: "150px", height: "150px" }} src={user?.pfp} />
        <div className="basicInfoText">
          <div className="basicInfoUsername">{user?.username}</div>
          <div className="basicInfoFullname">
            {user?.fname} {user?.lname}
          </div>
        </div>
      </div>
    </Box>
  );
}
export default BasicInfo;
