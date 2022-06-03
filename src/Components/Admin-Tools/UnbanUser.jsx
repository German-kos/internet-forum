import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { toast } from "react-toastify";
//
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//
function UnbanUser({ banList, setBanList, triggerStateUpdate, user }) {
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
  const unbanUser = () => {
    const userIndex = banList.findIndex(
      (u) => parseInt(u.userID) === parseInt(user.userID)
    );
    const tempBanList = banList;
    tempBanList[userIndex].ban = false;
    tempBanList[userIndex].reason = null;
    localStorage.setItem("banData", JSON.stringify(tempBanList));
    setBanList(tempBanList);
    triggerStateUpdate();
    toast.success(
      `${user.username}'s suspension has been removed successfuly.`,
      {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: 0,
      }
    );
    handleClose();
  };
  //
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Unban
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Unban User:"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to unban {user.username}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={unbanUser}>Unban</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default UnbanUser;
