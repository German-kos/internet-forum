import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import { getAllComments } from "../../Resources/functions";
import { CommentsUpdateContext } from "../../Resources/Context-Providers/ThreadContextProvider";
import { toast } from "react-toastify";
//
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//
function EditComment({ comment }) {
  const [open, setOpen] = React.useState(false);
  const commentsUpdate = React.useContext(CommentsUpdateContext);

  const handleClickOpen = (e) => {
    console.log(e);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateLines = (e) => {
    if (e.target.value?.match(/\n/g)?.length > 8 && e.key === "Enter") {
      e.preventDefault();
      return false;
    }
  };
  const cancelEdit = (e) => {
    e.preventDefault();
    commentsUpdate(comment.threadID);
    handleClose();
  };
  const submitChanges = (e) => {
    e.preventDefault();
    let temp = getAllComments();
    console.log(e);
    if (
      e.target[0].value !== comment.comment &&
      e.target[0].value.trim() !== ""
    ) {
      const commentIndex = temp.findIndex(
        (x) => x.commentID === comment.commentID
      );
      temp[commentIndex].comment = e.target[0].value;
      temp[commentIndex].editted = true;
      localStorage.setItem("comments", JSON.stringify(temp));
      commentsUpdate(comment.threadID);
      console.log(commentIndex);
      console.log(temp);
      toast.success(`Comment has been changed successfully.`, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: 0,
      });
      handleClose();
    }
    // console.log(temp.findIndex((x) => x.commentID === comment.commentID));
    // console.log(temp.findIndex(comment));
  };
  return (
    <div>
      <IconButton
        sx={{ color: "gray", float: "right" }}
        onClick={handleClickOpen}
      >
        <EditIcon sx={{ opacity: "0.5" }} />
      </IconButton>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogTitle>{"Edit Comment:"}</DialogTitle>
          <form onSubmit={submitChanges}>
            <TextField
              className="textField"
              multiline
              rows={5}
              inputProps={{ maxLength: 200 }}
              onKeyPress={validateLines}
              required
              defaultValue={comment.comment}
            />
            <div style={{ float: "right", paddingTop: 5, paddingRight: 3 }}>
              <button onClick={cancelEdit}>Cancel</button>
              <button type="submit">Post Changes</button>
            </div>
          </form>
          {/* </div> */}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default EditComment;
