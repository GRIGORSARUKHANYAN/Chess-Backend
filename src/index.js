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
    
    const fromI = from.vertically;
    const fromJ = from.horizontally;

    const board = chessBoard.board;
    const whoseMove = chessBoard.whoseMove;

    let result = false;
    
    if (board[fromI][fromJ].color === whoseMove) {
      const moves = chessBoard.whereCanMove(fromI, fromJ);

      if (moves.length > 0) {
        const toI = to.vertically;
        const toJ = to.horizontally;
        
        for (let i = 0; i < moves.length; ++i) {
          const everyCanMove = moves[i];
          if (everyCanMove.vertically === toI && everyCanMove.horizontally === toJ) {
            chessBoard.moveFigure(from, to);
            result = chessBoard.board;
            break;
          }
        }
      }
    }

    socket.emit("receive_step", result);
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
  console.log('\n\n\n========- SERVER IS RUNNING -========\n');
});