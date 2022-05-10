import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { IconButton, TextField } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import "./CSS-Files/Messages.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SendMessage({ recipient, sender }) {
  const [open, setOpen] = React.useState(false);
  //
  const handleClickOpen = () => {
    setOpen(true);
  };
  //
  const handleClose = () => {
    setOpen(false);
  };
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    let allPms = JSON.parse(localStorage.getItem("pms"));
    console.log(recipient);
    console.log(sender);
    //
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
    //
    if (allPms.length >= 1) {
      allPms.push({
        senderID: sender.userID,
        recipientID: recipient.userID,
        title: e.target[0].value,
        content: e.target[2].value,
        read: false,
        time: new Intl.DateTimeFormat("en-GB", options).format(date),
        pmID: allPms[allPms.length - 1].pmID + 1,
      });
    } else {
      allPms.push({
        senderID: sender.userID,
        recipientID: recipient.userID,
        title: e.target[0].value,
        content: e.target[2].value,
        read: false,
        time: new Intl.DateTimeFormat("en-GB", options).format(date),
        pmID: 1,
      });
    }
    localStorage.setItem("pms", JSON.stringify(allPms));
    handleClose();
  };
  //
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <MailIcon sx={{ fontSize: "150%", color: "#53598D" }} />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "185%",
            fontWeight: "bolder",
          }}
        >
          {"Composite a New Message:"}
        </DialogTitle>
        <DialogContent>
          <form className="pmFormContainer" onSubmit={handleSubmit}>
            <label>To: {recipient?.username}</label>
            <TextField label="Subject" variant="outlined" required />
            <TextField
              multiline
              label="Message Content"
              variant="outlined"
              rows={4}
              required
            />
            <div className="pmButtonContainer">
              <input className="pmButton" type="button" value="Cancel" />
              <input className="pmButton" type="submit" value="Send" />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default SendMessage;
