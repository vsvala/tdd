export class Board {
  width;
  height;
  board = [[], []];
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
      console.log("i,j", i,j)
        s += this.getCellAt(i, j); 
      }
      s += "\n";
    }
   console.log(s)
    return s;
  }

  hasFalling() {
    return Boolean(this.fallingBlock); //this.fallingBlock!=null;
  }

  drop(block) {
    if (this.hasFalling()) {
      throw new Error( "already falling");
    }
    this.fallingBlock = block;
    //startFalling(Block); !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log("fallingbloc", block)
    this.fallingBlockRow = 0;
    const blockColumns = block.columns() //1  ///3
    console.log(this.width,"boardwidth and columns", blockColumns)
   // this.fallingBlockCol = Math.floor((this.width - blockColumns)/2) //columns()/2-block.columns()/2);
   // this.fallingBlockCol = Math.floor(this.width/2) //columns()/2-block.columns()/2);
    const center = Math.floor((this.width/2)-(blockColumns/2))
    this.fallingBlockCol = center
   console.log( "center", this.fallingBlockCol)
  }


  tick() {
    //const nextRow=this.fallingBlockRow +1;
    //if(this.isInsideBoardLimits(nextRow) && this.isTileEmpty(nextRow, this.fallingBlockCol)){
    //this.fallingBlockRow=nextRow;}
    if (this.fallingHitsBottom() || this.fallingHitsAnotherBlock()) {
      this.stopFalling();
    } else {
      this.FallOneRow();
    }
  }

  stopFalling() {
    this.board[this.fallingBlockRow][this.fallingBlockCol] = this.fallingBlock.cellAt(0,0);
    this.fallingBlock = null;
  }
  FallOneRow() {
    this.fallingBlockRow++;
  }
  // isInsideBoardLimits(nextRow){
  //   return nextRow<this.height
  // }
  // isTileEmpty(row, col){
  //   return this.tiles[row][col] === this.EMPTY;
  // }
  fallingHitsBottom() {
    return this.fallingBlockRow === this.height - 1;
  }

  //isTileEmpty 
  fallingHitsAnotherBlock() {
    return (
      this.board[this.fallingBlockRow + 1][this.fallingBlockCol] != this.EMPTY
    );
  }

  //cellAt
  getCellAt(row, col) {
    if (this.hasFallingAt(row, col)) { // 0,0? ANTAA ROW JA col
      console.log("hasfallingatgetcolor",this.fallingBlock.cellAt(row,col))
      return this.fallingBlock.cellAt(0,0); //MIKÄ MERKKI  (0,0)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!row,col
    } else {
      console.log("ei oo fallingat rowcol",row,col,"else row,col", this.board[row][col])
      return this.board[row][col];  //ePALAUTTAA PELKKÄÄ TYHJÄÄ PISTETTÄ
    }
  }

  // cellAt(row, col) {
  //   const cell = fallinCellAt(row, col);
  //   if (cell != EMPTY) {
  //     return cell;
  //   }
  //   return this.tiles[row][col];
  // }

  // fallinCellAt(row, col) {
  //   if (!hasFalling()) {
  //     return this.EMPTY;
  //   }
  //   if (
  //     row >= this.fallingBlockRow &&
  //     row < this.fallingBlock.rows() + this.fallingBlockRow &&
  //     col >= this.fallingBlockCol &&
  //     col < this.fallingBlock.columns() + this.fallingBlockCol
  //   ) {
  //     return this.fallingBlock.cellAt(
  //       row - this.fallingBlockRow,
  //       this.fallingBlockCol
  //     );
  //   } else {
  //     return this.EMPTY;
  //   }
  // }

  hasFallingAt(width, height) {
   // console.log("tää",this.hasFalling() && width==this.fallingBlockRow)
    if(!this.hasFalling()){
    //  console.log("ei ole falling")
      return false;
    }
    return (
      this.hasFalling() &&
      width == this.fallingBlockRow &&
      height == this.fallingBlockCol
    );
  }

  //????
  isWithnBoardLimits(nextRow) {
    const blockCoords =this.fallingBlock.getBlockCoordinates();
    const blockTopRow = nextRow - this.fallingBlock.height+1;c

    const boardCoords=collisionsCoords.map((coordinate) => ({
      x:coordinate.x= this.fallingBlockColumn,
      y: coordinate.y = blockTopRow,
    }))
    console.log(boarcoords, result)
  return boardCoords=blockCoords.every((coord) => coord.y<this.height);
   // return y<this.height

  }

  IsTileEmpty(blockLefColumn, blockBottomRow){
     const blockCoords =this.fallingBlock.getBlockCoordinates();
    const blockTopRow = blockBottomRow - this.fallingBlock.height+1;c

    const boardCoords=collisionsCoords.map((coordinate) => ({
      x:coordinate.x= this.blockLefColumn,
      y: coordinate.y = blockTopRow,
    }))
    return boarcoords.every(({x,y}) => this.board[x]?.[y]===EMPTY);
  }

}
