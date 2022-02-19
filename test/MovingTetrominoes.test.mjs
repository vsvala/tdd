import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

function moveToRight(board) {
  for (let i = 0; i < 10; i++) {
    board.moveRight();
  }
}

function moveToLeft(board) {
  for (let i = 0; i < 10; i++) {
    board.moveLeft();
  }
}


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
    moveToLeft(board);
 

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
    moveToRight(board);



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
    fallToBottom(board);
 

    expect(board.toString()).to.equalShape(
      `..........
      ..........
      ..........
      ..........
      ....T.....
      ...TTT....`
      ); 
    });

// - it cannot be moved right through other blocks


  it(" it cannot be moved left through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToLeft(board);
    board.drop(Tetromino.T_SHAPE);
    moveToLeft(board);


    expect(board.toString()).to.equalShape(
     `.T..T.....
      TTTTTT....
      ..........
      ..........
      ..........
      ..........`
      ); 
  });

  it(" it cannot be moved right through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToRight(board);
    board.drop(Tetromino.T_SHAPE);
    moveToRight(board);


    expect(board.toString()).to.equalShape(
     `.....T..T.
      ....TTTTTT
      ..........
      ..........
      ..........
      ..........`
      ); 
  });


 it("it cannot be moved down through other blocks (will stop falling)", () => {
  board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
     `..........
      ..........
      ....T.....
      ...TTT....
      ....T.....
      ...TTT....`
  );
  });
});
