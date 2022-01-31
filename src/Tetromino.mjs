import { RotatingShape } from "./RotatingShape.mjs"

export class Tetromino{

  static T_SHAPE = new Tetromino(
   `.T.
    TTT
    ...`,
    4
  );
 static I_SHAPE = new Tetromino(
  `.....
   .....
   IIII.
   .....
   .....`,
   2
  );
   static O_SHAPE = new Tetromino(
   `.OO
    .OO
    ...`,
    1
   );
  // static  S_SHAPE =  new RotatingShape(`....\n.SS.\nSS..\n....\n`, ),
  // static  Z_SHAPE = new RotatingShape(`....\nZZ..\n.ZZ.\n....\n`, ),
  // static L_SHAPE = new RotatingShape(`....\nLLL.\nL...\n....\n`, ),
  // static J_SHAPE = new RotatingShape(`....\nJJJ.\n..J.\n....\n`, )
  shape
  orientationCount;
  orientations;
  index;

  constructor(shape, orientationCount, index=0) {
    //console.log("shapewwwwwwwwwwwwwww",shape)
    this.shape=shape;
    this.orientationCount=orientationCount;
    this.index=index;
    const newshape = new RotatingShape(shape)
    //console.log("newshape",newshape)
    this.orientations=[
        newshape,
        newshape.rotateRight(),
        newshape.rotateRight().rotateRight(),
        newshape.rotateRight().rotateRight().rotateRight()
      ].slice(0, orientationCount)
    
  }
 
    rotateRight() {
         let newIndex = this.index + 1
         if (newIndex >= this.orientationCount) {
           newIndex = 0
         }
     //console.log("rotateright orient ja index",this.orientationCount,newIndex);
      return new Tetromino(this.shape, this.orientationCount, newIndex);
    }

    rotateLeft() {
     let newIndex = this.index -1
      if (newIndex < 0) {
        newIndex = this.orientationCount-1
     }
     //console.log("rotateleft orient ja index",this.orientationCount,newIndex);
     //console.log(new Tetromino(this.shape, this.orientationCount, newIndex));
    return new Tetromino(this.shape, this.orientationCount, newIndex)
  }

  toString() {
    //console.log(this.index,"thiiiiiiis",this.orientations[this.index])
    return this.orientations[this.index].toString()
}

  }

