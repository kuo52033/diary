import React, { useState } from "react";
import { useSelector } from "react-redux";

import useStyle from "./styles";
import {
  Avatar,
  Box,
  Typography,
  InputBase,
  InputAdornment,
  Button,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const ChatContent = () => {
  const classes = useStyle();
  const [chatContent, setChatContent] = useState("");
  const { myData: user } = useSelector((state) => state.auth);

  const renderMessage = (me) => {
    return (
      <Box
        className={`${classes.message} ${
          me ? classes.messageMe : classes.messageOther
        }`}
      >
        ㄚㄚㄚ嘓嘓ㄚㄚㄚ嘓嘓ㄚㄚㄚ
      </Box>
    );
  };

  return (
    <Box className={classes.chatContentBox}>
      <Box className={classes.chatContentTop}>
        <Avatar className={classes.topAvatar} src={user.avatar} />
        <Typography style={{ fontWeight: "bold" }}>郭峻維</Typography>
      </Box>
      <Box className={classes.chatContentScroll}>
        {renderMessage(false)}
        {renderMessage(true)}
        {renderMessage(false)}
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <InputBase
          className={classes.chatInput}
          required
          name="comment"
          autoComplete="off"
          placeholder="訊息。。。"
          value={chatContent}
          onChange={(e) => setChatContent(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <Button disabled={!Boolean(chatContent)}>
                <SendIcon />
              </Button>
            </InputAdornment>
          }
        />
      </Box>
    </Box>
  );
};

export default ChatContent;
