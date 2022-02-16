import { shapeToString } from "./shapes.mjs";
export class Block {
  color;
  row;
  col;

  constructor(color) {
    this.color = color;
    this.row = 0;
    this.col = 0;
  }
  getColor() {
    return this.color;
  }
  row() {
    return this.row;
  }

  col() {
    return this.col;
  }
  width() {
    return 1;
  }

  height() {
    return 1;
  }
  rows() {
    return 1;
  }

  columns() {
    return 1;
  }

  getBlockAt(row, col) {
   // if (row === 0 && col === 0) {
      return this.color;
  //  }
  }

  toString() {
    return shapeToString(this);
  }
}
