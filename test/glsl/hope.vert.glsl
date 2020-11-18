uniform vec2 resolution;
uniform sampler2D bufferA;
uniform float time;
out vec4 fragColor;

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 q=fragCoord/resolution.xy;
    vec3 col=texture(bufferA,q).xyz;
    // gamma
    //col=pow(col,vec3(.4545));
    // // color correct - it seems my laptop has a fucked up contrast/gamma seeting, so I need
    // //                 to do this for the picture to look okey in all computers but mine...
    col=col*1.1-.06;
    // // vignetting
    // col*=.8+.3*sqrt(16.*q.x*q.y*(1.-q.x)*(1.-q.y));
    fragColor=vec4(col,1.);
}


void main(void){
    mainImage(fragColor,gl_FragCoord.xy);
}