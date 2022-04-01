import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import { Category } from "@mui/icons-material";
function Forums() {
  const [forums, setForums] = useState([]);
  const navigate = useNavigate();
  if (localStorage.getItem("Forums") === null)
    localStorage.setItem(
      "Forums",
      JSON.stringify([
        {
          Category: "General Discussions",
          id: "generaldiscussions",
          threads: [],
          pic: "/files/Forum-Pictures/discussions.jpg",
          info: "Talk about anything you want.",
        },
        {
          Category: "Music",
          id: "music",
          threads: [],
          pic: "/files/Forum-Pictures/music.jpg",
          info: "Enjoy music with others.",
        },
        {
          Category: "Hobbies",
          id: "hobbies",
          threads: [],
          pic: "/files/Forum-Pictures/hobbies.jpg",
          info: "Share and discover hobbies.",
        },
        {
          Category: "Video Games",
          id: "videogames",
          threads: [],
          pic: "/files/Forum-Pictures/video-games.jpg",
          info: "For the passion of gamers.",
        },
        {
          Category: "Art",
          id: "art",
          threads: [],
          pic: "/files/Forum-Pictures/art.jpg",
          info: "Share your creations with the world.",
        },
      ])
    );
  useEffect(async () => {
    setForums(JSON.parse(localStorage.getItem("Forums")))
  }, []);
  const handleClick = (e, eCategory) => {
    console.log(Category.id);
    return navigate(`/categories/${eCategory.id}`);
  };
  return forums !== [] ? (
    <>
      <div className="categories">
        {forums?.map((Category, i) => {
          return (
            <Card
              onClick={() => handleClick(this, Category)}
              key={i}
              sx={{
                minWidth: 345,
                maxWidth: 345,
                minHeight: 250,
                maxHeight: 250,
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={Category.pic}
                alt={Category.Category}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {Category.Category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Category.info}
                </Typography>
              </CardContent>
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
