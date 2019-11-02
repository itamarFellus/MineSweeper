
class InitializeBoard {
    table = [];

    numberOfColumns = 0;
    numberOfRows = 0;
    numberOfMines = 31;

    constructor(numberOfColumns, numberOfRows, numberOfMines) {
        this.numberOfColumns = numberOfColumns;
        this.numberOfRows = numberOfRows;
        this.numberOfMines = numberOfMines;

        for(let column = 0; column < this.numberOfColumns; column++) {
            this.table[column] = new Array(this.numberOfRows);
        }
    }

    constructDummyTable() {
        const dummyTable = this.tableInit();
        return dummyTable;
    }

    tableInit() {
        const table = [];

        for(let column = 0; column < this.numberOfColumns + 2; column++) {
            table[column] = new Array(this.numberOfRows + 2).fill(0);
        }

        this.setMines( table );

        return table;
    }

    setMines( table ) {
        let column , row;

        while( this.numberOfMines > 0 ) {
            column = 1 +  Math.floor(Math.random() * this.numberOfColumns);
            row = 1 + Math.floor(Math.random() * this.numberOfRows);

            if( table[column][row] !== 'X' ) {
                table[column][row] = 'X';
                this.numberOfMines--;
            }
        }
    }

    findMines( table ) {
        for(let column = 0; column < table.length; column++) {
            for(let row = 0; row < table[0].length; row++) {
                if( table[column][row] === 'X') {
                   table =  this.updateMineVicinity(table, column, row);
                }
            }
        }
    }

    updateMineVicinity(table, column, row) {
        for(let i = -1; i < 2; i++) {
            for(let j = -1; j < 2; j++) {
                if(table[column + i][row + j] !== 'X') {
                    table[column + i][row + j]++;
                }
            }
        }
        return table;
    }

    removePedding( dummyTable ) {
        for(let column = 1; column < this.numberOfColumns + 1; column++) {
            for(let row = 1; row < this.numberOfRows + 1; row++) {
                this.table[column - 1][row - 1] = dummyTable[column][row];
            }
        }
    }

    prepTable() {
        const dummyTable = this.constructDummyTable();
        this.findMines(dummyTable);
        this.removePedding(dummyTable);
    }
}

module.exports = InitializeBoard;