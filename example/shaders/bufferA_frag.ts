export const BUFFER_A_FRAG = `uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;
uniform sampler2D iChannel3;
uniform sampler2D iChannel4;
uniform sampler2D fft;


out vec4 fragColor;

#define iTime time
#define iResolution vec3(resolution,1.)

// "Foldable French fancy" - Result of an improvised live coding session on Twitch
// LIVE SHADER CODING, SHADER SHOWDOWN STYLE, EVERY TUESDAYS 21:00 Uk time: 
// https://www.twitch.tv/evvvvil_

// "The french are no good at war: they're too busy painting and fornicating." - Some British general who obviously didn't get laid much

// LIVE SHADER CODING, SHADER SHOWDOWN STYLE, EVERY TUESDAYS 21:00 Uk time: 
// https://www.twitch.tv/evvvvil_

vec2 z,e=vec2(.00035,-.00035);float t,tt,b,bb,g,gg,gr,gt;vec3 np,pp,op,po,no,al,ld,rp; //GLOBAL VARIABLES
float bo(vec3 p, vec3 r){p=abs(p)-r;return max(max(p.x,p.y),p.z);} //CHEAP BOX FUNCTION
mat2 r2(float r){return mat2(cos(r),sin(r),-sin(r),cos(r));} //ROTATE FUNCTION
const mat2 deg45 = mat2(.7071,.7071,-.7071,.7071); //OPTIMIZE ROTATIONS IN LOOP THAT USE FIXED 45 DEG ROTATION
vec4 texNoise(vec2 uv,sampler2D tex ){ float f = 0.; f+=texture(tex, uv*.125).r*.5; f+=texture(tex,uv*.25).r*.25; //Funciton simulating the perlin noise texture we have in Bonzomatic shader editor, written by yx
                       f+=texture(tex,uv*.5).r*.125; f+=texture(tex,uv*1.).r*.125; f=pow(f,1.2);return vec4(f*.45+.05);}
vec2 mp( vec3 p ,float ga){ 
  op=p; //REMEMBER ORIGINAL POSITION BEFORE WE FUCK WITH IT
  p.z=mod(p.z-tt*2.,30.)-15.; //MAKE WHOLE SCENE INFINIT AND MOVE FORWARD
  pp=p;   //SETUP MAIN POSITION
  b=smoothstep(0.,1.,sin(op.z*.05+tt*.2+3.5)*.5+.5); //ANIM VARIABLE  
  pp.xy=vec2(abs(abs(pp.x)-8.2)-(1.+4.*b),abs(pp.y));    //CLONE MAIN POS A COUPLE OF TIMES
  pp.z=mod(pp.z,2.)-1.; //INFINITE MODULO MAIN POS TO REPEAT FOLDABLE BIT ALONG Z 
  rp=pp; //ROTATE POSITION BASED ON MAIN POSITION
  rp.y-=4.*b+1.;  //SHIFT UP AND DOWN
  rp.xy*=r2(b*6.28); //ROTATE MAIN POSITION
  gr=gt=1.; //SETUP GREEBLES DETAILS
  vec2 sca=vec2(0.5,1);  //SETUP SCALER
  vec4 gp=vec4(p.xz*.5,rp.xy); //PACK BOTH GREEBLE DETAILS POSITIONS INTO ONE VEC4 - THIS IS TO OPTIMIZE AND REDUCE CODE LENGTH
  for(int i=0;i<3;i++){ //FRACTAL GREEBLE BULLSHIT
    gp=abs(gp)-1.5; //SYMETRY MOVE EACH ITER
    gp.xy*=deg45; //ROTATE EACH ITER 45 DEG POSITION 1
    gp.zw*=deg45;//ROTATE EACH ITER 45 DEG POSITION 2
    gp*=.85;sca*=0.85; //EACH ITER WE SCALE DOWN A BIT
    gr=min(gr,clamp(sin(gp.x*5.),-.25,.25)*.5*sca.x); //ADD ITERATION GREEBLE TO PREVIOUS GREEBLE DETAIL FOR GREEBLE ON FLOOR
    gt=min(gt,clamp(sin(gp.z*5.),-.25,.25)*.5*sca.y); //ADD ITERATION GREEBLE TO PREVIOUS GREEBLE DETAIL FOR GREEBLE ON ROTATING OBJECTS
  }
  vec2 h,t=vec2(.75*bo(rp,vec3(1.,1.,1.-b*.2)),3);   //BLACK BOX
  np=rp; np.xz*=r2(b*.785);  //BLACK BOX CUTTER POSITION
  t.x=max(t.x,.7*bo(np-gt*.7*b,vec3(1.,1.,1.-b*.2))); //BLACK BOX CUTER    
  vec3 sp=rp;sp.y-=2.6-sin(b*3.14)*7.25+b*3.; //SPHERE POSITON
  t.x=min(t.x,0.7*max(length(rp.xz)-.1,abs(sp.y+1.-sin(b*3.14)*2.1)-1.)); //THIN BLACK CYLINDER  
  float whiteCyl=0.6*max(abs(abs(length(rp.xz)-.5-gt*.5)-.1)-.05,abs(rp.y)-1.1-b*3.4);//WHITE CYLINDERS
  h=vec2(whiteCyl,6); //ADD WHITE CYLINDER TO MATERIAL ID 6
  h.x=min(h.x,length(rp.xy)-.2); //LONG Z WHITE CYLINDER
  h.x=min(h.x,max(abs(length(abs(rp.yz)-.0)-.2*b)-.1,abs(rp.x)-1.1)); //LONG Z WHITE CYLINDER    
  float spheres=0.7*(length(sp)-.1);  //GLOW SPHERES
  h.x=min(h.x,spheres); //ADD GLOW SPHERES  TO MATERIAL ID 6
  g+=1.0/(0.1+spheres*spheres*100.)*ga; //MAKE SPHERES GLOW
  np=abs(p)-vec3(0,7,0); np.xy*=deg45;//GROUND DIGGER POSITION
  pp=p;pp.y=abs(pp.y)-21.; //GROUND AND CEILING POSITION
  float ter=0.8*bo(pp,vec3(50,10,200)-gr*2.); //GROUND AND CEILING
  ter=max(ter,-0.9*bo(np,vec3(8,8,200)-gr*2.));//DIG TRIANGULAR SHAPE INTO GROUND
  float vertCyl=length(rp.xz)-.15; //VERTICAL GLOW CYLINDER
  bb=max(0.,(b-.9)*10.); //animation variable
  vertCyl=max(vertCyl,abs(rp.y+5.*bb)-1.); //VERTICAL GLWO CYLINDER
  vertCyl=min(vertCyl,0.7*max(length(rp.yz),abs(rp.x-1.)-2.2*bb)); //VERTICA GLOW CYLINDER CUT
  gg+=1.0/(0.1+vertCyl*vertCyl*(200.-sin(bb+op.z*.2+tt*2.)*180.))*ga*bb; //GLOW CYLINDERS
  h.x=min(h.x,vertCyl);  //ADD CYLINDER TO SCENE MATERIAL ID 6
  t=t.x<h.x?t:h;//MERGE T AND H MATERIAL ID GEOMETRIES INTO SCENE
  h=vec2(ter,7); //ADD GROUND / CEILING TO MATERIAL ID 7
  t=t.x<h.x?t:h; //MERGE T AND H MATERIAL ID GEOMETRIES INTO SCENE
  return t;
}
vec2 tr( vec3 ro, vec3 rd )//RAYMARCHING LOOP
{
  vec2 h,t=vec2(.1);//NEAR PLANE
  for(int i=0;i<128;i++){//LOOOP MAX 128 STEPS
  h=mp(ro+rd*t.x,1.);//GET DISTANCE TO GEOM
    if(h.x<.0001||t.x>80.) break; //IF WE CLOSE ENOUGH OR IF WE TOO FAR, BREAK
    t.x+=h.x;t.y=h.y;//BIG JUMP TO GEOMETRY IN NEXT ITERATION, REMEMBER MATERIAL ID
  }  
  if(t.x>80.) t.y=0.;//IF WE TOO FAR RETURN 0 MAT ID
  return t;
}
#define a(d) clamp(mp(po+no*d,0.).x,0.,1.)
#define s(d) smoothstep(0.,1.,mp(po+ld*d,0.).x)

void mainImage( out vec4 fragColor, in vec2 fragCoord ){ //LINES ABOVE ARE ambient ollcusion and sss
  vec2 uv=(fragCoord.xy/iResolution.xy-0.5)/vec2(iResolution.y/iResolution.x,1);   //GET UVS  
  tt=mod(iTime,57.973)+8.;//MOD TIME TO AVOID ARTIFACT
  b=smoothstep(0.,1.,sin(tt*.2)*.5+.5); //ANIMATION VARIABLE
  vec3 ro=mix(vec3(0,15.-15.*b,20.),vec3(-18.*sin(tt*.2),(10.-20.*ceil(sin(tt*.2)))*sign(sin(tt*.1)),15.),ceil(cos(tt*.2))),//RAY ORIGIN = CAMERA POSITION
  cw=normalize(vec3(0)-ro),cu=normalize(cross(cw,vec3(0,1,0))),cv=normalize(cross(cu,cw)), //CAMERA STUFF
  rd=mat3(cu,cv,cw)*normalize(vec3(uv,.5)),co,fo; //CAMERA STUFF...
  co=fo=vec3(.1,.15,.2)-length(uv)*.18+texNoise(rd.xz,iChannel0).r*.2; //BACKGROUND COLOUR
  ld=normalize(vec3(-.2,.3,-.3));//LIGHT DIRECTION
  z=tr(ro,rd);t=z.x; //RAYMARCH PIXEL
  if(z.y>0.){//IF WE HIT SOMETHING THEN DO LIGHTING
    po=ro+rd*t;//GET WHERE WE AT
    no=normalize(e.xyy*mp(po+e.xyy,0.).x+e.yyx*mp(po+e.yyx,0.).x+e.yxy*mp(po+e.yxy,0.).x+e.xxx*mp(po+e.xxx,0.).x); //DERIVE NORMALS FROM WEHERE WE AT    
    al=vec3(.05); //DEFAULT MATERIAL IS BLACK
    if(z.y>5.)al=vec3(1.); //MATERIAL ID 6 IS WHITE
    if(z.y>6.)al=mix(vec3(1.5),vec3(.05,.2,.5),sin(gr*60.)*.5+.5);//MATERIAL ID 7 IS WHITE + GREEBLE COLOUR
    float dif=max(0.,dot(no,ld)), //DIFFUSE
    fr=pow(1.+dot(no,rd),4.), //FRESNEL
    sp=pow(max(dot(reflect(-ld,no),-rd),0.),40.); //SPECULAR
    co=mix(sp+al*(a(.1)+.2)*(dif+s(2.)),fo,min(fr,.5));//FINAL LIGHTING RESULT
    co=mix(fo,co,exp(-.00001*t*t*t)); //FOG
  }
  co+=g*.2*mix(vec3(.7,.3,0),vec3(1,.2,.1),1.-b)+gg*.2*vec3(.05,.2,.5);//ADD GLOWS
  co=mix(co,co.zyx,length(uv)*.5); //CHEAP RADIAL UV SHADING
  fragColor = vec4(pow(co,vec3(.55)),1); //GAMME CORRECTION
}


void main(){
    
       mainImage(fragColor,gl_FragCoord.xy);
    
}

`;

