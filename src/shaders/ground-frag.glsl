#version 300 es


precision highp float;

uniform vec4 u_Color;


in vec4 fs_Nor;
in vec4 fs_LightVec;
in vec4 fs_Col;

uniform float u_Time;

in vec4 fs_Pos;


out vec4 out_Col;


float checker(vec2 uv, float repeats)
{
  float cx = floor(repeats * uv.x);
  float cy = floor(repeats * uv.y);
  float result = mod(cx + cy, 2.0);
  return sign(result);
}

void main()
{


        vec4 lightPos = vec4(8.0 * sin(u_Time / 1000.0), fs_LightVec.y, 14.0, 1.0);

        vec4 lightPos2 = vec4(fs_LightVec.x, sin(u_Time/ 10000.0), 14.0, 1.0);

        vec4 diffuseColor = vec4(0.2, 0.45, 0.35, 1.0);
        vec4 diffuseColor2 = vec4(0.2, 0.75, 0.15, 1.0);


        diffuseColor = (diffuseColor + diffuseColor2) / 2.0;


        if (fs_Pos.y < 0.0){
          diffuseColor = vec4(0.2, 0.25, 0.5, 1.0);
        }
        float diffuseTerm = dot(normalize(fs_Nor), normalize(lightPos));
        float diffuseTerm2 = dot(normalize(fs_Nor), normalize(lightPos2));
        diffuseTerm = (diffuseTerm + diffuseTerm2) / 2.0;
        diffuseTerm = clamp(diffuseTerm, 0.0, 1.0);

        float ambientTerm = 0.3;

        float lightIntensity = diffuseTerm + ambientTerm;
        out_Col = vec4(diffuseColor.rgb * lightIntensity, diffuseColor.a);

        vec2 uv = vec2(fs_Pos.x, fs_Pos.z);
        float c = mix(1.0, 0.0, checker(uv, 1.0));
        //out_Col = vec4(c, 0.9, 0.7, 1.0);


        // if (fs_Pos.x > 0.0 && fs_Pos.x < 1.0 && fs_Pos.z > 0.0 && fs_Pos.z < 25.0){
        //   out_Col = out_Col = vec4(1.0, 0.0, 0.37, 1.0);
        // }

          out_Col = vec4(diffuseColor.rgb * lightIntensity, diffuseColor.a);






}
