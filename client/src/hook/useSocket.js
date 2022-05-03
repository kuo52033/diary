import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [receive, setreceive] = useState(null);
  const [read, setRead] = useState([]);
  const { myData: user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && !socket) {
      const so = io("ws://localhost:5001", { auth: { user: user._id } });

      setSocket(so);
    }
    if (socket && !user) {
      socket.disconnect();
      setSocket(null);
    }
  }, [socket, user]);

  useEffect(() => {
    if (socket) {
      socket.on("getMessage", ({ chatId, sender, content }) => {
        setreceive({ chatId, sender, content });
      });

      socket.on("getReadMessage", ({ chatId }) => {
        setRead((pre) => {
          return [...pre, { chatId, read: true }];
        });
      });

      socket.on("getLeaveChat", ({ chatId }) => {
        setRead((pre) => {
          return pre.map((each) =>
            each.chatId === chatId ? { chatId, read: false } : each
          );
        });
      });
    }
  }, [socket]);

  const sendMessage = (chatId, receiveUser, content) => {
    socket.emit("sendMessage", { chatId, receiveUser, content });
  };

  const sendReadMessage = (chatId, receiveUser) => {
    socket.emit("sendReadMessage", { chatId, receiveUser });
  };

  const sendLeaveChat = (chatId, receiveUser) => {
    socket.emit("sendLeaveChat", { chatId, receiveUser });
  };

  return { sendMessage, sendReadMessage, sendLeaveChat, receive, read };
};

export default useSocket;
