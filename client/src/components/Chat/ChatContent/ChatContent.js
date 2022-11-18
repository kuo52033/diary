import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

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

import { getAllMessages, sendMessage, updateRead } from "../../../api/index";

export const renderMessageTime = (time) => {
  return moment(new Date()).format("YYYY年MM月DD日") ===
    moment(time).format("YYYY年MM月DD日")
    ? moment(time).format("ah:mm")
    : moment(time).isSame(new Date(), "year")
    ? moment(time).format("MM月DD日ah:mm")
    : moment(time).format("YYYY年MM月DD日ah:mm");
};

const ChatContent = ({ currentChat, mySocket, setAllChats }) => {
  const classes = useStyle();
  const [chatContent, setChatContent] = useState("");
  const [AllMessages, setAllMessages] = useState([]);
  const { myData: user } = useSelector((state) => state.auth);
  const receiver = currentChat?.members.find((m) => m._id !== user._id);
  const lastest = useRef();
  const lastChat = useRef();

  const renderMessage = (message, index) => {
    const sender = message.senderId === user._id;
    const avatarMessage =
      (!AllMessages[index + 1] ||
        AllMessages[index + 1].senderId === user._id) &&
      !sender;

    return (
      <Box
        className={`${classes.messageBox} ${sender && classes.messageBoxMe} ${
          !avatarMessage && !sender && classes.messageLeftMargin
        }`}
        key={message._id}
      >
        <Box className={classes.avatarAndMessageBox}>
          {avatarMessage && (
            <Avatar
              className={classes.avatar}
              src={
                receiver?.avatar?.url ||
                "https://res.cloudinary.com/dhawohjee/image/upload/v1648186493/diary/default_avatar_ip9dhd.png"
              }
            />
          )}
          <Box
            className={`${classes.message} ${
              sender ? classes.messageMe : classes.messageOther
            }`}
          >
            {message.content}
          </Box>
        </Box>
        <Box className={`${classes.time} ${sender && classes.timeMe}`}>
          {sender && (
            <div style={{ alignSelf: "flex-end" }}>
              {message.read && "已讀"}
            </div>
          )}

          {renderMessageTime(message.createdAt)}
        </Box>
      </Box>
    );
  };

  const handleSubmit = async () => {
    mySocket.sendMessage(currentChat._id, receiver._id, chatContent);
    setAllMessages((pre) => [
      ...pre,
      {
        senderId: user._id,
        content: chatContent,
        _id: Math.random() * 10000,
        createdAt: new Date(),
      },
    ]);
    setAllChats((pre) => {
      const filterChats = pre.filter((c) => c._id !== currentChat._id);
      return [
        {
          ...currentChat,
          lastestMessage: { content: chatContent, createdAt: new Date() },
        },
        ...filterChats,
      ];
    });
    setChatContent("");
    try {
      await sendMessage(currentChat._id, user._id, chatContent);
    } catch (error) {
      console.log(error); //change
    }
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  };

  //fetch the messages in this chat
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await getAllMessages(currentChat._id);
      setAllMessages(data);
    };

    if (currentChat) fetchMessages();

    return () => {
      setAllMessages([]);
    };
  }, [currentChat]);

  //read the message and send data to the friend if enter the chat room or leave the chat room
  useEffect(() => {
    const { sendReadMessage, sendLeaveChat, socketId } = mySocket;
    console.log(socketId);
    if (currentChat) {
      console.log("sendread: ", receiver._id);
      updateRead(currentChat._id, receiver._id);
      sendReadMessage(currentChat._id, receiver._id, socketId);
      lastChat.current = {
        chatId: currentChat._id,
        receiverId: receiver._id,
      };
    }

    return () => {
      if (lastChat.current || lastChat.current?.chatId !== currentChat?._id) {
        console.log("send leave:", lastChat.current.receiverId);
        sendLeaveChat(lastChat.current.chatId, lastChat.current.receiverId);
      }
    };
  }, [currentChat, receiver, user]);

  useEffect(() => {
    if (currentChat) {
      const currentRead = mySocket.read?.find(
        (c) => c.chatId === currentChat._id
      )?.read;
      if (currentRead) {
        setAllMessages((pre) =>
          pre.map((each) => (!each.read ? { ...each, read: true } : each))
        );
      }
    }
  }, [currentChat, mySocket.read, mySocket.receive]);

  useEffect(() => {
    if (currentChat && currentChat._id === mySocket.receive?.chatId) {
      const { sender, content } = mySocket.receive;
      setAllMessages((pre) => [
        ...pre,
        {
          senderId: sender,
          content,
          _id: Math.random() * 10000,
          createdAt: new Date(),
        },
      ]);
    }
  }, [mySocket.receive, currentChat]);

  useEffect(() => {
    if (currentChat) lastest.current.scrollIntoView();
  }, [mySocket.receive, currentChat, AllMessages]);

  return (
    <Box className={classes.chatContentBox}>
      <Box className={classes.chatContentTop}>
        <Typography style={{ fontWeight: "bold" }}>{receiver?.name}</Typography>
      </Box>
      <Box className={classes.chatContentScroll}>
        {AllMessages.map((message, index) => {
          return renderMessage(message, index);
        })}
        <div style={{ height: "1px", width: "100%" }} ref={lastest} />
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
          onKeyPress={handleKeyPress}
          disabled={!Boolean(currentChat)}
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
