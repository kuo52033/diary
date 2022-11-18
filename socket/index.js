import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { error } from "console";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://determined-yalow-f69948.netlify.app",
    ],
  },
}); //因為socket-io不是真正的websocket協定，因此還是需要http來啟動server
const PORT = process.env.PORT || 5001;
const CORS_OPTIONS = {
  origin: [
    "http://localhost:3000",
    "https://determined-yalow-f69948.netlify.app",
    "https://cloudinary.com/",
  ],
};

app.use(cors(CORS_OPTIONS));

io.use((socket, next) => {
  if (socket.handshake.auth.user) {
    socket.user = socket.handshake.auth.user;
    next();
  } else {
    next(new error());
  }
});

io.on("connection", async (socket) => {
  socket.on("sendMessage", ({ chatId, receiveUser, content }) => {
    const receiver = fetchUserById(receiveUser);
    if (receiver)
      io.to(receiver.socketId).emit("getMessage", {
        chatId,
        sender: fetchUserBySocket(socket.id).user,
        content,
      });
  });

  socket.on("sendReadMessage", ({ chatId, receiveUser, sender }) => {
    const receiver = fetchUserById(receiveUser);
    if (receiver)
      io.to(receiver.socketId).emit("getReadMessage", {
        chatId,
        sender,
      });
  });

  socket.on("sendLeaveChat", ({ chatId, receiveUser }) => {
    const receiver = fetchUserById(receiveUser);
    if (receiver)
      io.to(receiver.socketId).emit("getLeaveChat", {
        chatId,
      });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("userDisconnect", {
      sender: socket.id,
    });
  });
});

const fetchUserById = (userId) => {
  const sockets = Array.from(io.sockets.sockets).map((socket) => {
    return { socketId: socket[0], user: socket[1].user };
  });
  return sockets.find((socket) => socket.user === userId);
};

const fetchUserBySocket = (socketId) => {
  const sockets = Array.from(io.sockets.sockets).map((socket) => {
    return { socketId: socket[0], user: socket[1].user };
  });

  return sockets.find((socket) => socket.socketId === socketId);
};

server.listen(PORT, () => {
  console.log(`socket server is running on port ${PORT}`);
});
