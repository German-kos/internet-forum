import { TextField } from "@mui/material";
import { getAllComments, getComments } from "../../Resources/functions";
import "../../App.css";
function CommentField({ user, params, setComments }) {
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
      setComments(getComments(params));
      e.target[0].value = "";
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
            rows={10}
            inputProps={{ maxLength: 200 }}
            onKeyPress={(e) =>
              e.target.value.match(/\n/) > 10 &&
              e.key === "Enter" &&
              e.preventDefault()
            }
          />
          {/* <textarea
          /> */}
          <button type="submit">Post</button>
        </form>
      </div>
    );
  }
  return <div>log in to comment</div>;
}
export default CommentField;
