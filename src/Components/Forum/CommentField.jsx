import { TextField } from "@mui/material";
import {
  getAllComments,
  getAllThreads,
  getComments,
} from "../../Resources/functions";
import "../../App.css";
import { CommentsUpdateContext } from "../../Resources/Context-Providers/ThreadContextProvider";
import { useContext } from "react";
import { toast } from "react-toastify";
//
function CommentField({
  user,
  params,
  page,
  setPage,
  pageCount,
  postsPerPage,
}) {
  const commentsUpdate = useContext(CommentsUpdateContext);
  const calcCommentPageCount = () => {
    return Math.ceil(getComments(params).length / postsPerPage);
  };

  let comments = getAllComments();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value.trim().length > 0) {
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
        timeZone: "Israel",
      };
      const date = new Date();
      if (comments.length >= 1) {
        comments.push({
          threadID: parseInt(params.threadID),
          commentID: comments[comments.length - 1].commentID + 1,
          author: user.username,
          comment: e.target[0].value,
          time: new Intl.DateTimeFormat("en-GB", options).format(date),
          editted: false,
        });
      } else {
        comments.push({
          threadID: parseInt(params.threadID),
          commentID: 1,
          author: user.username,
          comment: e.target[0].value,
          time: new Intl.DateTimeFormat("en-GB", options).format(date),
          editted: false,
        });
      }
      localStorage.setItem("comments", JSON.stringify(comments));
      e.target[0].value = "";
      let tempThreads = getAllThreads();
      const threadIndex = tempThreads.findIndex(
        (x) => x.threadID === parseInt(params.threadID)
      );
      tempThreads[threadIndex].comments += 1;
      localStorage.setItem("threads", JSON.stringify(tempThreads));
      commentsUpdate(params.threadID);
      if (calcCommentPageCount() > pageCount) setPage(calcCommentPageCount());
      else if (page !== calcCommentPageCount) setPage(calcCommentPageCount());
      toast.success(`Comment has been posted successfuly.`, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: 0,
      });
    }
  };
  const validateLines = (e) => {
    if (e.target.value?.match(/\n/g)?.length > 8 && e.key === "Enter") {
      e.preventDefault();
      return false;
    }
  };
  if (user !== undefined) {
    return (
      <div className="commentField">
        <form onSubmit={handleSubmit}>
          <TextField
            className="textField"
            multiline
            rows={5}
            inputProps={{ maxLength: 200 }}
            onKeyPress={validateLines}
            required
          />
          <div style={{ float: "right", paddingTop: 5, paddingRight: 3 }}>
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    );
  }
  return <div>log in to comment</div>;
}
export default CommentField;
