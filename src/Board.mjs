import { shapeToString } from "./shapes.mjs";

const EMPTY= ".";

class Point{
row;
col;

constructor(row,col) {
    this.row =row;
    this.col = col; 
  }
}

class MovableShape {
  #shape; //#private class
  #row//shapeRow;
  #col//shapeCol;

  constructor(shape, row, col) {
    this.#shape = shape;
    this.#row = row;
    this.#col = col;
  }
  

  fallingHitsBottom(board,number) {
    for (let row = 0; row <board.height(); row++) {
      for (let col = 0; col < board.width(); col++) {
        if (this.cellAt(row, col)) {
          
          if (this.#row >= board.height() - number) {
         //  if (this.fallingBlockRow  >= this.#height) {
            return true;
          }
        }
      }
    }
    return false;
  }

  fallingHitsAnotherBlock(board){
    for (let row = 0; row < board.height; row++) {
       for (let col = 0; col < board.width; col++) {
       if (this.cellAt(row, col)) {
           const boardRow = board.height+ row;
           const boardCol = board.width; + col;
            console.log( boardRow, boardCol, "cboard roe and col")
           // console.log("booooooooooooooooooooooooaaaaaaaaaaaaaaard",this.board)
           if (board[boardRow][boardCol] != this.EMPTY) {
             // console.log("törmääääääää_________________________")
             return true;
           }
         }
       }
     }
     // console.log("ei törmääääääääääääääääääääääääääääääääääää")
     return false;
   }
     // console.log("törmääääääääääääääääääääääääääää",this.board[this.fallingBlockRow][this.fallingBlockCol] != this.EMPTY)
     // console.log(this.fallingBlockRow,"rows------------------col",this.fallingBlockCol, this.board[this.fallingBlockRow][this.fallingBlockCol]  
 
 
 

  startingRowOffset(){
    const points=[]
    for (let row = this.#row; row < this.#row+ this.#shape.height() ; row++) {
      for (let col = this.#col; col <this.#col+this.#shape.width(); col++) {
        const block= this.cellAt(row, col)
        if(block!==EMPTY){
          points.push(new Point(row,col))
        }
      }
    }
        return points;
}


  cellAt(row, col) {
    if (
      row >= this.#row &&
      row < this.#row + this.#shape.height() &&
      col >= this.#col &&
      col < this.#col + this.#shape.width()
    ) {
      return this.#shape.cellAt(row - this.#row, col - this.#col);
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

row() {
  return this.#row
}
col() {
  return this.#col
}

  }
 //26,0



export class Board {
#width;
#height;
 board = [[], []];
  block;  
  falling; //BOOLEAN
  fallingBlock=null;
  EMPTY = ".";

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.board = this.getEmptyBoard(width, height); //alustaa tyhjän laudan
  }

  getEmptyBoard(rows, cols) {
    const createRow = () => Array.from(new Array(rows), () => this.EMPTY);
    return Array.from(new Array(cols), createRow);
  }

  // toString() {
  //   let s = "";
  //   for (let i = 0; i < this.#height; i++) {
  //     for (let j = 0; j < this.width; j++) {
  //       //console.log("i,j", i,j)
  //       s += this.cellAt(i, j);
  //     }
  //     s += "\n";
  //   }
  //   console.log("board. tostring", s);
  //   return s;
  // }

  drop(block) {
    this.block = block;
    if (this.fallingBlock) {
      throw new Error("already falling");
    }
    this.fallingBlock=new MovableShape(block, 0, Math.floor((this.#width - block.width()) / 2)
    )
   console.log("startfallling", block)
  }
  //this.fallingBlock=new MovableShape(block,0, Math.floor((this.#width/2) - block.width()/ 2)



  tick() {  
   if (this.fallingBlock) {
   if (this.block.constructor && this.block.constructor.name == "Block") {

   // console.log("hasfalling",this.hasFalling(), "hitsbottom",this.fallingHitsBottom())

      const test = this.fallingBlock.moveDown();
        if( test.fallingHitsBottom(this,0)){ ///|| test.fallingHitsAnotherBlock(this.board)){
        //&& this.fallingBlockRow===this.height-2
        this.stopFalling();
      } else {
        console.log("tick falling one11111111111111111111111111111111111111111111111111111111111111111111111111)");
        this.fallingBlock=test;
      //  this.moveDown();
 
      }
}
   if (this.block.constructor && this.block.constructor.name == "Tetromino") {

   // console.log("hasfalling",this.hasFalling(), "hitsbottom",this.fallingHitsBottom())

      const test = this.fallingBlock.moveDown();
        if( test.fallingHitsBottom(this,1)){ ///|| test.fallingHitsAnotherBlock(this.board)){
        //&& this.fallingBlockRow===this.height-2
        this.stopFalling();
      } else {
        console.log("tick falling one11111111111111111111111111111111111111111111111111111111111111111111111111)");
        this.fallingBlock=test;
      //  this.moveDown();
    }
  }

  }
}

  //BOOLEAN
  fallingHitsAnotherBlock() {
    const test=fallingBlock.moveDown()
    return test.collides(this.board)
  }

  

startingRowOffset(block){
    for (let row = 0; row <this.#height+ block.rows() ; row++) {
      for (let col = 0; col <this.#width+ block.columns(); col++) {
        if(block.cellAt(row, col)){
          console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",-row)
         
          return -row;
        }
  }
}
throw new Error("empty block: "+block);

}

  stopFalling() {
    console.log(this.fallingBlock,"fSTTTTTTTTTTTTTTTTTTTTTTTTTTTTTOOOOOOOOOOPPPaaaaaaaaaaaaaallllling BLOCK BLOCK")
     let newBoard = this.getEmptyBoard(this.height(), this.width()); //new Board(this.height,this.width) //
    //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>,",this.fallingBlock.rows(),this.fallingBlock.columns());
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
      newBoard[row][col] = this.cellAt(row, col);
      }
    }
    //this.falling = null;
    this.board=newBoard;
    this.fallingBlock=null;
  }


  hasFalling() {
  // this.fallingBlock!=null; 
  return Boolean(this.fallingBlock); 
  }

  width() {
    return this.#width;
     }
  
  height() {
   return this.#height;
   }

   fallOneRow() {
    this.fallingBlockRow++;
  }


 moveLeft() {
   // this.fallingBlock.moveLeft();
   this.fallingBlockCol--;
  }
  moveRight() {
    // this.fallingBlock.moveRight();
    this.fallingBlockCol++;
   }


  cellAt(row, col) {
    if (this.fallingBlock) {
      const block = this.fallingBlock.cellAt(row, col); //HAKEE PISTEEN TAI MERKIN
      if (block != this.EMPTY) {
        return block;
      }
    }
    return this.board[row][col]; //PALAUTAA LAUDAN JOS EI TIPU/STOPATTU
  }

  toString() {
   // console.log("thiiiiiiiiiiS", this)
    return shapeToString(this);
  }    
}

// startFalling(block) {
//   this.fallingBlock = block;
//   this.falling = true;
//   if (
//     this.block.constructor &&
//     this.block.constructor.name == "Tetromino") {
//     this.fallingBlockRow = this.startingRowOffset(block);
//     const center = Math.floor(this.#width / 2 - block.columns() / 2);
//     this.fallingBlockCol = center;
//   }
//   else{ this.fallingBlockRow = 0;}
//   const center = Math.floor(this.#width / 2 - block.columns() / 2);
//   this.fallingBlockCol = center;
// }