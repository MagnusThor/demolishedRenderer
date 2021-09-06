export const BUFFER_A_FRAG = `uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;
uniform sampler2D iChannel3;
uniform sampler2D iChannel4;

out vec4 fragColor;

void main(){    
  vec2 uv=(-resolution.xy+2.*gl_FragCoord.xy)/resolution.y;
  vec4 t = texture(iChannel1,uv);
  fragColor = t; // vec4(vec3(1.,0.,0.1),1.);
}`;

