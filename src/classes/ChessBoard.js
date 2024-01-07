const { chessBoardCreate } = require("./boardCreate");

class ChessBoard {
  #board = chessBoardCreate();
  #checkWhite = false;
  #checkBlack = false;
  #checkMate = null; // white || black || null

  #whoseMove = 'white';

  // constructor() {}

  get board() { return this.#board; }
  get whoseMove() { return this.#whoseMove; }

  moveFigure(positionFrom, positionTo) {
    const fromI = positionFrom.vertically;
    const fromJ = positionFrom.horizontally;
    const toI = positionTo.vertically;
    const toJ = positionTo.horizontally;

    this.#board[fromI][fromJ].isTouched = true;

    // save current figure datas
    const tmpColor = this.#board[fromI][fromJ].color;
    const tmpPieces = this.#board[fromI][fromJ].pieces;

    // reset old figure position data
    this.#board[fromI][fromJ].color = null;
    this.#board[fromI][fromJ].pieces = null;

    // set old figure data in new position
    this.#board[toI][toJ].color = tmpColor;
    this.#board[toI][toJ].pieces = tmpPieces;

    this.#whoseMove = ((this.#whoseMove === 'white') ? 'black' : 'white');
  }

  whereCanMove(vertically, horizontally) {
    let result = [];

    // check figure type
    switch (this.#board[vertically][horizontally].pieces) {
      case 'pawn': { result = this.#pawnMoves(vertically, horizontally); break; }
      case 'rook': { result = this.#rookMoves(vertically, horizontally); break; }
      case 'knight': { result = this.#knightMoves(vertically, horizontally); break; }
      case 'bishop': { result = this.#bishopMoves(vertically, horizontally); break; }
      case 'queen': { result = this.#queenMoves(vertically, horizontally); break; }
      case 'king': { result = this.#kingMoves(vertically, horizontally); break; }
      default: {
        console.error('wrong figure');
      }
    }

    return result;
  }

  #isValidSquarePosition(vertically, horizontally) {
    return (vertically > -1 && vertically < 8 && horizontally > -1 && horizontally < 8) ? true : false;
  }

  #isEnemy(vertically, horizontally) {
    if (this.#board[vertically][horizontally].color === null) {
      return false;
    }
    if (this.#board[vertically][horizontally].color !== this.#whoseMove) {
      return true;
    }
  }

  #isFreeSquare(vertically, horizontally) {
    if (this.#board[vertically][horizontally].pieces === null) {
      return true;
    }
  }

  #rookMoves(vertically, horizontally) {
    const result = [];

    for (let i = 1; i < 8; ++i) {
      if (this.#isValidSquarePosition(vertically + i, horizontally)) {
        if (this.#isEnemy(vertically + i, horizontally)) {
          result.push({ vertically: vertically + i, horizontally });
          break;
        }
        if (this.#isFreeSquare(vertically + i, horizontally)) {
          result.push({ vertically: vertically + i, horizontally });
        } else {
          break;
        }
      } else {
        break;
      }
    }

    for (let i = 1; i < 8; ++i) {
      if (this.#isValidSquarePosition(vertically - i, horizontally)) {
        if (this.#isEnemy(vertically - i, horizontally)) {
          result.push({ vertically: vertically - i, horizontally });
          break;
        }
        if (this.#isFreeSquare(vertically - i, horizontally)) {
          result.push({ vertically: vertically - i, horizontally });
        } else {
          break;
        }
      } else {
        break;
      }
    }

    for (let i = 1; i < 8; ++i) {
      if (this.#isValidSquarePosition(vertically, horizontally + i)) {
        if (this.#isEnemy(vertically, horizontally + i)) {
          result.push({ vertically, horizontally: horizontally + i });
          break;
        }
        if (this.#isFreeSquare(vertically, horizontally + i)) {
          result.push({ vertically, horizontally: horizontally + i });
        } else {
          break;
        }
      } else {
        break;
      }
    }

    for (let i = 1; i < 8; ++i) {
      if (this.#isValidSquarePosition(vertically, horizontally - i)) {
        if (this.#isEnemy(vertically, horizontally - i)) {
          result.push({ vertically, horizontally: horizontally - i });
          break;
        }
        if (this.#isFreeSquare(vertically, horizontally - i)) {
          result.push({ vertically, horizontally: horizontally - i });
        } else {
          break;
        }
      } else {
        break;
      }
    }

    return result;
  }

  #bishopMoves(vertically, horizontally) {
    const result = [];

    for (let i = 1; i < 8; ++i) {
      const newI = vertically + i;
      const newJ = horizontally + i;

      if (this.#isValidSquarePosition(newI, newJ)) {
        // free square position push in to result
        if (this.#isFreeSquare(newI, newJ)) {
          result.push({ vertically: newI, horizontally: newJ });
          continue;
        }

        if (this.#isEnemy(newI, newJ)) {
          // is enemy push to result and break;
          result.push({ vertically: newI, horizontally: newJ });
          break;
        } else {
          // is friend break;
          break;
        }
      } else {
        break;
      }
    }



    for (let i = 1; i < 8; ++i) {
      const newI = vertically - i;
      const newJ = horizontally + i;

      if (this.#isValidSquarePosition(newI, newJ)) {
        // free square position push in to result
        if (this.#isFreeSquare(newI, newJ)) {
          result.push({ vertically: newI, horizontally: newJ });
          continue;
        }

        if (this.#isEnemy(newI, newJ)) {
          // is enemy push to result and break;
          result.push({ vertically: newI, horizontally: newJ });
          break;
        } else {
          // is friend break;
          break;
        }
      } else {
        break;
      }
    }

    for (let i = 1; i < 8; ++i) {
      const newI = vertically - i;
      const newJ = horizontally - i;

      if (this.#isValidSquarePosition(newI, newJ)) {
        // free square position push in to result
        if (this.#isFreeSquare(newI, newJ)) {
          result.push({ vertically: newI, horizontally: newJ });
          continue;
        }

        if (this.#isEnemy(newI, newJ)) {
          // is enemy push to result and break;
          result.push({ vertically: newI, horizontally: newJ });
          break;
        } else {
          // is friend break;
          break;
        }
      } else {
        break;
      }
    }


    for (let i = 1; i < 8; ++i) {
      const newI = vertically + i;
      const newJ = horizontally - i;

      if (this.#isValidSquarePosition(newI, newJ)) {
        // free square position push in to result
        if (this.#isFreeSquare(newI, newJ)) {
          result.push({ vertically: newI, horizontally: newJ });
          continue;
        }

        if (this.#isEnemy(newI, newJ)) {
          // is enemy push to result and break;
          result.push({ vertically: newI, horizontally: newJ });
          break;
        } else {
          // is friend break;
          break;
        }
      } else {
        break;
      }
    }

    console.log('result: ', result);
    return result;
  }

  #knightMoves(vertically, horizontally) {
    const movesList = [
      { vertically: vertically + 2, horizontally: horizontally + 1},
      { vertically: vertically + 2, horizontally: horizontally - 1},
      { vertically: vertically - 2, horizontally: horizontally + 1},
      { vertically: vertically - 2, horizontally: horizontally - 1},

      { vertically: vertically + 1, horizontally: horizontally + 2},
      { vertically: vertically + 1, horizontally: horizontally - 2},
      { vertically: vertically - 1, horizontally: horizontally + 2},
      { vertically: vertically - 1, horizontally: horizontally - 2},
    ];

    const result = [];

    for (let i = 0; i < movesList.length; ++i) {
      const newI = movesList[i].vertically;
      const newJ = movesList[i].horizontally;

      if (this.#isValidSquarePosition(newI, newJ)) {
        if (this.#isFreeSquare(newI, newJ) || this.#isEnemy(newI, newJ)) {
          result.push(movesList[i]);
        }
      }
    }

    return result;
  }

  #queenMoves(vertically, horizontally) {
    return [...this.#bishopMoves(vertically, horizontally), ...this.#rookMoves(vertically, horizontally)];
  }

  #kingMoves(vertically, horizontally) { }
  #pawnMoves(vertically, horizontally) { }
};

module.exports = { ChessBoard };