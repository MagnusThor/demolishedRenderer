uniform vec2 resolution;
uniform sampler2D A;
out vec4 fragColor;
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 q=fragCoord/resolution.xy;
    vec3 col=texture(A,q).xyz;
    fragColor=vec4(col,1.);
}
void main(void){
    mainImage(fragColor,gl_FragCoord.xy);
}