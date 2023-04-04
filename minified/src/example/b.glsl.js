module.exports = "uniform vec2 resolution;uniform float time;out vec4 fragColor;\n#define iTime  time\n#define iResolution  resolution\n#define res  resolution\nfloat A;float B(vec3 C,vec3 D){vec3 E=abs(C)-D;return min(max(E.x,max(E.y,E.z)),0.)+length(max(E,0.));}void F(inout vec2 C,float G){C=cos(G)*C+sin(G)*vec2(C.y,-C.x);}float H(vec3 C){vec3 I=floor(C);C-=I;vec3 J=vec3(7,157,113);vec4 K=vec4(0.,J.yz,J.y+J.z)+dot(I,J);C=C*C*(3.-2.*C);K=mix(fract(sin(K)*43758.5),fract(sin(K+J.x)*43758.5),C.x);K.xy=mix(K.xz,K.yw,C.y);return mix(K.x,K.y,C.z);}float L(vec3 C){C.z-=1.;C*=0.9;F(C.yz,A*1.+0.4*C.x);return B(C+vec3(0,sin(1.6*time),0),vec3(20.,0.05,1.2))-.4*H(8.*C+3.*A);}vec3 M(vec3 N){float O=0.0001;float E=L(N);return normalize(vec3(L(N+vec3(O,0,0))-E,L(N+vec3(0,O,0))-E,L(N+vec3(0,0,O))-E));}float P(vec3 Q,vec3 R){float S=(L(Q)<0.)?-1.:1.;float T=.0001;float K=T*2.;float U=0.;for(int V=0;V<120;V++){if(abs(K)<T||U>12.)break;K=S*L(Q+R*U);U+=K;}return U;}float W(vec3 N,vec3 X,vec3 Y,vec3 Z,float a,out float b,out vec3 c){float K=0.;b=2.;vec3 d=refract(Y,Z,a);for(int V=0;V<50;V++){if(abs(K)>3.)break;K=L(N+d*b);b-=K;}c=M(N+d*b);return(.5*clamp(dot(-X,c),0.,1.)+pow(max(dot(reflect(d,c),X),0.),8.));}float e(vec3 Q,vec3 R){float f=1.;float U=.02;float K=0.;for(int V=0;V<22;V++){if(U>20.)continue;K=L(Q+R*U);f=min(f,4.*K/U);U+=K;}return f;}void g(out vec4 fragColor,in vec2 h){A=abs(fract(0.05*time)-.5)*20.;vec2 i=gl_FragCoord.xy/res.xy;vec2 C=i*2.-1.;float j=(fract(.1*(time-1.))>=0.9)?fract(-time)*0.1*sin(30.*time):0.;vec3 Y=normalize(vec3(2.*gl_FragCoord.xy-res.xy,res.y));vec3 k=vec3(0,2.*j,-3.);vec3 l=vec3(0.);vec3 m=vec3(0.);float U=P(k,Y);vec3 N=k+Y*U;vec3 Z=M(N);vec3 X=normalize(vec3(.2,6.,.5));float n=clamp((1.-0.09*U),0.,1.);vec3 o=vec3(0.);vec3 c=vec3(0.);if(U<12.){m=vec3(max(dot(X,Z),0.)+pow(max(dot(reflect(Y,Z),X),0.),16.));m*=clamp(e(N,X),0.,1.);float b;m.rgb+=W(N,X,Y,Z,0.9,b,c)*n;m-=clamp(.1*b,0.,1.);}float p=0.;float q=1.;float r=0.1*-sin(.209*time+1.)+0.05;for(int V=0;V<128;V++){float s=0.;float t=H(k+A);s=r-L(k+.5*c)*t;if(s>0.){p=s/128.;q*=1.-p*100.;if(q<=0.)break;}k+=Y*0.078;}vec3 u=vec3(1./1.,1./4.,1./16.);q=clamp(q,0.,1.5);l+=u*exp(4.*(0.5-q)-0.8);m*=n;m+=(1.-n)*H(6.*Y+0.3*time)*.1;fragColor=vec4(vec3(1.*l+0.8*m)*1.3,abs(0.67-n)*2.+4.*j);}void main(){g(fragColor,gl_FragCoord.xy);}"