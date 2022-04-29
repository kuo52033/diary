import React, { useEffect, useState } from "react";
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

import { getAllMessages, sendMessage } from "../../../api/index";

const ChatContent = ({ currentChat }) => {
  const classes = useStyle();
  const [chatContent, setChatContent] = useState("");
  const [AllMessages, setAllMessages] = useState([]);
  const { myData: user } = useSelector((state) => state.auth);
  const receiver = currentChat?.members.find((m) => m._id !== user._id);

  const renderMessage = (message) => {
    return (
      <Box
        className={`${classes.message} ${
          message.senderId === user._id
            ? classes.messageMe
            : classes.messageOther
        }`}
        key={message._id}
      >
        {message.content}
      </Box>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await sendMessage(currentChat._id, user._id, chatContent);
    console.log(data);
    setAllMessages((pre) => [...pre, data]);
    setChatContent("");
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await getAllMessages(currentChat._id);
      setAllMessages(data);
    };
    if (currentChat) fetchMessages();
  }, [currentChat]);

  return (
    <Box className={classes.chatContentBox}>
      <Box className={classes.chatContentTop}>
        <Avatar
          className={classes.topAvatar}
          src={
            receiver?.avatar.url ||
            "https://res.cloudinary.com/dhawohjee/image/upload/v1648186493/diary/default_avatar_ip9dhd.png"
          }
        />
        <Typography style={{ fontWeight: "bold" }}>{receiver?.name}</Typography>
      </Box>
      <Box className={classes.chatContentScroll}>
        {AllMessages.map((message) => {
          return renderMessage(message);
        })}
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
              <Button disabled={!Boolean(chatContent)} onClick={handleSubmit}>
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
