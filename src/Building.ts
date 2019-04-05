import { vec4, vec3, mat3, mat4, glMatrix, quat } from 'gl-matrix';
import Cube from './geometry/Cube'
import Drawable from './rendering/gl/Drawable'


class Building {

  stack : Cube[];

  startX : number;
  startY : number;
  startZ : number;
  width : number;
  height : number;
  length : number;

    constructor(startX : number, startY : number, startZ : number,
      width : number, height : number, length : number) {

        this.startX = startX;
        this.startY = startY;
        this.startZ = startZ;
        this.width = width;
        this.height = height;
        this.length = length;
        this.stack = [];

        //procedurally modify height based on z value....

        if (startZ < 0.0){
          if (Math.random() < 0.4){
            this.startY = Math.pow((Math.abs(startZ))/ 6.0, 3.0);
          }
        }

    }



    evaluate(code : number){

      var c1 : Cube = new Cube(this.startX, this.startY, this.startZ, this.width, this.height, this.length);
      this.stack.push(c1);

      //building cod e 1

      if (code == 1){
      if (this.startY - this.height > 0.0){
        var c2 : Cube = new Cube(this.startX - Math.random() / 0.7, this.startY - this.height,
        this.startZ + Math.random() / 0.6, this.width * 1.8, this.startY - this.height, this.length * 1.6);
        this.stack.push(c2);
      }
      return;
    }

    //building code 2
    if (code == 2){
      console.log("hellll");
      var y : number = this.startY;
      var h1 : number = y - this.height;
      console.log(" y is" + y);
      if (y > 0.0){
        var c2 : Cube = new Cube(this.startX - Math.random() / 0.7, y,
        this.startZ + Math.random() / 0.6, this.width * 2.8, h1, this.length * 1.8);
        this.stack.push(c2);
        y = h1;
      }

      console.log("new y is" + y);
      if (y > 0.0){
        h1 = y;
        console.log("h1 is " + h1);
        var c2 : Cube = new Cube(this.startX - Math.random() / 0.7, y,
        this.startZ + Math.random() / 0.6, this.width * 1.8, h1, this.length * 1.6);
        this.stack.push(c2);

        var c3 : Cube = new Cube(this.startX + Math.random() / 0.8, y,
        this.startZ - Math.random() / 0.4, this.width * 2.8, h1, this.length * 2.3);
        this.stack.push(c3);
      }

      return;

    }


    //building code 2
    if (code == 3){

      var y : number = this.startY;
      var h1 : number = y - this.height;

      if (y > 0.0){
        var c2 : Cube = new Cube(this.startX - Math.random() / 0.7, y,
        this.startZ + Math.random() / 0.6, this.width * 2.8, h1, this.length * 1.8);
        this.stack.push(c2);
        y = h1;
      }


      if (y > 0.0){
        h1 = y;
        var height : number = Math.random() * 2.5;
        if (height > h1){
          height = h1;
        }
        var c2 : Cube = new Cube(this.startX - Math.random() / 0.7, y,
        this.startZ + Math.random() / 0.6, this.width * 1.8, y - height, this.length * 1.6);
        this.stack.push(c2);

        var c3 : Cube = new Cube(this.startX + Math.random() / 0.8, y,
        this.startZ - Math.random() / 0.4, this.width * 2.8, y - height, this.length * 2.3);
        this.stack.push(c3);

        y = y - height;
      }

      if (y > 0.0){
        var c2 : Cube = new Cube(this.startX - Math.random() / 0.9, y,
        this.startZ + Math.random() / 0.6, this.width * 2.8, y, this.length * 1.8);
        this.stack.push(c2);
        y = h1;
      }

      return;

    }








    }

  }




export default Building;
