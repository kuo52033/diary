import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  imageBoxSkeleton: {
    position: "relative",
    overflow: "hidden",
    // maxWidth: "65%",
    minWidth: "65%",
    flexGrow: 1,
    aspectRatio: "1/1",
    [theme.breakpoints.down("sm")]: {
      aspectRatio: "16/8",
    },
  },
  imageSkeleton: {
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "500px",
    },
  },
  postdetailBox: {
    display: "flex",
    position: "relative",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  imageSection: {
    position: "relative",
    overflow: "hidden",
    // maxWidth: "65%",
    minWidth: "65%",
    flexGrow: 1,
    aspectRatio: "1/1",
  },
  sidebarMenu: {
    alignSelf: "flex-start",
    marginBottom: 10,
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  container: {
    marginTop: theme.spacing(5),
  },
  forward: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    right: "10px",
    backgroundColor: "#eeeeee",
  },
  backward: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "10px",
    backgroundColor: "#eeeeee",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
  },
  dotContainer: {
    position: "absolute",
    bottom: "0px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15px",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "lightgray",
    margin: theme.spacing(1, 1, 0, 1),
    "&.active": {
      backgroundColor: "#4fc3f7",
    },
  },
  header: {
    display: "flex",
    position: "relative",
    padding: theme.spacing(2),
    alignItems: "center",
  },
  moreButton: {
    position: "absolute",
    width: "40px",
    height: "40px",
    top: 25,
    "&:focus $dropdown": {
      opacity: 1,
      transform: "translateY(0)",
      pointerEvents: "auto",
    },
  },
  dropdown: {
    position: "absolute",
    bottom: -102,
    right: 0,
    listStyle: "none",
    width: "135px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: "15px",
    border: "1px solid gray",
    transform: "translateY(-5px)",
    transition: "all 0.4s ease",
    backgroundColor: "#f7f1f0",
    opacity: 0,
    pointerEvents: "none",
  },
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "5px 6px",
    padding: "8px",
    borderRadius: "15px",
    "&:hover": {
      backgroundColor: theme.color.buttonHover,
    },
  },
  closeDialog: {
    position: "absolute",
    right: 15,
    top: 25,
  },
  avatar: {
    width: "50px",
    height: "50px",
    marginRight: "25px",
    cursor: "pointer",
  },
  content: {
    padding: theme.spacing(2),
    maxHeight: "610px",
    flexBasis: "610px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  textarea: {
    width: "100%",
    resize: "none",
    border: "none",
    outline: "none",
    backgroundColor: "white",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  timeAndtag: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentBox: {
    marginTop: theme.spacing(3),
  },
  eachComment: {
    display: "flex",
    position: "relative",
    margin: "40px 0px",
    "&:hover $deleteComment": {
      opacity: 1,
    },
  },
  commentAndtime: {
    display: "flex",
    flexDirection: "column",
  },
  deleteComment: {
    position: "absolute",
    bottom: 0,
    right: "5px",
    opacity: 0,
  },
  deleteBox: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  bottom: {
    marginTop: "auto",
  },
  iconBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
  },
  likebox: {
    display: "flex",
    alignItems: "center",
  },
  likeIcon: {
    fontSize: "40px",
    color: "red",
  },
  unLikeIcon: {
    fontSize: "40px",
  },
  favoriteIcon: {
    fontSize: "40px",
  },
  commentLoading: {
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "grid",
    placeItems: "center",
  },
  commentInput: {
    padding: "15px",
  },
}));
