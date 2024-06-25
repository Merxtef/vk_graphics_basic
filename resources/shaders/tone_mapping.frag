#version 450
#extension GL_ARB_separate_shader_objects : enable
#extension GL_GOOGLE_include_directive : require

#include "common.h"

layout (location = 0) out vec4 out_fragColor;

layout (location = 0 ) in VS_OUT
{
  vec2 texCoord;
} surf;

layout (binding = 0, set = 0) uniform AppData
{
  UniformParams Params;
};

layout (binding = 1) uniform sampler2D hdrImage;

void main()
{
  vec3 color = vec3(texture(hdrImage, surf.texCoord));
  float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
  color *= 1. / (1. + luma);
  color = pow(color, vec3(0.4545));  // 1/2.2
  out_fragColor = vec4(color, 1.);
}

