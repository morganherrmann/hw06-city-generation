import {vec3, vec4} from 'gl-matrix';
import Drawable from '../rendering/gl/Drawable';
import {gl} from '../globals';

class Cube extends Drawable {
  indices: Uint32Array;
  positions: Float32Array;
  normals: Float32Array;
  //center: vec4;

  startX : number;
  startY : number;
  startZ : number;
  width : number;
  height : number;
  length : number;


  constructor(startX : number, startY : number, startZ : number,
    width : number, height : number, length : number) {
    super(); // Call the constructor of the super class. This is required.
    //this.center = vec4.fromValues(center[0], center[1], center[2], 1);

    this.startX = startX;
    this.startY = startY;
    this.startZ = startZ;
    this.width = width;
    this.height = height;
    this.length = length;
  }

  create() {

  this.indices = new Uint32Array([0, 1, 2,
                            0, 2, 3,
                            4, 5, 6,
                            5, 6, 7,
                            8, 9, 10,
                            9, 10, 11,
                            12, 13, 14,
                            12, 14, 15,
                            16, 17, 18,
                            17, 18, 19,
                            20, 21, 22,
                            21, 22, 23]);




  this.normals = new Float32Array([0, 0, 1, 0,
                                   0, 0, 1, 0,
                                   0, 0, 1, 0,
                                   0, 0, 1, 0,

                                   1, 0, 0, 0,
                                   1, 0, 0, 0,
                                   1, 0, 0, 0,
                                   1, 0, 0, 0,

                                   -1, 0, 0, 0,
                                   -1, 0, 0, 0,
                                   -1, 0, 0, 0,
                                   -1, 0, 0, 0,

                                   0, 0, -1, 0,
                                   0, 0, -1, 0,
                                   0, 0, -1, 0,
                                   0, 0, -1, 0,

                                   0, 1, 0, 0,
                                   0, 1, 0, 0,
                                   0, 1, 0, 0,
                                   0, 1, 0, 0,

                                   0, -1, 0, 0,
                                   0, -1, 0, 0,
                                   0, -1, 0, 0,
                                   0, -1, 0, 0

                                 ]);


     var startX : number = this.startX;
     var startY : number = this.startY;
     var startZ : number = this.startZ;
     var width : number = this.width;
     var height : number = this.height;
     var length : number = this.length;



  this.positions = new Float32Array(
                              [startX, startY - height, startZ, 1,
                                startX + width, startY - height, startZ, 1,
                                startX + width, startY, startZ, 1,
                                startX, startY, startZ, 1,

                                //right face
                                startX + width, startY - height, startZ, 1,
                                startX + width, startY, startZ, 1,
                                startX + width, startY - height, startZ - length, 1,
                                startX + width, startY, startZ - length, 1,

                                //left face
                                startX, startY - height, startZ, 1,
                                startX, startY, startZ, 1,
                                startX, startY - height, startZ - length, 1,
                                startX, startY, startZ - length, 1,

                                //back face
                                startX, startY - height, startZ - length, 1,
                                startX + width, startY - height, startZ - length, 1,
                                startX + width, startY, startZ - length, 1,
                                startX, startY, startZ - length, 1,

                                //top face
                                startX, startY, startZ, 1,
                                startX + width, startY, startZ, 1,
                                startX, startY, startZ - length, 1,
                                startX + width, startY, startZ - length, 1,

                                //bottom face
                                startX, startY - height, startZ, 1,
                                startX + width, startY - height, startZ, 1,
                                startX, startY - height, startZ - length, 1,
                                startX + width, startY - height, startZ - length, 1]);

    this.generateIdx();
    this.generatePos();
    this.generateNor();

    this.count = this.indices.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNor);
    gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
    gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);

    console.log(`Created CUBE`);
  }
};

export default Cube;
