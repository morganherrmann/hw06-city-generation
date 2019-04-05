import { vec4, vec3, mat3, mat4, glMatrix, quat } from 'gl-matrix';

class TurtleState {
    pos: vec3;
    orient: quat;
    iter: number;
    scale: number;

    constructor(startPos: vec3, startOrientation: quat, startIter: number, startScale: number) {
        this.pos = startPos;
        this.orient = startOrientation;
        this.iter = startIter;
        this.scale = startScale;
    }

    rotZ(angle: number) : void  {
      var o = this.orient;
      var rad = glMatrix.toRadian(angle);
      this.orient = quat.rotateZ(o, o, rad);
    }

    rotX(angle: number) : void  {
        var o = this.orient;
        var rad = glMatrix.toRadian(angle);
        this.orient = quat.rotateX(o, o, rad);
    }

    rotY(angle: number) : void  {
      var o = this.orient;
      var rad = glMatrix.toRadian(angle);
      this.orient = quat.rotateY(o, o, rad);
    }

    transTurtle(translate: vec3) : void {
      var p = this.pos;
      this.pos = vec3.add(p, p, translate);
    }

    scaleTurtle(scale: number) : void {
        this.scale *= scale;
    }

    transMat() : mat4 {
      var p = this.pos;
      var s = this.scale;
      var o = this.orient;
      var translateMat: mat4 = mat4.fromRotationTranslationScale(mat4.create(),
            o, p, vec3.fromValues(s, s, s));
        return translateMat;
    }

    invTransTransMat() : mat4 {
      var p = this.pos;
      var s = this.scale;
      var o = this.orient;
        var translateMat: mat4 = mat4.fromRotationTranslationScale(mat4.create(),
            o, p, vec3.fromValues(s, s, s));
        translateMat = mat4.invert(translateMat, translateMat);
        translateMat = mat4.transpose(translateMat, translateMat);
        return translateMat;
    }
}

export default TurtleState;
