import { TextField } from "@mui/material";
import {
  getAllComments,
  getAllThreads,
  getComments,
  calcCommentPageCount,
} from "../../Resources/functions";
import "../../App.css";
function CommentField({
  user,
  params,
  setComments,
  setAllComments,
  page,
  setPage,
  pageCount,
  postsPerPage,
}) {
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
      comments.push({
        threadID: parseInt(params.threadID),
        commentID: comments[comments.length - 1].commentID + 1,
        author: user.username,
        comment: e.target[0].value,
        time: new Intl.DateTimeFormat("en-GB", options).format(date),
      });
      localStorage.setItem("comments", JSON.stringify(comments));
      setAllComments(comments);
      e.target[0].value = "";
      let tempThreads = getAllThreads();
      const threadIndex = tempThreads.findIndex(
        (x) => x.threadID === parseInt(params.threadID)
      );
      tempThreads[threadIndex].comments += 1;
      localStorage.setItem("threads", JSON.stringify(tempThreads));
      setComments(getComments(params));
      if (calcCommentPageCount() > pageCount) setPage(calcCommentPageCount());
      else if (page !== calcCommentPageCount) setPage(calcCommentPageCount());
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
