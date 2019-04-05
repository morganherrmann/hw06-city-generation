import { vec3, quat } from 'gl-matrix';
import * as Stats from 'stats-js';
import * as DAT from 'dat-gui';
import Drawable from './rendering/gl/Drawable';
import Square from './geometry/Square';
import Leaf from './geometry/Leaf';
import Mario from './geometry/Mario';
import Pipes from './geometry/Pipes';
import Ground from './geometry/Ground';
import Box from './geometry/Box';
import Question from './geometry/Question';
import LSystemMesh from './geometry/LSystemMesh';
import OpenGLRenderer from './rendering/gl/OpenGLRenderer';
import Camera from './Camera';
import { setGL } from './globals';
import ShaderProgram, { Shader } from './rendering/gl/ShaderProgram';
import LSystem from './LSystem';
import Turtle from './Turtle';
import TurtleState from './TurtleState';
import ScreenQuad from './geometry/ScreenQuad';


import Building from './Building';
import City from './City';
import Town from './Town';

import Cube from './geometry/Cube';


// Define an object with application parameters and button callbacks
// This will be referred to by dat.GUI's functions that add GUI elements.
const controls = {
  'Update': update,
  'Iterations': 1,
  'LeafSize': 1,
  'Leaf Color': [0.0, 255.0, 0.0],
  'Piranha Color': [245.0, 0.0, 0.0],
  'Tube Color' : [0.0, 255, 0.0]
};

let leaf: Leaf;
let mario: Mario;
let pipes: Pipes;
let ground: Ground;
let question : Question;
let box : Box;
let plantMesh: LSystemMesh;
let screenQuad: ScreenQuad;

let cube: Cube;

let city: City;
let town : Town;

let back : Square;

function loadScene() {
  leaf = new Leaf();
  mario = new Mario();
  pipes = new Pipes();
  question = new Question();
  box = new Box();
  ground = new Ground();
  plantMesh = new LSystemMesh();
  screenQuad = new ScreenQuad();
  screenQuad.create();
  back = new Square();
  back.create();



  city = new City();
  town = new Town();



  for(var i = 0; i < city.buildings.length; i++){
    var curr_building : Cube[] = city.buildings[i].stack;
    for (var j = 0; j < curr_building.length; j++){
      curr_building[j].create();
    }

  }

  for(var i = 0; i < town.buildings.length; i++){
    var curr_building : Cube[] = town.buildings[i].stack;
    for (var j = 0; j < curr_building.length; j++){
      curr_building[j].create();
    }

  }










}

//funtion to load OBJ ... thank u, cis 460 half edge

 function loadOBJ(mesh: Drawable, objFile: string, callback: any): void {
    var vertIDX = [];
    var vertNor = [];
    var vertBuff = [];
    var buffNor = [];
    var buffIDX: any = {};
    var finalIDX = [];
    var index: number = 0;

    var lines = objFile.split('\n');

    for (var i = 0; i < lines.length; i++) {
      var isVert : boolean = lines[i].startsWith('v ');
      var isNor : boolean = lines[i].startsWith('vn ');
      var isFace : boolean = lines[i].startsWith('f ');

        if (isVert) {
            var line = lines[i].split(/\s+/);
            for(var j = 1; j <= 3; j++){
              vertIDX.push(line[j]);
            }
        }
        else if (isNor) {
            line = lines[i].split(/\s+/);
            for(var j = 1; j <= 3; j++){
              vertNor.push(line[j]);
            }
        }
        else if (isFace) {
            line = lines[i].split(/\s+/);
            var emptyStringIndex = line.indexOf('');
            if (emptyStringIndex > -1) {
                line.splice(emptyStringIndex, 1);
            }

            var fIndex = line.indexOf('f');
            if (fIndex > -1) {
                line.splice(fIndex, 1);
            }

            for (var j = 0; j < line.length; j++) {
                if (line[j] in buffIDX) {
                    finalIDX.push(buffIDX[line[j]]);
                } else {
                    var face: Array<string> = line[j].split('/');

                    var f0 = (parseInt(face[0]) - 1) * 3;
                    var f2 = (parseInt(face[2]) - 1) * 3;

                    vertBuff.push(vertIDX[f0 + 0]);
                    vertBuff.push(vertIDX[f0 + 1]);
                    vertBuff.push(vertIDX[f0 + 2]);
                    vertBuff.push(1);

                    buffNor.push(vertNor[f2 + 0]);
                    buffNor.push(vertNor[f2 + 1]);
                    buffNor.push(vertNor[f2 + 2]);
                    buffNor.push(0);

                    buffIDX[line[j]] = index;
                    finalIDX.push(index);
                    index += 1;
                }
            }
        }
    }

    var finalPos = vertBuff;
    var finalNor = buffNor;
    var finalIndex = finalIDX;

    callback(finalIndex, finalPos, finalNor);
}



function update() {


  plantMesh.destroy();
  plantMesh.clear();

  let startChar: string = 'A';
  let plantLSystem: LSystem = new LSystem(startChar, plantMesh);

  for (var i = 0; i < controls.Iterations; i++) {
    plantLSystem.computeLSystem();
  }

  //create the Leaf and plant system
  let turtle: Turtle = new Turtle(controls.LeafSize, plantMesh, vec3.fromValues(0, 0, 0), quat.create(), 0, 1);
  plantLSystem.addRules(leaf, mario, plantMesh, turtle);
  plantLSystem.drawLSystem();

  plantMesh.create();
}

function main() {
  // Initial display for framerate
  const stats = Stats();
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);

  // Add controls to the gui
  const gui = new DAT.GUI();





  // get canvas and webgl context
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  const gl = <WebGL2RenderingContext>canvas.getContext('webgl2');
  if (!gl) {
    alert('WebGL 2 not supported!');
  }
  // `setGL` is a function imported above which sets the value of `gl` in the `globals.ts` module.
  // Later, we can import `gl` from `globals.ts` to access it
  setGL(gl);

  // Initial call to load scene
  loadScene();

  const camera = new Camera(vec3.fromValues(0, 0, 5), vec3.fromValues(0, 0, 0));

  const renderer = new OpenGLRenderer(canvas);
  //THISSSSSSSSSSSSSS
  //renderer.setClearColor(0.3, 0.81, 0.92, 1);
  gl.enable(gl.DEPTH_TEST);

  const lambert = new ShaderProgram([
    new Shader(gl.VERTEX_SHADER, require('./shaders/lambert-vert.glsl')),
    new Shader(gl.FRAGMENT_SHADER, require('./shaders/lambert-frag.glsl')),
  ]);

  const instancedShader = new ShaderProgram([
    new Shader(gl.VERTEX_SHADER, require('./shaders/instanced-vert.glsl')),
    new Shader(gl.FRAGMENT_SHADER, require('./shaders/instanced-frag.glsl')),
]);

const flat = new ShaderProgram([
    new Shader(gl.VERTEX_SHADER, require('./shaders/flat-vert.glsl')),
    new Shader(gl.FRAGMENT_SHADER, require('./shaders/flat-frag.glsl')),
]);

const floor = new ShaderProgram([
    new Shader(gl.VERTEX_SHADER, require('./shaders/ground-vert.glsl')),
    new Shader(gl.FRAGMENT_SHADER, require('./shaders/ground-frag.glsl')),
]);

const boxShader = new ShaderProgram([
    new Shader(gl.VERTEX_SHADER, require('./shaders/box-vert.glsl')),
    new Shader(gl.FRAGMENT_SHADER, require('./shaders/box-frag.glsl')),
]);

const tealShader = new ShaderProgram([
    new Shader(gl.VERTEX_SHADER, require('./shaders/teal-vert.glsl')),
    new Shader(gl.FRAGMENT_SHADER, require('./shaders/teal-frag.glsl')),
]);



  function leafCallback(indices: Array<number>, positions: Array<number>, normals: Array<number>): void {
    leaf.indices = Uint32Array.from(indices);
    leaf.positions = Float32Array.from(positions);
    leaf.normals = Float32Array.from(normals);
    leaf.create();
  }

  function marioCallback(indices: Array<number>, positions: Array<number>, normals: Array<number>): void {
    mario.indices = Uint32Array.from(indices);
    mario.positions = Float32Array.from(positions);
    mario.normals = Float32Array.from(normals);
    mario.create();
  }

  function pipesCallback(indices: Array<number>, positions: Array<number>, normals: Array<number>): void {
    pipes.indices = Uint32Array.from(indices);
    pipes.positions = Float32Array.from(positions);
    pipes.normals = Float32Array.from(normals);
    pipes.create();
  }

  function groundCallback(indices: Array<number>, positions: Array<number>, normals: Array<number>): void {
    ground.indices = Uint32Array.from(indices);
    ground.positions = Float32Array.from(positions);
    ground.normals = Float32Array.from(normals);
    ground.create();
  }

  function boxCallback(indices: Array<number>, positions: Array<number>, normals: Array<number>): void {
    box.indices = Uint32Array.from(indices);
    box.positions = Float32Array.from(positions);
    box.normals = Float32Array.from(normals);
    box.create();
  }

  function questionCallback(indices: Array<number>, positions: Array<number>, normals: Array<number>): void {
    question.indices = Uint32Array.from(indices);
    question.positions = Float32Array.from(positions);
    question.normals = Float32Array.from(normals);
    question.create();
  }

  // SOURCE CODE FOR READING OBJ FILE FROM PIAZZA
  //https://piazza.com/class/jr11vjieq8t6om?cid=103
  function parseOBJ(file: string, callback: any): void {
    let indices: Uint32Array = new Uint32Array(0);
    let positions: Float32Array = new Float32Array(0);
    let normals: Float32Array = new Float32Array(0);

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {

      if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
              var allText = rawFile.responseText;
              loadOBJ(leaf, allText, callback);
    }
  }
}
    rawFile.send(null);
  }

  let leafFilename: string = "./leaf.obj";
  parseOBJ(leafFilename, leafCallback);

  let marioFilename: string = "./bite.obj";
  parseOBJ(marioFilename, marioCallback);

  let tubeFile: string = "./tubes.obj";
  parseOBJ(tubeFile, pipesCallback);

  let groundFile: string = "./ground2.obj";
  parseOBJ(groundFile, groundCallback);

  let boxFile: string = "./box.obj";
  parseOBJ(boxFile, boxCallback);

  let quesFile: string = "./brick.obj";
  parseOBJ(quesFile, questionCallback);

  update();

  // This function will be called every frame
  function tick() {
    camera.update();
    stats.begin();
    gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.clear();
    pipes.create();

    renderer.render(camera, flat, [screenQuad]);
    // renderer.render(camera, lambert, [
    //   plantMesh,
    //   pipes
    // ]);
    renderer.render(camera, lambert, [question]);
    renderer.render(camera, floor, [ground]);

    for(var i = 0; i < city.buildings.length; i++){
      var curr_building : Cube[] = city.buildings[i].stack;
      var r : number = Math.random();
      if ( i < 5.0){
      for (var j = 0; j < curr_building.length; j++){
        renderer.render(camera, boxShader, [curr_building[j]]);
      }
    } else {
      for (var j = 0; j < curr_building.length; j++){
        renderer.render(camera, tealShader, [curr_building[j]]);
      }

    }

    }

    for(var i = 0; i < town.buildings.length; i++){
      var curr_building : Cube[] = town.buildings[i].stack;
      if ( i < 15.0){
      for (var j = 0; j < curr_building.length; j++){
        renderer.render(camera, boxShader, [curr_building[j]]);
      }
    } else {
      for (var j = 0; j < curr_building.length; j++){
        renderer.render(camera, tealShader, [curr_building[j]]);
      }

    }

    }
    stats.end();

    // Tell the browser to call `tick` again whenever it renders a new frame
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.setAspectRatio(window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
    boxShader.setDimensions(window.innerWidth, window.innerHeight);
    tealShader.setDimensions(window.innerWidth, window.innerHeight);
  }, false);

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.setAspectRatio(window.innerWidth / window.innerHeight);
  boxShader.setDimensions(window.innerWidth, window.innerHeight);
  tealShader.setDimensions(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();

  // Start the render loop
  tick();
}

main();
