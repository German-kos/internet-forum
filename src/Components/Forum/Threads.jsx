import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import "../../App.css";
import { userPfp } from "../../Resources/functions";
import CommentField from "./CommentField";
import { useState, useEffect } from "react";
import { getThreads, getComments } from "../../Resources/functions";

function Threads({ user }) {
  const [thread, setThread] = useState();
  const [comments, setComments] = useState();
  const params = useParams();
  useEffect(() => {
    setThread(
      // JSON.parse(localStorage.getItem("threads")).find(
      //   (obj) => obj.threadID === parseInt(params.threadID)
      // )
      getThreads(params)
    );
    setComments(getComments(params));
  }, []);
  // const thread = JSON.parse(localStorage.getItem("threads")).find(
  //   (obj) => obj.threadID === parseInt(params.threadID)
  // );
  // const comments = getComments(params);
  // const comments = JSON.parse(localStorage.getItem("comments"))
  //   .map((item) => {
  //     if (item.threadID === parseInt(params.threadID)) return item;
  //   })
  //   .filter(function (x) {
  //     return x !== undefined;
  //   });

  return (
    <div className="threadsContainer">
      <div className={"threadCards"}>
        <Avatar src={userPfp(thread?.author)} />
        {thread?.author} |{thread?.content}
      </div>
      {comments?.map((comment, i) => {
        return (
          <div key={i} className={"threadCards"}>
            <Avatar src={userPfp(comment.author)} />
            {comment.author} | {comment.comment}
          </div>
        );
      })}
      <div>
        {<CommentField user={user} params={params} setComments={setComments} />}
      </div>
    </div>
  );
}
export default Threads;
