import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";


describe("Moving_tetrominoes", () => {
  let board;
  const shape = Tetromino.T_SHAPE;
  
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("it_starts_from_top_middle", () => {
    board.drop(shape);

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it(" a falling tetromino can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();

    expect(board.toString()).to.equalShape(
     `.....T....
      ....TTT...
      ..........
      ..........
      ..........
      ..........`
    );
  });

  it(" a falling tetromino can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
     `...T......
      ..TTT.....
      ..........
      ..........
      ..........
      ..........`
    );
  });

  it(" a falling tetromino can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();

    expect(board.toString()).to.equalShape(
    `..........
      ....T.....
      ...TTT....
      ..........
      ..........
      ..........`
    );
  });

  it("it cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `.T........
      TTT.......
      ..........
      ..........
      ..........
      ..........`
      );   
  });
  it("it cannot be moved right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();


    expect(board.toString()).to.equalShape(
      `........T.
      .......TTT
      ..........
      ..........
      ..........
      ..........`
    );
  });

  it("it cannot be moved down beyond the board, will stop falling", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `..........
      ..........
      ..........
      ..........
      ....T.....
      ...TTT....`
    );
  });

  // - it cannot be moved left through other blocks
// - it cannot be moved right through other blocks
// - it cannot be moved down through other blocks (will stop falling)


  // xit("stop when they hit the bottom", () => {
  //   board.drop(Tetromino.T_SHAPE);
  //   fallToBottom(board);

  //   expect(board.toString()).to.equalShape(
  //     `..........
  //      ..........
  //      ..........
  //      ..........
  //      ....T.....
  //      ...TTT....`
  //   );
  // });

  // xit("stop when they land on another block", () => {
  //   board.drop(Tetromino.T_SHAPE);
  //   fallToBottom(board);
  //   board.drop(Tetromino.T_SHAPE);
  //   fallToBottom(board);

  //   expect(board.toString()).to.equalShape(
  //     `..........
  //      ..........
  //      ....T.....
  //      ...TTT....
  //      ....T.....
  //      ...TTT....`
  //   );
  // });
});
