import { Block } from "./Block.mjs";
import { Tetromino } from "./Tetromino.mjs";
const EMPTY= "."

class Point{
row;
col;

constructor(row,col) {
    this.row =row;
    this.col = col; 
  }
}

class MovableShape {
  #shape;
  #col;
  #row;

  constructor(shape, row, col) {
    this.#shape = shape;
    this.#row = row;
    this.#col = col;
  }


  startingRowOffset(){
    const points=[]
    for (let row = 0; row < this.#shape.rows() ; row++) {
      for (let col = 0; col <this.#shape.columns(); col++) {
        const block= this.cellAt(row, col)
        if(block!==EMPTY){
          points.push(new Point(row,col))
        }
      }
    }
        return points;

}

  rows() {
    return this.#shape.rows;
  }
  columns() {
    return this.#shape.columns;
  }

cellAt(row, col) {
    if (
      row >= this.#row &&
      row < this.#row + this.#shape.rows() &&
      col >= this.#col &&
      col < this.#col + this.#shape.columns()
    ) {
      return this.#shape.blockAt(row - this.#row, col - this.#col);
    } else {
      return EMPTY;
    }
  }

moveDown() {
    return new MovableShape( this.#shape, this.#row+1, this.#col)
}
moveLeft() {
  return new MovableShape(this.#shape, this.#row, this.#col-1)
}
moveLeft() {
  return new MovableShape(this.#shape, this.#row, this.#col+1)
}
}
 //26,0



export class Board {
 #width;
 #height;
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
    this.fallingBlock=new MovableShape(block,0,Math.floor((this.#width - block.columns()) / 2)
    )
    // this.startFalling(block);
    // console.log("startfallling", block);
  }

  startFalling(block) {
    this.fallingBlock = block;
    this.falling = true;
    if (
      this.block.constructor &&
      this.block.constructor.name == "Tetromino") {
      this.fallingBlockRow = this.startingRowOffset(block);
      console.log("startfalllinrowgsssssssssssssssssssssssssssssssssssssssssssssssssssssssssss", this.fallingBlockRow );
      const center = Math.floor(this.width / 2 - block.columns() / 2);
      this.fallingBlockCol = center;
    }
    else{ this.fallingBlockRow = 0;}
    //console.log(this.width,"boardwidth and columns", block.columns() )
    const center = Math.floor(this.width / 2 - block.columns() / 2);
    this.fallingBlockCol = center;
    //console.log( "center", this.fallingBlockCol)
  }

  tick() {
    // if (this.block.constructor && this.block.constructor.name == "Block") {
    //   if (
    //     (this.hasFalling() && this.fallingBlockRow === this.height - 1) ||
    //     this.board[this.fallingBlockRow + 1][this.fallingBlockCol] != this.EMPTY
    //   ) {
    //     this.stopFalling();
    //     // this.board[this.fallingBlockRow][this.fallingBlockCol] = this.fallingBlock.cellAt();
    //     //  this.falling=null
    //     // ////this.fallingBlockRow=0;
    //   } else {
    //     console.log("tick falling one)");
    //     this.fallOneRow();
    //   }
    // }
    // if (this.block.constructor && this.block.constructor.name == "Tetromino") {
      if (
        (this.hasFalling() && this.fallingHitsBottom()) ||
        this.fallingHitsAnotherBlock()
      ) {
        //&& this.fallingBlockRow===this.height-2
 // 
        this.stopFalling();
      } else {
        console.log("tick falling one)");
        this.fallOneRow();
     // }
    }
  }
startingRowOffset(block){
    for (let row = 0; row <this.height+ block.rows() ; row++) {
      for (let col = 0; col <this.width+ block.columns(); col++) {
        if(block.cellAt(row, col)){
          console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",-row)
         
          return -row;
        }
  }
}
throw new Error("empty block: "+block);

}
  stopFalling() {
    // console.log(this.fallingBlock,"fSTTTTTTTTTTTTTTTTTTTTTTTTTTTTTOOOOOOOOOOPPPaaaaaaaaaaaaaallllling BLOCK BLOCK")
    onst newBoard = this.getEmptyBoard(this.height, this.width); //new Board(this.height,this.width) //
    //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>,",this.fallingBlock.rows(),this.fallingBlock.columns());
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
      this.board[row][col] = this.cellAt(row, col);
      }
    }
    //  console.log("boaraaaaaaad", newBoard)
    this.board = newBoard;
    //this.falling = null;
    this.fallingBlock=null;
  }

  moveLeft(){
  
     fallingBlockCol--
  }
  //BOOLEAN
  hasFalling() {
   this.fallingBlock!=null; //return Boolean(this.falling); //
  }

  fallOneRow() {
    this.fallingBlockRow++;
  }

 moveLeft() {
   // this.falling.moveLeft();
   this.fallingBlockCol--;
  }
  moveRight() {
    // this.falling.moveRight();
    this.fallingBlockCol++;
   }
  moveDown() {
    // this.falling.moveDown();
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
        if (this.fallingBlock.cellAt(row, col)) {
         // if (this.fallingBlockRow + row >= this.height) {
           if (this.fallingBlockRow  >= this.height) {

            return true;
          }
        }
      }+ row+ row+ row
    }
    return false;
  }

  //BOOLEAN
  fallingHitsAnotherBlock() {
    // console.log("törmääääääääääääääääääääääääääää",this.board[this.fallingBlockRow][this.fallingBlockCol] != this.EMPTY)
    // console.log(this.fallingBlockRow,"rows------------------col",this.fallingBlockCol, this.board[this.fallingBlockRow][this.fallingBlockCol])
    for (let row = 0; row < this.fallingBlock.rows(); row++) {
      for (let col = 0; col < this.fallingBlock.columns(); col++) {
        if (this.fallingBlock.cellAt(row, col)) {
          const boardRow = this.fallingBlockRow + row;
          const boardCol = this.fallingBlockCol + col;
           console.log( boardRow, boardCol, "cboard roe and col")
          // console.log("booooooooooooooooooooooooaaaaaaaaaaaaaaard",this.board)
          if (this.board[boardRow][boardCol] != this.EMPTY) {
            // console.log("törmääääääää_________________________")
            return true;
          }
        }
      }
    }
    // console.log("ei törmääääääääääääääääääääääääääääääääääää")
    return false;
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
    //console.log("this.fallingBlock",this.fallingBlock,"rowmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmms",this.fallingBlock.rows() )
    const tetrominoRow = row - this.fallingBlockRow;
    const tetrominoCol = col - this.fallingBlockCol;
    if (this.falling
      && tetrominoRow >=0
      && tetrominoRow < this.fallingBlock.rows()
      && tetrominoCol>=0
      && tetrominoCol<this.fallingBlock.columns()
      ) {
      // if (
      //   this.fallingBlock.constructor.name == "Block" &&
      //   row == this.fallingBlockRow &&
      //   col == this.fallingBlockCol
      // ) {
      //   // console.log(this.fallingBlockRow, col,"block????????????????????????????????????????????????????????????????????",this.fallingBlock)
      //   return this.fallingBlock.cellAt(
      //     this.fallingBlockRow && this.fallingBlockCol
      //   ); //X,Y tms..
      // }

      // if (
      //   this.block.constructor &&
      //   this.block.constructor.name == "Tetromino"
      // ) {
        // console.log("block?????????????????????????????????????????????????????????????????????",this.fallingBlock)
        return this.fallingBlock.cellAt(tetrominoRow, tetrominoCol); //X,Y tms..
      } else {
        return this.EMPTY;
      }
   // } else return this.EMPTY;
  }
}
