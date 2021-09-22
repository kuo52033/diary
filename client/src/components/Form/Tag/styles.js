import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  "@keyframes errorInput": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "25%": {
      transform: "rotate(5deg)",
    },
    "50%": {
      transform: "rotate(-5deg)",
    },
    "75%": {
      transform: "rotate(5deg)",
    },
    "100%": {
      transform: "rotate(0deg)",
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: "15px 0px",
  },
  textfield: {
    border: "1px solid lightgray",
    borderRadius: "17px",
    padding: "2px 3px 2px 10px",
    width: "80px",
    marginLeft: "6px",
    "&.error": {
      animation: "$errorInput .5s",
    },
    "&.Mui-focused": {
      border: "1px solid #115293",
    },
    "&.Mui-error": {
      border: "1px solid red",
    },
  },
}));
