import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Loading from "../../Resources/Loading";
import { useNavigate } from "react-router-dom";
import { categories, mockThreads, mockComments } from "../../Resources/data";
import { categoryCard, cardContent } from "./ForumMuiStyle";
// import EditCategory from "./EditCategory";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import EditCategory from "./EditCategory";
import ClearIcon from "@mui/icons-material/Clear";
import {
  getAllComments,
  getAllThreads,
  getAllThreadsByCategoryID,
  getCategories,
  getThreads,
} from "../../Resources/functions";
import AddCategory from "./AddCategory";
import { Add } from "@mui/icons-material";
//
function Forums({ user }) {
  const [forums, setForums] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setForums(JSON.parse(localStorage.getItem("forums")));
    if (
      localStorage.getItem("forums") === null ||
      localStorage.getItem("forums") === undefined
    ) {
      localStorage.setItem("forums", JSON.stringify(categories));
    }
    if (
      localStorage.getItem("threads") === null ||
      localStorage.getItem("threads") === undefined
    ) {
      localStorage.setItem("threads", JSON.stringify(mockThreads));
    }
    if (
      localStorage.getItem("comments") === null ||
      localStorage.getItem("comments") === undefined
    ) {
      localStorage.setItem("comments", JSON.stringify(mockComments));
    }
  }, []);
  //
  const handleClick = (e, eCategory) => {
    return navigate(`/categories/${eCategory.id}`);
  };
  //
  const removeCategory = (e, category) => {
    e.stopPropagation();
    console.log(e);
    console.log(category);
    Swal.fire({
      title: `Are you sure you want to remove '${category.category}' ?`,
      text: `All threads and comments relating to '${category.category}' will be removed as well. `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        let tempCategories = getCategories();
        let tempThreads = getAllThreads();
        let tempComments = getAllComments();
        tempCategories = tempCategories.filter((x) => {
          return parseInt(x.id) !== parseInt(category.id);
        });
        localStorage.setItem("forums", JSON.stringify(tempCategories));
        setForums(tempCategories);
        let tempThreadsID = getAllThreadsByCategoryID(category.id).map((x) => {
          return x.threadID;
        });
        tempComments = tempComments.filter((x) => {
          if (tempThreadsID.indexOf(x.threadID) === -1) return x;
        });
        localStorage.setItem("comments", JSON.stringify(tempComments));
        tempThreads = tempThreads.filter((x) => {
          return x.categoryID !== category.id;
        });
        localStorage.setItem("threads", JSON.stringify(tempThreads));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  //
  const handleImgError = (e) => {
    e.target.src = "files/Forum-Pictures/1.jpg";
  };
  return forums !== [] ? (
    <>
      <AddCategory setForums={setForums} />
      <div className="categories">
        {forums?.map((category, i) => {
          return (
            <Card
              onClick={() => handleClick(this, category)}
              key={i}
              sx={categoryCard}
            >
              <CardMedia
                component="img"
                height="140"
                image={category.pic}
                alt={category.category}
                onError={handleImgError}
              />
              <CardContent sx={{ fontFamily: "Poppins, sans-serif;" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {category.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.info}
                </Typography>
              </CardContent>
              {user?.admin ? (
                <div>
                  <EditCategory setForums={setForums} category={category} />
                  <IconButton onClick={(e) => removeCategory(e, category)}>
                    <ClearIcon />
                  </IconButton>
                </div>
              ) : null}
            </Card>
          );
        })}
      </div>
    </>
  ) : (
    <Loading />
  );
}
export default Forums;
