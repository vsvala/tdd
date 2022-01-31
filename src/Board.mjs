export class Board {
  width;
  height;
  stationary=[[],[]]
  fallingBlock;
  block;
  fallingBlockRow;
  fallingBlockCol;
  EMPTY='.'
 

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.stationary=this.getEmptyBoard(width, height)
}

getEmptyBoard(rows, cols) {
  const createRow = () =>Array.from(new Array(rows),() => this.EMPTY);
  return Array.from(new Array(cols),createRow);
  }

  toString() {
   // console.log("stat",this.stationary)
    let s = "";
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
       // s += this.hasFallingAt(i, j)? this.falling.getColor() : this.stationary[i][j] //this.EMPTY;
      s += this.getBlockAt(i,j)
       //if(i===0 && j==1 && this.block !=null){
          // console.log("yyyyykss",i, x.color)
          // s += this.block.color;
         }
         s += "\n";
        }
    //console.log(s)
    return s;
  }
  
  hasFalling(){
    return Boolean(this.fallingBlock);  //this.fallingBlock!=null;
  }

  drop(block) {
    if(this.hasFalling()){
      throw 'already falling';
 } 
   this.fallingBlock=block;
   this.fallingBlockRow=0
   this.fallingBlockCol=1
 }

tick(){
  //const nextRow=this.fallingBlockRow +1;
  //if(this.isInsideBoardLimits(nextRow) && this.isTileEmpty(nextRow, this.fallingBlockCol)){
  //this.fallingBlockRow=nextRow;} 
  if (this.fallingHitsBottom() || this.fallingHitsStationary() ){
    this.stopFalling();
  }
   else {
    this.FallOneRow();
  }
}

stopFalling(){
  this.stationary[this.fallingBlockRow][this.fallingBlockCol]=this.fallingBlock.getColor()
  this.fallingBlock=null
}
FallOneRow(){
  this.fallingBlockRow++;
}
// isInsideBoardLimits(nextRow){
//   return nextRow<this.height
// }
// isTileEmpty(row, col){
//   return this.stationary[row][col] === this.EMPTY;
// }
fallingHitsBottom(){
  return this.fallingBlockRow === this.height-1
  }

fallingHitsStationary(){
  return this.stationary[this.fallingBlockRow+1][this.fallingBlockCol] != this.EMPTY;
  }

getBlockAt(row, col){
  if(this.hasFallingAt(row,col)){
    return this.fallingBlock.getColor()
    }
    else{
     return this.stationary[row][col] 
    }
  }

cellAt(row, col){
  const cell = fallinCellAt(row, col);
  if (cell != EMPTY){
    return cell;
  }
  return this.stationary[row][col]
}

fallinCellAt(row,col){
  if (!hasFalling()) {
    return this.EMPTY;
  }
  if (row >= this.fallingBlockRow 
  && row  < this.fallingBlock.rows() + this.fallingBlockRow 
  && col >= this.fallingBlockCol 
  && col < this.fallingBlock.columns() + this.fallingBlockCol){
      return this.fallingBlock.cellAt(row -this.fallingBlockRow, this.fallingBlockCol);
  }

else{
  return this.EMPTY;
}
}
  
hasFallingAt(width, height){
  //console.log("tää",this.hasFalling() && width==this.fallingBlockRow)
  return this.hasFalling() && width==this.fallingBlockRow && height==this.fallingBlockCol;
  }

}
