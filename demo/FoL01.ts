//import { DR } from "./d";
import { TextureGen } from "demolishedtexture";
import { TP } from "./tiny.js"; 
import { DR } from '../src/DR';
const S = require("./song.json"); // load the Efflux song
export class F {
    static run() {
        let R: DR;
        // generate texture used in Shader - BufferA
        var t1 = TextureGen.createTexture(512, 512, function (pixel, x, y, w, h, v) {
            var t = this; var m = Math;
            var a = function (a, b) {
                return m.abs((a * b) * 255);
            }
            var s = function (p) {
                var e = 0, l = e;
                for (var i = 0; i < 13; i++) {
                    var pl = l;
                    l = t.length(p);
                    var dot = t.dot(p, p);
                    p = t.func(p, function (v) {
                        return m.abs(v) / dot - .5;
                    });
                    e += m.exp(-1 / m.abs(l - pl));
                }
                return e;
            };
            var k = s(v) * .18;
            return [a(k, 1.1), a(k * k, 1.3), a(k * k * k, 1.)];
        });
        const vertex = `layout(location=0)in vec2 pos;out vec4 fragColor;void main(){gl_Position=vec4(pos.rg,0.,1.);}`;

        var fragment = `uniform float time;uniform vec2 resolution;uniform sampler2D iChannel0;out vec4 fragColor;
        #define detail .00004
        #define t time*.2
        vec3 v=normalize(vec3(.1,-.15,-1.));const vec3 m=vec3(-1.,.2,0.);float f=0.;vec3 r;mat2 s(float v){return mat2(cos(v),sin(v),-sin(v),cos(v));}vec4 n(vec4 v){return v.rb=abs(v.rb+1.)-abs(v.rb-1.)-v.rb,v=v*2./clamp(dot(v.rgb,v.rgb),.15,1.)-vec4(.5,.5,.8,0.),v.rg*=s(.5),v;}float x(vec3 v){float m=length(v.gb-vec2(.25,0.))-.5,i=length(v.gb-vec2(.25,2.))-.5;return min(max(m,abs(v.r-.3)-.01),max(i,abs(v.r+2.3)-.01));}vec2 a(vec3 v){float m=0.;vec3 f=v;f.b=abs(2.-mod(f.b,4.));vec4 i=vec4(f,1.5);float b=max(0.,.35-abs(v.g-3.35))/.35;for(int r=0;r<8;r++)i=n(i);float r=max(-f.r-4.,length(max(vec2(0.),i.gb-3.))/i.a),a=x(f),c=min(a,r);if(abs(c-a)<.001)m=1.;return vec2(c,m);}vec2 p(vec3 v){v.b=abs(2.-mod(v.b,4.));float m,r=m=0.,f=1000.;for(int i=0;i<15;i++){v=n(vec4(v,0.)).rgb;float a=r;r=length(v);m+=exp(-10./abs(r-a));f=min(f,abs(r-3.));}return vec2(m,f);}vec3 d(float v){vec3 r=vec3(sin(v)*2.,(1.-sin(v*.5))*.5,-cos(v*.25)*30.)*.5;return r;}vec3 w(vec3 v){vec3 m=vec3(0.,f,0.);return normalize(vec3(a(v+m.grr).r-a(v-m.grr).r,a(v+m.rgr).r-a(v-m.rgr).r,a(v+m.rrg).r-a(v-m.rrg).r));}float a(vec3 v,vec3 r){float m=1.,i=2.*f,b=10.;for(int c=0;c<50;c++){if(i<1.&&b>detail){vec3 g=v-i*r;b=a(g).r;m=min(m,max(50.*b/i,0.));i+=max(.01,b);}}return clamp(m,.1,1.);}float d(const vec3 v,const vec3 m){float r=detail*40.,f=0.,i=13.;for(int b=0;b<5;b++){float s=r*float(b*b);vec3 c=m*s+v;float g=a(c).r;f+=-(g-s)*i;i*=.7;}return clamp(1.-5.*f,0.,1.);}vec3 a(in vec3 m,in vec3 i,in vec3 r,in float f){float b=a(m,v),c=d(m,r),g=max(0.,dot(v,-r))*b;vec3 s=max(.5,dot(i,-r))*.35*vec3(.75,.65,.6),l=reflect(v,r);float e=pow(max(0.,dot(i,-l))*b,15.)*.65;vec3 n;vec2 x=p(m);if(f>.5)n=vec3(1.),e=e*e;else{float w=pow(x.r*.11,2.);n=mix(vec3(w,w*w,w*w),vec3(w),.5)+.1;n+=pow(max(0.,1.-x.g),5.)*.3;}n=n*c*(s+g*vec3(1.,.97,.93))+e*vec3(1.,.97,.93);if(f>.5){vec3 w=m;w.b=abs(1.-mod(w.b,2.));vec3 o=texture(iChannel0,mod(1.-m.bg-vec2(.4,.2),vec2(1.))).rgb*2.;n+=o*abs(.01-mod(m.g-time*.1,.02))/.01*c;n*=max(0.,1.-pow(length(w.gb-vec2(.25,1.)),2.)*3.5);}else{vec3 w=texture(iChannel0,mod(m.br*2.+vec2(.5),vec2(1.))).rgb;w*=abs(.01-mod(m.r-time*.1*sign(m.r+1.),.02))/.01;n+=pow(x.r,10.)*3e-10*w;n+=pow(max(0.,1.-x.g),4.)*pow(max(0.,1.-abs(1.-mod(m.b+time*2.,4.))),2.)*vec3(1.,.8,.4)*4.*max(0.,.05-abs(m.r+1.))/.05;}return n;}vec3 n(in vec3 m,in vec3 r){float b,i,c=b=0.;vec2 n=vec2(1.,0.);vec3 g,s=vec3(0.);for(int e=0;e<100;e++){if(n.r>f&&c<30.){g=m+c*r;n=a(g);f=detail*(1.+c*50.);c+=n.r;if(n.r<.015)b+=max(0.,.015-n.r)*exp(-c);}}float e=max(0.,dot(normalize(-r),normalize(v)));vec3 d=vec3(max(0.,-r.g+.6))*vec3(.75,.65,.6)*.5*max(.4,e);if(n.r<f||c<30.){g=g-abs(n.r-f)*r;vec3 l=w(g);s=a(g,r,l,n.g);s=mix(s,d,1.-exp(-.15*pow(c,1.5)));}else{s=d;vec3 l=(r*3.+vec3(1.3,2.5,1.25))*.3;for(int x=0;x<13;x++)l=abs(l)/dot(l,l)-.9;s+=min(1.,pow(min(5.,length(l)),3.)*.0025);}vec3 l=vec3(1.,.97,.93)*pow(e,25.)*.5;s+=b*(.5+e*.5)*vec3(1.,.97,.93)*.7;s+=l*exp(min(30.,c)*.02);return s;}vec3 e(inout vec3 v){vec3 m=d(t),r=d(t+.7);float b=a(r).r;vec3 i=normalize(r-m);float f=r.r-m.r;f*=min(1.,abs(r.b-m.b))*sign(r.b-m.b)*.7;v.rg*=mat2(cos(f),sin(f),-sin(f),cos(f));f=i.g*1.7;v.gb*=mat2(cos(f),sin(f),-sin(f),cos(f));f=atan(i.r,i.b);v.rb*=mat2(cos(f),sin(f),-sin(f),cos(f));return m;}void main(){r=d(t+.3)+m;vec2 v=gl_FragCoord.rg/resolution.rg*2.-1.;v.g*=resolution.g/resolution.r;vec3 f=normalize(vec3(v*.8,1.)),i=m+e(f),c=n(i,f);c=clamp(c,vec3(0.),vec3(1.));c=pow(c,vec3(1.35))*1.5;c=mix(vec3(length(c)),c,.8);fragColor=vec4(c,1.);}`;  
        // PostProcessor vertex
        // let ppV = `layout(location = 0) in vec2 pos; 
        // out vec4 fragColor;                
        // void main() { 
        //     gl_Position = vec4(pos.xy,0.0,1.0);
        // }`;
        // postProcessor fragment
        // at the moment a buggy minified postproc:)
        let ppF = `uniform float time;uniform vec2 resolution;uniform sampler2D bufferA;out vec4 fragColor;float t(vec2 s){return fract(sin(dot(s.rg,vec2(12.9898,78.233)))*43758.5);}float f(float s){return fract(sin(s)*43758.5);}float s(float s){float v=floor(s),r=fract(s);return mix(f(v),f(v+1.),r);}float f(float s,float r,float v,float f,float t){float e=(s-r)/(v-r),i=f+e*(t-f);return i;}float v(float v){return f(s(v),0.,1.,-1.,1.);}float f(float s,float r){float f=clamp(abs(s)-r,0.,1.);f=sign(s)*f;float v=1./(1.-r);return f*v;}vec2 n(vec2 v){return v=(v-.5)*2.,v*=1.2,v.r*=1.+pow(abs(v.g)/5.,2.),v.g*=1.+pow(abs(v.r)/4.,2.),v/=1.15,v=v/2.+.5,v;}vec3 n(sampler2D v,vec2 f){vec3 s=texture(bufferA,f).rgb;return s;}vec3 s(sampler2D s,vec2 r){float e=f(v(time*10.),.85),g=f(v(2000.+time*10.),.85),i=f(v(3000.+time*10.),.85);vec2 t=vec2(0.,0.),p=vec2(0,0.),u=vec2(0.,0);float A=.05;t+=vec2(e*A,0.);p+=vec2(g*A,0.);u+=vec2(0.,i*A);float b=n(bufferA,r+t).r,m=n(bufferA,r+p).g,o=n(bufferA,r+u).b;vec3 a=vec3(b,m,o);return a;}vec2 m(vec2 v){float f=clamp(s(200.+time*2.)*14.,0.,2.);v.g+=f;v.g=mod(v.g,1.);return v;}vec2 p(vec2 s){float r=v(time*6.),i=f(v(time*10.),.5),g=(sin(s.g*10.+r)+1.)/2.;g=(clamp(g,.9,1.)-.9)*10.;s.r+=g*.03*i;s.r=mod(s.r,1.);return s;}void main(){float v=float(int(time*11.));vec2 r=gl_FragCoord.rg/resolution.rg;r=n(r);vec2 b=r;r=m(r);vec2 e=vec2(0.,1.)/resolution.rg*3.;vec3 g=s(bufferA,r);float p=(sin(r.g*3.1415*resolution.g/2.7)+1.)/2.,i=(sin(r.g*3.1415)+1.)/2.;g*=.75+p*.25;float a=.96+.04*(sin(time*100.)+1.)/2.;g*=a;float A=44.*(b.r*(1.-b.r)*b.g*(1.-b.g));A*=mix(.7,1.,f(v+.5));g*=.6+.4*A;g*=1.+t(r+v*.01)*.2;vec3 c=vec3(.4,.4,.4);if(b.r<0.||b.r>1.)g=c;if(b.g<0.||b.g>1.)g=c;fragColor=vec4(g,1.);}`;
        
        // let ppF = `uniform float time;
        // uniform vec2 resolution;
        // uniform sampler2D bufferA;
        // out vec4 fragColor;
        
        // float rand2d(vec2 co) {
        //         return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        //     }
            
        //     float rand(float n) {
        //         return fract(sin(n) * 43758.5453123);
        //     }
            
        //     float noise(float p) {
        //             float fl = floor(p);
        //               float fc = fract(p);
        //             return mix(rand(fl), rand(fl + 1.0), fc);
        //     }
            
        //     float map(float val, float amin, float amax, float bmin, float bmax) {
        //         float n = (val - amin) / (amax-amin);
        //         float m = bmin + n * (bmax-bmin);
        //         return m;
        //     }
            
        //     float snoise(float p){
        //         return map(noise(p),0.0,1.0,-1.0,1.0);
        //     }
            
        //     float threshold(float val,float cut){
        //         float v = clamp(abs(val)-cut,0.0,1.0);
        //         v = sign(val) * v;
        //         float scale = 1.0 / (1.0 - cut);
        //         return v * scale;
        //     }

        //     #define CURVE 
        //     #define SCANS
        //     #define FLICKS
        //     //#define GRAINS 
        //     #define YBUG 
        //     #define DIRTY
        //     //#define STRIP
        //     //#define COLOR
        //     #define BLINK
        //     #define VIG
            
        //     float FREQUENCY = 11.0;
            
        //     vec2 uv_curve(vec2 uv) {
        //             uv = (uv - 0.5) * 2.0;
        //             uv *= 1.2;	
        //             uv.x *= 1.0 + pow((abs(uv.y) / 5.0), 2.0);
        //             uv.y *= 1.0 + pow((abs(uv.x) / 4.0), 2.0);
        //         uv /= 1.15;
        //             uv  = (uv / 2.0) + 0.5;
        //             return uv;
        //     }
            
        //     vec3 color(sampler2D tex, vec2 uv){        
        //         vec3 color = texture(bufferA,uv).rgb;
        //         #ifdef COLOR
        //         float bw = (color.r + color.g + color.b) / 3.0;
        //         color = mix(color,vec3(bw,bw,bw),.95);
        //         float p = 1.5;
        //         color.r = pow(color.r,p);
        //         color.g = pow(color.g,p-0.1);
        //         color.b = pow(color.b,p);
        //         #endif
        //         return color;
        //     }
            
        //     vec3 ghost(sampler2D tex, vec2 uv){
        //         #ifdef FLICKS
                
        //         float n1 = threshold(snoise(time*10.),.85);
        //         float n2 = threshold(snoise(2000.0+time*10.),.85);
        //         float n3 = threshold(snoise(3000.0+time*10.),.85);
                
        //         vec2 or = vec2(0.,0.);
        //         vec2 og = vec2(0,0.);
        //         vec2 ob = vec2(0.,0);
            
        //         float os = .05;
        //         or += vec2(n1*os,0.);
        //         og += vec2(n2*os,0.);
        //         ob += vec2(0.,n3*os);
              
        //         float r = color(bufferA,uv + or).r;
        //         float g = color(bufferA,uv + og).g;
        //         float b = color(bufferA,uv + ob).b;
        //         vec3 color = vec3(r,g,b);
        //         return color;
        //         #else 
        //         return texture(bufferA,uv).rgb;
        //         #endif
        //     }
            
        //     vec2 uv_ybug(vec2 uv){
        //         float n4 = clamp(noise(200.0+time*2.)*14.,0.,2.);
        //         uv.y += n4;
        //         uv.y = mod(uv.y,1.);
        //         return uv;
        //     }
            
        //     vec2 uv_hstrip(vec2 uv){
        //         float vnoise = snoise(time*6.);
        //         float hnoise = threshold(snoise(time*10.),.5);
            
        //         float line = (sin(uv.y*10.+vnoise)+1.)/2.;
        //         line = (clamp(line,.9,1.)-.9)*10.;
                
        //         uv.x += line * 0.03 * hnoise;
        //         uv.x = mod(uv.x,1.);
        //         return uv;
        //     }
                  
        // void main(){                


        //         float t = float(int(time * FREQUENCY));
    
        //         vec2 uv = gl_FragCoord.xy / resolution.xy;
                                
        //         #ifdef CURVE
        //         uv = uv_curve(uv);
        //         #endif
            
        //         vec2 ouv = uv;
                
        //         #ifdef GRAINS
        //         float xn = threshold(snoise(time*10.),.7) * 0.05;
        //         float yn = threshold(snoise((500.0+time)*10.),.7) * 0.05;
                
        //         float r = rand2d(uv+(t+100.0)*.01);
        //         uv = uv + vec2(xn,yn) * r;
        //         #endif
                
                 
        //         #ifdef YBUG
        //         uv = uv_ybug(uv);
        //         #endif
            
        //         #ifdef STRIP
        //         uv = uv_hstrip(uv);
        //         #endif               
               
        //         vec2 onePixel = vec2(0.0, 1.0) / resolution.xy * 3.;
        //         #ifdef BLUR
        //         vec3 colorA = ghost(bufferA,uv + onePixel,or,og,ob);
        //         vec3 colorB = ghost(bufferA,uv - onePixel,or,og,ob);
        //         vec3 colorC = ghost(bufferA,uv,or,og,ob);
        //         vec3 color = (colorA+colorB+colorC)/3.0;
        //         #else
        //         vec3 color = ghost(bufferA,uv);
        //         #endif
            
        //         //color = colorC;
                
        //         float scanA = (sin(uv.y*3.1415*resolution.y/2.7)+1.)/2.;
        //         float scanB = (sin(uv.y*3.1415*1.)+1.)/2.;
        //         #ifdef SCANS
        //         color *= .75 + scanA * .25;
        //         //color *= .5 + scanC * .5;
        //         //color *= scanB;    
        //         #endif
                
        //         #ifdef BLINK
        //         float blink = .96 + .04*(sin(time*100.)+1.)/2.;
        //         color *= blink;
        //         #endif
                
        //         #ifdef VIG
        //         float vig = 44.0 * (ouv.x * (1.0-ouv.x) * ouv.y * (1.0-ouv.y));
        //             vig *= mix( 0.7, 1.0, rand(t + 0.5));
        //         color *= .6 + .4*vig;
        //         #endif
                 
        //         #ifdef DIRTY
        //         color *= 1.0 + rand2d(uv+t*.01) * 0.2;	
        //         #endif
            
        //         vec3 backColor = vec3(.4,.4,.4);
        //         if (ouv.x < 0.0 || ouv.x > 1.0)
        //                     color = backColor;
        //             if (ouv.y < 0.0 || ouv.y > 1.0)
        //                     color = backColor;
            
        //         fragColor = vec4(color,1.0);
             
        // }`;

        const cu =  {
            "foo": (location,gl,program,time) => {
              // do stuff related to unifom 'foo' 
              console.log("foo");
            },
            "bar": (location,gl,program,time)  => {
              // do stuff
            }
        } ;  
        
        
        let c = document.querySelector("#w") as HTMLCanvasElement;
        c.width = innerWidth; c.height = innerHeight;
        R = new DR(c, vertex, ppF);
        // add textures to textureCache, create buffers -> passed as textures to main (mainVertex,mainFragment)
        R.aA({
            T0: {
                src: t1.toBase64() // the rendered texture
            }
        }, () => {
            // add scene 'bufferA' and its texture 
            R.aB("bufferA", vertex, fragment, ["T0"]).run(0,60);
            c.addEventListener("click", () => {
                TP.l(JSON.parse(S.data));
                TP.p();
            });
        });
    }

}

setTimeout(() => {
    F.run();
    // Compress into binary. using
    // node compress.js -> outputs file output.png.html
}, 3000);