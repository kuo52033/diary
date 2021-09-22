import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    position: "sticky",
    top: 0,
    display: "flex",
    minWidth: "230px",
    maxWidth: "230px",
    height: "100vh",
    flexDirection: "column",
    backgroundColor: theme.color.navbar,
    "&.active": {
      minWidth: "90px",
      maxWidth: "90px",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  appbar2: {
    position: "sticky",
    top: 0,
    display: "flex",
    minWidth: "230px",
    maxWidth: "230px",
    height: "100vh",
    flexDirection: "column",
    backgroundColor: theme.color.navbar,
    overflowX: "hidden",
  },
  menu: {
    position: "absolute",
    top: "12px",
    left: "12px",
    zIndex: 125,
  },
  brandContainer: {
    alignSelf: "center",
    marginTop: "80px",
    marginBottom: "25px",
    "&.active": {
      display: "none",
    },
  },
  userAvatarBox: {
    width: "70%",
    alignSelf: "center",
    padding: theme.spacing(1, 2, 1, 2),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.color.button,
    border: "1px solid black",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.color.text,
    "&.active": {
      marginTop: "80px",
      "& $avatarName": {
        display: "none",
      },
      "& $userAvatar": {
        marginRight: "0px",
      },
    },
  },
  userAvatar: {
    fontSize: "13px",
    marginRight: "10px",
    border: "1px solid white",
  },
  avatarName: {
    fontFamily: "inherit",
  },
  listLink: {
    textDecoration: "none",
  },
  listItem: {
    display: "flex",
    justifyContent: "center",
    padding: "10px 20px",
    color: theme.color.text,
    "&.page": {
      backgroundColor: theme.color.navbarItem,
      // borderRight: "3px solid #f44336",
    },
    "&.active": {
      padding: "10px 0px",
    },
  },
  listItemHover: {
    "&:hover": {
      backgroundColor: theme.color.buttonHover,
    },
  },
  listItemBox: {
    width: "70%",
    display: "flex",
    "&.active": {
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  listIcon: {
    marginRight: "40px",
    color: theme.color.text,
    "&.active": {
      marginRight: 0,
      marginBottom: "5px",
    },
  },
  listMain: {},
}));
