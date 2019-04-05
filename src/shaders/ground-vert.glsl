#version 300 es

uniform mat4 u_Model;

uniform mat4 u_ModelInvTr;
uniform mat4 u_ViewProj;
in vec4 vs_Pos;
in vec4 vs_Nor;
in vec4 vs_Col;
out vec4 fs_Nor;
out vec4 fs_LightVec;
out vec4 fs_Col;
out vec4 fs_Pos;
uniform float u_Time;
const vec4 lightPos = vec4(5, 5, 3, 1);

  float Noise(float x, float y){
    return (fract(sin(dot(vec2(x, y), vec2(12.9898, 4.1414))) * 43758.5453));
  }

  float interpNoise2D(float x, float y){

    float intX = floor(x);
    float fractX = fract(x);
    float intY = floor(y);
    float fractY = fract(y);

    float v1 = Noise(intX, intY);
    float v2 = Noise(intX + 1.0, intY);
    float v3 = Noise(intX, intY + 1.0);
    float v4 = Noise(intX + 1.0, intY + 1.0);

    float i1 = mix(v1, v2, fractX);
    float i2 = mix(v3, v4, fractX);

    return mix(i1, i2, fractY);


  }
float fbm(float x, float y){

      float total = 0.f;
      float peristence = 0.5f;
      float octaves = 8.f;

      for(float i = 0.f; i < octaves; i++){
          float freq = pow(2.f, i);
          float amp = pow(peristence, i);
          total += interpNoise2D((x * freq), (y * freq)) * amp;
      }

      return total;

  }

void main()
{
    fs_Col = vs_Col;
    mat3 invTranspose = mat3(u_ModelInvTr);
    fs_Nor = vec4(invTranspose * vec3(vs_Nor), 0);

    vec4 modelposition = u_Model * vs_Pos;
  //  modelposition.y += fbm(vs_Pos.x / 32.0, vs_Pos.z / 32.0) * abs(sin(u_Time / 1000.0));

  if (modelposition.y < -0.1){
    modelposition.y = -0.15;
    fs_Pos.y = -0.15;
  }

    fs_Pos.x = modelposition.x;
    fs_Pos.z = modelposition.z;

    fs_LightVec = lightPos - modelposition;

    gl_Position = u_ViewProj * modelposition;
}
