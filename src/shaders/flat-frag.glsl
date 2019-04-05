#version 300 es
precision highp float;


uniform vec2 u_Dimensions;
uniform float u_Time;

in vec2 fs_Pos;
out vec4 out_Col;

float noise(vec2 p) {
	return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 456367.5453);
}

//SOURCE INSPIRATION http://glslsandbox.com/e#22429.6


void main() {
  //out_Col = vec4(0.2, 0.9, fs_Pos.y * 4.0, 0.5);
  vec2 uv = (fs_Pos);
  float intensity = 0.8;

    //Create the stacked layers

    //so what this is doing is creating offset layers
    //and the height of each section follows a cosin curve
    //ok sweet
	for (float inc = 1.0; inc < 25.0; inc++) {

		float fi = inc;

		float s = floor(5.0*(uv.x)/fi + 50.0*fi + u_Time / 1000.0);

        float yLimit = noise(vec2(s));
        yLimit *= fi/95.0;
        yLimit -= 0.04*fi;
        yLimit += 0.125 * cos(uv.x*5.0 + u_Time / 1000.0 + fi/9.0);
       	yLimit += 0.8;

		if (uv.y < yLimit) {
			intensity = inc/10.0;
		}
	}

  float col1 = mix(intensity * uv.x * 0.8 + 0.5, 0.0, 01.1);

	//Set the final color
	out_Col = vec4(vec3(col1, intensity*uv.y * 0.9 + 0.5, 0.3), 1.0 );





}
