import React, { useState } from "react";

import useStyle from "./styles";
import { Container, Box } from "@material-ui/core";

import ChatList from "./ChatList/ChatList";
import ChatContent from "./ChatContent/ChatContent";

const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null);

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
        <ChatList setCurrentChat={setCurrentChat} />
      </Box>
      <Box style={{ flex: "0 0 70%" }}>
        <ChatContent currentChat={currentChat} />
      </Box>
    </Container>
  );
};

export default Chat;
