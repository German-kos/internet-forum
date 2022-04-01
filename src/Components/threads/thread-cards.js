import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../../App.css";
import axios from "axios";
import { ThreeDRotation } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

function ThreadCard({users}) {
  const [threads, setThreads] = useState([]);
  // const [users, setUsers] = useState([]);
  useEffect(async () => {
    // const usersData = await axios.get("./files/users.json");
    // const recieveData = usersData.data.map((item) => {
    //   delete item.password;
    //   delete item.email;
    //   return item;
    // });
    // console.log(recieveData);
    // setUsers(recieveData);
    console.log(users);
    setThreads([
      {
        threadName: "Test1",
        threadAuthor: users[0],
        views: 0,
        comments: 0,
      },
      {
        threadName: "Test2",
        threadAuthor: users[1],
        views: 0,
        comments: 0,
      },
    ]);
  }, [users]);
  return (
    // <div className="threadCards">
    //   <CardContent></CardContent>
    // </div>
    <>
      <div>
        <div><button onClick={() => console.log(users)}>aaa</button>
        <button onClick={useNavigate("/user/1")}>bbb</button></div>
        {threads.map((thread, i) => {
          return (
            <div key={i} className={"threadCards"}>
              <Avatar src={thread.threadAuthor?.pfp}/> {thread.threadAuthor?.username} | {thread.threadName}
            </div>
          );
        })}
      </div>
    </>
  );
}
export default ThreadCard;
