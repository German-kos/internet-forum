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
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserID } from "../../Resources/functions";
function Threads({ user }) {
  const [thread, setThread] = useState();
  const [allComments, setAllComments] = useState();
  const [comments, setComments] = useState();
  const params = useParams();
  const navigate = useNavigate();
  // let temp;
  useEffect(() => {
    setThread(getThreads(params));
    setComments(getComments(params));
    setAllComments(getAllComments());
  }, []);
  useEffect(() => {
    setComments(getComments(params));
  }, [allComments]);
  const handleUserClick = (e) => {
    const id = getUserID(e);
    console.log(id);
    return navigate(`/user/${id}`);
  };
  const removeComment = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(e);
        let temp = allComments.filter(function (x) {
          return x.commentID !== e.commentID;
        });
        console.log(allComments);
        localStorage.setItem("comments", JSON.stringify(temp));
        setAllComments(temp);
      }
    });
  };
  return (
    <div className="threadsContainer">
      <div className="commentCard">
        <div className="commentUserInfo">
          <Avatar src={userPfp(thread?.author)} />
          <div
            className="commentAuthor"
            onClick={() => handleUserClick(thread.author)}
          >
            {thread?.author}
          </div>
        </div>
        <Divider />
        <div className="commentContent">{thread?.content}</div>
      </div>
      {comments?.map((comment, i) => {
        return (
          <div key={i} className={"commentCard"}>
            <div className="commentUserInfo">
              <Avatar src={userPfp(comment.author)} />
              <div
                className="commentAuthor"
                onClick={() => handleUserClick(comment.author)}
              >
                {comment.author}
              </div>
              {user?.username.toLowerCase() === comment.author.toLowerCase() ? (
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
        {
          <CommentField
            user={user}
            params={params}
            setComments={setComments}
            setAllComments={setAllComments}
          />
        }
      </div>
    </div>
  );
}
export default Threads;
