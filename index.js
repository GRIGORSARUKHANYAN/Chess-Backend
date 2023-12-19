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


function step(data) {
  console.log(data,"gh");
// if (board[data.to.horizontally][data.from.vertically].color== board[data.from.horizontally][data.from.vertically].color) {
// 			throw new HttpException(400, 'you cannot perform this step');
// }  
  board[data.to.horizontally][data.from.vertically].color= board[data.from.horizontally][data.from.vertically].color
  board[data.to.horizontally][data.from.vertically].pieces=board[data.from.horizontally][data.from.vertically].pieces
  board[data.from.horizontally][data.from.vertically].color=null
  board[data.from.horizontally][data.from.vertically].pieces=null
  console.log(board);
  console.log(  board[data.from.horizontally][data.from.vertically]);
return board

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
    // let datas = {
    //   from:{vertically:2,horizontally:0},
    //   to:{vertically:3,horizontally:0}
    // }
    // let a = step(datas)
    socket.join(board);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
