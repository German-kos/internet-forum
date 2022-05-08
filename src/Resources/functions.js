import { LocalSeeOutlined } from "@mui/icons-material";
import { banData } from "./data";
//
export const userPfp = (user) => {
  // get a user's profile picture by only passing the username
  return JSON.parse(localStorage.getItem("usersList")).find(
    (obj) => obj?.username.toLowerCase() === user?.toLowerCase()
  )?.pfp;
};
//
export const getCurrentThread = (id) => {
  // get a thread for the corresponding id passed
  return JSON.parse(localStorage.getItem("threads")).find(
    (thread) => thread.threadID === parseInt(id)
  );
};
//
export const getThreads = (params) => {
  return JSON.parse(localStorage.getItem("threads")).find(
    (obj) => obj.threadID === parseInt(params.threadID)
  );
};
//
export const getAllThreads = () => {
  // get all the threads from the localstorage
  return JSON.parse(localStorage.getItem("threads"));
};
//
export const getAllThreadsByCategoryID = (id) => {
  // get the threads relevant to the desired category - by category ID
  return JSON.parse(localStorage.getItem("threads")).filter(
    (x) => x.categoryID === id
  );
};
//
export const getComments = (params) => {
  // get the comments relevent to the threadID from the passed params
  return JSON.parse(localStorage.getItem("comments"))
    .map((item) => {
      if (item.threadID === parseInt(params.threadID)) return item;
    })
    .filter(function (x) {
      return x !== undefined;
    });
};
//
export const getCommentsByThreadID = (id) => {
  // get comments by passing the id of the thread
  return JSON.parse(localStorage.getItem("comments"))
    .map((item) => {
      if (item.threadID === parseInt(id)) return item;
    })
    .filter(function (x) {
      return x !== undefined;
    });
};
//
export const getAllComments = () => {
  // get all the comments from the localstorage
  return JSON.parse(localStorage.getItem("comments"));
};
//
export const getLoggedUser = () => {
  // get the last logged in user if there is one
  return JSON.parse(localStorage.getItem("currUser"));
};
//
export const getUserID = (name) => {
  // get the user's id by passing only a username
  const usersList = JSON.parse(localStorage.getItem("usersList"));
  return usersList.find(
    (obj) => obj.username.toLowerCase() === name.toLowerCase()
  ).userID;
};
//
export const validateLines = (e) => {
  // validate the number of lines in the textfield
  if (e.target.value?.match(/\n/g)?.length > 8 && e.key === "Enter") {
    e.preventDefault();
    return false;
  }
};
//
export const addViewsToThread = (thread) => {
  //pass thread obj to add a view to it
  let tempThreads = getAllThreads();
  const threadIndex = tempThreads.findIndex(
    (x) => x.threadID === thread.threadID
  );
  tempThreads[threadIndex].views += 1;
  localStorage.setItem("threads", JSON.stringify(tempThreads));
};
//
export const getCategories = () => {
  // get categories from local storage
  return JSON.parse(localStorage.getItem("forums"));
};
//
export const setBanData = () => {
  // set banData to local storage
  if (
    localStorage.getItem("banData") === null ||
    localStorage.getItem("banData") === undefined
  )
    localStorage.setItem("banData", JSON.stringify(banData));
};
//
export const isBanned = (userID) => {
  // pass user ID to find out if the user is banned or not
  const tempUser = JSON.parse(localStorage.getItem("banData")).find(
    (x) => parseInt(x.userID) === parseInt(userID)
  );
  return tempUser.ban;
};
//
export const banReason = (userID) => {
  // pass user ID to find out the reason for the suspension
  const tempUser = JSON.parse(localStorage.getItem("banData")).find(
    (x) => parseInt(x.userID) === parseInt(userID)
  );
  return tempUser.reason;
};
//
export const numberOfThreads = (username) => {
  // pass username to find out how many threads they've created
  return JSON.parse(localStorage.getItem("threads")).filter(
    (thread) => thread.author.toLowerCase() === username.toLowerCase()
  ).length;
};
//
export const numberOfComments = (username) => {
  // pass username to find out how many comments they've posted
  return JSON.parse(localStorage.getItem("comments")).filter(
    (comment) => comment.author.toLowerCase() === username.toLowerCase()
  ).length;
};
//
export const getThreadsByUsername = (username) => {
  // pass username to get all the threads made by that user
  return JSON.parse(localStorage.getItem("threads")).filter(
    (thread) => thread.author.toLowerCase() === username.toLowerCase()
  );
};
//
export const getCategoryName = (categoryID) => {
  // pass the categoryID to get it's name
  return JSON.parse(localStorage.getItem("forums")).find(
    (category) => parseInt(category.id) === parseInt(categoryID)
  ).category;
};
