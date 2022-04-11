import { TextField } from "@mui/material";
import { getAllComments, getComments } from "../../Resources/functions";
import "../../App.css";
function CommentField({ user, params, setComments, setAllComments }) {
  let comments = getAllComments();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value.trim().length > 0) {
      comments.push({
        threadID: parseInt(params.threadID),
        commentID: comments[comments.length - 1].commentID + 1,
        author: user.username,
        comment: e.target[0].value,
      });
      console.log(comments);
      //   window.location.reload();
      localStorage.setItem("comments", JSON.stringify(comments));
      setAllComments(comments);
      setComments(getComments(params));
      e.target[0].value = "";
    }
  };
  const validateLines = (e) => {
    if (e.target.value?.match(/\n/g)?.length > 10 && e.key === "Enter") {
      e.preventDefault();
      return false;
    }
  };
  //   const currUser = JSON.parse(localStorage.getItem("currUser"));
  if (user !== undefined) {
    return (
      <div className="commentField">
        <form onSubmit={handleSubmit}>
          <TextField
            className="textField"
            multiline
            rows={5}
            inputProps={{ maxLength: 200 }}
            onKeyPress={
              validateLines
              // (e) =>
              // console.log(e.target.value.match(/\n/g).length) &&
              // e.target.value?.match(/\n/g).length > 10 &&
              // e.key === "Enter" &&
              // e.preventDefault() &&
              // false
            }
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
