import { useEffect } from "react";
import { useSelector } from "react-redux";

import useStyle from "./styles";
import { Avatar, Box, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircleOutline";

import { getAllChats } from "../../../api";
import { renderMessageTime } from "../ChatContent/ChatContent";

const ChatList = ({
  currentChat,
  setCurrentChat,
  mySocket,
  allChats,
  setAllChats,
}) => {
  const classes = useStyle();
  const { myData: user } = useSelector((state) => state.auth);

  const renderChat = (chat) => {
    const receiver = chat.members?.find((m) => m._id !== user._id);
    return (
      <Box
        className={`${classes.chatBox} ${
          currentChat?._id === chat._id && classes.currentChat
        }`}
        key={chat._id}
        onClick={() => setCurrentChat(chat)}
      >
        <Avatar
          src={
            receiver?.avatar?.url ||
            "https://res.cloudinary.com/dhawohjee/image/upload/v1648186493/diary/default_avatar_ip9dhd.png"
          }
          className={classes.avatar}
        />
        <Box className={classes.contentBox}>
          <Typography style={{ fontWeight: "bold" }}>
            {receiver.name}
          </Typography>
          <Box className={classes.MessageAndTimeBox}>
            <Typography variant="caption" color="textSecondary">
              {chat.lastestMessage?.content.length > 8
                ? `${chat.lastestMessage?.content.slice(0, 8)}....`
                : chat.lastestMessage?.content}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {chat.lastestMessage?.createdAt &&
                renderMessageTime(chat.lastestMessage?.createdAt)}
            </Typography>
          </Box>
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
  }, [user, setAllChats]);

  useEffect(() => {
    if (mySocket.receive) {
      setAllChats((pre) => {
        const { chatId, content } = mySocket.receive;
        const filterChats = pre.filter((c) => c._id !== chatId);
        const receiveChat = pre.find((p) => p._id === chatId);
        return [
          {
            ...receiveChat,
            lastestMessage: { content, createdAt: new Date() },
          },
          ...filterChats,
        ];
      });
    }
  }, [mySocket.receive, setAllChats]);

  return (
    <Box className={classes.chatListBox}>
      <Box
        style={{
          padding: "5px 25px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
        }}
      >
        <AddIcon
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
