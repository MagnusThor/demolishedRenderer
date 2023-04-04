module.exports = {sourceCode:"uniform vec2 resolution;uniform float time;uniform sampler2D iFFT;out vec4 fragColor;\n#define iTime  time\n#define iResolution  resolution\nint v=0;float A;void F(inout vec2 C,float G){C=cos(G)*C+sin(G)*vec2(C.y,-C.x);}float H(vec3 C){vec3 I=floor(C);C-=I;vec3 J=vec3(7,157,113);vec4 K=vec4(0.,J.yz,J.y+J.z)+dot(I,J);C=C*C*(3.-2.*C);K=mix(fract(sin(K)*43758.5),fract(sin(K+J.x)*43758.5),C.x);K.xy=mix(K.xz,K.yw,C.y);return mix(K.x,K.y,C.z);}float w(vec3 C){vec3 x=vec3(1,.75,.5);vec2 G=sin(vec2(0,1.57)+1.57/2.);vec2 D=sin(vec2(0,1.57)+1.57/4.);float J=5.;float E=1e5;C=abs(fract(C*.5)*2.-1.);float y=1./J;for(int V=0;V<5;V++){if(C.x<C.y)C.xy=C.yx;if(C.x<C.z)C.xz=C.zx;if(C.y<C.z)C.yz=C.zy;C=C*J+x*(1.-J);C.z-=step(C.z,x.z*(1.-J)*.5)*x.z*(1.-J);C=abs(C);E=min(E,max(max(C.x,C.y),C.z)*y);y/=J;if(V==2&&length(C.xy)>32.5)v=0;if(V==1&&length(C.xz)>7.14)v=0;}return E-0.29;}float L(vec3 C){float z=-0.05-w(.4*C);if(v==0)z+=0.002*H(C*70.);return z;}vec3 M(vec3 N){float O=0.01;float E=L(N);return normalize(vec3(L(N+vec3(O,0,0))-E,L(N+vec3(0,O,0))-E,L(N+vec3(0,0,O))-E));}float P(vec3 Q,vec3 R){float S=(L(Q)<0.)?-1.:1.;float T=.0001;float K=T*2.;float U=0.;for(int V=0;V<120;V++){if(abs(K)<T||U>12.)break;K=S*L(Q+R*U);U+=K;}return U;}float W(vec3 N,vec3 X,vec3 Y,vec3 Z,float a,out float b,out vec3 c){float K=0.;b=2.;vec3 d=refract(Y,Z,a);for(int V=0;V<50;V++){if(abs(K)>3.)break;K=L(N+d*b);b-=K;}c=M(N+d*b);return(.5*clamp(dot(-X,c),0.,1.)+pow(max(dot(reflect(d,c),X),0.),8.));}float e(vec3 Q,vec3 R){float f=1.;float U=.02;float K=0.;for(int V=0;V<22;V++){if(U>20.)continue;K=L(Q+R*U);f=min(f,4.*K/U);U+=K;}return f;}void g(out vec4 fragColor,in vec2 h){A=abs(fract(0.05*iTime)-.5)*20.;v=1;vec2 i=gl_FragCoord.xy/iResolution.xy;vec2 C=i*2.-1.;float j=(fract(.1*(iTime-1.))>=0.9)?fract(-iTime)*0.1*sin(30.*iTime):0.;vec3 Y=normalize(vec3(2.*gl_FragCoord.xy-iResolution.xy,iResolution.y));vec3 k=vec3(0,2.*j,-3.);vec2 AA=sin(vec2(0,1.57)+iTime/8.);Y.xy=mat2(AA.y,-AA.x,AA)*Y.xy;Y.xz=mat2(AA.y,-AA.x,AA)*Y.xz;k=vec3(0,2.+j,0.+8.*sin(A/3.));vec3 l=vec3(0.);vec3 m=vec3(0.);float U=P(k,Y);vec3 N=k+Y*U;vec3 Z=M(N);vec3 X=normalize(-N);float n=clamp((1.-0.09*U),0.,1.);vec3 o,c=vec3(0.);if(U<12.){m=vec3(max(dot(X,Z),0.)+pow(max(dot(reflect(Y,Z),X),0.),16.));m*=clamp(e(N,X),0.,1.);if(v==1){float b;m.r+=W(N,X,Y,Z,0.91,b,c)*n;m.g+=W(N,X,Y,Z,0.90,b,c)*n;m.b+=W(N,X,Y,Z,0.89,b,c)*n;m-=clamp(.1*b,0.,1.);}}float p=0.;float q=1.;float r=0.25;for(int V=0;V<128;V++){if(V<int(1.*(U+110.)))continue;float s=0.;float t=H(k+A);s=(v==1)?r-L(k+.5*c)*t:.7*r-L(k)*t;if(s>0.){p=s/128.;q*=1.-p*100.;if(q<=0.)break;}k+=Y*0.078;}vec3 u=vec3(1.,1./4.,1./16.);q=clamp(q,0.,1.5);l+=u*exp(4.*(0.5-q)-0.8);m*=n;m+=(1.-n)*H(6.*Y+0.3*iTime)*.1;fragColor=vec4(vec3(1.*l+0.8*m)*1.3,abs(0.67-n)*2.+4.*j);}void main(){g(fragColor,gl_FragCoord.xy);}",uniforms:{resolution:{variableType:"vec2",variableName:"resolution"},time:{variableType:"float",variableName:"time"},iLogo:{variableType:"sampler2D",variableName:"iLogo"},iFFT:{variableType:"sampler2D",variableName:"iFFT"},sI:{variableType:"float",variableName:"sI"},iChannel0:{variableType:"sampler2D",variableName:"iChannel0"},iChannel1:{variableType:"sampler2D",variableName:"iChannel1"},iChannel2:{variableType:"sampler2D",variableName:"iChannel2"},iChannel3:{variableType:"sampler2D",variableName:"iChannel3"},iChannel4:{variableType:"sampler2D",variableName:"iChannel4"},iChannel5:{variableType:"sampler2D",variableName:"iChannel5"},iChannels:{variableType:"sampler2D",variableName:"iChannels"}},consts:{}}