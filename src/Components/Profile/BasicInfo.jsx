import "./CSS-Files/ProfileCards.css";
import { Avatar, Box } from "@mui/material";
import {
  isBanned,
  numberOfComments,
  numberOfThreads,
} from "../../Resources/functions";

function BasicInfo({ user }) {
  const isUserDefined = () => {
    return user !== undefined;
  };
  return (
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
      <div className="information">
        <h2 style={{ margin: "8px 0px 16px 0px" }}>Information:</h2>
        <div className="infoRows">
          <p className="infoTag">Position:</p>
          <p className="infoContent">
            {user?.admin ? "Administrator" : "Regular User"}
          </p>
        </div>
        <div className="infoRows">
          <p className="infoTag">Email Address:</p>
          <p className="infoContent">{user?.email}</p>
        </div>
        <div className="infoRows">
          <p className="infoTag">Threads Created:</p>
          <p className="infoContent">
            {isUserDefined() ? numberOfThreads(user.username) : 0}
          </p>
        </div>
        <div className="infoRows">
          <p className="infoTag">Comments Made:</p>
          <p className="infoContent">
            {isUserDefined() ? numberOfComments(user.username) : 0}
          </p>
        </div>
        <div className="infoRows">
          <p className="infoTag">Account Status:</p>
          <p className="infoContent">
            {isUserDefined()
              ? isBanned(user.userID)
                ? "Suspended"
                : "Active"
              : null}
          </p>
        </div>
      </div>
    </Box>
  );
}
export default BasicInfo;
