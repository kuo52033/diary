import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  sidebarMenu: {
    position: "absolute",
    top: "13px",
    left: "32px",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  background: {
    flexGrow: 1,
    height: "100vh",
    position: "relative",
    display: "grid",
    placeItems: "center",
  },
  paper: {
    display: "grid",
    placeItems: "center",
    padding: theme.spacing(4),
    // backdropFilter: "blur(5px)",
    // backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: "10px",
    border: "2px solid lightgray",
    width: "500px",
    [theme.breakpoints.down("sm")]: {
      width: "400px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "280px",
    },
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(4, 0, 4),
    padding: theme.spacing(1, 0, 1, 0),
  },
  Button: {
    margin: theme.spacing(4, 0, 3),
    padding: theme.spacing(1, 0, 1, 0),
  },
  title: {
    backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(7px)",
    padding: theme.spacing(1, 3, 1, 3),
    outline: "1px solid white",
    color: "white",
    outlineOffset: "-4px",
    margin: theme.spacing(2, 0, 2, 0),
  },
  error: {
    position: "absolute",
    top: "5%",
    zIndex: "10",
  },
}));
