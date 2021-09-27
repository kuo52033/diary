import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  outerBox: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    padding: "15px",
  },
  closeButton: {
    alignSelf: "flex-end",
    margin: "0 0 10px 0",
  },
  backButton: {
    position: "absolute",
    left: 5,
    top: 12,
  },
  fontBold: {
    fontWeight: "bold",
  },
  eachBox: {
    display: "flex",
    flexDirection: "column",
  },
  eachDetailBox: {
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    height: "150px",
    width: "150px",
    border: "1px solid white",
  },
  imageLoading: {
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    height: "150px",
    width: "150px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  boxTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  imageInput: {
    display: "none",
  },
  editLabel: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "36px",
    width: "64px",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer",
    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.standard,
    }),
    "&.disable": {
      pointerEvents: "none",
      opacity: 0.8,
    },
  },
  editButton: {
    backgroundColor: theme.color.button,
    "&:hover": {
      backgroundColor: theme.color.buttonHover,
    },
  },
  divider: {
    margin: "18px 0px",
  },
  nameBox: {
    padding: "5px",
    textAlign: "center",
  },
  personalProfile: {
    padding: "15px",
    textAlign: "center",
  },
  textfield: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  saveButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "55%",
    marginTop: "10px",
  },
  chipContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "40px",
  },
  eachChip: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: "6px",
    padding: "6px 10px",
    width: "fit-content",
  },
  deleteButton: {
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
  marginRight: {
    marginRight: "7px",
  },
  mgl: {
    marginLeft: "8px",
  },
}));
