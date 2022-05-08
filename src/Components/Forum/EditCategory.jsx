import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./CSS-Files/EditCategory.css";
import { getCategories } from "../../Resources/functions";
import { toast } from "react-toastify";
//
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//
function EditCategory({ category, setForums }) {
  const [open, setOpen] = React.useState(false);
  //
  const handleClickOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
    // console.log(category);
  };
  //
  const handleClose = (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    setOpen(false);
  };
  //
  const submitChanges = (e) => {
    //input 1 e.target[0].value
    //input 2 e.target[2].value
    //input 3 e.target[5].value
    // e.stopPropagation();
    e.preventDefault();
    if (
      e.target[0].value !== "" &&
      e.target[2].value !== "" &&
      e.target[5].value !== ""
    ) {
      let tempCategories = getCategories();
      const categoryIndex = tempCategories.findIndex(
        (x) => parseInt(x.id) === parseInt(category.id)
      );
      const pastName = tempCategories[categoryIndex].category;
      tempCategories[categoryIndex].category = e.target[0].value;
      tempCategories[categoryIndex].info = e.target[2].value;
      tempCategories[
        categoryIndex
      ].pic = `/files/Forum-Pictures/${e.target[5].value}.jpg`;
      localStorage.setItem("forums", JSON.stringify(tempCategories));
      setForums(tempCategories);
      toast.success(`${pastName} has been changed successfuly.`, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: 0,
      });
      handleClose();
    }
  };
  //
  const cancelClick = (e) => {
    e.stopPropagation();
  };
  //
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        onClick={cancelClick}
      >
        <DialogTitle>{"Edit Category:"}</DialogTitle>
        <DialogContent>
          <div>
            <form className="dialogBox" onSubmit={submitChanges}>
              <div className="formContainer">
                Category Title:
                <TextField
                  id="outlined-basic"
                  placeholder={category.category}
                  variant="outlined"
                  required
                  autoComplete="off"
                  autoFocus
                />
              </div>
              <div className="formContainer">
                Category Info:
                <TextField
                  multiline
                  rows={3}
                  required
                  placeholder={category.info}
                />
              </div>
              <div className="formContainer">
                Image Filename:
                <TextField required />
              </div>
              <div>
                <button type="button" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
export default EditCategory;
