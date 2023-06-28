module.exports = "uniform vec2 resolution;uniform float time;out vec4 fragColor;\n#define iTime  time\n#define iResolution  resolution\nint A=0;void C(inout vec2 D,float E){D=cos(E)+sin(E)*vec2(D.y,-D.x);}float F(vec3 D){vec3 G=floor(D);D-=G;vec3 H=vec3(7,157,113);vec4 I=vec4(0.,H.yz,H.y+H.z)+dot(G,H);D=D*D*(3.-2.*D);I=mix(fract(sin(I)*43758.5),fract(sin(I+H.x)*43758.5),D.x);I.xy=mix(I.xz,I.yw,D.y);return mix(I.x,I.y,D.z);}float J(vec3 D){vec3 K=vec3(1,.75,.5);vec2 E=sin(vec2(0,1.57)+1.57/2.);vec2 L=sin(vec2(0,1.57)+1.57/4.);float H=5.;float M=1e5;D=abs(fract(D*.5)*2.-1.);float N=1./H;for(int O=0;O<5;O++){D.xy=mat2(E.y,-E.x,E)*D.xy;D.yz=mat2(L.y,-L.x,L)*D.yz;D=abs(D);if(D.x<D.y)D.xy=D.yx;if(D.x<D.z)D.xz=D.zx;if(D.y<D.z)D.yz=D.zy;D=D*H+K*(1.-H);D.z-=step(D.z,K.z*(1.-H)*.5)*K.z*(1.-H);D=abs(D);M=min(M,max(max(D.x,D.y),D.z)*N);N/=H;if(O==1&&D.x>(9.+1.*sin(0.209*iTime+1.)))A=1;}return M-0.29;}float P(vec3 D){float Q=-0.05-J(.4*D);if(A==0)Q+=0.002*F(D*70.);return Q;}vec3 R(vec3 S){float T=0.0001;float M=P(S);return normalize(vec3(P(S+vec3(T,0,0))-M,P(S+vec3(0,T,0))-M,P(S+vec3(0,0,T))-M));}float U(vec3 V,vec3 W){float X=(P(V)<0.)?-1.:1.;float Y=.0001;float I=Y*2.;float Z=0.;for(int O=0;O<120;O++){if(abs(I)<Y||Z>12.)break;I=X*P(V+W*Z);Z+=I;}return Z;}float a(vec3 S,vec3 b,vec3 c,vec3 d,float e,out float f,out vec3 g){float I=0.;f=2.;vec3 h=refract(c,d,e);for(int O=0;O<50;O++){if(abs(I)>3.)break;I=P(S+h*f);f-=I;}g=R(S+h*f);return(.5*clamp(dot(-b,g),0.,1.)+pow(max(dot(reflect(h,g),b),0.),8.));}float i(vec3 V,vec3 W){float j=1.;float Z=.02;float I=0.;for(int O=0;O<22;O++){if(Z>20.)continue;I=P(V+W*Z);j=min(j,4.*I/Z);Z+=I;}return j;}void k(out vec4 fragColor,in vec2 l){float B=abs(fract(0.05*iTime)-.5)*20.;A=0;vec2 m=gl_FragCoord.xy/iResolution.xy;vec2 D=m*2.-1.;float n=(fract(.1*(iTime-1.))>=0.9)?fract(-iTime)*0.1*sin(30.*iTime):0.;vec3 c=normalize(vec3(2.*gl_FragCoord.xy-iResolution.xy,iResolution.y));vec3 o=vec3(0,2.*n,-3.);vec2 p=sin(vec2(0,1.57)+iTime/8.);c.xy=mat2(p.y,-p.x,p)*c.xy;c.xz=mat2(p.y,-p.x,p)*c.xz;o=vec3(0,2.+n,0.+8.*sin(B/3.));vec3 q=vec3(0.);vec3 r=vec3(0.);float Z=U(o,c);vec3 S=o+c*Z;vec3 d=R(S);vec3 b=normalize(-S);float s=clamp((1.-0.09*Z),0.,1.);vec3 t,g=vec3(0.);if(Z<12.){r=vec3(max(dot(b,d),0.)+pow(max(dot(reflect(c,d),b),0.),16.));r*=clamp(i(S,b),0.,1.);if(A==1){float f;r.r+=a(S,b,c,d,0.91,f,g)*s;r.g+=a(S,b,c,d,0.90,f,g)*s;r.b+=a(S,b,c,d,0.89,f,g)*s;r-=clamp(.1*f,0.,1.);}}float u=0.;float v=1.;float w=0.1*-sin(.209*iTime+1.)+0.05;for(int O=0;O<128;O++){if(O<int(1.*(Z+110.)))continue;float x=0.;float y=F(o+B);x=(A==1)?w-P(o+.5*g)*y:.7*w-P(o)*y;if(x>0.){u=x/128.;v*=1.-u*100.;if(v<=0.)break;}o+=c*0.078;}vec3 z=vec3(1.,.25,1./16.);v=clamp(v,0.,1.5);q+=z*exp(4.*(0.5-v)-0.8);r*=s;r+=(1.-s)*F(6.*c+0.3*iTime)*.1;fragColor=vec4(vec3(1.*q+0.8*r)*1.3,abs(0.67-s)*2.+4.*n);}void main(){k(fragColor,gl_FragCoord.xy);}"