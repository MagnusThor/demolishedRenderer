"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var demolishedtexture_1 = require("demolishedtexture");
var DR_mjolnir_min_1 = require("./DR.mjolnir.min");
var tiny_js_1 = require("./tiny.js");
var S = require("./song.json");
var F = (function () {
    function F() {
    }
    F.run = function () {
        var R;
        var t1 = demolishedtexture_1.TextureGen.createTexture(512, 512, function (pixel, x, y, w, h, v) {
            var t = this;
            var m = Math;
            var a = function (a, b) {
                return m.abs((a * b) * 255);
            };
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
        var vertex = "layout(location=0)in vec2 pos;out vec4 fragColor;void main(){gl_Position=vec4(pos.rg,0.,1.);}";
        var fragment = "uniform float time;uniform vec2 resolution;uniform sampler2D iChannel0;out vec4 fragColor;\n        #define detail .00004\n        #define t time*.2\n        vec3 v=normalize(vec3(.1,-.15,-1.));const vec3 m=vec3(-1.,.2,0.);float f=0.;vec3 r;mat2 s(float v){return mat2(cos(v),sin(v),-sin(v),cos(v));}vec4 n(vec4 v){return v.rb=abs(v.rb+1.)-abs(v.rb-1.)-v.rb,v=v*2./clamp(dot(v.rgb,v.rgb),.15,1.)-vec4(.5,.5,.8,0.),v.rg*=s(.5),v;}float x(vec3 v){float m=length(v.gb-vec2(.25,0.))-.5,i=length(v.gb-vec2(.25,2.))-.5;return min(max(m,abs(v.r-.3)-.01),max(i,abs(v.r+2.3)-.01));}vec2 a(vec3 v){float m=0.;vec3 f=v;f.b=abs(2.-mod(f.b,4.));vec4 i=vec4(f,1.5);float b=max(0.,.35-abs(v.g-3.35))/.35;for(int r=0;r<8;r++)i=n(i);float r=max(-f.r-4.,length(max(vec2(0.),i.gb-3.))/i.a),a=x(f),c=min(a,r);if(abs(c-a)<.001)m=1.;return vec2(c,m);}vec2 p(vec3 v){v.b=abs(2.-mod(v.b,4.));float m,r=m=0.,f=1000.;for(int i=0;i<15;i++){v=n(vec4(v,0.)).rgb;float a=r;r=length(v);m+=exp(-10./abs(r-a));f=min(f,abs(r-3.));}return vec2(m,f);}vec3 d(float v){vec3 r=vec3(sin(v)*2.,(1.-sin(v*.5))*.5,-cos(v*.25)*30.)*.5;return r;}vec3 w(vec3 v){vec3 m=vec3(0.,f,0.);return normalize(vec3(a(v+m.grr).r-a(v-m.grr).r,a(v+m.rgr).r-a(v-m.rgr).r,a(v+m.rrg).r-a(v-m.rrg).r));}float a(vec3 v,vec3 r){float m=1.,i=2.*f,b=10.;for(int c=0;c<50;c++){if(i<1.&&b>detail){vec3 g=v-i*r;b=a(g).r;m=min(m,max(50.*b/i,0.));i+=max(.01,b);}}return clamp(m,.1,1.);}float d(const vec3 v,const vec3 m){float r=detail*40.,f=0.,i=13.;for(int b=0;b<5;b++){float s=r*float(b*b);vec3 c=m*s+v;float g=a(c).r;f+=-(g-s)*i;i*=.7;}return clamp(1.-5.*f,0.,1.);}vec3 a(in vec3 m,in vec3 i,in vec3 r,in float f){float b=a(m,v),c=d(m,r),g=max(0.,dot(v,-r))*b;vec3 s=max(.5,dot(i,-r))*.35*vec3(.75,.65,.6),l=reflect(v,r);float e=pow(max(0.,dot(i,-l))*b,15.)*.65;vec3 n;vec2 x=p(m);if(f>.5)n=vec3(1.),e=e*e;else{float w=pow(x.r*.11,2.);n=mix(vec3(w,w*w,w*w),vec3(w),.5)+.1;n+=pow(max(0.,1.-x.g),5.)*.3;}n=n*c*(s+g*vec3(1.,.97,.93))+e*vec3(1.,.97,.93);if(f>.5){vec3 w=m;w.b=abs(1.-mod(w.b,2.));vec3 o=texture(iChannel0,mod(1.-m.bg-vec2(.4,.2),vec2(1.))).rgb*2.;n+=o*abs(.01-mod(m.g-time*.1,.02))/.01*c;n*=max(0.,1.-pow(length(w.gb-vec2(.25,1.)),2.)*3.5);}else{vec3 w=texture(iChannel0,mod(m.br*2.+vec2(.5),vec2(1.))).rgb;w*=abs(.01-mod(m.r-time*.1*sign(m.r+1.),.02))/.01;n+=pow(x.r,10.)*3e-10*w;n+=pow(max(0.,1.-x.g),4.)*pow(max(0.,1.-abs(1.-mod(m.b+time*2.,4.))),2.)*vec3(1.,.8,.4)*4.*max(0.,.05-abs(m.r+1.))/.05;}return n;}vec3 n(in vec3 m,in vec3 r){float b,i,c=b=0.;vec2 n=vec2(1.,0.);vec3 g,s=vec3(0.);for(int e=0;e<100;e++){if(n.r>f&&c<30.){g=m+c*r;n=a(g);f=detail*(1.+c*50.);c+=n.r;if(n.r<.015)b+=max(0.,.015-n.r)*exp(-c);}}float e=max(0.,dot(normalize(-r),normalize(v)));vec3 d=vec3(max(0.,-r.g+.6))*vec3(.75,.65,.6)*.5*max(.4,e);if(n.r<f||c<30.){g=g-abs(n.r-f)*r;vec3 l=w(g);s=a(g,r,l,n.g);s=mix(s,d,1.-exp(-.15*pow(c,1.5)));}else{s=d;vec3 l=(r*3.+vec3(1.3,2.5,1.25))*.3;for(int x=0;x<13;x++)l=abs(l)/dot(l,l)-.9;s+=min(1.,pow(min(5.,length(l)),3.)*.0025);}vec3 l=vec3(1.,.97,.93)*pow(e,25.)*.5;s+=b*(.5+e*.5)*vec3(1.,.97,.93)*.7;s+=l*exp(min(30.,c)*.02);return s;}vec3 e(inout vec3 v){vec3 m=d(t),r=d(t+.7);float b=a(r).r;vec3 i=normalize(r-m);float f=r.r-m.r;f*=min(1.,abs(r.b-m.b))*sign(r.b-m.b)*.7;v.rg*=mat2(cos(f),sin(f),-sin(f),cos(f));f=i.g*1.7;v.gb*=mat2(cos(f),sin(f),-sin(f),cos(f));f=atan(i.r,i.b);v.rb*=mat2(cos(f),sin(f),-sin(f),cos(f));return m;}void main(){r=d(t+.3)+m;vec2 v=gl_FragCoord.rg/resolution.rg*2.-1.;v.g*=resolution.g/resolution.r;vec3 f=normalize(vec3(v*.8,1.)),i=m+e(f),c=n(i,f);c=clamp(c,vec3(0.),vec3(1.));c=pow(c,vec3(1.35))*1.5;c=mix(vec3(length(c)),c,.8);fragColor=vec4(c,1.);}";
        var ppF = "uniform float time;uniform vec2 resolution;uniform sampler2D bufferA;out vec4 fragColor;float t(vec2 s){return fract(sin(dot(s.rg,vec2(12.9898,78.233)))*43758.5);}float f(float s){return fract(sin(s)*43758.5);}float s(float s){float v=floor(s),r=fract(s);return mix(f(v),f(v+1.),r);}float f(float s,float r,float v,float f,float t){float e=(s-r)/(v-r),i=f+e*(t-f);return i;}float v(float v){return f(s(v),0.,1.,-1.,1.);}float f(float s,float r){float f=clamp(abs(s)-r,0.,1.);f=sign(s)*f;float v=1./(1.-r);return f*v;}vec2 n(vec2 v){return v=(v-.5)*2.,v*=1.2,v.r*=1.+pow(abs(v.g)/5.,2.),v.g*=1.+pow(abs(v.r)/4.,2.),v/=1.15,v=v/2.+.5,v;}vec3 n(sampler2D v,vec2 f){vec3 s=texture(bufferA,f).rgb;return s;}vec3 s(sampler2D s,vec2 r){float e=f(v(time*10.),.85),g=f(v(2000.+time*10.),.85),i=f(v(3000.+time*10.),.85);vec2 t=vec2(0.,0.),p=vec2(0,0.),u=vec2(0.,0);float A=.05;t+=vec2(e*A,0.);p+=vec2(g*A,0.);u+=vec2(0.,i*A);float b=n(bufferA,r+t).r,m=n(bufferA,r+p).g,o=n(bufferA,r+u).b;vec3 a=vec3(b,m,o);return a;}vec2 m(vec2 v){float f=clamp(s(200.+time*2.)*14.,0.,2.);v.g+=f;v.g=mod(v.g,1.);return v;}vec2 p(vec2 s){float r=v(time*6.),i=f(v(time*10.),.5),g=(sin(s.g*10.+r)+1.)/2.;g=(clamp(g,.9,1.)-.9)*10.;s.r+=g*.03*i;s.r=mod(s.r,1.);return s;}void main(){float v=float(int(time*11.));vec2 r=gl_FragCoord.rg/resolution.rg;r=n(r);vec2 b=r;r=m(r);vec2 e=vec2(0.,1.)/resolution.rg*3.;vec3 g=s(bufferA,r);float p=(sin(r.g*3.1415*resolution.g/2.7)+1.)/2.,i=(sin(r.g*3.1415)+1.)/2.;g*=.75+p*.25;float a=.96+.04*(sin(time*100.)+1.)/2.;g*=a;float A=44.*(b.r*(1.-b.r)*b.g*(1.-b.g));A*=mix(.7,1.,f(v+.5));g*=.6+.4*A;g*=1.+t(r+v*.01)*.2;vec3 c=vec3(.4,.4,.4);if(b.r<0.||b.r>1.)g=c;if(b.g<0.||b.g>1.)g=c;fragColor=vec4(g,1.);}";
        var c = document.querySelector("#w");
        c.width = innerWidth;
        c.height = innerHeight;
        R = new DR_mjolnir_min_1.DR(c, vertex, ppF);
        R.aA({
            T0: {
                src: t1.toBase64()
            }
        }, function () {
            R.aB("bufferA", vertex, fragment, ["T0"]).run(0);
            c.addEventListener("click", function () {
                tiny_js_1.TP.l(JSON.parse(S.data));
                tiny_js_1.TP.p();
            });
        });
    };
    return F;
}());
exports.F = F;
setTimeout(function () {
    F.run();
}, 3000);
