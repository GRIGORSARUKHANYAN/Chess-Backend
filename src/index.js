const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { ChessBoard } = require("./classes/ChessBoard");

app.use(cors());

const chessBoard = new ChessBoard();

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
    for (let i = 0; i < allPlayers.length; ++i) {
      socket.to(allPlayers[i]).emit("receive_step", chessBoard.board);
    }
    if (allPlayers.length) {
      socket.emit("receive_step", chessBoard.board);
    }
  });

  socket.on("step", (data) => {
    const {from, to} = data;

    // check figure type
    // check can move
    // if not, emit(false)
    // else send board where moved

    socket.emit("receive_step", false);
  });

  socket.on("showMoves", (figureFrom) => {
    const {vertically, horizontally} = figureFrom;
    let recieve_result = false;
    
    const board = chessBoard.board;
    const whoseMove = chessBoard.whoseMove;

    if (board[vertically][horizontally].color === whoseMove) {
      recieve_result = chessBoard.whereCanMove(vertically, horizontally);
    }

    socket.emit("receive_showMoves", recieve_result);
  });

  socket.on("disconnect", () => {
    // do any task when player disconnected
  });
});

server.listen(3001, () => {
  console.log('\n\n\n==================\n\n\n');
  console.log("SERVER IS RUNNING");
});