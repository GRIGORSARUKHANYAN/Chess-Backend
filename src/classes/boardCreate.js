const chessBoardCreate = () => {
  return [
    [
      { color: null, vertically: 0, horizontally: 0, pieces: null, isTouched: false },
      { color: null, vertically: 0, horizontally: 1, pieces: null, isTouched: false },
      { color: null, vertically: 0, horizontally: 2, pieces: null, isTouched: false },
      { color: null, vertically: 0, horizontally: 3, pieces: null, isTouched: false },
      { color: null, vertically: 0, horizontally: 4, pieces: null, isTouched: false },
      { color: null, vertically: 0, horizontally: 5, pieces: null, isTouched: false },
      { color: null, vertically: 0, horizontally: 6, pieces: null, isTouched: false },
      { color: null, vertically: 0, horizontally: 7, pieces: null, isTouched: false },
    ],
    [
      { color: null, vertically: 1, horizontally: 0, pieces: null, isTouched: false },
      { color: null, vertically: 1, horizontally: 1, pieces: null, isTouched: false },
      { color: null, vertically: 1, horizontally: 2, pieces: null, isTouched: false },
      { color: null, vertically: 1, horizontally: 3, pieces: null, isTouched: false },
      { color: null, vertically: 1, horizontally: 4, pieces: null, isTouched: false },
      { color: null, vertically: 1, horizontally: 5, pieces: null, isTouched: false },
      { color: null, vertically: 1, horizontally: 6, pieces: null, isTouched: false },
      { color: null, vertically: 1, horizontally: 7, pieces: null, isTouched: false },
    ],
    [
      { color: null, vertically: 2, horizontally: 0, pieces: null, isTouched: false, },
      { color: null, vertically: 2, horizontally: 1, pieces: null, isTouched: false, },
      { color: null, vertically: 2, horizontally: 2, pieces: null, isTouched: false, },
      { color: null, vertically: 2, horizontally: 3, pieces: null, isTouched: false, },
      { color: 'black', vertically: 2, horizontally: 4, pieces: 'pawn', isTouched: false, },
      { color: null, vertically: 2, horizontally: 5, pieces: null, isTouched: false, },
      { color: null, vertically: 2, horizontally: 6, pieces: null, isTouched: false, },
      { color: null, vertically: 2, horizontally: 7, pieces: null, isTouched: false, },
    ],
    [
      { color: null, vertically: 3, horizontally: 0, pieces: null, isTouched: false, },
      { color: null, vertically: 3, horizontally: 1, pieces: null, isTouched: false, },
      { color: null, vertically: 3, horizontally: 2, pieces: null, isTouched: false, },
      { color: null, vertically: 3, horizontally: 3, pieces: null, isTouched: false, },
      { color: null, vertically: 3, horizontally: 4, pieces: null, isTouched: false, },
      { color: null, vertically: 3, horizontally: 5, pieces: null, isTouched: false, },
      { color: null, vertically: 3, horizontally: 6, pieces: null, isTouched: false, },
      { color: null, vertically: 3, horizontally: 7, pieces: null, isTouched: false, },
    ],
    [
      { color: null, vertically: 4, horizontally: 0, pieces: null, isTouched: false, },
      { color: null, vertically: 4, horizontally: 1, pieces: null, isTouched: false, },
      { color: null, vertically: 4, horizontally: 2, pieces: null, isTouched: false, },
      { color: null, vertically: 4, horizontally: 3, pieces: null, isTouched: false, },
      { color: null, vertically: 4, horizontally: 4, pieces: null, isTouched: false, },
      { color: null, vertically: 4, horizontally: 5, pieces: null, isTouched: false, },
      { color: 'white', vertically: 4, horizontally: 6, pieces: 'knight', isTouched: false, },
      { color: 'black', vertically: 4, horizontally: 7, pieces: 'queen', isTouched: false, },
    ],
    [
      { color: null, vertically: 5, horizontally: 0, pieces: null, isTouched: false, },
      { color: null, vertically: 5, horizontally: 1, pieces: null, isTouched: false, },
      { color: null, vertically: 5, horizontally: 2, pieces: null, isTouched: false, },
      { color: null, vertically: 5, horizontally: 3, pieces: null, isTouched: false, },
      { color: 'white', vertically: 5, horizontally: 4, pieces: 'bishop', isTouched: false, },
      { color: null, vertically: 5, horizontally: 5, pieces: null, isTouched: false, },
      { color: null, vertically: 5, horizontally: 6, pieces: null, isTouched: false, },
      { color: null, vertically: 5, horizontally: 7, pieces: null, isTouched: false, },
    ],
    [
      { color: null, vertically: 6, horizontally: 0, pieces: null, isTouched: false },
      { color: null, vertically: 6, horizontally: 1, pieces: null, isTouched: false },
      { color: null, vertically: 6, horizontally: 2, pieces: null, isTouched: false },
      { color: null, vertically: 6, horizontally: 3, pieces: null, isTouched: false },
      { color: 'white', vertically: 6, horizontally: 4, pieces: 'pawn', isTouched: false },
      { color: null, vertically: 6, horizontally: 5, pieces: null, isTouched: false },
      { color: null, vertically: 6, horizontally: 6, pieces: null, isTouched: false },
      { color: null, vertically: 6, horizontally: 7, pieces: null, isTouched: false },
    ],
    [
      { color: null, vertically: 7, horizontally: 0, pieces: null, isTouched: false, },
      { color: null, vertically: 7, horizontally: 1, pieces: null, isTouched: false, },
      { color: null, vertically: 7, horizontally: 2, pieces: null, isTouched: false, },
      { color: null, vertically: 7, horizontally: 3, pieces: null, isTouched: false, },
      { color: null, vertically: 7, horizontally: 4, pieces: null, isTouched: false, },
      { color: null, vertically: 7, horizontally: 5, pieces: null, isTouched: false, },
      { color: null, vertically: 7, horizontally: 6, pieces: null, isTouched: false, },
      { color: null, vertically: 7, horizontally: 7, pieces: null, isTouched: false, },
    ],
  ];
};

module.exports = { chessBoardCreate };