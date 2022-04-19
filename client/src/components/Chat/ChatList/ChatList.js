import React from "react";
import { useSelector } from "react-redux";

import useStyle from "./styles";
import { Avatar, Box, Typography } from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ChatList = () => {
  const classes = useStyle();
  const { myData: user } = useSelector((state) => state.auth);

  const renderChat = () => {
    return (
      <Box className={classes.chatBox}>
        <Avatar src={user.avatar} className={classes.avatar} />
        <Box>
          <Typography style={{ fontWeight: "bold" }}>郭峻維</Typography>
          <Typography variant="caption">message......</Typography>
        </Box>
      </Box>
    );
  };
  return (
    <Box className={classes.chatListBox}>
      <Box
        style={{
          padding: "5px 25px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
        }}
      >
        <AddCircleOutlineIcon
          fontSize="large"
          style={{ color: "gray", cursor: "pointer" }}
        />
      </Box>
      <Box className={classes.chatScrollBox}>
        {renderChat()}
        {renderChat()}
        {renderChat()}
        {renderChat()}
        {renderChat()}
        {renderChat()}
        {renderChat()}
        {renderChat()}
        {renderChat()}
        {renderChat()}
        {renderChat()}
        {renderChat()}
        {renderChat()}
        {renderChat()}
        {renderChat()}
      </Box>
    </Box>
  );
};

export default ChatList;
