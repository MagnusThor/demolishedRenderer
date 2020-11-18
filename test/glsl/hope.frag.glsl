uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;
uniform int frame;
uniform vec3 iMouse;
out vec4 fragColor;
#define iTime time
#define rot(a)    mat2( cos(a+vec4(0,11,33,0)) )                    // rotation                  
#define B(a,l,L)  max(  max( abs(a).x, abs(a).y ) -l, abs(a).z -L ) // bar
void mainImage(out vec4 O, vec2 U) {
    
    float t=9., a;
    vec3  R = vec3(resolution.xy,.5); 
	    
	    vec3 e = vec3(5,-5,0), X=e.xzz, Z=e.zzx,
		    
          M = iMouse.z > 0. ? iMouse.xyz/R : .01*cos(.5*iTime+vec3(0,11,0)),
          D = normalize(vec3( U+U, -2.*R.y ) - R ),      // ray direction
          p = 50./R, q,s;                                // marching point along ray 
    
    for (O-=O ; O.x < 1. && t > .01 ; O+=.01 )
	    
        q = p, t=9.,
        q.yz *= rot(-.4 -6.3*M.y),                       // rotations
        q.xz *= rot(-.4 -6.3*M.x),
        s = q = q.xzy,
        t = min( t, max( -B((q-3.*Z),11.,2.), a = abs(q.z-15.)-1.5 ) ), // roof hole
        q.y += 2., q.yz *= rot(.4),
        t = min( t, B(abs(q)-X,.7,30.) ),                // ladder sides
        t = t = min( t, max( abs(q.z)-28.,  B(vec3(mod(q.z+2.5,5.)-2.5,q.yx),.5,5.) ) ),
        p += t*D;                                        // step forward = dist to obj          

   if ( a==t || O.x>1. && s.z<200.) O *= 0.;             // roof & horizon = blaxk
// if (s.z>200.) O *= vec4(.7,1,1,0);                    // coloring
}
void main(void){
    mainImage(fragColor,gl_FragCoord.xy);
}


