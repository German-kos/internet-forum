import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Loading from "../../Resources/Loading";
import { useNavigate } from "react-router-dom";
import { categories } from "../../Resources/data";
import {
  categoryCard,
  forumCardTitle,
  center,
  forumCardInfo,
  siteFont,
} from "./ForumMuiStyle";
import { IconButton } from "@mui/material";
import Swal from "sweetalert2";
import EditCategory from "./EditCategory";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";
import {
  getAllComments,
  getAllThreads,
  getAllThreadsByCategoryID,
  getCategories,
} from "../../Resources/functions";
import AddCategory from "./AddCategory";
import "./CSS-Files/Forums.css";
//
function Forums({ user }) {
  const [forums, setForums] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("forums") === null ||
      localStorage.getItem("forums") === undefined
    ) {
      localStorage.setItem("forums", JSON.stringify(categories));
    }
    setForums(JSON.parse(localStorage.getItem("forums")));
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
        toast.success(`${category.category} has been removed successfuly.`, {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: 0,
        });
      }
    });
  };
  //
  const handleImgError = (e) => {
    e.target.src = "files/Forum-Pictures/1.jpg";
  };
  return forums !== [] ? (
    <>
      {user?.admin ? <AddCategory setForums={setForums} /> : null}
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
              <CardContent>
                <Typography
                  sx={[siteFont, forumCardTitle, center]}
                  gutterBottom
                  component="div"
                >
                  {category.category}
                </Typography>
                <Typography
                  sx={[siteFont, center, forumCardInfo]}
                  color="text.secondary"
                >
                  {category.info}
                </Typography>
              </CardContent>
              {user?.admin ? (
                <div className="categoryButtons">
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
