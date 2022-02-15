// class MovableGrid {
//   shape;
//   board
//   column;
//   row;

//   constructor(board,shape) {
//     this.shape = shape;
//     this.boar = board;
//     this.row = this.startingRowOffset(shape)
//     this.column =  Math.floor(board.columns() / 2 - shape.columns() / 2);  //implement board.columns
//   }

//   constructor(board,shape, row, col) {
//     this.shape = shape;
//     this.boar = board;
//     this.row =row;
//     this.column = column; //implement board.columns
//   }

//   startingRowOffset(shape){
//     for (let row = 0; row <shape.rows() ; row++) {
//       for (let col = 0; col <shape.columns(); col++) {
//         if(block.cellAt(row, col)){
//           console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",-row)
//           return -row;
//         }
//   }
// }
// throw new Error("empty shape: "+shape);

// }

//   rows() {
//     return this.shape.rows;
//   }
//   columns() {
//     return this.shape.columns;
//   }
//  celAt(row, col) {
//     return this.shape.cellAt(row,col);
//   }
// moveDown() {
//     return new MovableGrid(this.board, this.shape, this.row+1, this.column)
// }
// moveLeft() {
//   return new MovableGrid(this.board, this.shape, this.row, this.column-1)
// }
// moveLeft() {
//   return new MovableGrid(this.board, this.shape, this.row, this.column+1)
// }
// }
//  //26,0
