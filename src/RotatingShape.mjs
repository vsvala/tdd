export class RotatingShape{
    shape;
  
    constructor(shape) {
        if(typeof shape === "string"){
        this.shape=shape.split("\n").map((row)=> row.trim().split(""));
        //this.rows=shape.split("\n");
        //console.log("tääärows",this.rows[0].lenght)
        //console.log("trimmed",rows.map((row)=> row.trim().split("")));
        // this.shape = shape.split('\n').map((row) => row.trim().split(""));
         }
        else{
         this.shape=shape
        }
    }

        
    toString(){
        console.log(this.shape)
        const rows = this.shape.map((row)=> row.join(""));
        console.log(rows)
        console.log(rows.join("\n")+"\n")

        return rows.join("\n") + "\n";
    }

    rotateRight(){
      const size = 3 //this.shape.lenght;
      const createRow = ()=> Array.from(new Array(this.shape.lenght), () =>"-");
      //console.log("size is",size)
      const rotatedShape= Array.from(new Array(size),createRow);
     // console.log("size sssis",rotatedShape)
      rotatedShape[0][2]=this.shape[0][0];
      rotatedShape[1][2]=this.shape[0][1];
      rotatedShape[2][2]=this.shape[0][2];

      rotatedShape[0][1]=this.shape[1][0];
      rotatedShape[1][1]=this.shape[1][1];
      rotatedShape[2][1]=this.shape[1][2];


      rotatedShape[0][0]=this.shape[2][0];
      rotatedShape[1][0]=this.shape[2][1];
      rotatedShape[2][0]=this.shape[2][2];
    
      return new RotatingShape(rotatedShape);
      }

    rotateLeft(){
    return this.rotateRight().rotateRight().rotateRight()
    }
  }
  