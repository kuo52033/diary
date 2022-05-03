import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Container, Box } from "@material-ui/core";

import ChatList from "./ChatList/ChatList";
import ChatContent from "./ChatContent/ChatContent";

const Chat = ({ mySocket }) => {
  const [currentChat, setCurrentChat] = useState(null);
  const [allChats, setAllChats] = useState([]);
  const { myData: user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/posts" />;

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        backgroundColor: "#f2eaed",
        marginTop: "50px",
        height: "90vh",
        border: "1px solid grey",
        borderRadius: "9px",
        padding: 0,
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box style={{ flex: "0 0 30%" }}>
        <ChatList
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          mySocket={mySocket}
          allChats={allChats}
          setAllChats={setAllChats}
        />
      </Box>
      <Box style={{ flex: "0 0 70%" }}>
        <ChatContent
          currentChat={currentChat}
          mySocket={mySocket}
          setAllChats={setAllChats}
        />
      </Box>
    </Container>
  );
};

export default Chat;
