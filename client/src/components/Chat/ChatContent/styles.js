import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  chatContentBox: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  chatContentTop: {
    display: "flex",
    alignItems: "center",
    padding: "5px 25px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
  },
  topAvatar: {
    border: "1px solid rgba(0, 0, 0, 0.1)",
    marginRight: "15px",
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
  message: {
    width: "fit-content",
    maxWidth: "45%",
    padding: "15px",
    margin: "10px 20px",
    borderRadius: "20px",
  },
  messageMe: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  messageOther: {
    backgroundColor: "rgba(255,255,255,0.5)",
  },
}));
