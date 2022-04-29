import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import useStyle from "./styles";
import { Avatar, Box, Typography } from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { getAllChats } from "../../../api";

const ChatList = ({ setCurrentChat }) => {
  const classes = useStyle();
  const [allChats, setAllChats] = useState([]);
  const { myData: user } = useSelector((state) => state.auth);

  const renderChat = (chat) => {
    const receiver = chat.members.find((m) => m._id !== user._id);
    return (
      <Box
        className={classes.chatBox}
        key={chat._id}
        onClick={() => setCurrentChat(chat)}
      >
        <Avatar
          src={
            receiver?.avatar.url ||
            "https://res.cloudinary.com/dhawohjee/image/upload/v1648186493/diary/default_avatar_ip9dhd.png"
          }
          className={classes.avatar}
        />
        <Box>
          <Typography style={{ fontWeight: "bold" }}>
            {receiver.name}
          </Typography>
          <Typography variant="caption">message......</Typography>
        </Box>
      </Box>
    );
  };

  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await getAllChats(user._id);
      setAllChats(data);
    };

    fetchChats();
  }, [user]);
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
        {allChats.map((chat) => {
          return renderChat(chat);
        })}
      </Box>
    </Box>
  );
};

export default ChatList;
