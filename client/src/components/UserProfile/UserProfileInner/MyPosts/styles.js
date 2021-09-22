import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  skeleton: {
    borderRadius: "15px",
    width: "200px",
    height: "300px",
    marginTop: theme.spacing(3),
  },
  postContainer: {
    position: "relative",
    cursor: "pointer",
    "&:hover $imageAction": {
      opacity: 1,
    },
  },
  img: {
    width: "100%",
    aspectRatio: "1/1",
    objectFit: "cover",
    objectPosition: "center",
  },
  imageAction: {
    position: "absolute",
    width: "100%",
    top: 0,
    bottom: 5,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    backdropFilter: "blur(2px)",
    opacity: 0,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    width: "15%",
    fontSize: "35px",
  },
}));
