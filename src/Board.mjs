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
    this.stationary=this.getEmptyBoard(width, height)//[[this.width],[this.height]]
    //for(let row in this.stationary){
  //     this.stationary.fill(row, this.EMPTY)
  // }
}

getEmptyBoard(rows, cols) {
  const createRow = () =>Array.from(new Array(rows),() => this.EMPTY);
  return Array.from(new Array(cols),createRow);
  }


  toString() {
    console.log("stat",this.stationary)
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
  
getBlockAt(row, col){
  if(this.hasFallingAt(row,col)){
    return this.fallingBlock.getColor()
  }
  else{
   return this.stationary[row][col] 
  }
}

  hasFallingAt(width, height){
    //console.log("tää",this.hasFalling() && width==this.fallingBlockRow)
    return this.hasFalling() && width==this.fallingBlockRow && height==this.fallingBlockCol;
  }

  hasFalling(){
  return Boolean(this.fallingBlock);  //this.fallingBlock!=null;
  }

  drop(block) {
 // this.falling=true;
 if(this.hasFalling()){
  throw 'already falling';
 } 
   this.fallingBlock=block;
   this.fallingBlockRow=0
   this.fallingBlockCol=1
 }

isInsideBoardLimits(nextRow){
  return nextRow<this.height
}

isTileEmpty(row, col){
  return this.stationary[row][col] === this.EMPTY;
}

tick(){
  const nextRow=this.fallingBlockRow +1;

  if(this.isInsideBoardLimits(nextRow) && this.isTileEmpty(nextRow, this.fallingBlockCol)){

    this.fallingBlockRow=nextRow;
  
  } 
   else {
    this.stopFalling();
  }


}

stopFalling(){
  this.stationary[this.fallingBlockRow][this.fallingBlockCol]=this.fallingBlock.getColor()
  this.fallingBlock=null
}
}
