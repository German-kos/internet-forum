import React, { useEffect, useState, useRef } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { Avatar, Button, createTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../../App.css";
import { color } from "@mui/system";
import NewThread from "./NewThread";

//
//
function ThreadsList({ user }) {
  const params = useParams();
  const navigate = useNavigate();
  const threads = JSON.parse(localStorage.getItem("threads"))
    .map((item) => {
      if (item.categoryID === parseInt(params.categoryID)) return item;
    })
    .filter(function (x) {
      return x !== undefined;
    });
  //
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //
  const userPfp = (user) => {
    return JSON.parse(localStorage.getItem("usersList")).find(
      (obj) => obj.username.toLowerCase() === user.toLowerCase()
    ).pfp;
  };
  const handleClick = (e, thrd) => {
    console.log(thrd);
    return navigate(`/categories/${params.categoryID}/${thrd.threadID}`);
  };
  // const handleNewThread = () => {
  //   return <NewThread user={user} />;
  // };
  return (
    <>
      <NewThread
        user={user}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
      />
      <div>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          style={{
            backgroundColor: "#6d6d6d",
            color: "white",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 2.5px 7.5px",
          }}
        >
          <AddIcon />
          {"New Thread"}
        </Button>
      </div>
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
    </>
  );
}
export default ThreadsList;
