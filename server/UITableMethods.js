const database = require('./database');

class UITableMethods{

test() {
  return "testing is working"
}

   recursivlyUncover(table, column, row) { 
    if (table[column][row] === '-') return; // if seen already do nothing
    if (database.devTable[column][row] !== 0) { // else if it is not a mine - uncover the cell
      table[column][row] = database.devTable[column][row];
      return;
    }
  
    table[column][row] = '-'; // mark mine
  
    if (column > 0) {// if can go left
      this.recursivlyUncover(table, column - 1, row); // go left
      if (row > 0) {// if can go up
        this.recursivlyUncover(table, column - 1, row - 1);// go left and up
      }
      if (row < (table[0].length - 1)) {// if can go down
        this.recursivlyUncover(table, column - 1, row + 1); //go left and down
      }
    }
  
    if (column < (table.length - 1)) {
      this.recursivlyUncover(table, column + 1, row);
      if (row > 0) {
        this.recursivlyUncover(table, column + 1, row - 1);
      }
      if (row < (table[0].length - 1)) {
        this.recursivlyUncover(table, column + 1, row + 1);
      }
    }
  
    if (row > 0) {
      this.recursivlyUncover(table, column, row - 1);
      if (column > 0) {
        this.recursivlyUncover(table, column - 1, row - 1);
      }
      if (column < (table[0].length - 1)) {
        this.recursivlyUncover(table, column + 1, row - 1);
      }
    }
  
    if (row < (table.length - 1)) {
      this.recursivlyUncover(table, column, row + 1);
      if (column > 0) {
        this.recursivlyUncover(table, column - 1, row + 1);
      }
      if (column < (table[0].length - 1)) {
        this.recursivlyUncover(table, column + 1, row + 1);
      }
    }
  
  }
  
     updateUITable(table, isRedTurn, redScore, blueScore, column, row, score) {
  
      if ((database.devTable[column][row] === 0) && (table[column][row] !== '-')) {
        this.recursivlyUncover(table, column, row);
      } else if (table[column][row] !== '-') {
        if (database.devTable[column][row] === 'X' && isRedTurn) { //red found a mine
          redScore++;
          score--;
          table[column][row] = 'RF';
        } else if (database.devTable[column][row] === 'X' && !isRedTurn) { //blue found a mine
          blueScore++;
          score--;
          table[column][row] = 'BF';
        } else {
          table[column][row] = database.devTable[column][row];
        }
      }
  
      if (database.devTable[column][row] !== 'X') {
        isRedTurn = !isRedTurn;
      }

     return({ cellValue: database.devTable[column][row], table, isRedTurn, blueScore, redScore, score })
    }

}

module.exports = UITableMethods;