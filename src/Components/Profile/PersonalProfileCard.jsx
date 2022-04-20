import "../../App.css";
import { Avatar } from "@mui/material";
import { Divider } from "@mui/material";
function PersonalProfileCard({ user }) {
  return (
    <div className="profileContainer">
      <div className="profileContainerAvatar">
        <Avatar src={user?.pfp} />
        <h3>{user?.username}</h3>
      </div>
      <Divider />
      <div style={{ display: "block" }}>
        <h3>Personal Information:</h3>
        <p>Username: {user?.username}</p>
        <p>
          Name: {user?.fname} {user?.lname}
        </p>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
}
export default PersonalProfileCard;
