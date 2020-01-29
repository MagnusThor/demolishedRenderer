import { DR } from "../src/DR";


export class Example {

        static run() {

                let player: DR;


                const vertex = `layout(location = 0) in vec2 pos; 
        out vec4 fragColor;
        void main() { 
            gl_Position = vec4(pos.xy,0.0,1.0);
        }`;

                //var _kali = "uniform float time;uniform vec2 mouse,resolution;vec3 v=vec3(0.);float i;void f(vec2 v){i=fract(sin(dot(v,vec2(113.421,17.329)))*3134.12);}float f(){return fract(sin(i++)*3143.45);}float n(vec3 f){const vec3 i=vec3(.63248,.78632,.875);float r=1.;for(int m=0;m<5;m++){f=2.*clamp(f,-i,i)-f;float n=max(.70968/dot(f,f),1.);f*=n;r*=n;}if(v.r>=0.)v+=abs(f);float m=length(f.rg);return max(m-.92784,abs(m*f.b)/length(f))/r;}float s(vec3 v){return n(v);}vec3 t(in vec3 v){vec2 f=vec2(1.,-1.)*.5773*.0005;return normalize(f.rgg*s(v+f.rgg)+f.ggr*s(v+f.ggr)+f.grg*s(v+f.grg)+f.rrr*s(v+f.rrr));}vec3 p(in vec3 v){return t(v);}mat2 x(float v){return mat2(cos(v),sin(v),-sin(v),cos(v));}mat3 f(in vec3 v,in vec3 f,in float i){vec3 m=normalize(f-v),s=normalize(cross(m,vec3(sin(i),cos(i),0.))),d=normalize(cross(s,m));return mat3(s,d,m);}void n(out vec3 v,out vec3 f,in float m){float i=.3*m+10.;v=vec3(2.772*sin(i),.424,.82*cos(i));f=vec3(1.,0.,-.03);}float f(in vec3 v,in vec3 f){const float m=20.,i=.001;float r=i*2.,n=0.,d=-1.;for(int b=0;b<128;b++){if(r<i||n>m)break;r=s(v+f*n);n+=r;}if(n<m)d=n;return d;}vec3 m(float v){return vec3(cos(v),sin(v),-.65+abs(sin(v*.7))*.25)*(2.+sin(v*1.7)*.5)+vec3(0.,0.,1.);}vec3 e(vec3 v){return v;}vec4 e(vec3 i,vec3 r,float n,float b,float g){f(gl_FragCoord.rg+b);vec3 d=m(b+1.),c;d.b+=n;i.b-=n;float a=s(i)*.8,o=a*f(),u=a,p=1.,x=0.;vec4 l=vec4(0.,0.,0.,1.),z,h=vec4(-1.);for(int C=0;C<99;C++){if(u>o+x)c=i+r*(o+x),c+=(d-c)*-c.b/(d.b-c.b);else c=i+r*o;a=s(c);if(u>o+x){float k=.05*length(i+r*(o+x)-d);l.rgb+=l.a*vec3(1.,1.,.7)*exp(-k*40.)*smoothstep(0.,.01,a);if(o+x+k>u){x=0.;o=u;if(o>20.)break;}else x+=k;}else{if(a<p&&h.a<0.){float k=clamp(a/(g*o),0.,1.);if(k<.95)z=vec4(k,z.rgb),h=vec4(o,h.rgb),l.a*=k;}p=a;u=o+a*(.6+.2*f());}}vec3 k=vec3(0.);for(int C=0;C<4;C++){if(h.r<0.)continue;v=vec3(0.);c=i+r*h.r;vec3 F=t(c),D=d-c,w;v=sin(v)*.3+vec3(.8,.6,.4);float Z=exp(-dot(D,D)*.2);c+=D*-c.b/D.b;D=normalize(D);w=Z*v*max(0.,dot(F,D));float Y=max(0.,dot(F,-r));w+=exp(-o)*v*Y;a=smoothstep(0.,.005,s(c));w+=Z*vec3(2.,2.,1.7)*max(0.,dot(F,D))*a;if(r.b<0.&&a>0.)w+=Z*vec3(4.,3.,1.4)*pow(max(0.,dot(reflect(r,F),D)),5.)*(1.-.25*Y)*a;k=mix(w,k,z.r);z=z.gbar;h=h.gbar;}l.rgb=clamp(l.rgb+k,0.,1.);return vec4(e(l.rgb),o);}out vec4 fragColor;void main(){float v,i,d,c=i=.3;vec2 m=gl_FragCoord.rg/resolution.rg+mouse/4.;vec3 s,r;n(s,r,time*.1);v=mod(time,18.85);mat3 a=f(s,r,0.);vec3 k=normalize(a*vec3(m.rg,3.5));vec4 b=e(s,k,.3,v*.12,3./resolution.g);fragColor=b;}";
                // var fractal = "uniform sampler2D iChannel0; uniform float time;uniform vec2 mouse,resolution;vec3 v=normalize(vec3(-1.,1,-.5));const float m=2e-05;float f=0.;float s(vec3 v){vec3 f=v;v=abs(1.-mod(v,2.));float r=0.,g=8.,c=1.;vec3 i=v;for(int m=0;m<7;m++){f=-1.+2.*fract(.5*f+.5);float t=dot(f,f);r=length(i);if(r>1.616)break;float n=acos(i.b/r),a=atan(i.g,i.r);c=pow(r,g-1.)*g*c+1.;float e=pow(r,g);n=n*g;a=a*g;i=e*vec3(sin(n)*cos(a),sin(a)*sin(n),cos(n));i+=v;}return.5*log(r)*r/c;}float t(vec3 v){float r=1.,i=0.;vec3 m=v,c=m;for(int f=0;f<6;f++)m=max(m=abs(mod(c*r+1.,2.)-1.),m.gbr),i=max(i,(.3-length(m*.95)*.3)/r),r*=2.;return i;}float n(vec3 v){return min(t(v),s(v));}vec3 x(in vec3 v){vec2 i=vec2(1.,-1.)*.5773*.0005;return normalize(i.rgg*n(v+i.rgg)+i.ggr*n(v+i.ggr)+i.grg*n(v+i.grg)+i.rrr*n(v+i.rrr));}float n(in vec3 v,in vec3 r){float i=0.,c=.05,m;for(int f=0;f<4;f++)m=n(v+r*c),i=min(6.*m/c,i),c+=m;return max(i,0.);}float s(const vec3 v,const vec3 r){float i=m*80.,f=0.,c=10.;for(int g=0;g<5;g++){float t=i+i*float(g*g);vec3 a=r*t+v;float s=n(a);f+=-(s-t)*c;c*=.75;}return clamp(1.-5.*f,0.,1.);}float e(vec3 v){v=abs(.5-fract(v*80.));float f,i=f=0.;for(int m=0;m<13;m++){float r=i;i=length(v);v=abs(v)/dot(v,v)-.5;f+=exp(-1./abs(i-r));}return f;}vec3 e(in vec3 i,in vec3 r){vec3 f=x(i);float m=min(5.,n(i,v)),c=s(i,f),g=max(0.,dot(v,-f))*m*1.3,a=max(.2,dot(r,-f))*.4;vec3 t=reflect(v,f);float w=pow(max(0.,dot(r,-t))*m,10.)*(.5+c*.5),d=e(i)*.18;vec3 p=mix(vec3(d*1.1,d*d*1.3,d*d*d),vec3(d),.45)*2.;p=p*c*(a*vec3(.9,.85,1.)+g*vec3(1.,.9,.9))+w*vec3(1,.9,.5)*.7;return p;}vec3 t(in vec3 v,in vec3 r){vec3 i,c;float g=0.,d=0.,a=0.;for(int t=0;t<128;t++){c=v+g*r;float p=.001*g;a=n(v+r*g);f=m*(1.+g*55.);if(a<.0002)break;g+=a;}vec3 t=vec3(.5);i=e(c-f*r*1.5,r);i*=vec3(1.,.85,.8)*.9;i=mix(i,t,1.-exp(-1.3*pow(g,1.3)));return i;}vec3 r(float v){vec2 i=600.*vec2(cos(1.4+.37*v),cos(3.2+.31*v));return vec3(i.r,0.,i.g);}float w(vec2 v){return fract(sin(dot(v,vec2(12.9898,78.233)))*33758.5)-.5;}vec3 r(vec3 v,vec2 r){return v=pow(v,vec3(.57)),v=mix(vec3(.5),mix(vec3(dot(vec3(.2125,.7154,.0721),v*1.2)),v*1.2,1.3),1.4),v;}out vec4 fragColor;float c[16];void main(){vec2 v=gl_FragCoord.rg/resolution.rg-.5;float i=time*.5;vec2 f=v*vec2(1.75,1.);vec3 m=r(i*.001),c=r(i+2.);float a=.4*cos(.4*i);vec3 g=normalize(c-m),d=vec3(sin(a),cos(a),0.),n=normalize(cross(g,d)),s=normalize(cross(n,g)),p=normalize(f.r*n+f.g*s+.6*g),e=t(m,p);e=r(e,f);vec4 oo = texture(iChannel0,vec2(0));fragColor=vec4(e,1.);}";

//                 var fragment = `uniform float time;uniform vec2 mouse,resolution;uniform sampler2D iChannel0,iChannel1,iChannel2,iChannel3,iChannel4,fft;out vec4 fragColor;
// #define RAY_STEPS 100
// #define SHADOW_STEPS 50
// #define LIGHT_COLOR vec3(1.,.97,.93)
// #define AMBIENT_COLOR vec3(.75,.65,.6)
// #define SPECULAR 0.65
// #define DIFFUSE 1.0
// #define AMBIENT 0.35
// #define BRIGHTNESS 1.5
// #define GAMMA 1.35
// #define SATURATION.8
// #define detail.00004
// #define t time*.2
// vec3 lightdir=normalize(vec3(.1,-.15,-1.));const vec3 origin=vec3(-1.,.2,0.);float det=0.;vec3 pth1;mat2 rot(float v){return mat2(cos(v),sin(v),-sin(v),cos(v));}vec4 formula(vec4 v){return v.rb=abs(v.rb+1.)-abs(v.rb-1.)-v.rb,v=v*2./clamp(dot(v.rgb,v.rgb),.15,1.)-vec4(.5,.5,.8,0.),v.rg*=rot(.5),v;}float screen(vec3 v){float m=length(v.gb-vec2(.25,0.))-.5,i=length(v.gb-vec2(.25,2.))-.5;return min(max(m,abs(v.r-.3)-.01),max(i,abs(v.r+2.3)-.01));}vec2 de(vec3 v){float r=0.;vec3 m=v;m.b=abs(2.-mod(m.b,4.));vec4 i=vec4(m,1.5);float c=max(0.,.35-abs(v.g-3.35))/.35;
// #ifdef LESSDETAIL
// for(int f=0;f<6;f++)i=formula(i);float f=max(-m.r-4.,(length(max(vec2(0.),i.gb-2.))-.5)/i.a);
// #else
// for(int b=0;b<8;b++)i=formula(i);float d=max(-m.r-4.,length(max(vec2(0.),i.gb-3.))/i.a);
// #endif
// float b=screen(m),l=min(b,d);if(abs(l-b)<.001)r=1.;return vec2(l,r);}vec2 colorize(vec3 v){v.b=abs(2.-mod(v.b,4.));float m,i=m=0.,r=1000.;for(int f=0;f<15;f++){v=formula(vec4(v,0.)).rgb;float b=i;i=length(v);m+=exp(-10./abs(i-b));r=min(r,abs(i-3.));}return vec2(m,r);}vec3 path(float v){vec3 r=vec3(sin(v)*2.,(1.-sin(v*.5))*.5,-cos(v*.25)*30.)*.5;return r;}vec3 normal(vec3 v){vec3 m=vec3(0.,det,0.);return normalize(vec3(de(v+m.grr).r-de(v-m.grr).r,de(v+m.rgr).r-de(v-m.rgr).r,de(v+m.rrg).r-de(v-m.rrg).r));}float shadow(vec3 v,vec3 r){float m=1.,i=2.*det,f=10.;for(int b=0;b<SHADOW_STEPS;b++){if(i<1.&&f>detail){vec3 l=v-i*r;f=de(l).r;m=min(m,max(50.*f/i,0.));i+=max(.01,f);}}return clamp(m,.1,1.);}float calcAO(const vec3 v,const vec3 m){float r=detail*40.,f=0.,i=13.;for(int b=0;b<5;b++){float d=r*float(b*b);vec3 l=m*d+v;float c=de(l).r;f+=-(c-d)*i;i*=.7;}return clamp(1.-5.*f,0.,1.);}vec3 light(in vec3 v,in vec3 m,in vec3 r,in float i){float b=shadow(v,lightdir),f=calcAO(v,r),d=max(0.,dot(lightdir,-r))*b*DIFFUSE;vec3 l=max(.5,dot(m,-r))*AMBIENT*AMBIENT_COLOR,a=reflect(lightdir,r);float c=pow(max(0.,dot(m,-a))*b,15.)*SPECULAR;vec3 p;vec2 s=colorize(v);if(i>.5)p=vec3(1.),c=c*c;else{float g=pow(s.r*.11,2.);p=mix(vec3(g,g*g,g*g),vec3(g),.5)+.1;p+=pow(max(0.,1.-s.g),5.)*.3;}p=p*f*(l+d*LIGHT_COLOR)+c*LIGHT_COLOR;if(i>.5){vec3 n=v;n.b=abs(1.-mod(n.b,2.));vec3 g=texture(iChannel0,mod(1.-v.bg-vec2(.4,.2),vec2(1.))).rgb*2.;p+=g*abs(.01-mod(v.g-time*.1,.02))/.01*f;p*=max(0.,1.-pow(length(n.gb-vec2(.25,1.)),2.)*3.5);}else{vec3 g=texture(iChannel0,mod(v.br*2.+vec2(.5),vec2(1.))).rgb;g*=abs(.01-mod(v.r-time*.1*sign(v.r+1.),.02))/.01;p+=pow(s.r,10.)*3e-10*g;p+=pow(max(0.,1.-s.g),4.)*pow(max(0.,1.-abs(1.-mod(v.b+time*2.,4.))),2.)*vec3(1.,.8,.4)*4.*max(0.,.05-abs(v.r+1.))/.05;}return p;}vec3 raymarch(in vec3 v,in vec3 m){float r,i,b=r=0.;vec2 f=vec2(1.,0.);vec3 l,c=vec3(0.);for(int p=0;p<RAY_STEPS;p++){if(f.r>det&&b<30.){l=v+b*m;f=de(l);det=detail*(1.+b*50.);b+=f.r;if(f.r<.015)r+=max(0.,.015-f.r)*exp(-b);}}float g=max(0.,dot(normalize(-m),normalize(lightdir)));vec3 d=vec3(max(0.,-m.g+.6))*AMBIENT_COLOR*.5*max(.4,g);if(f.r<det||b<30.){l=l-abs(f.r-det)*m;vec3 p=normal(l);c=light(l,m,p,f.g);c=mix(c,d,1.-exp(-.15*pow(b,1.5)));}else{c=d;vec3 p=(m*3.+vec3(1.3,2.5,1.25))*.3;for(int n=0;n<13;n++)p=abs(p)/dot(p,p)-.9;c+=min(1.,pow(min(5.,length(p)),3.)*.0025);}vec3 p=LIGHT_COLOR*pow(g,25.)*.5;c+=r*(.5+g*.5)*LIGHT_COLOR*.7;c+=p*exp(min(30.,b)*.02);return c;}vec3 move(inout vec3 v){vec3 m=path(t),i=path(t+.7);float r=de(i).r;vec3 f=normalize(i-m);float b=i.r-m.r;b*=min(1.,abs(i.b-m.b))*sign(i.b-m.b)*.7;v.rg*=mat2(cos(b),sin(b),-sin(b),cos(b));b=f.g*1.7;v.gb*=mat2(cos(b),sin(b),-sin(b),cos(b));b=atan(f.r,f.b);v.rb*=mat2(cos(b),sin(b),-sin(b),cos(b));return m;}void main(){pth1=path(t+.3)+origin;vec2 v=gl_FragCoord.rg/resolution.rg*2.-1.;v.g*=resolution.g/resolution.r;vec3 b=normalize(vec3(v*.8,1.)),i=origin+move(b),m=raymarch(i,b);m=clamp(m,vec3(0.),vec3(1.));m=pow(m,vec3(GAMMA))*BRIGHTNESS;m=mix(vec3(length(m)),m,SATURATION);fragColor=vec4(m,1.);}
// `;



        let fragment = `uniform float time;
        uniform vec2 resolution;
        
        uniform float sT;
        uniform int sC; // use for controlling , cb - controllBits(n)
        uniform int sI;
        uniform float sP;
        
        uniform sampler2D iChannel0;
        uniform sampler2D iChannel1;


        #define zoom   0.800
        #define tile   0.350
        #define speed  0.010 

        #define brightness 0.0015
        #define darkmatter 0.300
        #define distfading 0.730
        #define saturation 0.850
        
        out vec4 fragColor;

        vec3 hash33(vec3 p3){
            p3 = fract(p3 * vec3(.1031,.11369,.13787));
            p3 += dot(p3, p3.yxz+19.19);
            return -1.0 + 2.0 * fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
        }
        vec2 cart2polar(vec2 cart) {
            return vec2(atan(cart.y, cart.x), length(cart));
        }
        float noise(float t){
            return texture(iChannel1,vec2(t,.0)*512.).x;
        }
        float noise(vec2 t){
            return texture(iChannel1,t*512.).x;
        }
        vec3 cc(vec3 color, float factor,float factor2){
            return color;
            float w = color.x+color.y+color.z;
            return mix(color,vec3(w)*factor,w*factor2);
        }        
        float sat(float x) {
            return clamp(x, 0., 1.);
        }        
        // controlBits 
        float cb(int n) {
            return float((sC >> n) & 1);
        }
        // fractals
        float map(vec3 p) {
            return length(p) - 1.0;
        }
        
        // optimize, generic one...
        vec3 normal( in vec3 pos) {
            const float eps = 0.002; // precision of the normal computation
            const vec3 v1 = vec3(1.0, -1.0, -1.0);
            const vec3 v2 = vec3(-1.0, -1.0, 1.0);
            const vec3 v3 = vec3(-1.0, 1.0, -1.0);
            const vec3 v4 = vec3(1.0, 1.0, 1.0);
        
            return normalize(v1 * map(pos + v1 * eps) +
                v2 * map(pos + v2 * eps) +
                v3 * map(pos + v3 * eps) +
                v4 * map(pos + v4 * eps));
        }
        
        // Ray's 128, needs to controlled..
        float raymarch( in vec3 ro, in vec3 rd) {
            const float maxd = 20.0;
            const float precis = 0.001;
            float h = precis * 2.0;
            float t = 0.0;
            float res = -1.0;
            for (int i = 0; i < 128; i++) {
                if (h < precis || t > maxd) break;
                h = map(ro + rd * t);
                t += h;
            }
            if (t < maxd) res = t;
            return res;
        }
        
        vec3 doMaterial( in vec3 pos, in vec3 nor) {
            vec3 col = vec3(0.);         
            if(sI == 2){ // set the material to yellow in first scene
                col = vec3(0.2, 0.07, 0.01);
            }else // make it a blue tone otherwise.
            {
                col = vec3(0.163,0.142,0.500);
            }
            return col;            
        }
        
        float calcSoftshadow( in vec3 ro, in vec3 rd) {
            float res = 1.0;
            float t = 0.0005; // selfintersection avoidance distance
            float h = 1.0;
            for (int i = 0; i < 40; i++) // 40 is the max numnber of raymarching steps
            {
                h = map(ro + rd * t);
                res = min(res, 64.0 * h / t); // 64 is the hardness of the shadows
                t += clamp(h, 0.02, 2.0); // limit the max and min stepping distances
            }
            return clamp(res, 0.0, 1.0);
        }
        
        vec3 doLighting( in vec3 pos, in vec3 nor, in vec3 rd, in float dis, in vec3 mal) {
            vec3 lin = vec3(0.0);        
            // key light
            //-----------------------------
            vec3 lig = normalize(vec3(1.0, 0.7, 0.9));
            float dif = max(dot(nor, lig), 0.0);
            float sha = 0.0;
            if (dif > 0.01) sha = calcSoftshadow(pos + 0.01 * nor, lig);
            lin += dif * vec3(4.00, 4.00, 4.00) * sha;        
            // ambient light
            //-----------------------------
            lin += vec3(0.50, 0.50, 0.50);            
            // surface-light interacion
            //-----------------------------
            vec3 col = mal * lin;       
            // fog    
            //-----------------------------
            col *= exp(-0.01 * dis * dis);
        
            return col;
        }

                
        void doCamera(out vec3 camPos, out vec3 camTar, in float time, in float mouseX) {
            float an = 0.3 * time + 10.0 * mouseX;
            camPos = vec3(2.772 * sin(an), 0.424, 2.820 * cos(an));
            camTar = vec3(0.000, .000, 0.000);
        }
        mat3 calcLookAtMatrix( in vec3 ro, in vec3 ta, in float roll) {
            vec3 ww = normalize(ta - ro);
            vec3 uu = normalize(cross(ww, vec3(sin(roll), cos(roll), 0.0)));
            vec3 vv = normalize(cross(uu, ww));
            return mat3(uu, vv, ww);
        }

        // scene X

        vec3 lensflare(vec2 uv,vec2 pos)
        {
            vec2 main = uv-pos;
            vec2 uvd = uv*(length(uv));
            
            float ang = atan(main.y, main.x);
            float dist=length(main); dist = pow(dist,.1);
            float n = noise(vec2((ang-time/9.0)*16.0,dist*32.0));
            
            float f0 = 1.0/(length(uv-pos)*16.0+1.0);
            
            f0 = f0+f0*(sin((ang+time/18.0 + noise(abs(ang)+n/2.0)*2.0)*12.0)*.1+dist*.1+.8);
        
            float f2 = max(1.0/(1.0+32.0*pow(length(uvd+0.8*pos),2.0)),.0)*00.25;
            float f22 = max(1.0/(1.0+32.0*pow(length(uvd+0.85*pos),2.0)),.0)*00.23;
            float f23 = max(1.0/(1.0+32.0*pow(length(uvd+0.9*pos),2.0)),.0)*00.21;
            
            vec2 uvx = mix(uv,uvd,-0.5);
            
            float f4 = max(0.01-pow(length(uvx+0.4*pos),2.4),.0)*6.0;
            float f42 = max(0.01-pow(length(uvx+0.45*pos),2.4),.0)*5.0;
            float f43 = max(0.01-pow(length(uvx+0.5*pos),2.4),.0)*3.0;
            
            uvx = mix(uv,uvd,-.4);
            
            float f5 = max(0.01-pow(length(uvx+0.2*pos),5.5),.0)*2.0;
            float f52 = max(0.01-pow(length(uvx+0.4*pos),5.5),.0)*2.0;
            float f53 = max(0.01-pow(length(uvx+0.6*pos),5.5),.0)*2.0;
            
            uvx = mix(uv,uvd,-0.5);
            
            float f6 = max(0.01-pow(length(uvx-0.3*pos),1.6),.0)*6.0;
            float f62 = max(0.01-pow(length(uvx-0.325*pos),1.6),.0)*3.0;
            float f63 = max(0.01-pow(length(uvx-0.35*pos),1.6),.0)*5.0;
            
            vec3 c = vec3(.0);
            
            c.r+=f2+f4+f5+f6; c.g+=f22+f42+f52+f62; c.b+=f23+f43+f53+f63;
            c+=vec3(f0);
            
            return c;
        }

        // scene Volumetric stars + lens

        vec3 volclouds(vec2 uv){

            uv.y*=resolution.y/resolution.x;
    
            vec3 dir=vec3(uv*zoom,1.);
            
            float tm=time*speed+.025;

            float a1= 0.;
            float a2=.8;
            
            mat2 rot1=mat2(cos(a1),sin(a1),-sin(a1),cos(a1));
            mat2 rot2=mat2(cos(a2),sin(a2),-sin(a2),cos(a2));
            dir.xz*=rot1;
            dir.xy*=rot2;
            vec3 from=vec3(1.,.5,0.5);
            from+=vec3(tm*2.,tm,-2.);
            from.xz*=rot1;
            from.xy*=rot2;
            
            //volumetric rendering
            float s=0.1,fade=1.;
            vec3 v=vec3(0.);
            
            for (int r=0; r<20; r++) {
                vec3 p=from+s*dir*.5;
                p = abs(vec3(tile)-mod(p,vec3(tile*2.))); //  fold
                float pa,a=pa=0.;
                for (int i=0; i<17; i++) {             
                    p=abs(p)/dot(p,p)-.53; 
                    a+=abs(length(p)-pa); 
                    pa=length(p);
                }
                float dm=max(0.,0.300-a*a*.001); 
                a*=a*a; // add contrast        
                if (r>6) fade*=1.-dm; 		
                v+=vec3(dm,dm*.5,0.);        
                v+=fade;
                v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; 
                fade*=distfading; 
                s+=0.1;
            }
            
            v=mix(vec3(length(v)),v,saturation); 
            
            vec2 lp = vec2(-0.580,0.170);
            
            vec3 lens =  vec3(1.053,1.131,1.400)*lensflare(uv / .55+sin(time)*0.01,lp); 
            
            lens = cc(lens,1.0,.1);
            
            return mix(lens,v*0.01,0.2);

        }       

        // scene 2
        vec3 galaxy(vec2 uv){

            float t = time * .1 + ((.25 + .05 * sin(time * .1))/(length(uv.xy) + .07)) * 2.2;
            float si = sin(t);
            float co = cos(t);
            mat2 ma = mat2(co, si, -si, co);
        
            float v1, v2, v3;
            v1 = v2 = v3 = 0.0;
            
            float s = 0.0;
            for (int i = 0; i < 90; i++){
                vec3 p = s * vec3(uv, 0.0);
                p.xy *= ma;
                p += vec3(.22, .3, s - 1.5 - sin(time * .13) * .1);
                for (int i = 0; i < 8; i++)	p = abs(p) / dot(p,p) - 0.659;
                v2 += dot(p,p) * .0013 * (1.5 + sin(length(uv.xy * 14.5) + 1.2 - time * .3));
                v3 += length(p.xy*10.) * .0003;
                s  += .035;
            }
            
            float len = length(uv);
            v1 *= smoothstep(.7, .0, len);
            v2 *= smoothstep(.5, .0, len);
            v3 *= smoothstep(.9, .0, len);
            
            vec3 col = vec3( v3 * (1.5 + sin(time * .2) * .4),
                            (v1 + v3) * .3,
                             v2) + smoothstep(0.2, .0, len) * .85 + smoothstep(.0, .6, v3) * .3;	
                            
            return min(pow(abs(col), vec3(1.2)), 1.0);				
        }
        

        vec3 doBackground(vec3 p){
            return vec3(0.);
        }

        vec3 scenes(vec2 uv){
           
            vec3 col = doBackground(vec3(0.));

            return volclouds(uv);

            if(sI ==2){
                col = galaxy(uv);
            }else if(sI ==4){

                col = volclouds(uv);

            }            
            else{
                vec3 ro, ta;
                    doCamera(ro, ta, time, 0.);
                
                mat3 camMat = calcLookAtMatrix(ro, ta, 0.0); // 0.0 is the camera roll            
                
                vec3 rd = normalize(camMat * vec3(uv.xy, 2.0)); // 2.0 is the lens length
                float t = raymarch(ro, rd);

                if (t > -0.5) {
                    vec3 pos = ro + t * rd;
                    vec3 nor = normal(pos);
            
                    vec3 mal = doMaterial(pos, nor);
            
                    col = doLighting(pos, nor, rd, t, mal);
                }   

            }
           
            return col;
        }


        void main() {
        
            vec2 uv = (-resolution.xy + 2. * gl_FragCoord.xy) / resolution.y;
               
            vec3 scol = scenes(uv);
           
            // Scene fade using progress & controlbits        
          ///  scol = clamp(scol, 0., 1.) * sat(cb(14) + 15. * sP) * sat(cb(13) + 5. - 5. * sP);
        
            fragColor = vec4(scol, 1);
        
        }`;


                // const fragmentA = `uniform float time;
                // uniform vec2 resolution;
                // out vec4 fragColor;
                // void main(){
                //         vec2 position = ( gl_FragCoord.xy / resolution.xy )  / 4.0;
                //         vec3 col = vec3(.0,0.,1.0);
                //         fragColor = vec4(col,1.0);                                        

                // }`;

                // const f = `uniform float time;
                // uniform vec2 resolution;
                // uniform sampler2D iChannel0;
                // out vec4 fragColor;
                // void main(){
                //         vec2 uv = gl_FragCoord.xy / resolution.xy*2.-1.;    
                //         fragColor = texture(iChannel0,uv);                                             
                // }`;

                // const fragmentB = `uniform float time;
                // uniform vec2 resolution;
                // out vec4 fragColor;
                // void main(){
                //         vec2 position = ( gl_FragCoord.xy / resolution.xy )  / 4.0;
                //         vec3 col = vec3(cos(time)*1.0,sin(time)*1.,0.0);

                //         fragColor = vec4(col,1.0);                                        

                // }`;


                // main
                let mainVertex = `layout(location = 0) in vec2 pos; 
        out vec4 fragColor;                
        void main() { 
            gl_Position = vec4(pos.xy,0.0,1.0);
        }`;

                let mainFragment = `uniform float time;
        uniform vec2 resolution;
        uniform sampler2D bufferA;
        out vec4 fragColor;
        
        float rand2d(vec2 co) {
                return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
            }
            
            float rand(float n) {
                return fract(sin(n) * 43758.5453123);
            }
            
            float noise(float p) {
                    float fl = floor(p);
                      float fc = fract(p);
                    return mix(rand(fl), rand(fl + 1.0), fc);
            }
            
            float map(float val, float amin, float amax, float bmin, float bmax) {
                float n = (val - amin) / (amax-amin);
                float m = bmin + n * (bmax-bmin);
                return m;
            }
            
            float snoise(float p){
                return map(noise(p),0.0,1.0,-1.0,1.0);
            }
            
            float threshold(float val,float cut){
                float v = clamp(abs(val)-cut,0.0,1.0);
                v = sign(val) * v;
                float scale = 1.0 / (1.0 - cut);
                return v * scale;
            }

            #define CURVE 
            #define SCANS
            #define FLICKS
            //#define GRAINS 
            #define YBUG 
            #define DIRTY
            //#define STRIP
            //#define COLOR
            #define BLINK
            #define VIG
            
            float FREQUENCY = 11.0;
            
            vec2 uv_curve(vec2 uv) {
                    uv = (uv - 0.5) * 2.0;
                    uv *= 1.2;	
                    uv.x *= 1.0 + pow((abs(uv.y) / 5.0), 2.0);
                    uv.y *= 1.0 + pow((abs(uv.x) / 4.0), 2.0);
                uv /= 1.15;
                    uv  = (uv / 2.0) + 0.5;
                    return uv;
            }
            
            vec3 color(sampler2D tex, vec2 uv){        
                vec3 color = texture(bufferA,uv).rgb;
                #ifdef COLOR
                float bw = (color.r + color.g + color.b) / 3.0;
                color = mix(color,vec3(bw,bw,bw),.95);
                float p = 1.5;
                color.r = pow(color.r,p);
                color.g = pow(color.g,p-0.1);
                color.b = pow(color.b,p);
                #endif
                return color;
            }
            
            vec3 ghost(sampler2D tex, vec2 uv){
                #ifdef FLICKS
                
                float n1 = threshold(snoise(time*10.),.85);
                float n2 = threshold(snoise(2000.0+time*10.),.85);
                float n3 = threshold(snoise(3000.0+time*10.),.85);
                
                vec2 or = vec2(0.,0.);
                vec2 og = vec2(0,0.);
                vec2 ob = vec2(0.,0);
            
                float os = .05;
                or += vec2(n1*os,0.);
                og += vec2(n2*os,0.);
                ob += vec2(0.,n3*os);
              
                float r = color(bufferA,uv + or).r;
                float g = color(bufferA,uv + og).g;
                float b = color(bufferA,uv + ob).b;
                vec3 color = vec3(r,g,b);
                return color;
                #else 
                return texture(bufferA,uv).rgb;
                #endif
            }
            
            vec2 uv_ybug(vec2 uv){
                float n4 = clamp(noise(200.0+time*2.)*14.,0.,2.);
                uv.y += n4;
                uv.y = mod(uv.y,1.);
                return uv;
            }
            
            vec2 uv_hstrip(vec2 uv){
                float vnoise = snoise(time*6.);
                float hnoise = threshold(snoise(time*10.),.5);
            
                float line = (sin(uv.y*10.+vnoise)+1.)/2.;
                line = (clamp(line,.9,1.)-.9)*10.;
                
                uv.x += line * 0.03 * hnoise;
                uv.x = mod(uv.x,1.);
                return uv;
            }
            
            

                  
        void main(){                


                float t = float(int(time * FREQUENCY));
    
                vec2 uv = gl_FragCoord.xy / resolution.xy;
                                
                #ifdef CURVE
                uv = uv_curve(uv);
                #endif
            
                vec2 ouv = uv;
                
                #ifdef GRAINS
                float xn = threshold(snoise(time*10.),.7) * 0.05;
                float yn = threshold(snoise((500.0+time)*10.),.7) * 0.05;
                
                float r = rand2d(uv+(t+100.0)*.01);
                uv = uv + vec2(xn,yn) * r;
                #endif
                
                 
                #ifdef YBUG
                uv = uv_ybug(uv);
                #endif
            
                #ifdef STRIP
                uv = uv_hstrip(uv);
                #endif
                
               
                vec2 onePixel = vec2(0.0, 1.0) / resolution.xy * 3.;
                #ifdef BLUR
                vec3 colorA = ghost(bufferA,uv + onePixel,or,og,ob);
                vec3 colorB = ghost(bufferA,uv - onePixel,or,og,ob);
                vec3 colorC = ghost(bufferA,uv,or,og,ob);
                vec3 color = (colorA+colorB+colorC)/3.0;
                #else
                vec3 color = ghost(bufferA,uv);
                #endif
            
                //color = colorC;
                
                float scanA = (sin(uv.y*3.1415*resolution.y/2.7)+1.)/2.;
                float scanB = (sin(uv.y*3.1415*1.)+1.)/2.;
                #ifdef SCANS
                color *= .75 + scanA * .25;
                //color *= .5 + scanC * .5;
                //color *= scanB;    
                #endif
                
                #ifdef BLINK
                float blink = .96 + .04*(sin(time*100.)+1.)/2.;
                color *= blink;
                #endif
                
                #ifdef VIG
                float vig = 44.0 * (ouv.x * (1.0-ouv.x) * ouv.y * (1.0-ouv.y));
                    vig *= mix( 0.7, 1.0, rand(t + 0.5));
                color *= .6 + .4*vig;
                #endif
                 
                #ifdef DIRTY
                color *= 1.0 + rand2d(uv+t*.01) * 0.2;	
                #endif
            
                vec3 backColor = vec3(.4,.4,.4);
                if (ouv.x < 0.0 || ouv.x > 1.0)
                            color = backColor;
                    if (ouv.y < 0.0 || ouv.y > 1.0)
                            color = backColor;
            
                fragColor = vec4(color,1.0);
             
        }`;
                let canvas = document.querySelector("#main") as HTMLCanvasElement;
                // canvas.width = innerWidth; canvas.height = innerHeight;

                const customUniforms = {
                    "seqTime": (l,gl,p,t) =>{ // total time relative to sequence
                        gl.uniform1f(l,1);
                    },
                    "seqCode": (l,gl,p,t) =>{ // seqCode
                        gl.uniform1i(l,32784);
                    },
                    "sProg": (l,gl,p,t) =>{ // scene progress
                        gl.uniform1f(l,0.05);
                    },
                };

                player = new DR(canvas, mainVertex, mainFragment);
                // add textures to textureCache, create buffers -> passed as textures to main (mainVertex,mainFragment)
                player.aA({
                        iChannel0: {
                                src: "assets/iChannel0.png"
                        }
                }, () => {
                        player.aB("bufferA", vertex, fragment, ["iChannel0"]).run(0,customUniforms);
                        //.addBuffer("bufferB", vertex, fragmentB);
                        
                    
                    
                });


        }

}



setTimeout(() => {

        Example.run();


        // Compress into binary. using
        // node compress.js -> outputs file output.png.html


}, 3000);