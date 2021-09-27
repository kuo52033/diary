import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  paper: {
    padding: "20px 20px 0px 20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    backgroundColor: "#f7f1f0",
    "&.MuiPaper-rounded": {
      borderRadius: 0,
    },
  },
  containerTop: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    position: "relative",
    minHeight: "204px",
    width: "100%",
    "&.active": {
      minHeight: "310px",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  avatarBox: {
    position: "relative",
    marginRight: "50px",
    alignSelf: "flex-start",
    [theme.breakpoints.down("xs")]: {
      alignSelf: "center",
      marginRight: 0,
    },
  },
  userAvatar: {
    height: "200px",
    width: "200px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "1px solid white",
  },
  imageLoading: {
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    height: "200px",
    width: "200px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  allProfileBox: {
    flexBasis: "350px",
    display: "flex",
    position: "relative",
    justifyContent: "flex-start",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      flexBasis: "0px",
      alignItems: "center",
    },
  },
  profileSection: {
    margin: "16px 0px",
    flexBasis: "70px",
    [theme.breakpoints.down("xs")]: {
      margin: "30px 0px",
      flexBasis: "0px",
    },
  },
  sidebarMenu: {
    position: "absolute",
    top: "13px",
    left: "32px",
    zIndex: "25",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "100vh",
  },
  updateButton: {
    position: "absolute",
    bottom: "-65px",
    right: "4px",
    backgroundColor: theme.color.button,
    borderRadius: "6px",
    "&:hover": {
      backgroundColor: theme.color.buttonHover,
    },
  },
  list: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      alignSelf: "flex-start",
    },
  },
  listItem: {
    color: "lightgray",
  },
  listItemActive: {
    color: "black",
  },
  imageInput: {
    display: "none",
  },
  imageInputLabel: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40px",
    width: "40px",
    borderRadius: "50%",
    border: "1px solid black",
    right: "12px",
    bottom: "10px",
    backgroundColor: theme.color.button,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.color.buttonHover,
    },
    "&.disable": {
      pointerEvents: "none",
      opacity: 0.8,
    },
  },
  moreDetailsBox: {
    display: "flex",
    marginTop: "auto",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "4px",
    padding: "3px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
  detailsBox: {
    display: "flex",
    visibility: "hidden",
    position: "absolute",
    opacity: 0,
    flexDirection: "column",
    marginBottom: "10px",
    "&.active": {
      opacity: 1,
      visibility: "visible",
      position: "relative",
      transition: theme.transitions.create(["visibility", "opacity"], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeInOut,
        delay: "180ms",
      }),
    },
  },
  eachDetail: {
    display: "flex",
    marginBottom: "8px",
  },
  mgl: {
    marginLeft: "8px",
  },
}));
