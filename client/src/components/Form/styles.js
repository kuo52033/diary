import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    position: "relative",
    width: "100%",
    padding: theme.spacing(5, 2, 4, 2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
    margin: "20px 0px 5px 0px",
    display: "flex",
    justifyContent: "space-evenly",
  },
  imageInput: {
    display: "none",
  },
  textarea: {
    width: "100%",
    resize: "none",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid lightgray",
    borderRadius: "5px",
    "&:hover": {
      border: "1px solid black",
    },
    "&:focus": {
      outline: "none !important",
      border: `1px solid #115293`,
    },
  },
  imageButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.1)",
    },
  },
  imageContainer: {
    position: "relative",
    width: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      "& $imageAction": {
        opacity: 1,
      },
    },
  },
  imageList: {
    position: "relative",
    width: "100%",
    border: "1px solid lightgray",
    overflow: "hidden",
  },
  imageAction: {
    position: "absolute",
    width: "100%",
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
    backdropFilter: "blur(1px)",
    opacity: 0,
  },
  closeButton: {
    position: "absolute",
    top: "5px",
    right: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.1)",
    },
  },
  morePhoto: {
    position: "absolute",
    bottom: "5px",
    right: "15px",
  },
  circular: {
    position: "absolute",
    color: "gray",
    bottom: 35,
    right: 30,
  },
}));
