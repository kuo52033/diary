import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  chatContentBox: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  chatContentTop: {
    height: "51px",
    padding: "13px 25px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
  },
  avatar: {
    marginLeft: "10px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
  },
  chatContentScroll: {
    flex: "1",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
  },
  chatInput: {
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: "40px",
    padding: "8px 15px",
    width: "85%",
  },
  messageBox: {
    display: "flex",
    maxWidth: "75%",
  },
  messageBoxMe: {
    alignSelf: "flex-end",
  },
  avatarAndMessageBox: {
    display: "flex",
    alignItems: "center",
  },
  messageLeftMargin: {
    marginLeft: "49px ",
  },
  message: {
    wordBreak: "break-all",
    width: "fit-content",
    padding: "15px",
    borderRadius: "20px",
  },
  messageMe: {
    margin: "10px 20px 10px 0",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  messageOther: {
    margin: "10px 0 10px 10px",
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  time: {
    whiteSpace: "nowrap",
    fontSize: "10px",
    color: "gray",
    fontWeight: "lighter",
    alignSelf: "flex-end",
    marginBottom: "10px",
    marginLeft: "5px",
  },
  timeMe: {
    display: "flex",
    flexDirection: "column",
    marginRight: "5px",
    order: -1,
  },
}));
