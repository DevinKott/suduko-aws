const Puzzle = require('./Puzzle').Puzzle;

let puzzle = new Puzzle(9, `600000001090040060000617000003000200062050180007000600000165000080090040300000005`);
puzzle.print();
puzzle.backtrack();
puzzle.print();