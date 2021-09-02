export const MAINFRAG = `uniform vec2 resolution;
uniform sampler2D bufferA;
uniform sampler2D bufferB;

out vec4 fragColor;
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 q=fragCoord/resolution.xy;
    vec3 col=texture(bufferA,q).xyz;
    fragColor=vec4(col,1.);
}
void main(void){
    mainImage(fragColor,gl_FragCoord.xy);
}`