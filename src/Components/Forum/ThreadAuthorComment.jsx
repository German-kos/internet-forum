import "../../App.css";
import { useContext, useEffect } from "react";
import {
  ThreadContext,
  ThreadUpdateContext,
} from "../../Resources/Context-Providers/ThreadContextProvider";
import { userPfp } from "../../Resources/functions";
import { Divider, Avatar } from "@mui/material";
//
function ThreadAuthorComment({ page, handleUserClick, params }) {
  const thread = useContext(ThreadContext);
  const threadUpdate = useContext(ThreadUpdateContext);
  useEffect(() => {
    threadUpdate(params.threadID);
  }, []);
  return (
    <>
      {page === 1 ? (
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
          <Divider />
          <div className="timePosted">Posted: {thread?.time}</div>
        </div>
      ) : null}
    </>
  );
}
export default ThreadAuthorComment;
