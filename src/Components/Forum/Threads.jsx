import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import "../../App.css";
import { userPfp } from "../../Resources/functions";

function Threads() {
  const params = useParams();
  const thread = JSON.parse(localStorage.getItem("threads")).find(
    (obj) => obj.threadID === parseInt(params.threadID)
  );
  const comments = JSON.parse(localStorage.getItem("comments"))
    .map((item) => {
      if (item.threadID === parseInt(params.threadID)) return item;
    })
    .filter(function (x) {
      return x !== undefined;
    });
  return (
    <div className="threadsContainer">
      <div className={"threadCards"}>
        <Avatar src={userPfp(thread.author)} />
        {thread.author} |{thread.content}
      </div>
      {comments?.map((comment, i) => {
        return (
          <div key={i} className={"threadCards"}>
            <Avatar src={userPfp(comment.author)} />
            {comment.author} | {comment.comment}
          </div>
        );
      })}
    </div>
  );
}
export default Threads;
