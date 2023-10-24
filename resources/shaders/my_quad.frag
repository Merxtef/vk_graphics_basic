#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(location = 0) out vec4 color;

layout (binding = 0) uniform sampler2D colorTex;

layout (location = 0 ) in VS_OUT
{
  vec2 texCoord;
} surf;

void main()
{
  vec4 neighbours[9] = {
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1, -1)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1, 0)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1, 1)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(0, -1)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(0, 0)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(0, 1)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(1, -1)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(1, 0)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(1, 1)),
  };

  for (int i = 0; i < 9; ++i)
    for (int j = i + 1; j < 9; ++j)
    {
      if (neighbours[i].x + neighbours[i].y + neighbours[i].z > neighbours[j].x + neighbours[j].y + neighbours[j].z)
        continue;

      vec4 tmp = neighbours[i];
      neighbours[i] = neighbours[j];
      neighbours[j] = tmp;
    }

  color = neighbours[4];//textureLod(colorTex, surf.texCoord, 0);
}
