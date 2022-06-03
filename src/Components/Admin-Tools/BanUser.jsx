import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
//
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//
function BanUser({ banList, setBanList, triggerStateUpdate, user }) {
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
  const banUser = (e) => {
    e.preventDefault();
    const userIndex = banList.findIndex(
      (u) => parseInt(u.userID) === parseInt(user.userID)
    );
    const tempBanList = banList;
    tempBanList[userIndex].ban = true;
    tempBanList[userIndex].reason = e.target[0].value;
    localStorage.setItem("banData", JSON.stringify(tempBanList));
    setBanList(tempBanList);
    triggerStateUpdate();
    e.target[0].value = "";
    toast.success(`${user.username} has been suspended successfuly.`, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: 0,
    });
  };
  //
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Ban
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Reason for Suspension:"}</DialogTitle>
        <DialogContent>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={banUser}
          >
            <TextField
              id="outlined-basic"
              placeholder="Reason for suspension..."
              variant="outlined"
              required
              autoComplete="off"
              multiline
              defaultValue={""}
              rows={2}
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input type="button" onClick={handleClose} value="Cancel" />
              <input type="submit" value="Ban" />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default BanUser;
