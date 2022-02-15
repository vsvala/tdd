export function shapeToString(shape) {
  let s = "";
  for (let row = 0; row <shape.height(); row++) {
    for (let col = 0; col < shape.width(); col++) {
      s += shape.cellAt(row, col);
    }
    s += "\n";
  }
  console.log("board. tostring", s);
  return s;
}


  // shapeToString(shape) {
  //   let s = "";
  //   for (let i = 0; i < this.height; i++) {
  //     for (let j = 0; j < this.width; j++) {
  //       //console.log("i,j", i,j)
  //       s += this.cellAt(i, j);
  //     }
  //     s += "\n";
  //   }
  //   console.log("board. tostring", s);
  //   return s;
  // }
