const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { log } = require("console");

// vertically:^^^^^,horizontally:>>>>>>
const board=
[
[
  {color:"black",vertically:0,horizontally:7,pieces:"rook"},
  {color:"black",vertically:1,horizontally:7,pieces:"knight"},
  {color:"black",vertically:2,horizontally:7,pieces:"bishop"},
  {color:"black",vertically:3,horizontally:7,pieces:"queen"},
  {color:"black",vertically:4,horizontally:7,pieces:"king"},
  {color:"black",vertically:5,horizontally:7,pieces:"bishop"},
  {color:"black",vertically:6,horizontally:7,pieces:"knight"},
  {color:"black",vertically:7,horizontally:7,pieces:"rook"},
 ],
 [
  {color:"black",vertically:0,horizontally:6,pieces:"pawn"},
  {color:"black",vertically:1,horizontally:6,pieces:"pawn"},
  {color:"black",vertically:2,horizontally:6,pieces:"pawn"},
  {color:"black",vertically:3,horizontally:6,pieces:"pawn"},
  {color:"black",vertically:4,horizontally:6,pieces:"pawn"},
  {color:"black",vertically:5,horizontally:6,pieces:"pawn"},
  {color:"black",vertically:6,horizontally:6,pieces:"pawn"},
  {color:"black",vertically:7,horizontally:6,pieces:"pawn"},
 ],
 [
  {color:null,vertically:0,horizontally:5,pieces:null},
  {color:null,vertically:1,horizontally:5,pieces:null},
  {color:null,vertically:2,horizontally:5,pieces:null},
  {color:null,vertically:3,horizontally:5,pieces:null},
  {color:null,vertically:4,horizontally:5,pieces:null},
  {color:null,vertically:5,horizontally:5,pieces:null},
  {color:null,vertically:6,horizontally:5,pieces:null},
  {color:null,vertically:7,horizontally:5,pieces:null},
 ],
 [
  {color:null,vertically:0,horizontally:4,pieces:null},
  {color:null,vertically:1,horizontally:4,pieces:null},
  {color:null,vertically:2,horizontally:4,pieces:null},
  {color:null,vertically:3,horizontally:4,pieces:null},
  {color:null,vertically:4,horizontally:4,pieces:null},
  {color:null,vertically:5,horizontally:4,pieces:null},
  {color:null,vertically:6,horizontally:4,pieces:null},
  {color:null,vertically:7,horizontally:4,pieces:null},
 ],
 [
  {color:null,vertically:0,horizontally:3,pieces:null},
  {color:null,vertically:1,horizontally:3,pieces:null},
  {color:null,vertically:2,horizontally:3,pieces:null},
  {color:null,vertically:3,horizontally:3,pieces:null},
  {color:null,vertically:4,horizontally:3,pieces:null},
  {color:null,vertically:5,horizontally:3,pieces:null},
  {color:null,vertically:6,horizontally:3,pieces:null},
  {color:null,vertically:7,horizontally:3,pieces:null},
 ],
 [
  {color:null,vertically:0,horizontally:2,pieces:null},
  {color:null,vertically:1,horizontally:2,pieces:null},
  {color:null,vertically:2,horizontally:2,pieces:null},
  {color:null,vertically:3,horizontally:2,pieces:null},
  {color:null,vertically:4,horizontally:2,pieces:null},
  {color:null,vertically:5,horizontally:2,pieces:null},
  {color:null,vertically:6,horizontally:2,pieces:null},
  {color:null,vertically:7,horizontally:2,pieces:null},
 ],
 [
  {color:"white",vertically:0,horizontally:1,pieces:"pawn"},
  {color:"white",vertically:1,horizontally:1,pieces:"pawn"},
  {color:"white",vertically:2,horizontally:1,pieces:"pawn"},
  {color:"white",vertically:3,horizontally:1,pieces:"pawn"},
  {color:"white",vertically:4,horizontally:1,pieces:"pawn"},
  {color:"white",vertically:5,horizontally:1,pieces:"pawn"},
  {color:"white",vertically:6,horizontally:1,pieces:"pawn"},
  {color:"white",vertically:7,horizontally:1,pieces:"pawn"},
 ],
 [
  {color:"white",vertically:0,horizontally:0,pieces:"rook"},
  {color:"white",vertically:1,horizontally:0,pieces:"knight"},
  {color:"white",vertically:2,horizontally:0,pieces:"bishop"},
  {color:"white",vertically:3,horizontally:0,pieces:"queen"},
  {color:"white",vertically:4,horizontally:0,pieces:"king"},
  {color:"white",vertically:5,horizontally:0,pieces:"bishop"},
  {color:"white",vertically:6,horizontally:0,pieces:"knight"},
  {color:"white",vertically:7,horizontally:0,pieces:"rook"},
 ],
]
// let datas = {
//   from:{vertically:1,horizontally:0},
//   to:{vertically:1,horizontally:0}
// }

function allowBlackPawn(data) {
  console.log("kgfgsdhgfdsfdttsdytesaefdreas", data);
  // data = { vertically: 0, horizontally: 0 };
  let allow = [];
  if (data.vertically > 6) {
    return [];
  }
  if (board[data.vertically + 1][data.horizontally].color == null) {
    allow.push({
      vertically: data.vertically + 1,
      horizontally: data.horizontally,
    });
  }
  if (data.vertically < 6 &&
    board[data.vertically + 2][data.horizontally].color == null &&
    board[data.vertically + 1][data.horizontally].color == null &&
    board[data.vertically + 1][data.horizontally].isTouched == false
  ) {
    allow.push({
      vertically: data.vertically + 2,
      horizontally: data.horizontally,
    });
  }
  if (
    data.horizontally == 7 &&
    board[data.vertically][data.horizontally - 1].color == "white"
  ) {
    allow.push({
      vertically: data.vertically + 1,
      horizontally: data.horizontally - 1,
    });
  } else if (
    data.horizontally == 0 &&
    board[data.vertically][data.horizontally + 1].color == "white"
  ) {
    allow.push({
      vertically: data.vertically + 1,
      horizontally: data.horizontally + 1,
    });
  } else {
    if (data.horizontally > 0 && data.horizontally < 7) {
    if (board[data.vertically][data.horizontally + 1].color == "white") {
      allow.push({
        vertically: data.vertically + 1,
        horizontally: data.horizontally + 1,
      });
    }
    if (board[data.vertically][data.horizontally - 1].color == "white") {
      allow.push({
        vertically: data.vertically + 1,
        horizontally: data.horizontally - 1,
      });
    }
  }


  }
  return allow
}

function step(data) {
  // if (board[data.to.horizontally][data.from.vertically].color== board[data.from.horizontally][data.from.vertically].color) {
  // 			throw new HttpException(400, 'you cannot perform this step');
  // }
  console.log("start", board[data.to.vertically][data.to.horizontally].color);
  board[data.to.vertically][data.to.horizontally].color =
    board[data.from.vertically][data.from.horizontally].color;
  board[data.to.vertically][data.to.horizontally].pieces =
    board[data.from.vertically][data.from.horizontally].pieces;
  board[data.from.vertically][data.from.horizontally].color = null;
  board[data.from.vertically][data.from.horizontally].pieces = null;
  console.log(board[data.to.vertically][data.to.horizontally].color);
  // console.log(  board[data.from.horizontally][data.from.vertically]);
  return board;
}

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("start", (data) => {
    socket.join(board);
    socket.emit("receive_start", board);
  });

  socket.on("step", (data) => {
    // socket.to(data.room).emit("receive_message", data);
    if (board[data.from.vertically][data.from.horizontally].pieces == "pawn") {
      console.log(
        "bâ",
        allowBlackPawn({
          vertically: data.from.vertically,
          horizontally: data.from.horizontally,
        })
      );
    }
    step(data);
    // console.log(board);
    // console.log(data);
    socket.emit("receive_step", board);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

// if (
//   board[vertically + 1][horizontally + 1].color == "white" &&
//   board[vertically + 1][horizontally].color == null &&
//   board[vertically + 1][horizontally].isTouched == false
// ) {
//   allow.push({ vertically: vertically + 2, horizontally });
// }

// if (board[vertically + 1][horizontally].color == null) {
//   allow.push({ vertically: vertically + 1, horizontally });
// }

// if (
//   Math.abs(data.to.vertically - data.from.vertically) == 1 &&
//   data.to.horizontally == data.from.horizontally &&
//   board[data.to.horizontally][data.to.vertically].color == null
// ) {
//   allow.push(data);
// }

// if (
//   board[data.to.horizontally][data.to.vertically].color ==
//   board[data.from.horizontally][data.from.vertically].color
// ) {
//   return false;
// }
// if (Math.abs(data.from.vertically - data.to.vertically) != 1) {
//   if (Math.abs(data.from.vertically - data.to.vertically) != 2) {
//     return false;
//   }

//   return false;
// }
// if (data.from.horizontally != data.to.horizontally) {
//   if (Math.abs(data.from.horizontally - data.to.horizontally) !== 1) {
//   }
//   return false;
// }
