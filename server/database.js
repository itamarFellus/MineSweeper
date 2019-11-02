const InitializeBoard = require('./InitializeBoard');
const numberOfColumns = 16;
const numberOfRows = 16;
const numberOfMines = Math.floor((numberOfColumns * numberOfRows) / 5);
const tableInit = [];

const board = new InitializeBoard(numberOfColumns, numberOfRows, numberOfMines);
      board.prepTable();

//initiallize tableinit
for (let column = 0; column < numberOfColumns; column++) {
  tableInit[column] = new Array(numberOfRows);
}

for (let column = 0; column < numberOfColumns; column++) {
  for (let row = 0; row < numberOfRows; row++) {
    tableInit[column][row] = "";
  }
}

state = {
    devTable: board.table ,
    UITable: tableInit,
    isRedTurn: true,
    score: numberOfMines,
    redScore: 0,
    blueScore: 0,
}

module.exports = state;