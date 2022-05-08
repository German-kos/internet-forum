import { Avatar, Divider, IconButton } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import "../../App.css";
import { userPfp } from "../../Resources/functions";
import CommentField from "./CommentField";
import { useState, useEffect } from "react";
import {
  getThreads,
  getAllThreads,
  getAllComments,
  getComments,
  getCommentsByThreadID,
} from "../../Resources/functions";
import ClearIcon from "@mui/icons-material/Clear";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getUserID } from "../../Resources/functions";
import { Pagination } from "@mui/material";
import { useContext } from "react";
import {
  CommentsContext,
  ThreadContext,
  ThreadUpdateContext,
} from "../../Resources/Context-Providers/ThreadContextProvider";
import ThreadAuthorComment from "./ThreadAuthorComment";
import ThreadUserComments from "./ThreadUserComments";
import { paginationStyle } from "./ThreadsListMuiStyle";
//
function Threads({ user }) {
  const comments = useContext(CommentsContext);
  const params = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const postsPerPage = 5;
  //
  useEffect(() => {
    setPageCount(
      Math.ceil(getCommentsByThreadID(params.threadID).length / postsPerPage)
    );
  }, [comments]);
  //
  const handleUserClick = (e) => {
    const id = getUserID(e);
    return navigate(`/user/${id}`);
  };
  const handleChange = (e, value) => {
    setPage(value);
  };
  //
  return (
    <div className="threadsContainer">
      <ThreadAuthorComment
        page={page}
        handleUserClick={handleUserClick}
        params={params}
      />
      <ThreadUserComments
        handleUserClick={handleUserClick}
        params={params}
        user={user}
        page={page}
        setPage={setPage}
      />
      <div>
        {
          <CommentField
            user={user}
            params={params}
            page={page}
            setPage={setPage}
            pageCount={pageCount}
            postsPerPage={postsPerPage}
          />
        }
      </div>
      <div style={{ marginTop: "15px" }}>
        <Pagination
          sx={paginationStyle}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={handleChange}
          count={pageCount === 0 ? 1 : pageCount}
        />
      </div>
    </div>
  );
}
export default Threads;
