const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  allPlayers.push(socket.id);

  socket.on("start", (data) => {
    socket.join(board);
    for (let i = 0; i < allPlayers.length; i++) {
      socket.to(allPlayers[i]).emit("receive_step", board);
    }
    if (allPlayers.length) {
      socket.emit("receive_step", board);
    }
  });

  socket.on("step", (data) => {
    if (
      !data ||
      !data.from ||
      !data.to ||
      (!data.from.vertically && data.from.vertically !== 0) ||
      (!data.from.horizontally && data.from.horizontally !== 0) ||
      (!data.to.vertically && data.to.vertically !== 0) ||
      (!data.to.horizontally && data.to.horizontally !== 0)
    ) {
      return false;
    }
    if (
      data.from.vertically < 0 ||
      data.from.vertically > 7 ||
      data.from.horizontally < 0 ||
      data.from.horizontally > 7
    ) {
      return false;
    }
    if (
      data.to.vertically < 0 ||
      data.to.vertically > 7 ||
      data.to.horizontally < 0 ||
      data.to.horizontally > 7
    ) {
      return [];
    }

    let notAllowed = false;
    let activeColor;
    if (globalColor == "white") {
      activeColor = "black";
    } else {
      activeColor = "white";
    }
    if (
      board[data.from.vertically][data.from.horizontally].color == globalColor
    ) {
      notAllowed = true;
    }

    if (kingsPossition[activeColor].check) {
      checkMat(board, activeColor);
    }
    let step1 = step(data, board, true);
    if (
      check(
        step1.board,
        {
          vertically: step1.kingsPossitionFake[activeColor].vertically,
          horizontally: step1.kingsPossitionFake[activeColor].horizontally,
        },
        activeColor
      )
    ) {
      notAllowed = true;
    }

    const steps = allowSteps(
      data,
      board[data.from.vertically][data.from.horizontally].color
    );
    if (steps) {
      const myStep = {
        vertically: data.to.vertically,
        horizontally: data.to.horizontally,
      };

      if (
        !checkSteps(myStep, steps) ||
        globalColor == board[data.from.vertically][data.from.horizontally].color
      ) {
        notAllowed = true;
      }

      if (!notAllowed) {
        step1 = step(data, board, false);
        board = step1.board;

        kingsPossition = step1.kingsPossitionFake;
        // baceq es koment@
        if (
          check(
            board,
            {
              vertically: kingsPossitionFake[globalColor].vertically,
              horizontally: kingsPossitionFake[globalColor].horizontally,
            },
            globalColor
          )
        ) {
          kingsPossition[globalColor].check = true;
        }

        if (kingsPossition[globalColor].check) {
          checkMat(board, globalColor);
        }
        kingsPossition[activeColor].check = false;
        let thiscolor;
        if (globalColor == "white") {
          globalColor = "black";
          thiscolor = "black";
        } else {
          thiscolor = "white";
          globalColor = "white";
        }
      }
    }
    for (let i = 0; i < allPlayers.length; i++) {
      socket.to(allPlayers[i]).emit("receive_step", board);
    }
    if (allPlayers.length) {
      socket.emit("receive_step", board);
    }
  });

  socket.on("allow", (data) => {
    if (
      !data ||
      !data.from ||
      !data.to ||
      !data.from.vertically ||
      !data.from.horizontally ||
      !data.to.vertically ||
      !data.to.horizontally
    ) {
      // socket.emit("receive_allow", false);
      return false;
    }
    if (
      data.from.vertically < 0 ||
      data.from.vertically > 7 ||
      data.from.horizontally < 0 ||
      data.from.horizontally > 7
    ) {
      // socket.emit("receive_allow", false);
      return false;
    }
    if (
      data.to.vertically < 0 ||
      data.to.vertically > 7 ||
      data.to.horizontally < 0 ||
      data.to.horizontally > 7
    ) {
      return [];
    }
    if (
      data.vertically < 0 ||
      data.vertically > 7 ||
      data.horizontally < 0 ||
      data.horizontally > 7
    ) {
      return [];
    }
    if (board[data.vertically][data.horizontally].color !== globalColor) {
      return [];
    }
    let allow = allowSteps(data, globalColor);
    for (let i = 0; i < allPlayers.length; i++) {
      socket.to(allPlayers[i]).emit("receive_allow", allow);
    }
    socket.emit("receive_allow", allow);
  });
});

server.listen(3001, () => {
  console.clear();
  console.log("SERVER IS RUNNING");
});