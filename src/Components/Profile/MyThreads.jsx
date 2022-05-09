import { useState, useEffect } from "react";
import { addViewsToThread, getCategoryName } from "../../Resources/functions";
import { getThreadsByUsername } from "../../Resources/functions";
import "./CSS-Files/MyThreads.css";
import { useNavigate } from "react-router-dom";
import { paginationStyle } from "../Forum/ThreadsListMuiStyle";
import { Pagination } from "@mui/material";
//
function MyThreads({ user }) {
  const [userThreads, setUserThreads] = useState();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const postsPerPage = 10;
  const lastPost = page * postsPerPage;
  const firstPost = lastPost - postsPerPage;
  //
  const navigate = useNavigate();
  //
  useEffect(() => {
    setUserThreads(getThreadsByUsername(user.username).reverse());
  }, []);
  //
  useEffect(() => {
    setPageCount(
      Math.ceil(getThreadsByUsername(user.username).length / postsPerPage)
    );
  }, [userThreads]);
  //
  const navigateToThread = (thread) => {
    addViewsToThread(thread);
    navigate(`/categories/${thread.categoryID}/${thread.threadID}`);
  };
  //
  const handleChange = (e, value) => {
    setPage(value);
  };
  //
  console.log(userThreads);
  return (
    <div>
      {userThreads?.length === 0 ? (
        <div className="noCommentsOrThreads">
          No threads have been made by this user.
        </div>
      ) : (
        userThreads?.slice(firstPost, lastPost).map((thread, i) => {
          return (
            <div
              key={i}
              onClick={() => navigateToThread(thread)}
              className="cont"
            >
              <div className="threadCard">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <div className="embolden">Category:</div>{" "}
                    {getCategoryName(thread.categoryID)}
                  </div>
                  <div>
                    <div className="embolden">Title:</div> {thread.threadName}
                  </div>
                  <div>
                    <div className="embolden">Posted:</div>
                    {thread.time}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <div className="embolden">Views:</div>
                    {thread.views}
                  </div>
                  <div>
                    <div className="embolden">Comments:</div>
                    {thread.comments}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
      {userThreads?.length === 0 ? null : (
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
export default MyThreads;
