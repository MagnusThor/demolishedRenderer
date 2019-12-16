//import { DR } from "./d";
import { TextureGen } from "demolishedtexture";
import { DR } from "./DR.mjolnir.min";
import { TP } from "./tiny.js";

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


        const vertex = `layout(location = 0) in vec2 pos; 
        out vec4 fragColor;
        void main() { 
            gl_Position = vec4(pos.xy,0.0,1.0);
        }`;

        var fragment = `uniform float time;uniform vec2 mouse,resolution;uniform sampler2D iChannel0,iChannel1,iChannel2,iChannel3,iChannel4,fft;out vec4 fragColor;
#define RAY_STEPS 100
#define SHADOW_STEPS 50
#define LIGHT_COLOR vec3(1.,.97,.93)
#define AMBIENT_COLOR vec3(.75,.65,.6)
#define SPECULAR 0.65
#define DIFFUSE 1.0
#define AMBIENT 0.35
#define BRIGHTNESS 1.5
#define GAMMA 1.35
#define SATURATION.8
#define detail.00004
#define t time*.2
vec3 lightdir=normalize(vec3(.1,-.15,-1.));const vec3 origin=vec3(-1.,.2,0.);float det=0.;vec3 pth1;mat2 rot(float v){return mat2(cos(v),sin(v),-sin(v),cos(v));}vec4 formula(vec4 v){return v.rb=abs(v.rb+1.)-abs(v.rb-1.)-v.rb,v=v*2./clamp(dot(v.rgb,v.rgb),.15,1.)-vec4(.5,.5,.8,0.),v.rg*=rot(.5),v;}float screen(vec3 v){float m=length(v.gb-vec2(.25,0.))-.5,i=length(v.gb-vec2(.25,2.))-.5;return min(max(m,abs(v.r-.3)-.01),max(i,abs(v.r+2.3)-.01));}vec2 de(vec3 v){float r=0.;vec3 m=v;m.b=abs(2.-mod(m.b,4.));vec4 i=vec4(m,1.5);float c=max(0.,.35-abs(v.g-3.35))/.35;
#ifdef LESSDETAIL
for(int f=0;f<6;f++)i=formula(i);float f=max(-m.r-4.,(length(max(vec2(0.),i.gb-2.))-.5)/i.a);
#else
for(int b=0;b<8;b++)i=formula(i);float d=max(-m.r-4.,length(max(vec2(0.),i.gb-3.))/i.a);
#endif
float b=screen(m),l=min(b,d);if(abs(l-b)<.001)r=1.;return vec2(l,r);}vec2 colorize(vec3 v){v.b=abs(2.-mod(v.b,4.));float m,i=m=0.,r=1000.;for(int f=0;f<15;f++){v=formula(vec4(v,0.)).rgb;float b=i;i=length(v);m+=exp(-10./abs(i-b));r=min(r,abs(i-3.));}return vec2(m,r);}vec3 path(float v){vec3 r=vec3(sin(v)*2.,(1.-sin(v*.5))*.5,-cos(v*.25)*30.)*.5;return r;}vec3 normal(vec3 v){vec3 m=vec3(0.,det,0.);return normalize(vec3(de(v+m.grr).r-de(v-m.grr).r,de(v+m.rgr).r-de(v-m.rgr).r,de(v+m.rrg).r-de(v-m.rrg).r));}float shadow(vec3 v,vec3 r){float m=1.,i=2.*det,f=10.;for(int b=0;b<SHADOW_STEPS;b++){if(i<1.&&f>detail){vec3 l=v-i*r;f=de(l).r;m=min(m,max(50.*f/i,0.));i+=max(.01,f);}}return clamp(m,.1,1.);}float calcAO(const vec3 v,const vec3 m){float r=detail*40.,f=0.,i=13.;for(int b=0;b<5;b++){float d=r*float(b*b);vec3 l=m*d+v;float c=de(l).r;f+=-(c-d)*i;i*=.7;}return clamp(1.-5.*f,0.,1.);}vec3 light(in vec3 v,in vec3 m,in vec3 r,in float i){float b=shadow(v,lightdir),f=calcAO(v,r),d=max(0.,dot(lightdir,-r))*b*DIFFUSE;vec3 l=max(.5,dot(m,-r))*AMBIENT*AMBIENT_COLOR,a=reflect(lightdir,r);float c=pow(max(0.,dot(m,-a))*b,15.)*SPECULAR;vec3 p;vec2 s=colorize(v);if(i>.5)p=vec3(1.),c=c*c;else{float g=pow(s.r*.11,2.);p=mix(vec3(g,g*g,g*g),vec3(g),.5)+.1;p+=pow(max(0.,1.-s.g),5.)*.3;}p=p*f*(l+d*LIGHT_COLOR)+c*LIGHT_COLOR;if(i>.5){vec3 n=v;n.b=abs(1.-mod(n.b,2.));vec3 g=texture(iChannel0,mod(1.-v.bg-vec2(.4,.2),vec2(1.))).rgb*2.;p+=g*abs(.01-mod(v.g-time*.1,.02))/.01*f;p*=max(0.,1.-pow(length(n.gb-vec2(.25,1.)),2.)*3.5);}else{vec3 g=texture(iChannel0,mod(v.br*2.+vec2(.5),vec2(1.))).rgb;g*=abs(.01-mod(v.r-time*.1*sign(v.r+1.),.02))/.01;p+=pow(s.r,10.)*3e-10*g;p+=pow(max(0.,1.-s.g),4.)*pow(max(0.,1.-abs(1.-mod(v.b+time*2.,4.))),2.)*vec3(1.,.8,.4)*4.*max(0.,.05-abs(v.r+1.))/.05;}return p;}vec3 raymarch(in vec3 v,in vec3 m){float r,i,b=r=0.;vec2 f=vec2(1.,0.);vec3 l,c=vec3(0.);for(int p=0;p<RAY_STEPS;p++){if(f.r>det&&b<30.){l=v+b*m;f=de(l);det=detail*(1.+b*50.);b+=f.r;if(f.r<.015)r+=max(0.,.015-f.r)*exp(-b);}}float g=max(0.,dot(normalize(-m),normalize(lightdir)));vec3 d=vec3(max(0.,-m.g+.6))*AMBIENT_COLOR*.5*max(.4,g);if(f.r<det||b<30.){l=l-abs(f.r-det)*m;vec3 p=normal(l);c=light(l,m,p,f.g);c=mix(c,d,1.-exp(-.15*pow(b,1.5)));}else{c=d;vec3 p=(m*3.+vec3(1.3,2.5,1.25))*.3;for(int n=0;n<13;n++)p=abs(p)/dot(p,p)-.9;c+=min(1.,pow(min(5.,length(p)),3.)*.0025);}vec3 p=LIGHT_COLOR*pow(g,25.)*.5;c+=r*(.5+g*.5)*LIGHT_COLOR*.7;c+=p*exp(min(30.,b)*.02);return c;}vec3 move(inout vec3 v){vec3 m=path(t),i=path(t+.7);float r=de(i).r;vec3 f=normalize(i-m);float b=i.r-m.r;b*=min(1.,abs(i.b-m.b))*sign(i.b-m.b)*.7;v.rg*=mat2(cos(b),sin(b),-sin(b),cos(b));b=f.g*1.7;v.gb*=mat2(cos(b),sin(b),-sin(b),cos(b));b=atan(f.r,f.b);v.rb*=mat2(cos(b),sin(b),-sin(b),cos(b));return m;}void main(){pth1=path(t+.3)+origin;vec2 v=gl_FragCoord.rg/resolution.rg*2.-1.;v.g*=resolution.g/resolution.r;vec3 b=normalize(vec3(v*.8,1.)),i=origin+move(b),m=raymarch(i,b);m=clamp(m,vec3(0.),vec3(1.));m=pow(m,vec3(GAMMA))*BRIGHTNESS;m=mix(vec3(length(m)),m,SATURATION);fragColor=vec4(m,1.);}
`;
  
        // postProcessor vertex
        // let ppV = `layout(location = 0) in vec2 pos; 
        // out vec4 fragColor;                
        // void main() { 
        //     gl_Position = vec4(pos.xy,0.0,1.0);
        // }`;

        // postProcessor fragment
        let ppF = `uniform float time;
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
        let c = document.querySelector("#w") as HTMLCanvasElement;
        c.width = innerWidth; c.height = innerHeight;
        R = new DR(c, vertex, ppF);
        // add textures to textureCache, create buffers -> passed as textures to main (mainVertex,mainFragment)
        R.aA({
            iChannel0: {
                src: t1.toBase64() // the rendered texture
            }
        }, () => {
            // add scene 'bufferA' and its texture 
            R.aB("bufferA", vertex, fragment, ["iChannel0"]).run(0);
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