import { vec4, vec3, mat3, mat4, glMatrix, quat } from 'gl-matrix';
import Cube from './geometry/Cube'
import Building from './Building'
import Drawable from './rendering/gl/Drawable'


class City {

  buildings : Building[];


  rand(min : number, max : number) : number {
  return Math.random() * (max - min) + min;
}

    constructor() {


        this.buildings = [];



        var building : Building = new Building(0.0 + Math.random(), 3.0 + Math.random(), 14.0, 1.5, 2.0, 1.5);
        building.evaluate(1) ;
        this.buildings.push(building);

        building  = new Building(3.0 + Math.random(), 8.0, 11.0 + Math.random(), 1.0, 2.0, 2.5);
        building.evaluate(2) ;
        this.buildings.push(building);

        building  = new Building(2.0 + Math.random(), 15.0, 4.0, 1.0, 2.0, 2.5);
        building.evaluate(3);
        this.buildings.push(building);

        building  = new Building(this.rand(14, 16), 17, this.rand(0, -3.0), this.rand(0.5, 1.5), this.rand(2.0, 6.0), this.rand(0.5, 3));
        building.evaluate(2);
        this.buildings.push(building);

        building  = new Building(this.rand(8, 12), this.rand(17, 20), this.rand(-2.0, -5.0), this.rand(0.5, 1.5), this.rand(2.0, 8.0), this.rand(0.5, 3));
        building.evaluate(2);
        this.buildings.push(building);

        building  = new Building(this.rand(8, 12), this.rand(17, 23), this.rand(-2.0, -5.0), this.rand(0.5, 1.5), this.rand(2.0, 8.0), this.rand(0.5, 3));
        building.evaluate(2);
        this.buildings.push(building);

        building  = new Building(this.rand(6, 11), this.rand(17, 23), this.rand(0.0, 5.0), this.rand(0.5, 1.5), this.rand(2.0, 8.0), this.rand(0.5, 3));
        building.evaluate(3);
        this.buildings.push(building);

        building  = new Building(this.rand(-3, 0), this.rand(5, 13), this.rand(0.0, -3.0), this.rand(0.5, 1.8), this.rand(2.0, 3.0), this.rand(0.5, 2));
        building.evaluate(2);
        this.buildings.push(building);

        building  = new Building(this.rand(-2, 0), this.rand(5, 8), this.rand(1.0, 3.0), this.rand(0.5, 1.4), this.rand(2.0, 6.0), this.rand(0.5, 2));
        building.evaluate(3);
        this.buildings.push(building);

        building  = new Building(this.rand(-4, -1), this.rand(19, 27), this.rand(-7.0, -13.0), this.rand(0.5, 1.9), this.rand(2.0, 6.0), this.rand(0.5, 2));
        building.evaluate(2);
        this.buildings.push(building);

        building  = new Building(this.rand(1, 5), this.rand(24, 30), this.rand(-13.0, -16.0), this.rand(0.5, 1.5), this.rand(2.0, 6.0), this.rand(0.5, 2.5));
        building.evaluate(3);
        this.buildings.push(building);

        building  = new Building(this.rand(6, 12), this.rand(29, 34), this.rand(-15.0, -18.0), this.rand(0.5, 2.5), this.rand(2.0, 17.0), this.rand(0.5, 2.5));
        building.evaluate(3);
        this.buildings.push(building);



    }





  }




export default City;
