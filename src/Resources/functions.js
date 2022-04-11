export const userPfp = (user) => {
  return JSON.parse(localStorage.getItem("usersList")).find(
    (obj) => obj?.username.toLowerCase() === user?.toLowerCase()
  )?.pfp;
};
export const getThreads = (params) => {
  return JSON.parse(localStorage.getItem("threads")).find(
    (obj) => obj.threadID === parseInt(params.threadID)
  );
};
export const getAllThreads = () => {
  return JSON.parse(localStorage.getItem("threads"));
};
export const getComments = (params) => {
  return JSON.parse(localStorage.getItem("comments"))
    .map((item) => {
      if (item.threadID === parseInt(params.threadID)) return item;
    })
    .filter(function (x) {
      return x !== undefined;
    });
};
export const getAllComments = () => {
  //get all the comments from the localstorage
  return JSON.parse(localStorage.getItem("comments"));
};

export const getLoggedUser = () => {
  return JSON.parse(localStorage.getItem("currUser"));
};
export const getUserID = (name) => {
  const usersList = JSON.parse(localStorage.getItem("usersList"));
  return usersList.find((obj) => obj.username === name).userID;
};
export const validateLines = (e) => {
  // validate the number of lines in the textfield
  if (e.target.value?.match(/\n/g)?.length > 10 && e.key === "Enter") {
    e.preventDefault();
    return false;
  }
};
