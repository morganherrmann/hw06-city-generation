#version 300 es


precision highp float;

uniform vec4 u_Color;


in vec4 fs_Nor;
in vec4 fs_LightVec;
in vec4 fs_Col;

uniform float u_Time;
uniform vec2 u_Dimensions;

in vec4 fs_Pos;


out vec4 out_Col;


float checker(vec2 uv, float repeats)
{
  float cx = floor(repeats * uv.x);
  float cy = floor(repeats * uv.y);
  float result = mod(cx + cy, 2.0);
  return sign(result);
}



vec4 rainbow(){
  float l = 120.0;

  float aa = gl_FragCoord.x;
  float bb = gl_FragCoord.y;
  vec2 fragCoord = vec2(aa, bb);

  float aspect = u_Dimensions.x / u_Dimensions.y;

  float a = gl_FragCoord.x;
  float b = gl_FragCoord.y;

  float sx = (2.f * a/u_Dimensions.x) - 1.f;
  float sy = 1.f - (2.f * b/u_Dimensions.y);


vec2 uv = fragCoord.xy / u_Dimensions.xy;
	vec2 pos = (uv.xy-0.5);
	vec2 cir = ((pos.xy*pos.xy+sin(uv.x*18.0+u_Time / 10000.0)/25.0*sin(uv.y*7.0+u_Time / 10000.0 *1.5)/1.0)+uv.x*sin(u_Time / 10000.0)/16.0+uv.y*sin(u_Time / 10000.0 *1.2)/16.0);
	float circles = (sqrt(abs(cir.x+cir.y*0.5)*25.0)*5.0);
	vec4 fragColor = vec4(sin(circles*1.25+2.0),abs(sin(circles*1.0-1.0)-sin(circles)),abs(sin(circles)*1.0),1.0);
  return fragColor;

}

void main()
{
        vec4 diffuseColor = vec4(0.3, 0.1, 0.2, 1.0);
        float diffuseTerm = dot(normalize(fs_Nor), normalize(fs_LightVec));
        diffuseTerm = clamp(diffuseTerm, 0.0, 1.0);

        float ambientTerm = 0.5;

        float lightIntensity = diffuseTerm + ambientTerm;
        out_Col = vec4(diffuseColor.rgb * lightIntensity, diffuseColor.a);

        if(fs_Pos.y < 0.0){
          out_Col = vec4(0.0, 0.2, 1.0, 1.0);
        }


        if (fs_Pos.x < 0.0){
          out_Col = vec4(0.0, 0.4, 1.0, 1.0);
        }

        if (fs_Pos.x > 0.9){
          out_Col = vec4(0.0, 0.9, 1.0, 1.0);
        }


        vec2 uv = vec2(fs_Pos.x, fs_Pos.y);
        float c = mix(1.0, 0.0, checker(uv, 1.0));
        out_Col = vec4(c, c, c, 1.0);

          vec4 rain = rainbow();
        if (c == 1.0){

          out_Col = rain;
        } else {
          out_Col = vec4(diffuseColor.rgb * lightIntensity, diffuseColor.a);
        }








}
