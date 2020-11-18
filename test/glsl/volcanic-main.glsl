uniform vec2 resolution;
uniform sampler2D bufferA;
out vec4 fragColor;

#define iTime time
#define iResolution resolution

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy;
    vec4 data = texture( bufferA, uv );
    vec3 col = data.xyz;
    // vignetting	
	col *= 0.5 + 0.5*pow( 16.0*uv.x*uv.y*(1.0-uv.x)*(1.0-uv.y), 0.1 );
    fragColor = vec4(col,1.);
}


void main(void){
    mainImage(fragColor,gl_FragCoord.xy);
}
