import { useState, useEffect } from "react";
import {
  addViewsToThread,
  getAllThreads,
  getCategoryName,
} from "../../Resources/functions";
import { getThreadsByUsername } from "../../Resources/functions";
import "./CSS-Files/MyThreads.css";
import { useNavigate } from "react-router-dom";
//
function MyThreads({ user }) {
  const [userThreads, setUserThreads] = useState();
  const navigate = useNavigate();
  //
  useEffect(() => {
    setUserThreads(getThreadsByUsername(user.username));
  }, []);
  //
  const navigateToThread = (thread) => {
    addViewsToThread(thread);
    navigate(`/categories/${thread.categoryID}/${thread.threadID}`);
  };
  //
  return (
    <div>
      {userThreads
        ?.map((thread, i) => {
          return (
            <div
              key={i}
              onClick={() => navigateToThread(thread)}
              className="cont"
            >
              <div className="threadCard">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>Category: {getCategoryName(thread.categoryID)}</div>
                  <div>Title: {thread.threadName}</div>
                  <div>Posted: {thread.time}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>Views: {thread.views}</div>
                  <div>Comments: {thread.comments}</div>
                </div>
              </div>
            </div>
          );
        })
        .reverse()}
    </div>
  );
}
export default MyThreads;
