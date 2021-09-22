import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  skeletonCard: {
    width: "100%",
    height: "388px",
    borderRadius: "15px",
    backgroundColor: "white",
    [theme.breakpoints.down("lg")]: {
      height: "369px",
    },
    [theme.breakpoints.down("md")]: {
      height: "440px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "85%",
      marginLeft: "25px",
      height: "390px",
    },
  },
  skeletonText: {
    marginTop: "42px",
    marginLeft: "42px",
  },
  skeletonText2: {
    marginTop: "1rem",
    marginLeft: "42px",
  },
}));
