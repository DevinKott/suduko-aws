const utils = require('./utils');

class Puzzle {
    constructor(puzzleSize, gameString) {
        this.puzzleSize = puzzleSize;
        this.matrix = utils.createMatrix(this.puzzleSize);
        this.convertStringToState(gameString);
        
        this.EMPTY_CELL = 0;
        this.intermediateSteps = []
    }

    // MAIN ===========================================================================

    /**
     * Backtracks through the board.
     */
    backtrack() {
        const {row, col} = this.getNextEmpty();
        if (row === null || col === null) {
            return true;
        }

        for (let num = 1; num <= 9; num++) {
            if (!this.isValid(row, col, num)) {
                continue;
            }

            this.matrix[row][col] = num;
            //this.intermediateSteps.push(this.convertMatrixToString());
            if (this.backtrack()) {
                return true;
            }
            //this.intermediateSteps.push(this.convertMatrixToString());
            this.matrix[row][col] = this.EMPTY_CELL;
        }

        return false;
    }

    getIntermediateSteps() {
        return this.intermediateSteps;
    }

    // BOARD CHECKING ===========================================================================

    /**
     * See if we are making a valid placement at matrix[row][col] with number.
     * 
     * @param {integer} row The row to check
     * @param {integer} col The column to check
     * @param {integer} number The number to check
     */
    isValid(row, col, number) {
        return !this.isNumberInRow(row, number) &&
        !this.isNumberInCol(col, number) &&
        !this.isNumberInQuadrant(row, col, number);
    }

    /**
     * Grabs the next empty {row, col} index.
     * 
     * TODO: Keep a tracer of this instead of looping through the puzzle each time.
     */
    getNextEmpty() {
        for (let row = 0; row < this.puzzleSize; row++) {
            for (let col = 0; col < this.puzzleSize; col++) {
                if (this.matrix[row][col] === this.EMPTY_CELL) {
                    return {row: row, col: col};
                }
            }
        }

        return {row: null, col: null};
    }

    /**
     * See if `number` exists in the row already.
     * 
     * @param {integer} row The row to check
     * @param {integer} number The number to check
     */
    isNumberInRow(row, number) {
        for (let col = 0; col < this.puzzleSize; col++) {
            if (this.matrix[row][col] === number) {
                return true;
            }
        }

        return false;
    }

    /**
     * See if `number` exists in the column already.
     * 
     * @param {integer} col The column to check
     * @param {integer} number The number to check
     */
    isNumberInCol(col, number) {
        for (let row = 0; row < this.puzzleSize; row++) {
            if (this.matrix[row][col] === number) {
                return true;
            }
        }

        return false;
    }

    /**
     * See if `number` exists in the quadrant already.
     * 
     * @param {integer} row The row to check
     * @param {integer} col The column to check
     * @param {integer} number The number to check
     */
    isNumberInQuadrant(row, col, number) {
        let tempRow = row - row % 3;
        let tempCol = col - col % 3;

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (this.matrix[tempRow + r][tempCol + c] === number) {
                    return true;
                }
            }
        }

        return false;
    }

    // OTHER ===========================================================================

    convertStringToState(gameString) {
        let state = [];
        for (let i = 0; i < gameString.length; i++) {
            state.push(parseInt(gameString.charAt(i)));
        }

        let index = 0;
        for (let row = 0; row < this.puzzleSize; row++) {
            for (let col = 0; col < this.puzzleSize; col++) {
                this.matrix[row][col] = state[index++];
            }
        }
    }

    print() {
        console.debug(`Puzzle\n======`);

        for (let row = 0; row < this.puzzleSize; row++) {
            for (let col = 0; col < this.puzzleSize; col++) {
                process.stdout.write(`${this.matrix[row][col]}\t`);
            }
            process.stdout.write(`\n`);
        }
        process.stdout.write(`\n`);
    }

    convertMatrixToString() {
        let temp = '';
        for (let row = 0; row < this.puzzleSize; row++) {
            for (let col = 0; col < this.puzzleSize; col++) {
                temp += `${this.matrix[row][col]}`;
            }
        }

        return temp;
    }
}

module.exports = {
    Puzzle
}