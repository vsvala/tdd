export class Board {
  width;
  height;
  tiles = [[], []];
  fallingBlock;
  block;
  fallingBlockRow;
  fallingBlockCol;
  EMPTY = ".";

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tiles = this.getEmptyBoard(width, height);
    //console.log("this tiles",this.tiles)
  }

  getEmptyBoard(rows, cols) {
    const createRow = () => Array.from(new Array(rows), () => this.EMPTY);
    return Array.from(new Array(cols), createRow);
  }

  toString() {
    // console.log("stat",this.tiles)
    let s = "";
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        // s += this.hasFallingAt(i, j)? this.falling.getColor() : this.tiles[i][j] //this.EMPTY;
        s += this.getBlockAt(i, j);
        //if(i===0 && j==1 && this.block !=null){
        // console.log("yyyyykss",i, x.color)
        // s += this.block.color;
      }
      s += "\n";
    }
    //console.log(s)
    return s;
  }

  hasFalling() {
    return Boolean(this.fallingBlock); //this.fallingBlock!=null;
  }

  drop(block) {
    if (this.hasFalling()) {
      throw "already falling";
    }
    //console.log("blockkkkk",block.columns())
    this.fallingBlock = block;
    console.log("fallingbloc", block)
    this.fallingBlockRow = 0;
    const blockColumns = block.columns()
    console.log("bbbb",blockColumns)
    this.fallingBlockCol = Math.floor((this.width - blockColumns)/2) //columns()/2-block.columns()/2);
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
    this.tiles[this.fallingBlockRow][this.fallingBlockCol] = this.fallingBlock.getColor();
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
      this.tiles[this.fallingBlockRow + 1][this.fallingBlockCol] != this.EMPTY
    );
  }

  //cellAt
  getBlockAt(row, col) {
    if (this.hasFallingAt(row, col)) { // 0,0?
     // console.log("getcolor",this.fallingBlock.getColor())
      return this.fallingBlock.color;
    } else {
      console.log("else",this.tiles[row][col])
      return this.tiles[row][col];
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
    //console.log("tää",this.hasFalling() && width==this.fallingBlockRow)
    if(!this.hasFalling()){
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
    return boarcoords.every(({x,y}) => this.tiles[x]?.[y]===EMPTY);
  }

}
