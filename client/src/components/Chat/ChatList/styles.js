import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  chatListBox: {
    borderRight: "1px solid gray",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  chatScrollBox: { height: "100%", overflow: "auto" },
  chatBox: {
    display: "flex",
    alignItems: "center",
    padding: "8px 25px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.6)",
    },
  },
  currentChat: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    pointerEvents: "none",
  },
  avatar: {
    border: "1px solid rgba(0, 0, 0, 0.1)",
    width: "45px",
    height: "45px",
    marginRight: "15px",
  },
  contentBox: {
    flex: 1,
  },
  MessageAndTimeBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
