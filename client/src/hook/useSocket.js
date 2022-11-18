import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState();
  const [receive, setreceive] = useState(null);
  const [read, setRead] = useState([]);
  const { myData: user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && !socket) {
      const so = io("ws://localhost:5001", { auth: { user: user._id } });
      so.on("connect", () => {
        setSocket(so);
        setSocketId(so.id);
      });
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

      socket.on("getReadMessage", ({ chatId, sender }) => {
        setRead((pre) => {
          const existChat = pre.find((each) => each.chatId === chatId);
          if (existChat) {
            return pre.map((each) =>
              each.chatId === chatId ? { ...each, read: true, sender } : each
            );
          } else {
            return [...pre, { chatId, read: true, sender }];
          }
        });
      });

      socket.on("getLeaveChat", ({ chatId }) => {
        setRead((pre) => {
          return pre.map((each) =>
            each.chatId === chatId ? { ...each, read: false } : each
          );
        });
      });

      socket.on("userDisconnect", ({ sender }) => {
        setRead((pre) => {
          return pre.map((each) =>
            each.sender === sender ? { ...each, read: false } : each
          );
        });
      });
    }
  }, [socket]);

  console.log(read);

  const sendMessage = (chatId, receiveUser, content) => {
    socket.emit("sendMessage", { chatId, receiveUser, content });
  };

  const sendReadMessage = (chatId, receiveUser, sender) => {
    socket.emit("sendReadMessage", { chatId, receiveUser, sender });
  };

  const sendLeaveChat = (chatId, receiveUser) => {
    socket.emit("sendLeaveChat", { chatId, receiveUser });
  };

  return {
    sendMessage,
    sendReadMessage,
    sendLeaveChat,
    receive,
    read,
    socketId,
  };
};

export default useSocket;
