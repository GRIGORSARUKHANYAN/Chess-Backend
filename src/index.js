const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { ChessBoard } = require("./classes/ChessBoard");

app.use(cors());

const board = new ChessBoard();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const allPlayers = [];

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  allPlayers.push(socket.id);

  socket.on("start", _ => {
    for (let i = 0; i < allPlayers.length; i++) {
      socket.to(allPlayers[i]).emit("receive_step", board.board);
    }
    if (allPlayers.length) {
      socket.emit("receive_step", board.board);
    }
  });

  socket.on("step", (data) => {});
  socket.on("allow", (data) => {});

  socket.on("disconnect", () => {
    // do any task when player disconected
  });
});

server.listen(3001, () => {
  console.clear();
  console.log("SERVER IS RUNNING");
});