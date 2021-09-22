import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  ul: {
    justifyContent: "space-around",
  },
  paginate: {
    padding: theme.spacing(1),
    borderRadius: "18px",
    margin: "2rem",
    width: "360px",
  },
  circular: {
    color: "gray",
    position: "absolute",
    right: 0,
  },
}));
