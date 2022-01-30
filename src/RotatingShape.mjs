export class RotatingShape{
    block;
  
    constructor(shape) {
        this.block=shape.split("\n").map((row)=> row.trim().split(""));
        this.rows=shape.split("\n");
        //console.log("tääärows",this.rows[0].lenght)
        //console.log("trimmed",rows.map((row)=> row.trim().split("")));
        // if(typeof shape === "string"){
        // this.shape = shape.split('\n').map((row) => row.trim().split(""));
        // }
        // else{
        //     this.shape=shape
        // }
    }
        

        toString(){
            console.log(this.block)
      const rows = this.block.map((row)=> row.join(""));
      console.log(rows)
      console.log(rows.join("\n")+"\n")

       return rows.join("\n") + "\n";
    }
  
  }
  