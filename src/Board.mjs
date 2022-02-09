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
        s += this.cellAt(i, j);  //getCellAt
      }
      s += "\n";
    }
   console.log(s)
    return s;
  }

  drop(block) {
    if (this.hasFalling()) {
      throw new Error( "already falling");
    }
    this.startFalling(block);
    console.log("fallingbloc", block)
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

  startFalling(block) {
    this.fallingBlock=block;
    this.fallingBlockRow = 0;  
    console.log(this.width,"boardwidth and columns", block.columns() )
    const center = Math.floor((this.width/2)-(block.columns()/2))
    this.fallingBlockCol = center
   console.log( "center", this.fallingBlockCol)
   // this.fallingBlockCol = Math.floor((this.width - blockColumns)/2) //columns()/2-block.columns()/2);
   // this.fallingBlockCol = Math.floor(this.width/2) //columns()/2-block.columns()/2);
  }


  hasFalling() {
    return Boolean(this.fallingBlock); //this.fallingBlock!=null;
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

  //cellAt PRINTING
  getCellAt(row, col) {
    if (this.hasFallingAt(row, col)) { // 0,0? ANTAA ROW JA col
     // console.log("hasfallingatgetcolor",this.fallingBlock.cellAt(row,col))
      return this.fallingBlock.cellAt(0,0); //MIKÄ MERKKI row,col
    } else {
     // console.log("ei oo fallingat rowcol",row,col,"else row,col", this.board[row][col])
      return this.board[row][col];  //TYHJÄÄ PISTETTÄ
    }
  }

  cellAt(row, col) {
    const cell = this.fallingCellAt(row,col)
    if (cell != this.EMPTY){
      return cell;
    }
    return this.board[row][col];  //TYHJÄÄ PISTETTÄ 
  }


  fallingCellAt(width, height) {
    if(!this.hasFalling){
      return this.EMPTY
    }
    const tetrominoRow = width-this.fallingBlockRow
    const tetrominoCol = height-this.fallingBlockCol
    if (tetrominoRow >= 0
      && tetrominoRow < this.fallingBlock.rows()
      && tetrominoCol >= 0
      && tetrominoCol < this.fallingBlock.columns()
      ){
      return this.fallingBlock.cellAt(tetrominoRow,tetrominoCol);
    } else {
      return this.EMPTY;
      }
    }

    //TRUE/FALSE
  hasFallingAt(width, height) {
    return this.hasFalling() &&
      width == this.fallingBlockRow &&
       height == this.fallingBlockCol
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
