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
import { categories, mockThreads, mockComments } from "../../Resources/data";
function Forums() {
  const [forums, setForums] = useState([]);
  const navigate = useNavigate();
  if (
    localStorage.getItem("forums") === null ||
    localStorage.getItem("forums") === undefined
  )
    localStorage.setItem("forums", JSON.stringify(categories));
  if (
    localStorage.getItem("threads") === null ||
    localStorage.getItem("threads") === undefined
  )
    localStorage.setItem("threads", JSON.stringify(mockThreads));
  if (
    localStorage.getItem("comments") === null ||
    localStorage.getItem("comments") === undefined
  )
    localStorage.setItem("comments", JSON.stringify(mockComments));
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
