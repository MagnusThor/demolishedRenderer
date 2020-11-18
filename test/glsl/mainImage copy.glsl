uniform vec2 resolution;
uniform sampler2D iChannel0;
out vec4 fragColor;

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{  
    vec2 p=fragCoord/resolution.xy;
    
    vec3 col=texture(iChannel0,p).xyz;
    //vec3 col = texelFetch( iChannel0, ivec2(fragCoord-0.5), 0 ).xyz;
    
    col*=.5+.5*pow(16.*p.x*p.y*(1.-p.x)*(1.-p.y),.05);
    
    fragColor=vec4(col,1.);
}

void main(void){
    mainImage(fragColor,gl_FragCoord.xy);
}
