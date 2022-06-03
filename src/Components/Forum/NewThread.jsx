import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  getLoggedUser,
  getAllThreadsByCategoryID,
} from "../../Resources/functions";
import { TextField } from "@mui/material";
import { validateLines } from "../../Resources/functions";
import "../../App.css";
import { toast } from "react-toastify";
//
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NewThread({
  user,
  params,
  handleClose,
  open,
  allThreads,
  setAllThreads,
  setCurrentThreads,
}) {
  const [loggedUser, setLoggedUser] = useState();
  useEffect(() => {
    setLoggedUser(getLoggedUser);
  }, []);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user !== null && user !== undefined) {
      let temp = allThreads;
      let temp2 = JSON.parse(localStorage.getItem("threads"));
      let newThread;
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
        timeZone: "Israel",
      };
      const date = new Date();
      if (temp2.length >= 1) {
        newThread = {
          categoryID: parseInt(params.categoryID),
          threadID: temp2[temp2.length - 1].threadID + 1,
          author: user.username,
          threadName: e.target[0].value,
          content: e.target[2].value,
          views: 0,
          comments: 0,
          time: new Intl.DateTimeFormat("en-GB", options).format(date),
        };
      } else {
        newThread = {
          categoryID: parseInt(params.categoryID),
          threadID: 1,
          author: user.username,
          threadName: e.target[0].value,
          content: e.target[2].value,
          views: 0,
          comments: 0,
          time: new Intl.DateTimeFormat("en-GB", options).format(date),
        };
      }
      temp.push(newThread);
      temp2.push(newThread);
      localStorage.setItem("threads", JSON.stringify(temp2));
      setAllThreads(temp);
      setCurrentThreads(
        getAllThreadsByCategoryID(parseInt(params.categoryID)).slice().reverse()
      );
      toast.success(
        `Thread '${newThread.threadName}' has been created successfully.`,
        {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: 0,
        }
      );
      e.target[0].value = "";
      e.target[2].value = "";
      handleClose();
    }
  };

  return loggedUser !== undefined && loggedUser !== null ? (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Create a new thread:"}</DialogTitle>
        <DialogContent>
          <div id="alert-dialog-slide-description">
            <div>
              <form onSubmit={handleSubmit}>
                <TextField
                  sx={{ marginBottom: "5px" }}
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Thread title..."
                  required
                />
                <TextField
                  placeholder="Thread content..."
                  className="textField"
                  multiline
                  rows={5}
                  inputProps={{ maxLength: 200 }}
                  onKeyPress={validateLines}
                  required
                  variant="outlined"
                />
                <div style={{ float: "right", paddingTop: 5, paddingRight: 3 }}>
                  <Button variant="outlined" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="outlined" type="submit">
                    Post
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  ) : (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Please sign in to create a thread."}</DialogTitle>

      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
        <Button variant="outlined" onClick={() => navigate("/login")}>
          Sign In
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default NewThread;
