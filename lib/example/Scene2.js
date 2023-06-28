"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene2 = void 0;
exports.Scene2 = `uniform vec2 resolution;
uniform float time;
uniform float zoomFactor;

out vec4 fragColor;

#define iTime  time
#define iResolution  resolution

#define RESOLUTION  iResolution
#define TIME        iTime

#define PI          3.141592654
#define TAU         (2.0*PI)
#define ROT(a)      mat2(cos(a), sin(a), -sin(a), cos(a))
#define NORM_OFF    0.001
#define MIN_DIST    0.00025
#define MAX_DIST    10.0
#define MAX_ITER    90

// License: MIT, author: Inigo Quilez, found: https://www.iquilezles.org/www/articles/smin/smin.htm
float pmin(float a, float b, float k) {
  float h = clamp(0.5+0.5*(b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k*h*(1.0-h);
}

float sphere (vec3 p, float r) {
  return length(p) - r;
}

// License: MIT OR CC-BY-NC-4.0, author: mercury, found: https://mercury.sexy/hg_sdf/
float mod1(inout float p, float size) {
  float halfsize = size*0.5;
  float c = floor((p + halfsize)/size);
  p = mod(p + halfsize, size) - halfsize;
  return c;
}

// License: MIT OR CC-BY-NC-4.0, author: mercury, found: https://mercury.sexy/hg_sdf/
vec2 modMirror2(inout vec2 p, vec2 size) {
  vec2 halfsize = size*0.5;
  vec2 c = floor((p + halfsize)/size);
  p = mod(p + halfsize, size) - halfsize;
  p *= mod(c,vec2(2))*2.0 - vec2(1.0);
  return c;
}

float apollonian(vec3 p, out float ss) {
  float s = mix(1.4, 1.45, smoothstep(0.9, 1.0, sin(-length(p.xz)+TAU*TIME/10.0))); 
  float scale = 1.5;

  float d = 10000.0;
    
  const int rep = 5;
  mat2 rr = ROT(PI/5.5);

  for(int i=0; i<rep; ++i) {
    mod1(p.y, 2.0);
    modMirror2(p.xz, vec2(2.0));
    p.xz *= rr;

    float r2 = dot(p,p);
    float k = s/r2;
    p *= k;
    scale *= k;
  }
  
  d = -sphere(p-0.025, 1.8);
  ss = scale;
  return 0.25*d/scale;
}

float df(vec3 p, out float ss) {
  float d0 = apollonian(p, ss);
  float d1 = -((abs(p.y)-2.0));
  float d = d0;
  d = pmin(d, d1, 0.2);
  
  return d; 
} 

vec3 glow(vec3 ro, vec3 rd, out float tt) {
  float res;
  float t = 0.+0.8;

  vec3 col = vec3(0.0);    
  for(int i = 0; i < MAX_ITER; ++i) {
    vec3 p = ro + rd * t;
    float ss;
    res = df(p, ss);
    float lss = log(ss);
    float dp = -((abs(p.y)-2.0)); 
    vec3 gcol = mix(0.2, 0.6, dp)*((0.5+0.5*cos(3.0+vec3(1.0, 2.0, 3.0)+0.8*lss))*exp(-0.75*t-20.0*res));
    col += gcol*gcol;

    if(res < MIN_DIST * t || res > MAX_DIST) {
      break;
    }
    
    t += res;
  }
  
  tt = t;
    
  return col;
}

vec3 normal(vec3 pos) {
  vec2  eps = vec2(NORM_OFF,0.0);
  vec3 nor;
  float ss;
  nor.x = df(pos+eps.xyy, ss) - df(pos-eps.xyy, ss);
  nor.y = df(pos+eps.yxy, ss) - df(pos-eps.yxy, ss);
  nor.z = df(pos+eps.yyx, ss) - df(pos-eps.yyx, ss);
  return normalize(nor);
}

vec3 render(vec2 p) {

    float f = zoomFactor;

  vec3 lightDir = normalize(vec3(-1.0, 1.0, 1.0));

  mat2 rot= ROT(TIME/10.0); 
  vec3 ro = 1.2*vec3(-1.0, -0.05, zoomFactor);
  lightDir.xz *= rot;
  ro.xz  *= rot;

  vec3 la = vec3(0.0, 1.6, 0.0); 
  vec3 ww = normalize(la-ro);
  vec3 uu = normalize(cross(vec3(0.0,1.0,0.0), ww ));
  vec3 vv = normalize(cross(ww,uu));

  const float fov = 3.0;
  
  vec3 rd = normalize(-p.x*uu + p.y*vv + fov*ww );

  float tt = 0.0;
  vec3 col = vec3(0.0);
  vec3 gcol = glow(ro, rd, tt);
  vec3 pos = ro+rd*tt;
  vec3 nor = normal(pos);
  vec3 ref = reflect(rd, nor);
 
  float spe   = pow(max(dot(lightDir, ref), 0.0), 40.0);
 
  float sfog = exp(-2.0*0.5*tt);
  const vec3 scol = vec3(4.0, 3.5, 3.0);
  col += gcol;
  col += spe*sfog*scol;
  return col;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
  vec2 q  = fragCoord/RESOLUTION.xy;
  vec2 p = -1.0 + 2.0*q; 
  p.x*=RESOLUTION.x/RESOLUTION.y;

  vec3 col = render(p);
  col -= 0.0125*vec3(2.0, 3.0, 1.0);
  col = clamp(col, 0.0, 1.0);
  col = sqrt(col);

  fragColor=vec4(col.x,col.y,col.z,1.0); 
}


void main(){
    mainImage(fragColor,gl_FragCoord.xy);
}`;
