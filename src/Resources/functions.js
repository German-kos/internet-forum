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
  return JSON.parse(localStorage.getItem("comments"));
};
