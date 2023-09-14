export const Scene0
 = /*glsl*/ `uniform vec2 resolution;
uniform float time;

out vec4 fragColor;

#define iTime  time
#define iResolution  resolution


void mainImage(vec4 fragColor, vec2 fragCoord )
{
   
}


void main(){
    mainImage(fragColor,gl_FragCoord.xy);
}`;