import { vec4, vec3, mat3, mat4, glMatrix, quat } from 'gl-matrix';
import Cube from './geometry/Cube'
import Building from './Building'
import Drawable from './rendering/gl/Drawable'


class Town {

  buildings : Building[];


  rand(min : number, max : number) : number {
  return Math.random() * (max - min) + min;
}

    constructor() {

        this.buildings = [];

        var building : Building;
        var basicY = 2.0;

        for(var i = 0; i < 80; i++){
          //random points in valid grid space
          var x = this.rand(-12, -2);
          var z = this.rand(10, 20);

          //check for intersections

          if (Math.abs(x - -4.0) < 1){
            continue;
          }

          if (Math.abs(x - 4.0) < 1.5){
            continue;
          }

          if (Math.abs(x - -10.0) < 1){
            continue;
          }

          if (Math.abs(z - 11.0) < 1){
            continue
          }

          if (Math.abs(z - 17.0) < 2){
            continue;
          }

          building  = new Building(x, basicY + Math.random(), z, 0.9, 2.0, 0.5);
          building.evaluate(1) ;
          this.buildings.push(building);

        }

        for(var i = 0; i < 80; i++){
          //random points in valid grid space
          var x = this.rand(3, 12);
          var z = this.rand(15, 24);

          var xlist : number[] = [8.0, 11.0];
          var zlist : number[] = [11.0, 17.0];
          //check for intersections


          if (Math.abs(x - 4.0) < 1.0){
            continue;
          }

          if (Math.abs(x - 8.0) < 1.0){
            continue;
          }
          if (Math.abs(x - 11.0) < 1.0){
            continue;
          }

          if (Math.abs(z - 11.0) < 1.0){
            z = 9.0;
          }

          if (Math.abs(z - 17.0) < 2){
            z = 13.0;
          }

          building  = new Building(x, basicY + Math.random(), z, 0.9, 2.0, 0.5);
          building.evaluate(1) ;
          this.buildings.push(building);

        }







    }





  }




export default Town;
