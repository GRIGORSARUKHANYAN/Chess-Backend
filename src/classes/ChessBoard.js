const { chessBoardCreate } = require("./boardCreate");

class ChessBoard {
  #board = chessBoardCreate();
  #enPassant = {
    black: { vertically: null, horizontally: null },
    white: { vertically: null, horizontally: null },
  };
  #kingsPossition = {
    black: { vertically: 0, horizontally: 4, check: false },
    white: { vertically: 7, horizontally: 4, check: false },
  };
  #globalColor = 'white';

  constructor() {}

  get board() { return this.#board; }

};

module.exports = { ChessBoard };