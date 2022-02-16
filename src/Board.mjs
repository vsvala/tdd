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

export class Board {
  width;
  height;
  board = [[], []];

  falling; //BOOLEAN
  fallingBlock;
  fallingBlockRow;
  fallingBlockCol;
  EMPTY = ".";

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.getEmptyBoard(width, height); //alustaa tyhjän laudan
  }

  getEmptyBoard(rows, cols) {
    const createRow = () => Array.from(new Array(rows), () => this.EMPTY);
    return Array.from(new Array(cols), createRow);
  }

  toString() {
    let s = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
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
    this.adjustStartPosition();
 
  }

  adjustStartPosition() {
 
   if (this.fallingBlock.constructor && this.fallingBlock.constructor.name == "Tetromino") {
    this.fallingBlockRow = this.startingRowOffset();

    const center = Math.floor((this.width - this.fallingBlock.columns()) / 2); //Math.floor(this.width /2 - this.fallingBlock.columns() / 2);    Math.floor((this.#width - block.columns()) / 2)
    this.fallingBlockCol = center;

   // console.log(  this.fallingBlockRow,this.fallingBlockCol,
    //   "START this.fallingBlockRow,this.fallingBlockCol,__________________________________________________________________________________________________"
    // );

    } else {
    this.fallingBlockRow = 0;  
    this.fallingBlockCol = 1;
    //  }
    //console.log(this.width,"boardwidth and columns", block.columns() )
    // const center =  Math.floor((this.width - this.fallingBlock.columns()) / 2);
  }
}

  tick() {
    if (
      this.fallingBlock.constructor &&
      this.fallingBlock.constructor.name == "Block"
    ) {
     // console.log("TIIIIIIIIIIIIIIIIIIIIIIIIIIIICC       BLOCK")
      if (
        (this.hasFalling() && this.fallingBlockRow === this.height-1) ||  //if hots bottom
        this.board[this.fallingBlockRow+1][this.fallingBlockCol] != this.EMPTY //if next row has block
      ) {
       
        this.board[this.fallingBlockRow][this.fallingBlockCol] = this.fallingBlock.getBlockAt(); //gets block above it
        this.falling=null
         // this.stopFalling();
      } else {
       // console.log("tick block down)");
        this.moveDown();
      }
    }
    else ///tetromino
    {
      console.log("TIIIIIIIIIIIIIIIIIIIIIIIIIIIICC         TETROMINO")
      if (
        (this.hasFalling() && this.fallingHitsBottom()) 
       || this.fallingHitsAnotherBlock()
      ) {
        this.stopFalling();
      } else {
        console.log("tick falling one)");
        this.moveDown();
      }
    }
  }
  startingRowOffset() {
    for (let row = 0; row < this.height + this.fallingBlock.rows(); row++) {
      for (let col = 0; col < this.width + this.fallingBlock.columns(); col++) {
        if (this.fallingBlock.getBlockAt(row, col)) {
          // console.log(
          //   "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
          //   row
          // );
            if(row>0){
          return -row;
            }else
            return row;
        }
      }
    }
    throw new Error("empty block: " + this.fallingblock);
  }
  stopFalling() {
    const newBoard = this.getEmptyBoard(this.height, this.width); //new Board(this.height,this.width) //
   console.log("STOPS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>,",this.fallingBlock.rows(),this.fallingBlock.columns());
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        newBoard[row][col] = this.cellAt(row, col);
      }
    }
    // console.log("NEW_boar after STOP", newBoard)
    this.board = newBoard;
    this.falling = null;
   // this.fallingBlock = null;
  }

  moveLeft() {
    fallingBlockCol--;
  }
  //BOOLEAN
  hasFalling() {
    return  Boolean(this.falling)  //this.fallingBlock != null //
  }

  moveLeft() {
    this.fallingBlockCol--;
  }
  moveRight() {
    this.fallingBlockCol++;
  }
  moveDown() {
    console.log("moves down vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
    this.fallingBlockRow++;
  }

  columns() {
    return this.width;
  }

  rows() {
    return this.height;
  }

  // BOOLEAN
  fallingHitsBottom() {
    for (let row = 0; row < this.fallingBlock.rows(); row++) {
      for (let col = 0; col < this.fallingBlock.columns(); col++) {
        if (this.fallingBlock.getBlockAt(row, col)) {
          if (this.fallingBlockRow + row >= this.height) {
         // if (this.fallingBlockRow = this.height) {
            console.log("hits BOTTOMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM")
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
          const boardRow = this.fallingBlockRow + row;  //row+fallingBlock size 
          const boardCol = this.fallingBlockCol + col;
        //  console.log(boardRow, boardCol, "is boarrow empty");
          // console.log("booooooooooooooooooooooooaaaaaaaaaaaaaaard",this.board)
          if (this.board[boardRow][boardCol] != this.EMPTY) {   //
           console.log("törmääääääää_________________________")
            return true;
          }
        }
      }
    }
    console.log("ei törmääääääääääääääääääääääääääääääääääää")
    return this.board[this.fallingBlockRow+1][this.fallingBlockCol] != this.EMPTY;
  }

  cellAt(row, col) {
    if (this.hasFalling) {
      const cell = this.fallingCellAt(row, col); //HAKEE PISTEEN TAI MERKIN
      if (cell != this.EMPTY) {
        return cell;
      }
    }
    return this.board[row][col]; //PALAUTAA LAUDAN JOS EI TIPU/STOPATTU
  }

  //PAlauttaa piteen tai merkin
  fallingCellAt(row, col) {
  //  console.log(row,col,"this.fallingBlock",this.fallingBlock,"rowmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmms",this.fallingBlockRow )
    const tetrominoRow = row - this.fallingBlockRow;
    const tetrominoCol = col -this.fallingBlockCol;
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
