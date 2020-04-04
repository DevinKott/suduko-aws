/**
 * Creates a 2D matrix, filled with 0's.
 * 
 * @param {integer} size Size of the square matrix
 */
function createMatrix(size) {
    let temp = [];
    for (let i = 0; i < size; i++) {
        temp[i] = [];

        for (let j = 0; j < size; j++) {
            temp[i][j] = 0;
        }
    }
    return temp;
}

module.exports = {
    createMatrix
}