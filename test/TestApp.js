"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dr_worker_1 = __importDefault(require("worker-loader!../src/dr-worker"));
var TestApp = (function () {
    function TestApp() {
        this.mainCanvas = document.querySelector("canvas");
        this.offScreen = this.mainCanvas.transferControlToOffscreen();
        var worker = new dr_worker_1.default();
        var vertex = "layout(location = 0) in vec2 pos; \n        out vec4 fragColor;\n        void main(){gl_Position = vec4(pos.xy,0.0,1.0);\n        }";
        var frag = "uniform vec2 resolution;\n        uniform sampler2D A;\n        out vec4 fragColor;\n        void main(){\n            vec2 uv = gl_FragCoord.xy/resolution.xy;            \n            fragColor = texture(A, uv);\n        }";
        var bufferFrag = "uniform float time;\n        uniform vec2 mouse;\n        uniform vec2 resolution;\n        \n        out vec4 fragColor;\n      \n        #define iTime time\n        #define iResolution resolution\n        const vec4 iMouse = vec4(0.);\n        \n        #define sampler2D float\n        #define iChannel0 0.\n        #define texture(s, uv) vec4(0.35, 0.13, 0.1, 1.)        \n        \n        #define AA 1        \n        \n        vec3 map( vec3 p )\n        {\n            float scale = 1.0;\n            \n            float orb = 100.0;\n        \n            for( int i=0; i<10; i++ )\n            {\n                p = -1.0 + 2.0*fract(0.5*p+0.5);\n        \n            //    p -= sign(p)*0.09; // trick\n                \n                float r2 = dot(p,p);\n                float k = 0.95/r2;\n                p     *= k;\n                scale *= k;\n        \n                orb = min( orb, r2);\n            }\n        \n            float d1 = sqrt( min( min( dot(p.xy,p.xy), dot(p.yz,p.yz) ), dot(p.zx,p.zx) ) ) - 0.02;\n            float d2 = abs(p.y);\n            float dmi = d2;\n            float adr = 0.7*floor((0.5*p.y+0.5)*8.0);\n            if( d1<d2 )\n            {\n                dmi = d1;\n                adr = 0.0;\n            }\n            return vec3( 0.5*dmi/scale, adr, orb );\n        }\n        \n        vec3 trace( in vec3 ro, in vec3 rd )\n        {\n            float maxd = 20.0;\n            float t = 0.01;\n            vec2  info = vec2(0.0);\n            for( int i=0; i<256; i++ )\n            {\n                float precis = 0.001*t;\n                \n                vec3  r = map( ro+rd*t );\n                float h = r.x;\n                info = r.yz;\n                if( h<precis||t>maxd ) break;\n                t += h;\n            }\n        \n            if( t>maxd ) t=-1.0;\n            return vec3( t, info );\n        }\n        \n        vec3 calcNormal( in vec3 pos, in float t )\n        {\n            float precis = 0.0001 * t * 0.57;\n        \n            vec2 e = vec2(1.0,-1.0)*precis;\n            return normalize( e.xyy*map( pos + e.xyy ).x + \n                              e.yyx*map( pos + e.yyx ).x + \n                              e.yxy*map( pos + e.yxy ).x + \n                              e.xxx*map( pos + e.xxx ).x );\n        }\n        \n        vec3 forwardSF( float i, float n) \n        {\n            const float PI  = 3.141592653589793238;\n            const float PHI = 1.618033988749894848;\n            float phi = 2.0*PI*fract(i/PHI);\n            float zi = 1.0 - (2.0*i+1.0)/n;\n            float sinTheta = sqrt( 1.0 - zi*zi);\n            return vec3( cos(phi)*sinTheta, sin(phi)*sinTheta, zi);\n        }\n        \n        float calcAO( in vec3 pos, in vec3 nor )\n        {\n            float ao = 0.0;\n            for( int i=0; i<16; i++ )\n            {\n                vec3 w = forwardSF( float(i), 16.0 );\n                w *= sign( dot(w,nor) );\n                float h = float(i)/15.0;\n                ao += clamp( map( pos + nor*0.01 + w*h*0.15 ).x*2.0, 0.0, 1.0 );\n            }\n            ao /= 16.0;\n            \n            return clamp( ao*16.0, 0.0, 1.0 );\n        }\n        \n        \n        vec3 textureBox( sampler2D sam, in vec3 pos, in vec3 nor )\n        {\n            vec3 w = nor*nor*nor ;\n            return (w.x*texture( sam, pos.yz ).xyz + \n                    w.y*texture( sam, pos.zx ).xyz + \n                    w.z*texture( sam, pos.xy ).xyz ) / (w.x+w.y+w.z);\n        }\n        \n        vec3 render( in vec3 ro, in vec3 rd )\n        {\n            vec3 col = vec3(0.0);\n            vec3 res = trace( ro, rd );;\n            float t = res.x;\n            if( t>0.0 )\n            {\n                vec3  pos = ro + t*rd;\n                vec3  nor = calcNormal( pos, t );\n                float fre = clamp(1.0+dot(rd,nor),0.0,1.0);\n                float occ = pow( clamp(res.z*2.0,0.0,1.0), 1.2 );\n                      occ = 1.5*(0.1+0.9*occ)*calcAO(pos,nor);        \n                vec3  lin = vec3(1.0,1.0,1.5)*(2.0+fre*fre*vec3(1.8,1.0,1.0))*occ*(1.0-0.5*abs(nor.y));\n                \n                  col = 0.5 + 0.5*cos( 6.2831*res.y + vec3(0.0,1.0,2.0) );  \n                col *= textureBox( iChannel0, pos, nor ).xyz;\n                col = col*lin;\n                col += 0.6*pow(1.0-fre,32.0)*occ*vec3(0.5,1.0,1.5);        \n                col *= exp(-0.3*t);\n            }\n            col.z += 0.01;\n        \n            return sqrt(col);\n        }\n        \n        void mainImage( out vec4 fragColor, in vec2 fragCoord )\n        {\n            float time = iTime*0.15 + 0.005*iMouse.x;\n            \n            vec3 tot = vec3(0.35);\n            #if AA>1\n            for( int jj=0; jj<AA; jj++ )\n            for( int ii=0; ii<AA; ii++ )\n            #else\n            int ii = 0, jj = 0;\n            #endif\n            {\n                vec2 q = fragCoord+vec2(float(ii),float(jj))/float(AA);\n        \n                // camera\n                vec3 ro = vec3( 2.8*cos(0.1+.33*time), 0.5 + 0.20*cos(0.37*time), 2.8*cos(0.5+0.35*time) );\n                vec3 ta = vec3( 1.9*cos(1.2+.41*time), 0.5 + 0.10*cos(0.27*time), 1.9*cos(2.0+0.38*time) );\n                float roll = 0.2*cos(0.1*time);\n                vec3 cw = normalize(ta-ro);\n                vec3 cp = vec3(sin(roll), cos(roll),0.0);\n                vec3 cu = normalize(cross(cw,cp));\n                vec3 cv = normalize(cross(cu,cw));\n        \n                #if 1\n                vec2 p = (2.0*q-iResolution.xy)/iResolution.y;\n                vec3 rd = normalize( p.x*cu + p.y*cv + 2.0*cw );\n                #else\n                vec2 p = q/iResolution.xy;\n                vec2 an = 3.1415926535898 * (p*vec2(2.0, 1.0) - vec2(0.0,0.5));\n                vec3 rd = vec3(cos(an.y) * sin(an.x), sin(an.y), cos(an.y) * cos(an.x));\n                #endif\n        \n                tot += render( ro, rd );\n            }\n            \n            tot = tot/float(AA*AA);\n            \n            fragColor = vec4( tot*tot, 1.0 );\t\n        \n        }\n        \n        void mainVR( out vec4 fragColor, in vec2 fragCoord, in vec3 fragRayOri, in vec3 fragRayDir )\n        {\n            vec3 col = render( fragRayOri + vec3(0.82,1.3,-0.3), fragRayDir );\n            fragColor = vec4( col, 1.0 );\n        }        \n        void main(void)\n        {\n            mainImage(fragColor, gl_FragCoord.xy);\n        }";
        worker.onmessage = function (ev) {
            var msg = ev.data;
            if (msg.topic === "init") {
                worker.postMessage({
                    topic: "start",
                    data: {}
                });
            }
            else {
            }
        };
        worker.postMessage({
            topic: "init",
            data: {
                canvas: this.offScreen,
                frag: frag,
                vert: vertex,
                assets: {},
                buffers: [
                    {
                        name: "A",
                        vert: vertex,
                        frag: bufferFrag,
                        assets: []
                    }
                ]
            }
        }, [this.offScreen]);
    }
    return TestApp;
}());
exports.TestApp = TestApp;
document.addEventListener("DOMContentLoaded", function () {
    var instance = new TestApp();
});
