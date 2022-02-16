import { Block } from "./Block.mjs";
import { Tetromino } from "./Tetromino.mjs";
const EMPTY = ".";

//   cellAt(row, col) {
//     if (
//       row >= this.#row &&
//       row < this.#row + this.#shape.rows() &&
//       col >= this.#col &&
//       col < this.#col + this.#shape.columns()
//     ) {
//       return this.#shape.blockAt(row - this.#row, col - this.#col);
//     } else {
//       return EMPTY;
//     }
//   }

//   moveDown() {
//     return new MovableShape(this.#shape, this.#row + 1, this.#col);
//   }
//   moveLeft() {
//     return new MovableShape(this.#shape, this.#row, this.#col - 1);
//   }
//   moveLeft() {
//     return new MovableShape(this.#shape, this.#row, this.#col + 1);
//   }
// }
//26,0

class Point {
  row;
  col;

  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}

// class MovableShape {
//   #shape;
//   #row;
//   #col;

//   constructor(shape, row, col) {
//     this.#shape = shape;
//     this.#row = row;
//     this.#col = col;
//   }

//   moveDown() {
//     return new MovableShape(this.#shape, this.#row + 1, this.#col);
//   }
//   moveLeft() {
//     return new MovableShape(this.#shape, this.#row, this.#col - 1);
//   }
//   moveLeft() {
//     return new MovableShape(this.#shape, this.#row, this.#col + 1);
//   }

//   rows() {
//     return this.#row;
//   }
//   columns() {
//     return this.#col;
//   }

//   nonEmptyBlocks() {
//     const points = [];
//     for (let row = this.#row; row < this.#row + this.#shape.height(); row++) {
//       for (let col = this.#col; col < this.#col + this.#shape.width(); col++) {
//         const block = this.blockAt(row, col);
//         if (block !== EMPTY) {
//           points.push(new Point(row, col));
//         }
//       }
//     }
//     return points;
//   }

//   blockAt(row, col) {
//     if (
//       row >= this.#row &&
//       row < this.#row + this.#shape.height() &&
//       col >= this.#col &&
//       col < this.#col + this.#shape.width()
//     ) {
//       return this.#shape.blockAt(row - this.#row, col - this.#col);
//     } else {
//       return EMPTY;
//     }
//   }
// }

export class Board {
  boardWidth;
  boardHeight;
  board = [[], []];
  falling; //BOOLEAN
  fallingBlock;
  fallingBlockRow;
  fallingBlockCol;
  EMPTY = ".";

  constructor(width, height) {
    this.boardWidth = width;
    this.boardHeight = height;
    this.board = this.getEmptyBoard(width, height); //alustaa tyhjän laudan
    // console.log(this.board)
  }

  getEmptyBoard(width, height) {
    const createRow = () => Array.from(new Array(width), () => this.EMPTY);
    return Array.from(new Array(height), createRow);
  }

  toString() {
    let s = "";
    for (let i = 0; i < this.boardHeight; i++) {
      for (let j = 0; j < this.boardWidth; j++) {
        //console.log("i,j", i,j)
        s += this.cellAt(i, j);
      }
      s += "\n";
    }
    console.log("board. tostring", s);
    return s;
  }

  drop(block) {
    // this.block = block;
    if (this.hasFalling()) {
      throw new Error("already falling");
    }
    this.fallingBlock = block;
    this.falling = true;
    // console.log(this.fallingBlock)
    this.adjustStartPosition();
  }

  adjustStartPosition() {
    if (
      this.fallingBlock.constructor &&
      this.fallingBlock.constructor.name == "Block"
    ) {
      this.fallingBlockRow = 0;
      this.fallingBlockCol = 1;
    } else {
      this.fallingBlockRow = 0;

      const center = Math.floor(
        (this.boardWidth - this.fallingBlock.columns()) / 2
      ); //Math.floor(this.width /2 - this.fallingBlock.columns() / 2);    Math.floor((this.#width - block.columns()) / 2)
      console.log(
        "center_______________________________________________",
        center
      );
      this.fallingBlockCol = center;

      console.log(
        "start row",
        this.fallingBlockRow,
        "cStart col",
        this.fallingBlockCol
      );

      // this.fallingBlock = new MovableShape(this.fallingBlock, 0, center)

      //   "START this.fallingBlockRow,this.fallingBlockCol,__________________________________________________________________________________________________"
      // );

      //  }
      //console.log(this.width,"boardwidth and columns", block.columns() )
      // const center =  Math.floor((this.width - this.fallingBlock.columns()) / 2);
    }
  }

  // startingRowOffset() {
  //   const points = [];
  //   for (let row = 0; row < this.fallingBlock.rows(); row++) {
  //     for (let col = 0; col < this.fallingBlock.columns(); col++) {
  //       // const block=this.cellAt(row, col)
  //       //  if(block != this.EMPTY){
  //       //   points.push(new Point(row,col))
  //       if (this.cellAt(row, col)) {
  //         console.log(
  //           "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
  //           row
  //         );
  //         if (row >= 1) {
  //           return row - 1;
  //         } else {
  //           return 0;
  //         }
  //       }
  //     }
  //   }
  //   throw new Error("empty block: " + this.fallingBlock);
  // }

  tick() {
    if (
      this.fallingBlock.constructor &&
      this.fallingBlock.constructor.name == "Block"
    ) {
      // console.log("TIIIIIIIIIIIIIIIIIIIIIIIIIIIICC       BLOCK")
      if (
        (this.hasFalling() && this.fallingBlockRow === this.boardHeight - 1) || //if hots bottom
        this.board[this.fallingBlockRow + 1][this.fallingBlockCol] != this.EMPTY //if next row has block
      ) {
        this.board[this.fallingBlockRow][this.fallingBlockCol] = this.fallingBlock.getBlockAt(); 
          //gets block above it
        this.falling=null  //this.stopFalling();
      } else {
        // console.log("tick block down)");
        this.moveDown();
      }
    } ///tetromino
    else {
      // console.log("TIIIIIIIIIIIIIIIIIIIIIIIIIIIICC         TETROMINO")
      if (
        (this.hasFalling() && this.fallingHitsBottom()) ||
        this.fallingHitsAnotherBlock()
      ) {
        this.stopFalling();
        //this.falling = null;
      } else {
        // console.log("tick falling one)");
        this.moveDown();
      }
    }
  }

  stopFalling() {
    const newBoard = this.getEmptyBoard(this.boardHeight, this.boardWidth); //new Board(this.height,this.width) //
 // console.log("STOPS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>,",this.fallingBlock.rows(),this.fallingBlock.columns());
    for (let row = 0; row < this.boardHeight; row++) {
      for (let col = 0; col < this.boardWidth; col++) {
        newBoard[row][col] = this.cellAt(row, col);
      }
    }
   console.log("NEW_boar after STOP", newBoard)
    this.board = newBoard;
    this.falling = null;
    // this.fallingBlock = null;
  }

  //BOOLEAN
  hasFalling() {
    return Boolean(this.falling); //this.fallingBlock != null //
  }

  moveLeft() {
    this.fallingBlockCol--;
  }
  moveRight() {
    console.log("moves right vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
    //f(canMoveLeft()){
    this.fallingBlockCol++;
    //}
  }
  moveDown() {
    // console.log("moves down vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
    this.fallingBlockRow++;
    //this.#fallingBlock.moveDown()
  }

  columns() {
    return this.boarWidth;
  }

  rows() {
    return this.boardHeight;
  }

  // BOOLEAN
  fallingHitsBottom() {
    for (let row = 0; row < this.fallingBlock.rows(); row++) {
      for (let col = 0; col < this.fallingBlock.columns(); col++) {
        if (this.fallingBlock.getBlockAt(row, col)) {
          if (this.fallingBlockRow + row >= this.boardHeight) {
            // if (this.fallingBlockRow = this.height) {
            console.log(
              "hits BOTTOMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM"
            );
            return true;
          }
        }
      }
    }
    return false;
  }

  //BOOLEAN
  fallingHitsAnotherBlock() {
    // console.log("törmääääääääääääääääääääääääääää",this.board[this.fallingBlockRow][this.fallingBlockCol] != this.EMPTY)
    // console.log(this.fallingBlockRow,"rows------------------col",this.fallingBlockCol, this.board[this.fallingBlockRow][this.fallingBlockCol])
    for (let row = 0; row < this.fallingBlock.rows(); row++) {
      for (let col = 0; col < this.fallingBlock.columns(); col++) {
        if (this.cellAt(row, col)) {
          // console.log(row,col,"row, col  cellAt_______________________________________________________________________________--")
          const boardRow = this.fallingBlockRow + row; //row+fallingBlock size
          const boardCol = this.fallingBlockCol + col;
          //  console.log(boardRow, boardCol, "is boarrow empty");
          // console.log("booooooooooooooooooooooooaaaaaaaaaaaaaaard",this.board)
          if (this.board[boardRow][boardCol] != this.EMPTY) {
            //
            // console.log("törmääääääää_________________________")
            return true;
          }
        }
      }
    }
    //  console.log("ei törmääääääääääääääääääääääääääääääääääää")
    return false; //this.board[this.fallingBlockRow+1][this.fallingBlockCol] != this.EMPTY;
  }

  cellAt(row, col) {
    if (this.hasFalling) {
      const cell = this.fallingCellAt(row, col); //HAKEE PISTEEN TAI MERKIN
      if (cell != this.EMPTY) {
        return cell;
      }
    }
    return this.board[row][col]; //PALAUTAA tyhjän LAUDAN JOS EI TIPU/STOPATTU
  }

  //PAlauttaa piteen tai merkin
  fallingCellAt(row, col) {
    //  console.log(row,col,"this.fallingBlock",this.fallingBlock,"rowmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmms",this.fallingBlockRow )
    const tetrominoRow = row - this.fallingBlockRow;
    const tetrominoCol = col - this.fallingBlockCol;
    if (
      this.fallingBlock &&
      tetrominoRow >= 0 &&
      tetrominoRow < this.fallingBlock.rows() &&
      tetrominoCol >= 0 &&
      tetrominoCol < this.fallingBlock.columns()
    ) {
      return this.fallingBlock.getBlockAt(tetrominoRow, tetrominoCol); //X,Y tms..
    } else {
      return this.EMPTY;
    }
  }
}
