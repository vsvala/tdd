import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

const T_SHAPE = new Tetromino(
 `..........
  ....X.....
  ...XXX....
  ....X.....
  ..........
  ..........`
);


// - a falling tetromino can be moved left
// - a falling tetromino can be moved right
// - a falling tetromino can be moved down
// - it cannot be moved left beyond the board
// - it cannot be moved right beyond the board
// - it cannot be moved down beyond the board (will stop falling)
// - it cannot be moved left through other blocks
// - it cannot be moved right through other blocks
// - it cannot be moved down through other blocks (will stop falling)



describe("Moving_tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });
  

  xit("it_starts_from_top_middle_even_when_the_piece_has_empty_row_at_the_top", () => {
    board.drop(T_SHAPE );

    expect(board.toString()).to.equalShape(
      `....X.....
       ...XXX....
       ....X.....
       ..........
       ..........
       ..........`
    );
  });

 xit(" a falling tetromino can be moved left", () => {
  board.moveLeft();

    expect(board.toString()).to.equalShape(
      `.....X....
       ....XXX...
       .....X....
       ..........
       ..........
       ..........`
    );
  });

  xit(" a falling tetromino can be moved right", () => {
    board.moveRight();
  
      expect(board.toString()).to.equalShape(
        `...X......
         ..XXX.....
         ...X......
         ..........
         ..........
         ..........`
      );
    });
    xit(" a falling tetromino can be moved down", () => {
      board.moveDown();
    
        expect(board.toString()).to.equalShape(
         `..........
          ....X.....
          ...XXX....
          ....X.....
          ..........
          ..........`
       );
      });
  
  




xit("stop when they hit the bottom", () => {
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

 xit("stop when they land on another block", () => {
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
