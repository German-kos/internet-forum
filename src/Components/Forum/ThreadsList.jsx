import React, { useEffect, useState, useRef } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Loading from "../../Resources/Loading";
import { Avatar, Button, createTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../../App.css";
import { color } from "@mui/system";
import NewThread from "./NewThread";
import {
  getAllThreads,
  getAllThreadsByCategoryID,
  getAllComments,
  getUserID,
  addViewsToThread,
} from "../../Resources/functions";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ClearIcon from "@mui/icons-material/Clear";
import Swal from "sweetalert2";
import { Divider, IconButton, Pagination } from "@mui/material";
//
//
function ThreadsList({ user }) {
  const [allThreads, setAllThreads] = useState();
  const [currentThreads, setCurrentThreads] = useState();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const postsPerPage = 10;
  const params = useParams();
  const navigate = useNavigate();
  const lastPost = page * postsPerPage;
  const firstPost = lastPost - postsPerPage;
  useEffect(() => {
    setAllThreads(getAllThreadsByCategoryID(parseInt(params.categoryID)));
    setCurrentThreads(
      getAllThreadsByCategoryID(parseInt(params.categoryID)).reverse()
    );
  }, []);
  useEffect(() => {
    setPageCount(
      Math.ceil(
        getAllThreadsByCategoryID(parseInt(params.categoryID)).length /
          postsPerPage
      )
    );
  }, [currentThreads]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //
  const userPfp = (user) => {
    return JSON.parse(localStorage.getItem("usersList")).find(
      (obj) => obj.username.toLowerCase() === user.toLowerCase()
    ).pfp;
  };
  const handleClick = (e, thread) => {
    addViewsToThread(thread);
    return navigate(`/categories/${params.categoryID}/${thread.threadID}`);
  };
  const handleChange = (e, value) => {
    setPage(value);
  };
  const removeThread = (e, thread) => {
    e.stopPropagation();
    Swal.fire({
      title: "Are you sure you want to remove your thread?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        let tempComments = getAllComments().filter(function (x) {
          return x.threadID !== thread.threadID;
        });
        let tempThreads = getAllThreads().filter(function (x) {
          return x.threadID !== thread.threadID;
        });
        localStorage.setItem("comments", JSON.stringify(tempComments));
        localStorage.setItem("threads", JSON.stringify(tempThreads));
        setAllThreads(tempThreads);
        setCurrentThreads(
          getAllThreadsByCategoryID(parseInt(params.categoryID)).reverse()
        );
      }
    });
  };
  const handleUserClick = (e, username) => {
    e.stopPropagation();
    const id = getUserID(username);
    return navigate(`/user/${id}`);
  };
  return (
    <>
      <NewThread
        user={user}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        setAllThreads={setAllThreads}
        allThreads={allThreads}
        params={params}
        currentThreads={currentThreads}
        setCurrentThreads={setCurrentThreads}
        setPageCount={setPageCount}
        postsPerPage={postsPerPage}
      />
      <div>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          style={{
            backgroundColor: "#6d6d6d",
            color: "white",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 2.5px 7.5px",
          }}
        >
          <AddIcon />
          {"New Thread"}
        </Button>
      </div>
      <div className="threadsContainer">
        {currentThreads?.slice(firstPost, lastPost).map((thread, i) => {
          return (
            <div
              key={i}
              className={"threadCards"}
              onClick={(e) => handleClick(e, thread)}
            >
              <div className="threadCardUserInfo">
                <Avatar
                  sx={{ width: "30px", height: "30px" }}
                  src={userPfp(thread.author)}
                />
                <div
                  className="commentAuthor"
                  onClick={(e) => handleUserClick(e, thread.author)}
                >
                  {thread.author}
                </div>
                {user?.username.toLowerCase() === thread.author.toLowerCase() ||
                user?.admin ? (
                  <div style={{ flex: 1 }}>
                    <IconButton
                      sx={{ float: "right", color: "gray" }}
                      onClick={(e) => removeThread(e, thread)}
                    >
                      <ClearIcon sx={{ opacity: 0.5 }} />
                    </IconButton>
                  </div>
                ) : null}
              </div>
              <Divider />
              <div className="threadCardTitle">{thread.threadName}</div>
              <Divider />
              <div className="timePosted">
                Posted: {thread.time}
                <div
                  style={{
                    display: "flex",
                    float: "right",
                    alignItems: "center",
                  }}
                >
                  <VisibilityIcon fontSize="small" sx={{ color: "gray" }} />{" "}
                  <div
                    style={{
                      display: "inline-block",
                    }}
                  >
                    {thread.views}
                  </div>
                  <ChatBubbleIcon fontSize="small" sx={{ color: "gray" }} />
                  {thread.comments}
                </div>
              </div>
            </div>
          );
        })}
        <Pagination
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={handleChange}
          count={pageCount}
        />
      </div>
    </>
  );
}
export default ThreadsList;
