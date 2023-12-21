const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { log } = require("console");

// vertically:^^^^^,horizontally:>>>>>>
const board = [
  [
    {
      color: null,
      vertically: 0,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 1,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 2,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 3,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 4,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 5,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 6,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 7,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
  ],
  [
    {
      color: null,
      vertically: 1,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 1,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 2,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 3,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 4,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 5,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 6,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 7,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
  ],
  [
    {
      color: null,
      vertically: 0,
      horizontally: 5,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 1,
      horizontally: 5,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 2,
      horizontally: 5,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 3,
      horizontally: 5,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 4,
      horizontally: 5,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 5,
      horizontally: 5,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 6,
      horizontally: 5,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 7,
      horizontally: 5,
      pieces: null,
      isTouched: false,
    },
  ],
  [
    {
      color: null,
      vertically: 0,
      horizontally: 4,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 1,
      horizontally: 4,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 2,
      horizontally: 4,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 3,
      horizontally: 4,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 4,
      horizontally: 4,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 5,
      horizontally: 4,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 6,
      horizontally: 4,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 7,
      horizontally: 4,
      pieces: null,
      isTouched: false,
    },
  ],
  [
    {
      color: null,
      vertically: 0,
      horizontally: 3,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 1,
      horizontally: 3,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 2,
      horizontally: 3,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 3,
      horizontally: 3,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 4,
      horizontally: 3,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 5,
      horizontally: 3,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 6,
      horizontally: 3,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 7,
      horizontally: 3,
      pieces: null,
      isTouched: false,
    },
  ],
  [
    {
      color: null,
      vertically: 0,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 1,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 2,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 3,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 4,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 5,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 6,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 7,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
  ],
  [
    {
      color: "white",
      vertically: 0,
      horizontally: 6,
      pieces: "pawn",
      isTouched: false,
    },
    {
      color: null,
      vertically: 1,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 2,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 3,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 4,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 5,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 6,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 7,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
  ],
  [
    {
      color: null,
      vertically: 0,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 1,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 2,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 3,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 4,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 5,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 6,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
    {
      color: null,
      vertically: 7,
      horizontally: 2,
      pieces: null,
      isTouched: false,
    },
  ],
];
// let datas = {
//   from:{vertically:1,horizontally:0},
//   to:{vertically:1,horizontally:0}
// }


function allowKinght(data) {
    // data = { vertically: 0, horizontally: 0 };
  let allow = [];
    const activeColor=board[data.vertically][data.horizontally].color
  if (data.vertically+2<8 &&data.horizontally+1<8 &&board[data.vertically+2][data.horizontally+1].color !==activeColor ) {
    allow.push({
      vertically: data.vertically+2,
      horizontally: data.horizontally+1,
    });
  }

  if (data.vertically+2<8 &&data.horizontally-1>-1 && board[data.vertically+2][data.horizontally-1].color !== activeColor) {
    allow.push({
      vertically: data.vertically+2,
      horizontally: data.horizontally-1,
    });
  }  

  if (data.vertically+1<8 &&data.horizontally+2<8&& board[data.vertically+1][data.horizontally+2].color !== activeColor) {
    allow.push({
      vertically: data.vertically+1,
      horizontally: data.horizontally+2,
    });
  }



  if (data.vertically-1>-1 &&data.horizontally+2<8&& board[data.vertically-1][data.horizontally+2].color !== activeColor) {
    allow.push({
      vertically: data.vertically-1,
      horizontally: data.horizontally+2,
    });  
  }


  if (data.vertically-2>-1 &&data.horizontally-1>-1 && board[data.vertically-2][data.horizontally-1].color !== activeColor) {
    allow.push({
      vertically: data.vertically-2,
      horizontally: data.horizontally-1,
    });  
  }



  if (data.vertically-2>-1 &&data.horizontally+1<8 &&board[data.vertically-2][data.horizontally+1].color !== activeColor) {
    allow.push({
      vertically: data.vertically-2,
      horizontally: data.horizontally+1,
    });  
  }

  if (data.vertically-1>-1 &&data.horizontally-2>-1 && board[data.vertically-1][data.horizontally-2].color !== activeColor) {
    allow.push({
      vertically: data.vertically-1,
      horizontally: data.horizontally-2,
    });  
  }



  if (data.vertically+1<8 &&data.horizontally-2>-1 && board[data.vertically+1][data.horizontally-2].color !== activeColor) {
    allow.push({
      vertically: data.vertically+1,
      horizontally: data.horizontally-2,
    });  
  }  
return allow
}










function allowRook(data) {
    // data = { vertically: 0, horizontally: 0 };
    const opponentColor = "black"
    const activeColor="white"
    if (board[data.vertically][data.horizontally].color=="black") {
      opponentColor = "white"
      activeColor="black"
    }
  let allow = [];
  for (let i = data.vertically+1; i < 8; i++) {
    if (   board[i][data.horizontally].color == activeColor
      ) {
        console.log(board[data.vertically][data.horizontally].color );
        break;
    }
    console.log(i);
    if (   board[i][data.horizontally].color == null
      ) {
        allow.push({
          vertically: i,
          horizontally: data.horizontally,
        });
    }
    if ( board[i][data.horizontally].color == opponentColor
      ) {
        allow.push({
          vertically: i,
          horizontally: data.horizontally,
        });
        break;
    }
  }

  for (let i = data.vertically-1; i > -1; i--) {
    if (   board[i][data.horizontally].color == activeColor
      ) {
        break;
    }
    if (   board[i][data.horizontally].color == null
      ) {
        allow.push({
          vertically: i,
          horizontally: data.horizontally,
        });
    }
    if ( board[i][data.horizontally].color == opponentColor
      ) {
        allow.push({
          vertically: i,
          horizontally: data.horizontally,
        });
        break;
    }
  }



  for (let i = data.horizontally-1; i > -1; i--) {
    if (   board[data.vertically][i].color == activeColor
      ) {
        break;
    }
    if (   board[data.vertically][i].color == null
      ) {
        allow.push({
          vertically: data.vertically,
          horizontally: i,
        });
    }
    if ( board[data.vertically][i].color == opponentColor
      ) {
        allow.push({
          vertically: data.vertically,
          horizontally: i,
        });
        break;
    }

  }


  for (let i = data.horizontally+1; i < 8; i++) {
    if (   board[data.vertically][i].color == activeColor
      ) {
        break;
    }
    if (   board[data.vertically][i].color == null
      ) {
        allow.push({
          vertically: data.vertically,
          horizontally: i,
        });
    }
    if ( board[data.vertically][i].color == opponentColor
      ) {
        allow.push({
          vertically: data.vertically,
          horizontally: i,
        });
        break;
    }
  }
  // console.log("Aaaagcsadhggaskjgdfzusckhdfuyszdhfjhhsviugfhsdoifyjghjdbf",allow);
  return allow
}



















function allowWhitePawn(data) {
  // console.log("kgfgsdhgfdsfdttsdytesaefdreas", data);
  // data = { vertically: 0, horizontally: 0 };
  let allow = [];
  if (data.vertically < 1) {
    return [];
  }
  if (board[data.vertically - 1][data.horizontally].color == null) {
    allow.push({
      vertically: data.vertically - 1,
      horizontally: data.horizontally,
    });
  }
  console.log(board[data.vertically][data.horizontally], "asa tenm inch ka");
  if (
    data.vertically > 0 &&
    board[data.vertically][data.horizontally].isTouched == false &&
    board[data.vertically - 2][data.horizontally].color == null &&
    board[data.vertically - 1][data.horizontally].color == null
  ) {
    console.log(
      "aaaaaaaaaaaaaa",
      board[data.vertically][data.horizontally].isTouched
    );

    allow.push({
      vertically: data.vertically - 2,
      horizontally: data.horizontally,
    });
  }
  if (
    data.horizontally == 0 &&
    board[data.vertically][data.horizontally + 1].color == "black"
  ) {
    allow.push({
      vertically: data.vertically - 1,
      horizontally: data.horizontally + 1,
    });
  } else if (
    data.horizontally == 7 &&
    board[data.vertically][data.horizontally - 1].color == "black"
  ) {
    allow.push({
      vertically: data.vertically - 1,
      horizontally: data.horizontally - 1,
    });
  } else {
    if (data.horizontally < 7 && data.horizontally > 0) {
      if (board[data.vertically][data.horizontally - 1].color == "black") {
        allow.push({
          vertically: data.vertically - 1,
          horizontally: data.horizontally - 1,
        });
      }
      if (board[data.vertically][data.horizontally + 1].color == "black") {
        allow.push({
          vertically: data.vertically - 1,
          horizontally: data.horizontally + 1,
        });
      }
    }
  }
  return allow;
}

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
  console.log(board[data.vertically][data.horizontally], "asa tenm inch ka");
  if (
    data.vertically < 6 &&
    board[data.vertically][data.horizontally].isTouched == false &&
    board[data.vertically + 2][data.horizontally].color == null &&
    board[data.vertically + 1][data.horizontally].color == null
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
  return allow;
}

function step(data) {
  // if (board[data.to.horizontally][data.from.vertically].color== board[data.from.horizontally][data.from.vertically].color) {
  // 			throw new HttpException(400, 'you cannot perform this step');
  // }
  board[data.to.vertically][data.to.horizontally].color =
    board[data.from.vertically][data.from.horizontally].color;
  board[data.to.vertically][data.to.horizontally].pieces =
    board[data.from.vertically][data.from.horizontally].pieces;
  board[data.from.vertically][data.from.horizontally].color = null;
  board[data.from.vertically][data.from.horizontally].pieces = null;
  // console.log(  board[data.from.horizontally][data.from.vertically]);
  board[data.from.vertically][data.from.horizontally].isTouched = true;
  board[data.to.vertically][data.to.horizontally].isTouched = true;

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
        allowKinght({
          vertically: data.from.vertically,
          horizontally: data.from.horizontally,
        })
      );
    }
    step(data);

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
