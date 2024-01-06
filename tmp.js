
function checkMat(board, activeColor) {
  for (let v = 0; v < 8; v++) {
    for (let h = 0; h < 8; h++) {
      if (board[v][h].color == activeColor) {
        let toArray = allowSteps(
          { from: { vertically: v, horizontally: h } },
          activeColor
        );

        let mat = allowedArray(
          board,
          { vertically: v, horizontally: h },
          toArray,
          activeColor
        );
        if (mat.length) {
          return false;
        }
      }
    }
  }
  return true;
}

function allowedArray(board, from, toArray, activeColor) {
  let result = [];
  for (let i = 0; i < toArray.length; i++) {
    let data = {
      from: from,
      to: {
        vertically: toArray[i].vertically,
        horizontally: toArray[i].horizontally,
      },
    };
    let step1 = step(data, board, true);
    if (
      !check(
        step1.board,
        {
          vertically: step1.kingsPossitionFake[activeColor].vertically,
          horizontally: step1.kingsPossitionFake[activeColor].horizontally,
        },
        activeColor
      )
    ) {
      result.push(toArray[i]);
    }
  }
  return result;
}

function check(board, data, activeColor) {
  // data={verticly,horizontally}
  // let board =JSON.parse(JSON.stringify(experimentalBoard));
  const rookStep = allowRook(board, data, activeColor);
  for (let i = 0; i < rookStep.length; i++) {
    if (
      board[rookStep[i].vertically][rookStep[i].horizontally].pieces ==
        "rook" ||
      board[rookStep[i].vertically][rookStep[i].horizontally].pieces == "queen"
    ) {
      return true;
    }
  }
  const bishopStep = allowBishop(board, data, activeColor);
  for (let i = 0; i < bishopStep.length; i++) {
    if (
      board[bishopStep[i].vertically][bishopStep[i].horizontally].pieces ==
        "bishop" ||
      board[bishopStep[i].vertically][bishopStep[i].horizontally].pieces ==
        "queen"
    ) {
      return true;
    }
  }

  const knightStep = allowknight(board, data, activeColor);
  for (let i = 0; i < knightStep.length; i++) {
    if (
      board[knightStep[i].vertically][knightStep[i].horizontally].pieces ==
      "knight"
    ) {
      return true;
    }
  }

  const kingStep = allowKing(board, data, activeColor);
  for (let i = 0; i < kingStep.length; i++) {
    if (
      board[kingStep[i].vertically][kingStep[i].horizontally].pieces == "king"
    ) {
      return true;
    }
  }

  // pawn
  if (activeColor == "black" && data.vertically < 7) {
    if (data.horizontally + 1 < 7) {
      if (
        board[data.vertically + 1][data.horizontally + 1].color == "white" &&
        board[data.vertically + 1][data.horizontally + 1].pieces == "pawn"
      ) {
        return true;
      }
    }

    if (data.horizontally - 1 > -1) {
      if (
        board[data.vertically + 1][data.horizontally - 1].color == "white" &&
        board[data.vertically + 1][data.horizontally - 1].pieces == "pawn"
      ) {
        return true;
      }
    }
  }
  if (activeColor == "white" && data.vertically > 0) {
    if (data.horizontally + 1 < 7) {
      if (
        board[data.vertically - 1][data.horizontally + 1].color == "black" &&
        board[data.vertically - 1][data.horizontally + 1].pieces == "pawn"
      ) {
        return true;
      }
    }

    if (data.horizontally - 1 > -1) {
      if (
        board[data.vertically - 1][data.horizontally - 1].color == "black" &&
        board[data.vertically - 1][data.horizontally - 1].pieces == "pawn"
      ) {
        return true;
      }
    }
  }
  return false;
}

function allowSteps(data, activeColor) {
  // if (globalColor=="white") {
  //   activeColor="black"
  // }else{activeColor="white"}
  if (
    board[data.from.vertically][data.from.horizontally].pieces == "pawn" &&
    board[data.from.vertically][data.from.horizontally].color == "white"
  ) {
    const steps = allowWhitePawn(
      {
        vertically: data.from.vertically,
        horizontally: data.from.horizontally,
      },
      kingsPossitionFake
    );
    return steps;
  }
  if (
    board[data.from.vertically][data.from.horizontally].pieces == "pawn" &&
    board[data.from.vertically][data.from.horizontally].color == "black"
  ) {
    const steps = allowBlackPawn(
      {
        vertically: data.from.vertically,
        horizontally: data.from.horizontally,
      },
      kingsPossitionFake
    );
    return steps;
  }
  if (board[data.from.vertically][data.from.horizontally].pieces == "rook") {
    const steps = allowRook(
      board,
      {
        vertically: data.from.vertically,
        horizontally: data.from.horizontally,
      },
      activeColor
    );
    return steps;
  }
  if (board[data.from.vertically][data.from.horizontally].pieces == "knight") {
    const steps = allowknight(
      board,
      {
        vertically: data.from.vertically,
        horizontally: data.from.horizontally,
      },
      activeColor
    );
    return steps;
  }
  if (board[data.from.vertically][data.from.horizontally].pieces == "bishop") {
    const steps = allowBishop(
      board,
      {
        vertically: data.from.vertically,
        horizontally: data.from.horizontally,
      },
      activeColor
    );
    return steps;
  }
  if (board[data.from.vertically][data.from.horizontally].pieces == "queen") {
    const steps = allowQueen(
      board,
      {
        vertically: data.from.vertically,
        horizontally: data.from.horizontally,
      },
      activeColor
    );
    return steps;
  }
  if (board[data.from.vertically][data.from.horizontally].pieces == "king") {
    const steps = allowKing(
      board,
      {
        vertically: data.from.vertically,
        horizontally: data.from.horizontally,
      },
      activeColor
    );
    return steps;
  }
}

function checkSteps(step, allowSteps) {
  for (let i = 0; i < allowSteps.length; i++) {
    if (
      step.vertically == allowSteps[i].vertically &&
      step.horizontally == allowSteps[i].horizontally
    ) {
      return true;
    }
  }
  return false;
}

function allowQueen(board, data, activeColor) {
  const steps1 = allowBishop(board, data, activeColor);
  const steps2 = allowRook(board, data, activeColor);
  for (let i = 0; i < steps2.length; i++) {
    steps1.push(steps2[i]);
  }
  return steps1;
}

function allowBishop(board, data, activeColor) {
  let opponentColor = "black";
  if (activeColor == "black") {
    opponentColor = "white";
  }
  let allow = [];
  for (let i = 1; i < data.vertically + 1; i++) {
    if (data.vertically - i < 0 || data.horizontally - i < 0) {
      break;
    }
    if (
      board[data.vertically - i][data.horizontally - i].color == activeColor
    ) {
      break;
    }
    if (board[data.vertically - i][data.horizontally - i].color == null) {
      allow.push({
        vertically: data.vertically - i,
        horizontally: data.horizontally - i,
      });
    }
    if (
      board[data.vertically - i][data.horizontally - i].color == opponentColor
    ) {
      allow.push({
        vertically: data.vertically - i,
        horizontally: data.horizontally - i,
      });
      break;
    }
  }

  for (let i = 1; i < data.vertically + 1; i++) {
    if (data.vertically - i < 0 || data.horizontally + i > 7) {
      break;
    }
    if (
      board[data.vertically - i][data.horizontally + i].color == activeColor
    ) {
      break;
    }
    if (board[data.vertically - i][data.horizontally + i].color == null) {
      allow.push({
        vertically: data.vertically - i,
        horizontally: data.horizontally + i,
      });
    }
    if (
      board[data.vertically - i][data.horizontally + i].color == opponentColor
    ) {
      allow.push({
        vertically: data.vertically - i,
        horizontally: data.horizontally + i,
      });
      break;
    }
  }

  for (let i = 1; i < 8 - data.vertically; i++) {
    if (data.vertically + i > 7 || data.horizontally - i < 0) {
      break;
    }
    if (
      board[data.vertically + i][data.horizontally - i].color == activeColor
    ) {
      break;
    }
    if (board[data.vertically + i][data.horizontally - i].color == null) {
      allow.push({
        vertically: data.vertically + i,
        horizontally: data.horizontally - i,
      });
    }
    if (
      board[data.vertically + i][data.horizontally - i].color == opponentColor
    ) {
      allow.push({
        vertically: data.vertically + i,
        horizontally: data.horizontally - i,
      });
      break;
    }
  }

  for (let i = 1; i < 8 - data.vertically; i++) {
    if (data.vertically + i > 7 || data.horizontally + i > 7) {
      break;
    }
    if (
      board[data.vertically + i][data.horizontally + i].color == activeColor
    ) {
      break;
    }
    if (board[data.vertically + i][data.horizontally + i].color == null) {
      allow.push({
        vertically: data.vertically + i,
        horizontally: data.horizontally + i,
      });
    }
    if (
      board[data.vertically + i][data.horizontally + i].color == opponentColor
    ) {
      allow.push({
        vertically: data.vertically + i,
        horizontally: data.horizontally + i,
      });
      break;
    }
  }

  return allow;
}

function allowKing(board, data, activeColor) {
  // data = { vertically: 0, horizontally: 0 };
  let allow = [];
  if (
    data.vertically + 1 < 8 &&
    data.horizontally + 1 < 8 &&
    board[data.vertically + 1][data.horizontally + 1].color !== activeColor
  ) {
    allow.push({
      vertically: data.vertically + 1,
      horizontally: data.horizontally + 1,
    });
  }

  if (
    data.vertically < 8 &&
    data.horizontally + 1 < 8 &&
    board[data.vertically][data.horizontally + 1].color !== activeColor
  ) {
    allow.push({
      vertically: data.vertically,
      horizontally: data.horizontally + 1,
    });
  }

  if (
    data.vertically < 8 &&
    data.horizontally - 1 > -1 &&
    board[data.vertically][data.horizontally - 1].color !== activeColor
  ) {
    allow.push({
      vertically: data.vertically,
      horizontally: data.horizontally - 1,
    });
  }

  if (
    data.vertically + 1 < 8 &&
    data.horizontally < 8 &&
    board[data.vertically + 1][data.horizontally].color !== activeColor
  ) {
    allow.push({
      vertically: data.vertically + 1,
      horizontally: data.horizontally,
    });
  }

  if (
    data.vertically + 1 < 8 &&
    data.horizontally - 1 > -1 &&
    board[data.vertically + 1][data.horizontally - 1].color !== activeColor
  ) {
    allow.push({
      vertically: data.vertically + 1,
      horizontally: data.horizontally - 1,
    });
  }

  if (
    data.vertically - 1 > -1 &&
    data.horizontally - 1 > -1 &&
    board[data.vertically - 1][data.horizontally - 1].color !== activeColor
  ) {
    allow.push({
      vertically: data.vertically - 1,
      horizontally: data.horizontally - 1,
    });
  }

  if (
    data.vertically - 1 > -1 &&
    data.horizontally > -1 &&
    board[data.vertically - 1][data.horizontally].color !== activeColor
  ) {
    allow.push({
      vertically: data.vertically - 1,
      horizontally: data.horizontally,
    });
  }

  if (
    data.vertically - 1 > -1 &&
    data.horizontally + 1 < 8 &&
    board[data.vertically - 1][data.horizontally + 1].color !== activeColor
  ) {
    allow.push({
      vertically: data.vertically - 1,
      horizontally: data.horizontally + 1,
    });
  }
  return allow;
}

function allowknight(board, data, activeColor) {
  let allow = [];
  if (
    data.vertically + 2 < 8 &&
    data.horizontally + 1 < 8 &&
    board[data.vertically + 2][data.horizontally + 1].color !== activeColor
  ) {
    allow.push({
      vertically: data.vertically + 2,
      horizontally: data.horizontally + 1,
    });
  }

  if (
    data.vertically + 2 < 8 &&
    data.horizontally - 1 > -1 &&
    board[data.vertically + 2][data.horizontally - 1].color !== activeColor
  ) {
    allow.push({
      vertically: data.vertically + 2,
      horizontally: data.horizontally - 1,
    });
  }

  if (
    data.vertically + 1 < 8 &&
    data.horizontally + 2 < 8 &&
    board[data.vertically + 1][data.horizontally + 2].color !== activeColor
  ) {
    allow.push({
      vertically: data.vertically + 1,
      horizontally: data.horizontally + 2,
    });
  }

  if (
    data.vertically - 1 > -1 &&
    data.horizontally + 2 < 8 &&
    board[data.vertically - 1][data.horizontally + 2].color !== activeColor
  ) {
    allow.push({
      vertically: data.vertically - 1,
      horizontally: data.horizontally + 2,
    });
  }

  if (
    data.vertically - 2 > -1 &&
    data.horizontally - 1 > -1 &&
    board[data.vertically - 2][data.horizontally - 1].color !== activeColor
  ) {
    allow.push({
      vertically: data.vertically - 2,
      horizontally: data.horizontally - 1,
    });
  }

  if (
    data.vertically - 2 > -1 &&
    data.horizontally + 1 < 8 &&
    board[data.vertically - 2][data.horizontally + 1].color !== activeColor
  ) {
    allow.push({
      vertically: data.vertically - 2,
      horizontally: data.horizontally + 1,
    });
  }

  if (
    data.vertically - 1 > -1 &&
    data.horizontally - 2 > -1 &&
    board[data.vertically - 1][data.horizontally - 2].color !== activeColor
  ) {
    allow.push({
      vertically: data.vertically - 1,
      horizontally: data.horizontally - 2,
    });
  }

  if (
    data.vertically + 1 < 8 &&
    data.horizontally - 2 > -1 &&
    board[data.vertically + 1][data.horizontally - 2].color !== activeColor
  ) {
    allow.push({
      vertically: data.vertically + 1,
      horizontally: data.horizontally - 2,
    });
  }
  return allow;
}

function allowRook(board, data, activeColor) {
  let opponentColor;
  if (activeColor == "black") {
    opponentColor = "white";
  } else {
    opponentColor = "black";
  }
  let allow = [];
  for (let i = data.vertically + 1; i < 8; i++) {
    if (board[i][data.horizontally].color == activeColor) {
      break;
    }
    if (board[i][data.horizontally].color == null) {
      allow.push({
        vertically: i,
        horizontally: data.horizontally,
      });
    }
    if (board[i][data.horizontally].color == opponentColor) {
      allow.push({
        vertically: i,
        horizontally: data.horizontally,
      });
      break;
    }
  }

  for (let i = data.vertically - 1; i > -1; i--) {
    if (board[i][data.horizontally].color == activeColor) {
      break;
    }
    if (board[i][data.horizontally].color == null) {
      allow.push({
        vertically: i,
        horizontally: data.horizontally,
      });
    }
    if (board[i][data.horizontally].color == opponentColor) {
      allow.push({
        vertically: i,
        horizontally: data.horizontally,
      });
      break;
    }
  }

  for (let i = data.horizontally - 1; i > -1; i--) {
    if (board[data.vertically][i].color == activeColor) {
      break;
    }
    if (board[data.vertically][i].color == null) {
      allow.push({
        vertically: data.vertically,
        horizontally: i,
      });
    }
    if (board[data.vertically][i].color == opponentColor) {
      allow.push({
        vertically: data.vertically,
        horizontally: i,
      });
      break;
    }
  }

  for (let i = data.horizontally + 1; i < 8; i++) {
    if (board[data.vertically][i].color == activeColor) {
      break;
    }
    if (board[data.vertically][i].color == null) {
      allow.push({
        vertically: data.vertically,
        horizontally: i,
      });
    }
    if (board[data.vertically][i].color == opponentColor) {
      allow.push({
        vertically: data.vertically,
        horizontally: i,
      });
      break;
    }
  }
  return allow;
}

function allowWhitePawn(data) {
  let bigData = {
    from: { vertically: data.vertically, horizontally: data.horizontally },
    to: { vertically: data.vertically, horizontally: data.horizontally },
  };
  let allow = [];
  if (data.vertically < 1) {
    return [];
  }
  if (board[data.vertically - 1][data.horizontally].color == null) {
    bigData.to.vertically = data.vertically - 1;
    let step1 = step(bigData, board, true);
    if (
      !check(
        step1.board,
        {
          vertically: step1.kingsPossitionFake["white"].vertically,
          horizontally: step1.kingsPossitionFake["white"].horizontally,
        },
        "white"
      )
    ) {
      allow.push({
        vertically: data.vertically - 1,
        horizontally: data.horizontally,
      });
    }
  }
  if (
    data.vertically > 0 &&
    board[data.vertically][data.horizontally].isTouched == false &&
    board[data.vertically - 2][data.horizontally].color == null &&
    board[data.vertically - 1][data.horizontally].color == null
  ) {
    bigData.to.vertically = data.vertically - 2;
    let step1 = step(bigData, board, true);
    if (
      !check(
        step1.board,
        {
          vertically: step1.kingsPossitionFake["white"].vertically,
          horizontally: step1.kingsPossitionFake["white"].horizontally,
        },
        "white"
      )
    ) {
      allow.push({
        vertically: data.vertically - 2,
        horizontally: data.horizontally,
      });
    }
  }

  if (
    (data.horizontally == 0 &&
      board[data.vertically - 1][data.horizontally + 1].color == "black") ||
    (enPassant.black.vertically == data.vertically - 1 &&
      enPassant.black.horizontally == data.horizontally + 1)
  ) {
    bigData.to.vertically = data.vertically - 1;
    bigData.to.horizontally = data.horizontally + 1;
    let step1 = step(bigData, board, true);
    if (
      !check(
        step1.board,
        {
          vertically: step1.kingsPossitionFake["white"].vertically,
          horizontally: step1.kingsPossitionFake["white"].horizontally,
        },
        "white"
      )
    ) {
      allow.push({
        vertically: data.vertically - 1,
        horizontally: data.horizontally + 1,
      });
    }
  } else if (
    (data.horizontally == 7 &&
      board[data.vertically - 1][data.horizontally - 1].color == "black") ||
    (enPassant.black.vertically == data.vertically - 1 &&
      enPassant.black.horizontally == data.horizontally - 1)
  ) {
    bigData.to.vertically = data.vertically - 1;
    bigData.to.horizontally = data.horizontally - 1;
    let step1 = step(bigData, board, true);
    if (
      !check(
        step1.board,
        {
          vertically: step1.kingsPossitionFake["white"].vertically,
          horizontally: step1.kingsPossitionFake["white"].horizontally,
        },
        "white"
      )
    ) {
      allow.push({
        vertically: data.vertically - 1,
        horizontally: data.horizontally - 1,
      });
    }
  } else {
    if (data.horizontally < 7 && data.horizontally > 0) {
      if (
        board[data.vertically - 1][data.horizontally - 1].color == "black" ||
        (enPassant.black.vertically == data.vertically - 1 &&
          enPassant.black.horizontally == data.horizontally - 1)
      ) {
        bigData.to.vertically = data.vertically - 1;
        bigData.to.horizontally = data.horizontally - 1;
        let step1 = step(bigData, board, true);
        if (
          !check(
            step1.board,
            {
              vertically: step1.kingsPossitionFake["white"].vertically,
              horizontally: step1.kingsPossitionFake["white"].horizontally,
            },
            "white"
          )
        ) {
          allow.push({
            vertically: data.vertically - 1,
            horizontally: data.horizontally - 1,
          });
        }
      }
      if (
        board[data.vertically - 1][data.horizontally + 1].color == "black" ||
        (enPassant.black.vertically == data.vertically - 1 &&
          enPassant.black.horizontally == data.horizontally + 1)
      ) {
        bigData.to.vertically = data.vertically - 1;
        bigData.to.horizontally = data.horizontally + 1;
        let step1 = step(bigData, board, true);
        if (
          !check(
            step1.board,
            {
              vertically: step1.kingsPossitionFake["white"].vertically,
              horizontally: step1.kingsPossitionFake["white"].horizontally,
            },
            "white"
          )
        ) {
          allow.push({
            vertically: data.vertically - 1,
            horizontally: data.horizontally + 1,
          });
        }
        // allow.push({
        //   vertically: data.vertically - 1,
        //   horizontally: data.horizontally + 1,
        // });
      }
    }
  }
  return allow;
}

function allowBlackPawn(data) {
  let bigData = {
    from: { vertically: data.vertically, horizontally: data.horizontally },
    to: { vertically: data.vertically, horizontally: data.horizontally },
  };

  // data = { vertically: 0, horizontally: 0 };
  let allow = [];
  if (data.vertically > 6) {
    return [];
  }
  if (board[data.vertically + 1][data.horizontally].color == null) {
    bigData.to.vertically = data.vertically + 1;
    bigData.to.horizontally = data.horizontally;
    let step1 = step(bigData, board, true);
    if (
      !check(
        step1.board,
        {
          vertically: step1.kingsPossitionFake["black"].vertically,
          horizontally: step1.kingsPossitionFake["black"].horizontally,
        },
        "black"
      )
    ) {
      allow.push({
        vertically: data.vertically + 1,
        horizontally: data.horizontally,
      });
    }
  }
  if (
    data.vertically < 6 &&
    board[data.vertically][data.horizontally].isTouched == false &&
    board[data.vertically + 2][data.horizontally].color == null &&
    board[data.vertically + 1][data.horizontally].color == null
  ) {
    bigData.to.vertically = data.vertically + 2;
    bigData.to.horizontally = data.horizontally;
    let step1 = step(bigData, board, true);
    if (
      !check(
        step1.board,
        {
          vertically: step1.kingsPossitionFake["black"].vertically,
          horizontally: step1.kingsPossitionFake["black"].horizontally,
        },
        "black"
      )
    ) {
      allow.push({
        vertically: data.vertically + 2,
        horizontally: data.horizontally,
      });
    }
  }
  if (
    (data.horizontally == 7 &&
      board[data.vertically + 1][data.horizontally - 1].color == "white") ||
    (enPassant.white.vertically == data.vertically + 1 &&
      enPassant.white.horizontally == data.horizontally - 1)
  ) {
    bigData.to.vertically = data.vertically + 1;
    bigData.to.horizontally = data.horizontally - 1;
    let step1 = step(bigData, board, true);
    if (
      !check(
        step1.board,
        {
          vertically: step1.kingsPossitionFake["black"].vertically,
          horizontally: step1.kingsPossitionFake["black"].horizontally,
        },
        "black"
      )
    ) {
      allow.push({
        vertically: data.vertically + 1,
        horizontally: data.horizontally - 1,
      });
    }
  } else if (
    (data.horizontally == 0 &&
      board[data.vertically + 1][data.horizontally + 1].color == "white") ||
    (enPassant.white.vertically == data.vertically + 1 &&
      enPassant.white.horizontally == data.horizontally + 1)
  ) {
    bigData.to.vertically = data.vertically + 1;
    bigData.to.horizontally = data.horizontally + 1;
    let step1 = step(bigData, board, true);
    if (
      !check(
        step1.board,
        {
          vertically: step1.kingsPossitionFake["black"].vertically,
          horizontally: step1.kingsPossitionFake["black"].horizontally,
        },
        "black"
      )
    ) {
      allow.push({
        vertically: data.vertically + 1,
        horizontally: data.horizontally + 1,
      });
    }
  } else {
    if (data.horizontally > 0 && data.horizontally < 7) {
      if (
        board[data.vertically + 1][data.horizontally + 1].color == "white" ||
        (enPassant.white.vertically == data.vertically + 1 &&
          enPassant.white.horizontally == data.horizontally + 1)
      ) {
        bigData.to.vertically = data.vertically + 1;
        bigData.to.horizontally = data.horizontally + 1;
        let step1 = step(bigData, board, true);
        if (
          !check(
            step1.board,
            {
              vertically: step1.kingsPossitionFake["black"].vertically,
              horizontally: step1.kingsPossitionFake["black"].horizontally,
            },
            "black"
          )
        ) {
          allow.push({
            vertically: data.vertically + 1,
            horizontally: data.horizontally + 1,
          });
        }
      }
      if (
        board[data.vertically + 1][data.horizontally - 1].color == "white" ||
        (enPassant.white.vertically == data.vertically + 1 &&
          enPassant.white.horizontally == data.horizontally - 1)
      ) {
        bigData.to.vertically = data.vertically + 1;
        bigData.to.horizontally = data.horizontally - 1;
        let step1 = step(bigData, board, true);
        if (
          !check(
            step1.board,
            {
              vertically: step1.kingsPossitionFake["black"].vertically,
              horizontally: step1.kingsPossitionFake["black"].horizontally,
            },
            "black"
          )
        ) {
          allow.push({
            vertically: data.vertically + 1,
            horizontally: data.horizontally - 1,
          });
        }
      }
    }
  }
  return allow;
}

function step(data, experimentalBoard, fake) {
  kingsPossitionFake = JSON.parse(JSON.stringify(kingsPossition));
  // if (board[data.to.horizontally][data.from.vertically].color== board[data.from.horizontally][data.from.vertically].color) {
  // 			throw new HttpException(400, 'you cannot perform this step');
  // }
  let board = JSON.parse(JSON.stringify(experimentalBoard));

  if (board[data.from.vertically][data.from.horizontally].pieces == "pawn") {
    if (board[data.from.vertically][data.from.horizontally].color == "white") {
      if (
        data.from.vertically - data.to.vertically == 1 &&
        Math.abs(data.from.horizontally - data.to.horizontally) == 1 &&
        board[data.to.vertically][data.to.horizontally].color == null
      ) {
        board[data.to.vertically + 1][data.to.horizontally].color = null;
        board[data.to.vertically + 1][data.to.horizontally].pieces = null;
      }
    }
    if (board[data.from.vertically][data.from.horizontally].color == "black") {
      if (
        data.to.vertically - data.from.vertically == 1 &&
        Math.abs(data.from.horizontally - data.to.horizontally) == 1 &&
        board[data.to.vertically][data.to.horizontally].color == null
      ) {
        board[data.to.vertically - 1][data.to.horizontally].color = null;
        board[data.to.vertically - 1][data.to.horizontally].pieces = null;
      }
    }

    if (!fake) {
      if (Math.abs(data.to.vertically - data.from.vertically) == 2) {
        if (
          board[data.from.vertically][data.from.horizontally].color == "white"
        ) {
          enPassant.white.vertically = data.from.vertically - 1;
          enPassant.white.horizontally = data.from.horizontally;
        } else {
          enPassant.black.vertically = data.from.vertically + 1;
          enPassant.black.horizontally = data.from.horizontally;
        }
      }
    }
  }
  board[data.to.vertically][data.to.horizontally].color =
    board[data.from.vertically][data.from.horizontally].color;
  board[data.to.vertically][data.to.horizontally].pieces =
    board[data.from.vertically][data.from.horizontally].pieces;
  board[data.from.vertically][data.from.horizontally].color = null;
  board[data.from.vertically][data.from.horizontally].pieces = null;
  board[data.from.vertically][data.from.horizontally].isTouched = true;
  board[data.to.vertically][data.to.horizontally].isTouched = true;

  if (board[data.to.vertically][data.to.horizontally].pieces == "king") {
    let activeColor;
    if (globalColor == "white") {
      activeColor = "black";
    } else {
      activeColor = "white";
    }
    kingsPossitionFake[activeColor].vertically = data.to.vertically;
    kingsPossitionFake[activeColor].horizontally = data.to.horizontally;
  }
  if (!fake) {
    if (board[data.to.vertically][data.to.horizontally].color == "white") {
      enPassant.black.vertically = null;
      enPassant.black.horizontally = null;
    } else {
      enPassant.white.vertically = null;
      enPassant.white.horizontally = null;
    }
  }

  return { board, kingsPossitionFake };
}
