import ExpansionRules from './ExpansionRules';
import DrawRules from './DrawRules';
import Turtle from './Turtle'
import LSystemMesh from './geometry/LSystemMesh'
import Leaf from './geometry/Leaf'
import Mario from './geometry/Mario'
import { vec3, mat4 } from 'gl-matrix';

class LSystem {

    stringArray: string[] = [];

    expRules: ExpansionRules= new ExpansionRules();
    drawRules: DrawRules = new DrawRules();

    createERule(rule : [string, string, number]){
        this.expRules.createExpRule(rule[0], rule[1], rule[2]);
    }

    createDRule(rule : [string, number, any]){
        this.drawRules.addDrawRule(rule[0], rule[1], rule[2]);
    }

    constructor(startChar: string, startMesh: LSystemMesh) {

        this.stringArray.push(startChar);

        let exp: Array<[string, string, number]> = [
                                                    ['[','[', 1.0],
                                                    [']',']', 1.0],
                                                    ['B', 'BBBB', 0.20],
                                                    ['B', 'B[AA]BB', 0.65],
                                                    ['B', 'B', 0.15],
                                                    ['A', 'B[A]A', 0.4],
                                                    ['A', 'BA', 0.1],
                                                    ['A', 'B[A][A]A', 0.5]
                                                ];

                                                for(var i = 0; i< exp.length; i++) {
                                                  this.createERule(exp[i]);
                                                }
    }


    addRules(leafMesh: Leaf, marioMesh: Mario, plantMesh: LSystemMesh, turtle: Turtle) : void {

        var pir = function(){ turtle.drawPiranha(leafMesh, marioMesh, plantMesh) };
        var leaflet = function(){ turtle.drawLeaf(leafMesh, plantMesh) };
        var rando = function(){ turtle.drawWildcard(leafMesh, plantMesh) };
        var rotZ = function(){ turtle.minusZ(leafMesh, plantMesh) };
        var rotNegZ = function(){ turtle.plusZ(leafMesh, plantMesh) };
        var rotX = function(){ turtle.minusX(leafMesh, plantMesh) };
        var rotNegX = function(){ turtle.plusX(leafMesh, plantMesh) };
        var left = function(){ turtle.minusXYZ(leafMesh, plantMesh) };
        var right = function(){ turtle.plusXYZ(leafMesh, plantMesh) };


        let draw: Array<[string, number, any]> = [['A', 1, pir],
                                                ['B', 1, leaflet],
                                                ['[', 0.50, rotZ],
                                                [']', 0.50, rotNegZ],
                                                ['[', 0.10, rotX],
                                                [']', 0.10, rotNegX],
                                                ['[', 0.40, left],
                                                [']', 0.40, right]
                                            ];

                                            for(var i = 0; i< draw.length; i++) {
                                              this.createDRule(draw[i]);
                                            }
    }

    getString() : string {
        return this.stringArray.join('');
    }



    pushString(arr : string[], exp : string, j : number){

      var char = exp.charAt(j);
      let succ = this.expRules.getExpansion(char);
      arr.push(succ);

    }

    computeLSystem() : void {
        var toExpand: string[] = [];
        for (var i = 0; i < this.stringArray.length; i++) {
            var startString = this.stringArray[i];
            for (var j = 0; j < startString.length; j++) {
                this.pushString(toExpand, startString, j);
            }
        }

        this.stringArray = toExpand;
    }

    drawLSystem() : void {
        for (var i = 0; i < this.stringArray.length; i++) {
            var startString = this.stringArray[i];
            for (var j = 0; j < startString.length; j++) {
                var char = startString.charAt(j);
                let drawFunc = this.drawRules.getDrawRule(char);
                drawFunc();
            }
        }
    }
}

export default LSystem;
