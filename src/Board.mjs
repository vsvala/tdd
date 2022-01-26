export class Board {
  width;
  height;
  falling;
  block;
  fallingBlockRow=0;
  EMPTY='.'
  stationary=[[],[]]

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
        s += this.hasFallingAt(i, j)? this.falling.getColor() : this.stationary[i][j] //this.EMPTY;
        //if(i===0 && j==1 && this.block !=null){
          // console.log("yyyyykss",i, x.color)
          // s += this.block.color;
         }
         s += "\n";
        }
    //console.log(s)
    return s;
  }

  hasFallingAt(width, height){
    //console.log("tää",this.hasFalling() && width==this.fallingBlockRow)
    return this.hasFalling() && width==this.fallingBlockRow && height==1;
  }

  hasFalling(){
  return this.falling!=null;
  }

  drop(block) {
 // this.falling=true;
 if(this.hasFalling()){
  throw 'already falling';
 } 
   this.falling=block;
 }


tick(){
  if(this.fallingBlockRow==this.i-1){
  this.falling=null
  }
  else{
    this.fallingBlockRow++;
  
  }
}

}
