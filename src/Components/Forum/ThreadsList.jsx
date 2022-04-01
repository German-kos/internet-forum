import { React, useEffect, usestate } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import { Avatar } from "@mui/material";
import "../../App.css";
//
function ThreadsList() {
  const params = useParams();
  const threads = JSON.parse(localStorage.getItem("threads"))
    .map((item) => {
      if (item.categoryID === params.categoryID) return item;
    })
    .filter(function (x) {
      return x !== undefined;
    });

  const userPfp = (user) => {
    return JSON.parse(localStorage.getItem("usersList")).find(
      (obj) => obj.username.toLowerCase() === user.toLowerCase()
    ).pfp;
  };

  return (
    <div className="threadsContainer">
      {threads?.map((thrd, i) => {
        return (
          <div key={i} className={"threadCards"}>
            <Avatar src={userPfp(thrd.author)} /> {thrd.author} |
            {thrd.threadName} | {thrd.content}
          </div>
        );
      })}
    </div>
  );
}
export default ThreadsList;
