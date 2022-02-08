export class RotatingShape {
  blocks;
  size;

  constructor(shape) {
    if (typeof shape === "string") {
      this.blocks = shape.split("\n").map((row) => row.trim().split(""));

      const row = shape.split("\n");

      //console.log("blocks",this.blocks)
      //console.log("shape",shape)
      //console.log("size", row.length)
      this.size = row.length;

      //console.log("trimmed",rows.map((row)=> row.trim().split("")));
      // this.shape = shape.split('\n').map((row) => row.trim().split(""));
    } else {
      this.blocks = shape;
    }
  }

  toString() {
    // console.log("blocks", this.blocks)
    const rows = this.blocks.map((row) => row.join(""));
    // console.log("joined\n",rows.join("\n")+"\n")

    return rows.join("\n") + "\n";
  }

  rotateRight() {
    const size = this.blocks.length;
    //console.log("size is",size)
    const createRow = () => Array.from(new Array(size), () => "-");
    const rotatedShape = Array.from(new Array(size), createRow);

    //console.log("rotated start",rotatedShape)
    // console.log("blocks to rotate",this.blocks)

    /*    rotatedShape[0][2]=this.blocks[0][0];
      rotatedShape[1][2]=this.blocks[0][1];
      rotatedShape[2][2]=this.blocks[0][2];
      rotatedShape[0][1]=this.blocks[1][0];
      rotatedShape[1][1]=this.blocks[1][1];
      rotatedShape[2][1]=this.blocks[1][2];
      rotatedShape[0][0]=this.blocks[2][0];
      rotatedShape[1][0]=this.blocks[2][1];
      rotatedShape[2][0]=this.blocks[2][2]; */
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        rotatedShape[col][size - 1 - row] = this.blocks[row][col];
      }
    }
    //console.log("rotated after",rotatedShape)
    return new RotatingShape(rotatedShape);
  }

  rotateLeft() {
    return this.rotateRight().rotateRight().rotateRight();
  }

  getblockCoordinates() {
    return this.shape.flatmap((row, y) => row.flatmap((tile, x) => tile=='.' ? [] : [{x,y}]))
}

}

