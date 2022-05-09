import { useState, useEffect } from "react";
import {
  addViewsToThread,
  getCategoryByCommentID,
  getCommentsByUsername,
  getCurrentThread,
} from "../../Resources/functions";
import "./CSS-Files/MyThreads.css";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { paginationStyle } from "../Forum/ThreadsListMuiStyle";
//
function MyComments({ user }) {
  const [userComments, setUserComments] = useState();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const postsPerPage = 10;
  const lastPost = page * postsPerPage;
  const firstPost = lastPost - postsPerPage;
  //
  const navigate = useNavigate();
  //
  useEffect(() => {
    setUserComments(getCommentsByUsername(user.username).reverse());
    console.log(getCommentsByUsername(user.username));
  }, []);
  //
  useEffect(() => {
    setPageCount(
      Math.ceil(getCommentsByUsername(user.username).length / postsPerPage)
    );
  }, [userComments]);
  //
  const navigateToThread = (comment) => {
    addViewsToThread(comment);
    navigate(
      `/categories/${getCategoryByCommentID(comment)}/${comment.threadID}`
    );
  };
  //
  const handleChange = (e, value) => {
    setPage(value);
  };
  //
  console.log(userComments);
  return (
    <div>
      {userComments?.length === 0 ? (
        <div className="noCommentsOrThreads">
          No comments have been made by this user.
        </div>
      ) : (
        userComments?.slice(firstPost, lastPost).map((comment, i) => {
          return (
            <div
              key={i}
              onClick={() => navigateToThread(comment)}
              className="cont"
            >
              <div className="threadCard">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <div className="embolden">Comment:</div> {comment.comment}
                  </div>
                  <div>
                    <div className="embolden">Thread:</div>
                    {getCurrentThread(comment.threadID).threadName}
                  </div>
                  <div>
                    <div className="embolden">Posted:</div>
                    {comment.time}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}></div>
              </div>
            </div>
          );
        })
      )}
      {userComments?.length === 0 ? null : (
        <Pagination
          sx={paginationStyle}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={handleChange}
          count={pageCount}
        />
      )}
    </div>
  );
}
export default MyComments;
