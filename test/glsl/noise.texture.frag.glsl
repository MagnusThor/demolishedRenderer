uniform float time;
uniform vec2 resolution;
uniform int frame;
out vec4 fragColor;

float g(in vec2 xy, in float seed)
{
    return fract(tan(distance(xy*1.61803398874989484820459, xy)*seed)*xy.x);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
     vec2 uv = fragCoord.xy;
     uv -= floor(uv / 289.0) * 289.0;
     uv += vec2(223.35734, 550.56781);
     uv *= uv;
     float xy = uv.x * uv.y;
     fragColor = vec4(fract(xy * 0.00000012),
               fract(xy * 0.00000543),
               fract(xy * 0.00000192),
               fract(xy * 0.00000423));

     // float t= time;
     
     // vec2 uv = fragCoord.xy ;

     // vec4 rgba = vec4(g(uv, fract(t)+1.0), // r
     //            g(uv, fract(t)+2.0), // g
     //            g(uv, fract(t)+3.0), // b
     //            1.0);   

	
     // fragColor = rgba;
}
void main(void){
     mainImage(fragColor,gl_FragCoord.xy);
}