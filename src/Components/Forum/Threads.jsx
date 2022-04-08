import { Avatar, Divider, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import "../../App.css";
import { userPfp } from "../../Resources/functions";
import CommentField from "./CommentField";
import { useState, useEffect } from "react";
import {
  getThreads,
  getComments,
  getAllComments,
} from "../../Resources/functions";
import ClearIcon from "@mui/icons-material/Clear";

function Threads({ user }) {
  const [thread, setThread] = useState();
  const [allComments, setAllComments] = useState();
  const [comments, setComments] = useState();
  const params = useParams();
  let temp;
  useEffect(() => {
    setThread(getThreads(params));
    setComments(getComments(params));
  }, []);
  useEffect(() => {
    setAllComments(getAllComments());
  }, [temp]);

  const removeComment = (e) => {
    temp = allComments.filter(function (x) {
      return x.commentID !== e.commentID;
    });
    setAllComments(temp);
    console.log(allComments);
    localStorage.setItem("comments", JSON.stringify(allComments));
  };
  return (
    <div className="threadsContainer">
      <div className="commentCard">
        <div className="commentUserInfo">
          <Avatar src={userPfp(thread?.author)} />
          {thread?.author}
        </div>
        <Divider />
        <div className="commentContent">{thread?.content}</div>
      </div>
      {comments?.map((comment, i) => {
        return (
          <div key={i} className={"commentCard"}>
            <div className="commentUserInfo">
              <Avatar src={userPfp(comment.author)} />
              {comment.author}
              {user?.username === comment.author ? (
                <div style={{ flex: 1 }}>
                  <IconButton
                    sx={{ float: "right", color: "gray" }}
                    onClick={() => removeComment(comment)}
                  >
                    <ClearIcon sx={{ opacity: 0.5 }} />
                  </IconButton>
                </div>
              ) : null}
            </div>
            <Divider />
            <div className="commentContent">{comment.comment}</div>
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
