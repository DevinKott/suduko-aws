const Puzzle = require("./Puzzle").Puzzle;

//let puzzle = new Puzzle(9, `600000001090040060000617000003000200062050180007000600000165000080090040300000005`);
//let puzzle = new Puzzle(9, `00000000000000000000000000000000000000000000000000000000000000000000000000000000`);
let puzzle = new Puzzle(
    9,
    `330000000000000000000000000000000000000000000000000000000000000000000000000000000`
);
puzzle.print();
console.log(puzzle.backtrack());
puzzle.print();

console.debug(`Final String: ${puzzle.convertMatrixToString()}`);

const intermediateSteps = puzzle.getIntermediateSteps();
console.debug(`Steps Taken: ${intermediateSteps.length}`);
console.log(intermediateSteps);
