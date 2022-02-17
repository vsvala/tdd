import { Block } from "./Block.mjs";
import { Tetromino } from "./Tetromino.mjs";
const EMPTY = ".";


class Point {
  row;
  col;

  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}

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
    } 
    else {
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
      this.moveDown();
      // console.log("TIIIIIIIIIIIIIIIIIIIIIIIIIIIICC         TETROMINO")

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
    console.log("moves right vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
    if (
      (this.hasFalling() && this.fallingHitsBoard()) ||
      this.fallingHitsAnotherBlock()
    ) {
      this.stopFalling();
    } else {

    // console.log("moves rightvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
    this.fallingBlockCol--;
  }
  }
  moveRight() {
    console.log("moves right vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
    if (
      (this.hasFalling() && this.fallingHitsBoard()) ||
      this.fallingHitsAnotherBlock()
    ) {
      this.stopFalling();
    } else {

    // console.log("moves rightvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
    this.fallingBlockCol++;

  }
} 
  moveDown() {
    if (
      (this.hasFalling() && this.fallingHitsBottom()) ||
      this.fallingHitsAnotherBlock()
    ) {
      this.stopFalling();
      //this.falling = null;
    } else {
      // console.log("tick falling one)");
     // this.moveDown();
    // console.log("moves down vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
    this.fallingBlockRow++;
    //this.#fallingBlock.moveDown()
  }
}

  columns() {
    return this.boarWidth;
  }

  rows() {
    return this.boardHeight;
  }



    // BOOLEAN
    fallingHitsBoard() {
      for (let row = 0; row < this.fallingBlock.rows(); row++) {
        for (let col = 0; col < this.fallingBlock.columns(); col++) {
          if (this.fallingBlock.getBlockAt(row, col)) {
            if (this.fallingBlockRow + row >= this.boardHeight) {
              return true;}
              if (this.fallingBlockCol + col+1 >= this.boardWidth) {
                return true;
              }
              if (this.fallingBlockCol+col-1< 0) {
                return true;
              }
          
          }
        }
      }
      return false;
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
