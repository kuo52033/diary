import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  navbarSearch: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flex: 1,
    "&.active": {
      display: "flex",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  sidebarMenu: {
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  searchIcon: {
    [theme.breakpoints.up("md")]: {
      pointerEvents: "none",
    },
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    borderRadius: "15px",
    border: "1px solid gray",
    backgroundColor: "white",
    padding: "3px 8px",
    marginRight: "15px",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    backdropFilter: "blur(5px)",
    position: "sticky",
    padding: theme.spacing(1),
    top: 0,
    zIndex: 100,
    [theme.breakpoints.down("md")]: {
      justifyContent: "flex-start",
    },
  },
  menuItem: {
    "&:focus": {
      backgroundColor: "#e2baba",
    },
  },
  searchButton: {
    backgroundColor: theme.color.button,
    color: theme.color.text,
    marginRight: "10px",
    "&:hover": {
      backgroundColor: theme.color.buttonHover,
    },
  },
  createButton: {
    marginLeft: "auto",
    marginRight: "30px",
    backgroundColor: theme.color.button,
    color: theme.color.text,
    "&:hover": {
      backgroundColor: theme.color.buttonHover,
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  userIcon: {
    padding: theme.spacing(1, 2, 1, 2),
    backgroundColor: theme.color.button,
    borderRadius: "10px",
    border: "1px solid lightgray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: theme.color.text,

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
