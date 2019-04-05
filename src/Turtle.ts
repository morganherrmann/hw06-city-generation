import { vec4, vec3, mat3, mat4, glMatrix, quat } from 'gl-matrix';
import Leaf from './geometry/Leaf'
import Drawable from './rendering/gl/Drawable'
import LSystemMesh from './geometry/LSystemMesh'
import Mario from './geometry/Mario'
import TurtleState from './TurtleState'

class Turtle {

  plantMesh: LSystemMesh;
  turtleStack: TurtleState[];
  turtle: TurtleState;
  rotation: number;
  scale: number;

    constructor(scale: number, startMesh: LSystemMesh, startPos: vec3, startOrientation: quat, startDepth: number, startScale: number) {
        this.scale = scale;
        this.rotation = 1.0;
        this.plantMesh = startMesh;
        this.turtleStack = [];
        this.turtle = new TurtleState(startPos, startOrientation, startDepth, startScale);
    }


    //turn our plant by some random values
    //want to keep plant generally growing in the upwards y
    //so y has less variability
    // lets *get* *that* *sun*
    private randomRotate() {
      let r = this.rotation;
      this.turtle.rotX(r * (Math.random() - 0.5) * 40);
      this.turtle.rotY(r * (Math.random() - 0.5) * 15);
      this.turtle.rotZ(r * (Math.random() - 0.5) * 40);
    }

    private heightRotate(){
      let r = this.rotation;
      this.turtle.rotY(r * (Math.random() - 0.5) * 60);
    }

    private scaleLeaves(){

      let s = (Math.random() * 0.25) + 0.85;
      if (this.turtle.scale >= 0.2) {
          this.turtle.scaleTurtle(this.scale * s * 0.8);
      }

    }

    private addVBOData(plant : LSystemMesh, pos : any, nor : any, col : any){

      plant.addPos(pos[0]);
      plant.addPos(pos[1]);
      plant.addPos(pos[2]);
      plant.addPos(pos[3]);

      plant.addNor(nor[0]);
      plant.addNor(nor[1]);
      plant.addNor(nor[2]);
      plant.addNor(nor[3]);

      plant.addCol(col[0]);
      plant.addCol(col[1]);
      plant.addCol(col[2]);
      plant.addCol(col[3]);

    }

    private translateTurtle(){

      var trans: vec4 = vec4.fromValues(0, 1, 0, 1);
      trans = vec4.scale(trans, trans, this.turtle.scale);
      trans = vec4.transformQuat(trans, trans, this.turtle.orient);

      var t1 = trans[0];
      var t2 = trans[1];
      var t3 = trans[2];

      let upShiftVec3: vec3 = vec3.fromValues(t1, t2, t3);

      this.turtle.transTurtle(upShiftVec3);
    }

    drawLeaf(leafMesh: Leaf, plantMesh: LSystemMesh) : void {

        if (this.turtle.iter > 0) {
            this.randomRotate();
        } else {
            this.heightRotate();
        }
        this.scaleLeaves();


        let transformMat: mat4 = this.turtle.transMat();
        let invTransMat: mat4 = this.turtle.invTransTransMat();

        let leafPos: Float32Array = leafMesh.positions;
        let leafNor: Float32Array = leafMesh.normals;
        let leafCol: Float32Array = leafMesh.colors;


        for (var i = 0; i < leafPos.length; i += 4) {
            var a = i;
            var b = i + 1;
            var c = i + 2;
            var d = i + 3;

            var pos: vec4 = vec4.fromValues(leafPos[a],
                leafPos[b], leafPos[c], leafPos[d]);
            pos = vec4.transformMat4(pos, pos, transformMat);

            var nor: vec4 = vec4.fromValues(leafNor[a],
                leafNor[b], leafNor[c], leafNor[d]);
            nor = vec4.transformMat4(nor, nor, invTransMat);

            var col: vec4 = vec4.fromValues(leafCol[a],
                leafCol[b], leafCol[c], leafCol[d]);

              this.addVBOData(plantMesh, pos, nor, col);
        }

        let offset: number = plantMesh.getMaxIndex() + 1;

        let leafIdx: Uint32Array = leafMesh.indices;
        for (var i = 0; i < leafIdx.length; i++) {
            plantMesh.addIndex(leafIdx[i] + offset);
        }
        this.translateTurtle();
        this.turtle.iter++;
    }

    drawPiranha(leafMesh: Leaf, marioMesh: Mario, plantMesh: LSystemMesh) : void  {

        this.drawLeaf(leafMesh, plantMesh);

        var upShift: vec4 = vec4.fromValues(0, 0.05, 0, 1);
        upShift = vec4.scale(upShift, upShift, this.turtle.scale);
        upShift = vec4.transformQuat(upShift, upShift, this.turtle.orient);
        let upShiftVec3: vec3 = vec3.fromValues(upShift[0], upShift[1], upShift[2]);

        this.turtle.transTurtle(upShiftVec3);

        let transformMat: mat4 = this.turtle.transMat();
        let invTransMat: mat4 = this.turtle.invTransTransMat();

        let marioPos: Float32Array = marioMesh.positions;
        let marioNor: Float32Array = marioMesh.normals;
        let marioCol: Float32Array = marioMesh.colors;

        for (var i = 0; i < marioPos.length; i += 4) {
          var a = i;
          var b = i + 1;
          var c = i + 2;
          var d = i + 3;

            var pos: vec4 = vec4.fromValues(marioPos[a],
                marioPos[b], marioPos[c], marioPos[d]);
            pos = vec4.transformMat4(pos, pos, transformMat);

            var nor: vec4 = vec4.fromValues(marioNor[a],
                marioNor[b], marioNor[c], marioNor[d]);
            nor = vec4.transformMat4(nor, nor, invTransMat);

            var col: vec4 = vec4.fromValues(marioCol[a],
                marioCol[b], marioCol[c], marioCol[d]);

            this.addVBOData(plantMesh, pos, nor, col);
        }

        let offset: number = plantMesh.getMaxIndex() + 1;

        let marioIndices: Uint32Array = marioMesh.indices;
        for (var i = 0; i < marioIndices.length; i++) {
            plantMesh.addIndex(marioIndices[i] + offset);
        }

        this.turtle.iter++;
    }


    private rotator(code : any){

      this.turtleStack.push(this.turtle);

      let p = this.turtle.pos;
      let o = this.turtle.orient;
      let d = this.turtle.iter;
      let s = this.turtle.scale;

      let pos: vec3 = vec3.fromValues(p[0], p[1], p[2]);
      let orient: quat = quat.fromValues(o[0], o[1], o[2], o[3]);
      let iter = d + 1;
      let scale = s;
      var newTurtle: TurtleState = new TurtleState(pos, orient, iter, scale);

      if (code == 0){
        newTurtle.rotZ(25);
      } else if (code == 1){
        newTurtle.rotZ(-15);
        newTurtle.rotY(-5);
        newTurtle.rotX(-10);
      } else if (code == 2){
        newTurtle.rotX(Math.random() * 10.0);
      } else if (code == 3){
        newTurtle.rotX(Math.random() * -7.0);
      }

      this.turtle = newTurtle;
    }


    minusZ(leafMesh: Leaf, plantMesh: LSystemMesh) : void  {
        this.rotator(0);
    }

    plusZ(leafMesh: Leaf, plantMesh: LSystemMesh) : void {
        this.turtle = this.turtleStack.pop();
        this.turtle.rotZ(-15 - (Math.random() * 5.0));
    }

    minusXYZ(leafMesh: Leaf, plantMesh: LSystemMesh) : void  {
        this.rotator(1);
    }

    plusX(leafMesh: Leaf, plantMesh: LSystemMesh) : void  {
        this.rotator(2);
    }

    minusX(leafMesh: Leaf, plantMesh: LSystemMesh) : void  {
        this.rotator(3);
    }

    drawWildcard(leafMesh: Leaf, plantMesh: LSystemMesh) : void {
        this.turtle = this.turtleStack.pop();
        this.turtle.rotX(Math.random() - 0.5);
    }

    plusXYZ(leafMesh: Leaf, plantMesh: LSystemMesh) : void {
        this.turtle = this.turtleStack.pop();
        this.turtle.rotZ(15);
        this.turtle.rotY(5);
        this.turtle.rotX(10);
    }


}

export default Turtle;
