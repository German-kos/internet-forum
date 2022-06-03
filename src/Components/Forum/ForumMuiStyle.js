export const center = {
  display: "flex",
  justifyContent: "center",
  marginRight: "auto",
  marginLeft: "auto",
};
//
export const categoryCard = [
  {
    minWidth: "500px",
    maxWidth: "500px",
    minHeight: "350px",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.2s",
    transform: "scale(1)",
  },
  {
    ":hover": {
      cursor: "pointer",
      boxShadow: "rgba(53, 55, 71, 0.35) 0px 6px 15px",
      transition: "all 0.2s",
      transform: "scale(1.01)",
    },
  },
];
//
export const cardContent = [];
//
export const siteFont = {
  fontFamily: "Poppins, sans-serif",
};
export const forumCardTitle = {
  fontWeight: "bolder",
  fontSize: "200%",
  color: "#53598D",
};
//
export const forumCardInfo = {
  fontWeight: "bolder",
  fontSize: "125%",
  maxWidth: "400px",
  overflowWrap: "break-word",
  textAlign: "center",
  color: "#757AA9",
};
export const buttonStyle = [
  {
    backgroundColor: "#797EAB",
    fontFamily: "Poppins, sans-serif",
  },
  {
    ":hover": {
      transitionDuration: "0.05s",
      backgroundColor: "#797EAB",
      color: "white",
      transform: "scale(1.005)",
      outline: "none",
      borderColor: "#353747",
      boxShadow: "rgba(53, 55, 71, 0.35) 0px 6px 15px",
    },
  },
];
