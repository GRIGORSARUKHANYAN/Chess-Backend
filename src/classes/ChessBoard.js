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

  // moveFigure(positionFrom, positionTo) {}

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

    return result;
  }
  #knightMoves(vertically, horizontally) { }
  #queenMoves(vertically, horizontally) {
    return [...this.#bishopMoves(vertically, horizontally), ...this.#rookMoves(vertically, horizontally)];
  }
  #kingMoves(vertically, horizontally) { }
  #pawnMoves(vertically, horizontally) { }
};

module.exports = { ChessBoard };