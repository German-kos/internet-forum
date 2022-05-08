import {
  CommentsContext,
  CommentsUpdateContext,
} from "../../Resources/Context-Providers/ThreadContextProvider";
import Swal from "sweetalert2";
import { useContext, useEffect } from "react";
import {
  getCommentsByThreadID,
  getAllComments,
  getAllThreads,
  userPfp,
} from "../../Resources/functions";
import { Divider, Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import EditComment from "./EditComment";
import { Edit } from "@mui/icons-material";
import { toast } from "react-toastify";
//
function ThreadUserComments({ user, handleUserClick, params, page, setPage }) {
  const comments = useContext(CommentsContext);
  const commentsUpdate = useContext(CommentsUpdateContext);
  const postsPerPage = 5;
  const lastPost = page * postsPerPage;
  const firstPost = lastPost - postsPerPage;
  //
  useEffect(() => {
    commentsUpdate(params.threadID);
  }, []);

  const removeComment = (e) => {
    Swal.fire({
      title: "Are you sure you want to remove your comment?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        let temp = getAllComments().filter(function (x) {
          return x.commentID !== e.commentID;
        });
        localStorage.setItem("comments", JSON.stringify(temp));
        // setAllComments(temp);
        commentsUpdate(params.threadID);
        let tempThreads = getAllThreads();
        const threadIndex = tempThreads.findIndex(
          (x) => x.threadID === parseInt(params.threadID)
        );
        tempThreads[threadIndex].comments -= 1;
        localStorage.setItem("threads", JSON.stringify(tempThreads));
        toast.success(`The comment has been removed successfully.`, {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: 0,
        });
        setPage(1);
      }
    });
  };
  //
  //
  return (
    <>
      {comments?.slice(firstPost, lastPost).map((comment, i) => {
        if (comment?.threadID === parseInt(params.threadID)) {
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
                {user?.username.toLowerCase() ===
                  comment.author.toLowerCase() || user?.admin ? (
                  <div style={{ flex: 1 }}>
                    <IconButton
                      sx={{ float: "right", color: "gray" }}
                      onClick={() => removeComment(comment)}
                    >
                      <ClearIcon sx={{ opacity: 0.5 }} />
                    </IconButton>
                    <div>
                      <EditComment comment={comment} />
                    </div>
                  </div>
                ) : null}
              </div>
              <Divider />
              <div className="commentContent">{comment.comment}</div>
              {comment.editted ? (
                <div style={{ color: "gray", fontSize: "small" }}>
                  This comment was editted.
                </div>
              ) : null}
              <Divider />
              <div className="timePosted">Posted: {comment.time}</div>
            </div>
          );
        }
      })}
    </>
  );
}
export default ThreadUserComments;
