export const userPfp = (user) => {
  return JSON.parse(localStorage.getItem("usersList")).find(
    (obj) => obj.username.toLowerCase() === user.toLowerCase()
  ).pfp;
};
