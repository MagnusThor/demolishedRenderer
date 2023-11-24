export declare const Scene3 = "uniform vec2 resolution;\nuniform float time;\nuniform float zoomFactor;\n\nout vec4 fragColor;\n\n#define iTime  time\n#define iResolution  resolution\n\n#define RESOLUTION  iResolution\n#define TIME        iTime\n\n#define PI          3.141592654\n#define TAU         (2.0*PI)\n#define ROT(a)      mat2(cos(a), sin(a), -sin(a), cos(a))\n#define NORM_OFF    0.001\n#define MIN_DIST    0.00025\n#define MAX_DIST    10.0\n#define MAX_ITER    90\n\n// License: MIT, author: Inigo Quilez, found: https://www.iquilezles.org/www/articles/smin/smin.htm\nfloat pmin(float a, float b, float k) {\n  float h = clamp(0.5+0.5*(b-a)/k, 0.0, 1.0);\n  return mix(b, a, h) - k*h*(1.0-h);\n}\n\nfloat sphere (vec3 p, float r) {\n  return length(p) - r;\n}\n\n// License: MIT OR CC-BY-NC-4.0, author: mercury, found: https://mercury.sexy/hg_sdf/\nfloat mod1(inout float p, float size) {\n  float halfsize = size*0.5;\n  float c = floor((p + halfsize)/size);\n  p = mod(p + halfsize, size) - halfsize;\n  return c;\n}\n\n// License: MIT OR CC-BY-NC-4.0, author: mercury, found: https://mercury.sexy/hg_sdf/\nvec2 modMirror2(inout vec2 p, vec2 size) {\n  vec2 halfsize = size*0.5;\n  vec2 c = floor((p + halfsize)/size);\n  p = mod(p + halfsize, size) - halfsize;\n  p *= mod(c,vec2(2))*2.0 - vec2(1.0);\n  return c;\n}\n\nfloat apollonian(vec3 p, out float ss) {\n  float s = mix(1.4, 1.45, smoothstep(0.9, 1.0, sin(-length(p.xz)+TAU*TIME/10.0))); \n  float scale = 1.5;\n\n  float d = 10000.0;\n    \n  const int rep = 5;\n  mat2 rr = ROT(PI/5.5);\n\n  for(int i=0; i<rep; ++i) {\n    mod1(p.y, 2.0);\n    modMirror2(p.xz, vec2(2.0));\n    p.xz *= rr;\n\n    float r2 = dot(p,p);\n    float k = s/r2;\n    p *= k;\n    scale *= k;\n  }\n  \n  d = -sphere(p-0.025, 1.8);\n  ss = scale;\n  return 0.25*d/scale;\n}\n\nfloat df(vec3 p, out float ss) {\n  float d0 = apollonian(p, ss);\n  float d1 = -((abs(p.y)-2.0));\n  float d = d0;\n  d = pmin(d, d1, 0.2);\n  \n  return d; \n} \n\nvec3 glow(vec3 ro, vec3 rd, out float tt) {\n  float res;\n  float t = 0.+0.8;\n\n  vec3 col = vec3(0.0);    \n  for(int i = 0; i < MAX_ITER; ++i) {\n    vec3 p = ro + rd * t;\n    float ss;\n    res = df(p, ss);\n    float lss = log(ss);\n    float dp = -((abs(p.y)-2.0)); \n    vec3 gcol = mix(0.2, 0.6, dp)*((0.5+0.5*cos(3.0+vec3(1.0, 2.0, 3.0)+0.8*lss))*exp(-0.75*t-20.0*res));\n    col += gcol*gcol;\n\n    if(res < MIN_DIST * t || res > MAX_DIST) {\n      break;\n    }\n    \n    t += res;\n  }\n  \n  tt = t;\n    \n  return col;\n}\n\nvec3 normal(vec3 pos) {\n  vec2  eps = vec2(NORM_OFF,0.0);\n  vec3 nor;\n  float ss;\n  nor.x = df(pos+eps.xyy, ss) - df(pos-eps.xyy, ss);\n  nor.y = df(pos+eps.yxy, ss) - df(pos-eps.yxy, ss);\n  nor.z = df(pos+eps.yyx, ss) - df(pos-eps.yyx, ss);\n  return normalize(nor);\n}\n\nvec3 render(vec2 p) {\n\n    float f = zoomFactor;\n\n  vec3 lightDir = normalize(vec3(-1.0, 1.0, 1.0));\n\n  mat2 rot= ROT(TIME/10.0); \n  vec3 ro = 1.2*vec3(-1.0, -0.05, zoomFactor);\n  lightDir.xz *= rot;\n  ro.xz  *= rot;\n\n  vec3 la = vec3(0.0, 1.6, 0.0); \n  vec3 ww = normalize(la-ro);\n  vec3 uu = normalize(cross(vec3(0.0,1.0,0.0), ww ));\n  vec3 vv = normalize(cross(ww,uu));\n\n  const float fov = 3.0;\n  \n  vec3 rd = normalize(-p.x*uu + p.y*vv + fov*ww );\n\n  float tt = 0.0;\n  vec3 col = vec3(0.0);\n  vec3 gcol = glow(ro, rd, tt);\n  vec3 pos = ro+rd*tt;\n  vec3 nor = normal(pos);\n  vec3 ref = reflect(rd, nor);\n \n  float spe   = pow(max(dot(lightDir, ref), 0.0), 40.0);\n \n  float sfog = exp(-2.0*0.5*tt);\n  const vec3 scol = vec3(4.0, 3.5, 3.0);\n  col += gcol;\n  col += spe*sfog*scol;\n  return col;\n}\n\nvoid mainImage( out vec4 fragColor, in vec2 fragCoord ) {\n  vec2 q  = fragCoord/RESOLUTION.xy;\n  vec2 p = -1.0 + 2.0*q; \n  p.x*=RESOLUTION.x/RESOLUTION.y;\n\n  vec3 col = render(p);\n  col -= 0.0125*vec3(2.0, 3.0, 1.0);\n  col = clamp(col, 0.0, 1.0);\n  col = sqrt(col);\n\n  fragColor=vec4(col.x,col.y,col.z,1.0); \n}\n\n\nvoid main(){\n    mainImage(fragColor,gl_FragCoord.xy);\n}";
//# sourceMappingURL=Scene3.d.ts.map