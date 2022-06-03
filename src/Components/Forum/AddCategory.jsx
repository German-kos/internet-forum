import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import "./CSS-Files/EditCategory.css";
import { getCategories } from "../../Resources/functions";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { buttonStyle } from "./ForumMuiStyle";
//
function AddCategory({ setForums }) {
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
  const swalSuccess = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Category Added",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  //
  const addCategory = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[2].value);
    console.log(e.target[5].value);
    if (
      e.target[0].value !== "" &&
      e.target[2].value !== "" &&
      e.target[5].value !== ""
    ) {
      let tempCategories = getCategories();
      console.log(tempCategories);
      if (tempCategories.length >= 1) {
        tempCategories.push({
          category: e.target[0].value,
          id: tempCategories[tempCategories.length - 1]?.id + 1,
          pic: `/files/Forum-Pictures/${e.target[5].value}.jpg`,
          info: e.target[2].value,
        });
      } else {
        tempCategories.push({
          category: e.target[0].value,
          id: 1,
          pic: `/files/Forum-Pictures/${e.target[5].value}.jpg`,
          info: e.target[2].value,
        });
      }
      localStorage.setItem("forums", JSON.stringify(tempCategories));
      setForums(tempCategories);
      handleClose();
      toast.success(
        `${
          tempCategories[tempCategories.length - 1].category
        } has been added successfuly.`,
        {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: 0,
        }
      );
    }
  };
  return (
    <div>
      <Button sx={buttonStyle} variant="contained" onClick={handleClickOpen}>
        <AddIcon />
        Add a Category
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create a New Category:"}
        </DialogTitle>
        <DialogContent>
          <div>
            <form className="dialogBox" onSubmit={addCategory}>
              <div className="formContainer">
                Category Title:
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  required
                  autoComplete="off"
                  autoFocus
                />
              </div>
              <div className="formContainer">
                Category Info:
                <TextField multiline rows={3} required />
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
      </Dialog>
    </div>
  );
}
export default AddCategory;
