import React from 'react';
import RenderBoard from './RenderBoard';
import Score from './Score';
import InitializeBoard from './InitializeBoard';

const numberOfColumns = 16;
const numberOfRows = 16;
const numberOfMines = Math.floor((numberOfColumns * numberOfRows) / 5);
const tableInit = [];


//initiallize tableinit
for(let column = 0; column < numberOfColumns; column++) {
  tableInit[column] = new Array (numberOfRows);
}

for(let column = 0; column < numberOfColumns; column++) {
  for(let row = 0; row < numberOfRows; row++) {
      tableInit[column][row] = ""; 
  }
}
 export default Header