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
  if (localStorage.getItem("forums") === null)
    localStorage.setItem(
      "forums",
      JSON.stringify([
        {
          category: "General Discussions",
          id: "generaldiscussions",
          pic: "/files/Forum-Pictures/discussions.jpg",
          info: "Talk about anything you want.",
        },
        {
          category: "Music",
          id: "music",
          pic: "/files/Forum-Pictures/music.jpg",
          info: "Enjoy music with others.",
        },
        {
          category: "Hobbies",
          id: "hobbies",
          pic: "/files/Forum-Pictures/hobbies.jpg",
          info: "Share and discover hobbies.",
        },
        {
          category: "Video Games",
          id: "videogames",
          pic: "/files/Forum-Pictures/video-games.jpg",
          info: "For the passion of gamers.",
        },
        {
          category: "Art",
          id: "art",
          pic: "/files/Forum-Pictures/art.jpg",
          info: "Share your creations with the world.",
        },
      ])
    );
  if (localStorage.getItem("threads") === null)
    localStorage.setItem(
      "threads",
      JSON.stringify([
        {
          categoryID: "generaldiscussions",
          threadID: 1,
          author: "John1",
          threadName:"test",
          content: "Hello World!, from John.",
          views: 0,
          comments: 0,
        },
        {
          categoryID: "generaldiscussions",
          threadID: 2,
          author: "Jane1",
          threadName:"test",
          content: "Hello World! from Jane.",
          views: 0,
          comments: 0,
        },
        {
          categoryID: "music",
          threadID: 3,
          author: "John1",
          threadName:"test",
          content: "Hello Musicians!",
          views: 0,
          comments: 0,
        },
        {
          categoryID: "hobbies",
          threadID: 4,
          author: "Jane1",
          threadName:"test",
          content: "Hello Hobbyists!",
          views: 0,
          comments: 0,
        },
        {
          categoryID: "videogames",
          threadID: 5,
          author: "John1",
          threadName:"test",
          content: "Hello Gamers!",
          views: 0,
          comments: 0,
        },
        {
          categoryID: "art",
          threadID: 6,
          author: "John1",
          threadName:"test",
          content: "Hello Artists!",
          views: 0,
          comments: 0,
        },
      ])
    );
  useEffect(async () => {
    setForums(JSON.parse(localStorage.getItem("forums")));
  }, []);
  const handleClick = (e, eCategory) => {
    console.log(eCategory.id);
    return navigate(`/categories/${eCategory.id}`);
  };
  return forums !== [] ? (
    <>
      <div className="categories">
        {forums?.map((category, i) => {
          return (
            <Card
              onClick={() => handleClick(this, category)}
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
                image={category.pic}
                alt={category.category}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {category.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.info}
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
