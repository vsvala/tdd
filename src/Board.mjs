export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let s = "";
    for (let i = 0; i < this.width; i++) {
      for (let i = 0; i < this.height; i++) {
        s += ".";
      }
      s += "\n";
    }
    //console.log(s)
    return s;
  }
}
