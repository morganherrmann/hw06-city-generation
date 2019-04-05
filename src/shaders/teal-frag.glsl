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
    uv = (uv.xy-0.5);


  float z = u_Time / 10000.0;



    // multiple and twist uv
    uv *= sin(length(uv) * 2.0) * 7.0;

    // calculate morphing central blobs
    float val1 = length(uv);
    val1 = 1.0 - fract(length(uv + sin(u_Time / 10000.0 + uv.x) * cos(u_Time / 10000.0 + uv.y) ));

    // calculate rotating radial wave pattern
    float val2 = length(uv * 0.1) *
        cos( pow(sin(u_Time / 10000.0 + atan(uv.y, uv.x) * 10.0) + uv.x * length(uv * 0.1), 2.0 ));

	// combine values
    float val = mix(val1, val2, sin(atan(uv.y, uv.x) * 10.0) );

    // colors
    float r = pow(val, 5.0) * 3.0;
    float g = val + 0.18;
    float bl = val;
    return vec4(r, g, bl, 1);

}

void main()
{
        vec4 diffuseColor = vec4(0.0, 0.1, 0.2, 1.0);
        float diffuseTerm = dot(normalize(fs_Nor), normalize(fs_LightVec));
        diffuseTerm = clamp(diffuseTerm, 0.0, 1.0);

        float ambientTerm = 0.3;

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


        vec2 uv = vec2(fs_Pos.x, fs_Pos.z);
        float c = mix(1.0, 0.0, checker(uv, 1.0));
        out_Col = vec4(c, c, c, 1.0);
        out_Col = vec4(diffuseColor.rgb * lightIntensity, diffuseColor.a);

        if (c == 1.0){
          vec4 rain = rainbow();
          out_Col = vec4(rain.rgb * lightIntensity, diffuseColor.a);
        }








}
