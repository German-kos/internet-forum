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
} from "../../Resources/functions";
import ClearIcon from "@mui/icons-material/Clear";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getUserID } from "../../Resources/functions";
import { Pagination } from "@mui/material";
//
function Threads({ user }) {
  const [thread, setThread] = useState();
  const [allComments, setAllComments] = useState();
  const [comments, setComments] = useState();
  const [test, setTest] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const postsPerPage = 5;
  const lastPost = page * postsPerPage;
  const firstPost = lastPost - postsPerPage;
  //
  useEffect(() => {
    setTest(params);
  }, [params]);
  useEffect(() => {
    setThread(getThreads(params));
    setAllComments(getAllComments());
    setComments(getComments(params));
  }, []);
  //
  useEffect(() => {
    setPageCount(Math.ceil(getComments(params).length / postsPerPage));
  }, [comments]);

  //
  const handleUserClick = (e) => {
    const id = getUserID(e);
    return navigate(`/user/${id}`);
  };
  //
  const removeComment = (e) => {
    Swal.fire({
      title: "Are you sure you want to remove your comment?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        let temp = getAllComments().filter(function (x) {
          return x.commentID !== e.commentID;
        });
        localStorage.setItem("comments", JSON.stringify(temp));
        setAllComments(temp);
        setComments(getComments(params));
        let tempThreads = getAllThreads();
        const threadIndex = tempThreads.findIndex(
          (x) => x.threadID === parseInt(params.threadID)
        );
        tempThreads[threadIndex].comments -= 1;
        localStorage.setItem("threads", JSON.stringify(tempThreads));
      }
    });
  };
  //
  const handleChange = (e, value) => {
    setPage(value);
  };
  //
  console.log(comments);
  return (
    <div className="threadsContainer">
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
      {comments?.slice(firstPost, lastPost).map((comment, i) => {
        if (comment?.threadID === parseInt(params.threadID)) {
          return (
            <div key={i} className={"commentCard"}>
              <div className="commentUserInfo">
                <Avatar src={userPfp(comment.author)} />
                <div
                  className="commentAuthor"
                  onClick={() => handleUserClick(comment.author)}
                >
                  {comment.author}
                </div>
                {user?.username.toLowerCase() ===
                  comment.author.toLowerCase() || user?.admin ? (
                  <div style={{ flex: 1 }}>
                    <IconButton
                      sx={{ float: "right", color: "gray" }}
                      onClick={() => removeComment(comment)}
                    >
                      <ClearIcon sx={{ opacity: 0.5 }} />
                    </IconButton>
                  </div>
                ) : null}
              </div>
              <Divider />
              <div className="commentContent">{comment.comment}</div>
              <Divider />
              <div className="timePosted">Posted: {comment.time}</div>
            </div>
          );
        }
      })}
      <div>
        {
          <CommentField
            user={user}
            params={params}
            setAllComments={setAllComments}
            setComments={setComments}
            page={page}
            setPage={setPage}
            pageCount={pageCount}
            postsPerPage={postsPerPage}
          />
        }
      </div>
      <div style={{ marginTop: "15px" }}>
        <Pagination
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={handleChange}
          count={pageCount}
        />
      </div>
    </div>
  );
}
export default Threads;
