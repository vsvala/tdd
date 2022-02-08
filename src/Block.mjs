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

  rows() {
    return 1;
  }

  columns() {
    return 1;
  }
  cellAt(row, col) {
    return color;
  }

  isAt(row, col){
    return row==this.row && col==this.col
  }


  getBlockCoordinates(){
    return [{ x:0, y:0}]
  }
}
