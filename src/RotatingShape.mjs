export class RotatingShape {
  #shape;
  size;

  constructor(shape) {
    if (typeof shape === "string") {
      this.#shape = shape.split("\n").map((row) => row.trim().split(""));

      const row = shape.split("\n");

      //console.log("blocks",this.blocks)
      //console.log("shape",shape)
      //console.log("size", row.length)
      this.size = row.length;

      //console.log("trimmed",rows.map((row)=> row.trim().split("")));
      // this.shape = shape.split('\n').map((row) => row.trim().split(""));
    } else {
      this.#shape = shape;
    }
  }

  rotateRight() {
    const size = this.#shape.length;
    //console.log("size is",size)
    const createRow = () => Array.from(new Array(size), () => "-");
    const rotatedShape = Array.from(new Array(size), createRow);

    //console.log("rotated start",rotatedShape)
    // console.log("blocks to rotate",this.blocks)

    /* rotatedShape[0][2]=this.blocks[0][0];
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
        rotatedShape[col][size - 1 - row] = this.#shape[row][col];
      }
    }
    //console.log("rotated after",rotatedShape)
    return new RotatingShape(rotatedShape);
  }

  rotateLeft() {
    return this.rotateRight().rotateRight().rotateRight();
  }

  rows() {
    return this.#shape.length;
  }

  columns() {
    return this.#shape[0].length;
  }
  width() {
    return this.#shape[0].length;
  }

  height() {
    return this.#shape.length;
  }

 getBlockAt(row, col) {
    //console.log("rotating Shape cellAT row,col",row,col)
    //console.log("this.blockbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",this.blocks[row][col])
    return this.#shape[row][col];
  }

  toString() {
    // console.log("blocks", this.blocks)
    const rows = this.#shape.map((row) => row.join(""));
    // console.log("joined\n",rows.join("\n")+"\n")
    return rows.join("\n") + "\n";
  }
}
