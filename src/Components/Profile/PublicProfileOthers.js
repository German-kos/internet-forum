import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import Loading from "../../Resources/Loading";
function PublicProfileOthers() {
  const params = useParams();
  const usersList = JSON.parse(localStorage.getItem("usersList"));
  const currUser = usersList.find(
    (obj) => obj.userID.toString() === params.userID
  );

  return currUser !== undefined ? (
    <div>
      <pre>
        {currUser.fname}
        {currUser.lname}
        <Avatar src={currUser.pfp} />
      </pre>
    </div>
  ) : (
    <Loading />
  );
}
export default PublicProfileOthers;
