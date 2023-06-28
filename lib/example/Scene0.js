"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene0 = void 0;
exports.Scene0 = `uniform vec2 resolution;
uniform float time;
uniform float zoomFactor;

out vec4 fragColor;

#define iTime  time
#define iResolution  resolution

#define f(a) exp( -10.* pow( length( U -.52*cos(a+vec2(0,33)) ) , 2. ) )

void mainImage( out vec4 O, vec2 u )
{
    vec2  R = iResolution.xy,
          U = ( u+u - R ) / R.y;
    
    O =   ( .5-.5*cos(min(6.*length(U),6.3)) ) 
        * (    .7* vec4(1,.25,0,0)
            + ( f(.65)+f(1.6)+f(2.8) ) * vec4(.8,.8,.5,0) );
 // O *= O;
}


void main(){
    mainImage(fragColor,gl_FragCoord.xy);
}`;
