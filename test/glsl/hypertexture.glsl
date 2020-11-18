// disp of not-noise variant of https://shadertoy.com/view/wddczl
// divergence-free variant of https://shadertoy.com/view/wstyzl
// variant of https://shadertoy.com/view/tsdcRj

// - Introduce transfer function ( i.e. LUT(dens) ) to shape the look (much like doctors do for scan data)
// - Rely on preintegrated density on segment.
//     inspired by preintegrated segment rendering ( see http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.10.3079&rep=rep1&type=pdf )
//     NB: they store a small texture(_dens,dens), but here I do it analytically.

#define noise(x) texture(iChannel0, x ).xyz
#define SQR(x)   ( (x)*(x) )
#define CUB(x)   ( (x)*(x)*(x) )

vec3 divfreenoise( vec3 q ) { // fluid-like noise = div-free -> curl
    vec2 e = vec2(1./16.,0);
    q += .1*iTime;            // animated flow
    vec3 v = noise(q); 
 // return 2.*(v -.5);             // regular
    return vec3( noise(q+e.yxy).z-v.z - v.y+noise(q+e.yyx).y, // curl
                 noise(q+e.yyx).x-v.x - v.z+noise(q+e.xyy).z,
                 noise(q+e.xyy).y-v.y - v.x+noise(q+e.yxy).x
                ) *1.;
}
             
float z, BR = 2.5;   // bounding sphere (0,0,0), 2.
float map(vec3 p )
{
    vec3 q = p;
 // vec3 N = 2.* noise(q/10.) -1.;                // displacement
    vec3 N = divfreenoise(   q/5.)
      ; // + divfreenoise(2.*q/5.) /2.
        // + divfreenoise(4.*q/5.) /4.
        // + divfreenoise(8.*q/5.) /8.;
    q += N;
    float f = // ( 1.2*noise(q/2.+ .1*iTime).x -.2 ) * // source noise
               smoothstep(1.,.8,dot(q,q)/1.5);   // source sphere

 // f*= smoothstep(.1,.2,abs(p.x));               // empty slice (derivable ) 
    z = length(q)/2.;                             // depth in sphere
    return f;                        
}

vec3 sundir = normalize( vec3(0,0,-1) );
vec2 coord;

  #define sl  5.                               // transition slope transp/opaque
  #define LUT(d) clamp( .5+sl*(d-.5), 0., 1. ) // transfer function

                                               // integral of transfer function
  #define intLUT(d0,d1) ( abs(d1-d0)<1e-5 ? 0. : ( I(d1) - I(d0) ) / (d1-d0) ) 
  #define C(d)    clamp( d, .5-.5/sl, .5+.5/sl )
  #define I0(d) ( .5*d + sl*SQR(d-.5)/2. )
  #define I(d)  ( I0(C(d)) + max(0.,d-(.5+.5/sl)) )

float LUTs( float _d, float d ) { // apply either the simple or integrated transfer function
    return intLUT(_d,d);
/*  return coord.x > 0. 
             ?  LUT(d)        // right: just apply transfert function
             :  intLUT(_d,d); // left: preintegrated transfert function
*/
}

float intersect_sphere( vec3 O, vec3 D, vec3 C, float r )
{
	float b = dot( O-=C, D ),
	      h = b*b - dot( O, O ) + r*r;
	return h < 0. ? -1.             // no intersection
	              : -b - sqrt(h);
}

vec4 raymarch( vec3 ro, vec3 rd, vec3 bgcol, ivec2 px )
{
	vec4 sum = vec4(0);
	float dt = .01,
         den = 0., _den, lut,
           t = intersect_sphere( ro, rd, vec3(0), BR );
    if ( t == -1. ) return vec4(0); // the ray misses the object 
    t += 1e-5;                      // start on bounding sphere
    
    for(int i=0; i<500; i++) {
        vec3 pos = ro + t*rd;
        if(   sum.a > .99               // end if opaque or...
           || length(pos) > BR ) break; // ... exit bounding sphere
                                    // --- compute deltaInt-density
        _den = den; den = map(pos); // raw density
        float _z = z;               // depth in object
        lut = LUTs( _den, den );    // shaped through transfer function
        if( lut > .0                // optim
          ) {                       // --- compute shading                  
#if 0                               // finite differences
            vec2 e = vec2(.3,0);
            vec3 n = normalize( vec3( map(pos+e.xyy) - den,
                                      map(pos+e.yxy) - den,
                                      map(pos+e.yyx) - den ) );
         // see also: centered tetrahedron difference: https://www.iquilezles.org/www/articles/normalsSDF/normalsSDF.htm
            float dif = clamp( -dot(n, sundir), 0., 1.);
#else                               // directional difference https://www.iquilezles.org/www/articles/derivative/derivative.htm
         // float dif = clamp((lut - LUTs(_den, map(pos+.3*sundir)))/.6, 0., 1. ); // pseudo-diffuse using 1D finite difference in light direction 
            float dif = clamp((den - map(pos+.3*sundir))/.6, 0., 1. );             // variant: use raw density field to evaluate diffuse
#endif
/*
            vec3  lin = vec3(.65,.7,.75)*1.4 + vec3(1,.6,.3)*dif,          // ambiant + diffuse
                  col = vec3(.2 + dif);
            col = mix( col , bgcol, 1.-exp(-.003*t*t) );   // fog
*/            
            vec3 col = exp(- vec3(3,3,2) *(1.-z));     // dark with shadow
         // vec3 col =   exp(- vec3(3,3,2) *(.8-_z));  // dark with depth
                   //      *  exp(- 1.5 *(1.-z));
            sum += (1.-sum.a) * vec4(col,1)* (lut* dt*5.); // --- blend. Original was improperly just den*.4;
        }
        t += dt;  // stepping
    }

    return sum; 
}

mat3 setCamera( vec3 ro, vec3 ta, float cr )
{
	vec3 cw = normalize(ta-ro),
	     cp = vec3(sin(cr), cos(cr),0),
	     cu = normalize( cross(cw,cp) ),
	     cv = cross(cu,cw);
    return mat3( cu, cv, cw );
}

vec4 render( vec3 ro, vec3 rd, ivec2 px )
{
    // background sky  
	float sun = max( dot(sundir,rd), 0. );
	vec3 col = // vec3(.6,.71,.75) - rd.y*.2*vec3(1,.5,1) + .15*.5
	           //  + .2*vec3(1,.6,.1)*pow( sun, 8. );
            +  vec3( .8 * pow( sun, 8. ) ); // dark variant

    // clouds    
    vec4 res = raymarch( ro, rd, col, px );  // render clouds
    col = res.rgb + col*(1.-res.a);          // blend sky
    
    // sun glare    
	col += .2*vec3(1,.4,.2) * pow( sun,3.);

    return vec4( col, 1. );
}

void mainImage( out vec4 O, vec2 U )
{
    vec2 R = iResolution.xy,
         p = ( 2.*U - R ) / R.y,
         m = iMouse.z>0. ? 2.* iMouse.xy / R.xy
                         : 1.+cos(.3*iTime+vec2(0,11));
    coord = p;
 // O = vec4( map(vec3(4.*p,0)) ); return;
    
    // camera
    vec3 ro = 4.*normalize(vec3(sin(3.*m.x), .4*m.y, cos(3.*m.x))),
	     ta = vec3(0, 0, 0);
    mat3 ca = setCamera( ro, ta, 0. );
    // ray
    vec3 rd = ca * normalize( vec3(p,1.5) );
    
    O = render( ro, rd, ivec2(U-.5) );
 // if (floor(U.x)==floor(R.x/2.)) O = vec4(1,0,0,1); // red separator
}

#define mainVR(O,U,C,D) O = render( C, D, ivec2(U-.5) )