import { React, useEffect, usestate } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { Avatar } from "@mui/material";
import "../../App.css";
//
function ThreadsList() {
  const params = useParams();
  const navigate = useNavigate();
  const threads = JSON.parse(localStorage.getItem("threads"))
    .map((item) => {
      if (item.categoryID === parseInt(params.categoryID)) return item;
    })
    .filter(function (x) {
      return x !== undefined;
    });

  const userPfp = (user) => {
    return JSON.parse(localStorage.getItem("usersList")).find(
      (obj) => obj.username.toLowerCase() === user.toLowerCase()
    ).pfp;
  };
  const handleClick = (e, thrd) => {
    console.log(thrd);
    return navigate(`/categories/${params.categoryID}/${thrd.threadID}`);
    return navigate(`/categories/1/1`);
  };
  return (
    <div className="threadsContainer">
      {threads?.map((thrd, i) => {
        return (
          <div
            key={i}
            className={"threadCards"}
            onClick={() => handleClick(this, thrd)}
          >
            <Avatar src={userPfp(thrd.author)} /> {thrd.author} |
            {thrd.threadName}
          </div>
        );
      })}
    </div>
  );
}
export default ThreadsList;
