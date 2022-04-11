import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getLoggedUser } from "../../Resources/functions";
import { TextField } from "@mui/material";
import { validateLines } from "../../Resources/functions";
import "../../App.css";
//
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NewThread({
  user,
  createThread,
  params,
  handleClose,
  handleClickOpen,
  open,
}) {
  const [loggedUser, setLoggedUser] = useState();
  useEffect(() => {
    setLoggedUser(getLoggedUser);
  }, []);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    console.log(e.target[2].value);
    // e.target[0].value is title
    // e.target[].value is content
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
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <div id="alert-dialog-slide-description">
            {/* {user?.username} */}
            {/* <div className="commentField"> */}
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
                  <Button
                    variant="outlined"
                    type="submit"
                    // onClick={handleClose}
                  >
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
