import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  alert: {
    width: "180px",
    animation: "$alertTrans 4s forwards",
    marginBottom: "20px",
  },
  "@keyframes alertTrans": {
    "0%": {
      opacity: 1,
    },
    "75%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0,
    },
  },
}));
