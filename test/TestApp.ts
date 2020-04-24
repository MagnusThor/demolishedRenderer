
import DRWorker from 'worker-loader!../src/DR-worker';
import { IBus } from '../src/IBus';
export class TestApp {
    mainCanvas: HTMLCanvasElement;
    offScreen: OffscreenCanvas;

    constructor() {
        this.mainCanvas = document.querySelector("canvas") as HTMLCanvasElement;

        this.offScreen = new OffscreenCanvas(this.mainCanvas.width, this.mainCanvas.height); // this.mainCanvas.transferControlToOffscreen(); 

        let ctx = this.mainCanvas.getContext("bitmaprenderer");

        let worker = new DRWorker();

        const vertex = `layout(location = 0) in vec2 pos; 
        out vec4 fragColor;
        void main(){gl_Position = vec4(pos.xy,0.0,1.0);
        }`;


        const frag = `uniform vec2 resolution;
        uniform sampler2D A;
        out vec4 fragColor;
        void main(){
            vec2 uv = gl_FragCoord.xy/resolution.xy;            
            fragColor = texture(A, uv);
        }`;

        const bufferFrag = `uniform float time;
        uniform vec2 mouse;
        uniform vec2 resolution;
        
        out vec4 fragColor;
      
        #define iTime time
        #define iResolution resolution
        const vec4 iMouse = vec4(0.);
        
        #define sampler2D float
        #define iChannel0 0.
        #define texture(s, uv) vec4(0.35, 0.13, 0.1, 1.)        
        
        #define AA 1        
        
        vec3 map( vec3 p )
        {
            float scale = 1.0;
            
            float orb = 100.0;
        
            for( int i=0; i<10; i++ )
            {
                p = -1.0 + 2.0*fract(0.5*p+0.5);
        
            //    p -= sign(p)*0.09; // trick
                
                float r2 = dot(p,p);
                float k = 0.95/r2;
                p     *= k;
                scale *= k;
        
                orb = min( orb, r2);
            }
        
            float d1 = sqrt( min( min( dot(p.xy,p.xy), dot(p.yz,p.yz) ), dot(p.zx,p.zx) ) ) - 0.02;
            float d2 = abs(p.y);
            float dmi = d2;
            float adr = 0.7*floor((0.5*p.y+0.5)*8.0);
            if( d1<d2 )
            {
                dmi = d1;
                adr = 0.0;
            }
            return vec3( 0.5*dmi/scale, adr, orb );
        }
        
        vec3 trace( in vec3 ro, in vec3 rd )
        {
            float maxd = 20.0;
            float t = 0.01;
            vec2  info = vec2(0.0);
            for( int i=0; i<256; i++ )
            {
                float precis = 0.001*t;
                
                vec3  r = map( ro+rd*t );
                float h = r.x;
                info = r.yz;
                if( h<precis||t>maxd ) break;
                t += h;
            }
        
            if( t>maxd ) t=-1.0;
            return vec3( t, info );
        }
        
        vec3 calcNormal( in vec3 pos, in float t )
        {
            float precis = 0.0001 * t * 0.57;
        
            vec2 e = vec2(1.0,-1.0)*precis;
            return normalize( e.xyy*map( pos + e.xyy ).x + 
                              e.yyx*map( pos + e.yyx ).x + 
                              e.yxy*map( pos + e.yxy ).x + 
                              e.xxx*map( pos + e.xxx ).x );
        }
        
        vec3 forwardSF( float i, float n) 
        {
            const float PI  = 3.141592653589793238;
            const float PHI = 1.618033988749894848;
            float phi = 2.0*PI*fract(i/PHI);
            float zi = 1.0 - (2.0*i+1.0)/n;
            float sinTheta = sqrt( 1.0 - zi*zi);
            return vec3( cos(phi)*sinTheta, sin(phi)*sinTheta, zi);
        }
        
        float calcAO( in vec3 pos, in vec3 nor )
        {
            float ao = 0.0;
            for( int i=0; i<16; i++ )
            {
                vec3 w = forwardSF( float(i), 16.0 );
                w *= sign( dot(w,nor) );
                float h = float(i)/15.0;
                ao += clamp( map( pos + nor*0.01 + w*h*0.15 ).x*2.0, 0.0, 1.0 );
            }
            ao /= 16.0;
            
            return clamp( ao*16.0, 0.0, 1.0 );
        }
        
        
        vec3 textureBox( sampler2D sam, in vec3 pos, in vec3 nor )
        {
            vec3 w = nor*nor*nor ;
            return (w.x*texture( sam, pos.yz ).xyz + 
                    w.y*texture( sam, pos.zx ).xyz + 
                    w.z*texture( sam, pos.xy ).xyz ) / (w.x+w.y+w.z);
        }
        
        vec3 render( in vec3 ro, in vec3 rd )
        {
            vec3 col = vec3(0.0);
            vec3 res = trace( ro, rd );;
            float t = res.x;
            if( t>0.0 )
            {
                vec3  pos = ro + t*rd;
                vec3  nor = calcNormal( pos, t );
                float fre = clamp(1.0+dot(rd,nor),0.0,1.0);
                float occ = pow( clamp(res.z*2.0,0.0,1.0), 1.2 );
                      occ = 1.5*(0.1+0.9*occ)*calcAO(pos,nor);        
                vec3  lin = vec3(1.0,1.0,1.5)*(2.0+fre*fre*vec3(1.8,1.0,1.0))*occ*(1.0-0.5*abs(nor.y));
                
                  col = 0.5 + 0.5*cos( 6.2831*res.y + vec3(0.0,1.0,2.0) );  
                col *= textureBox( iChannel0, pos, nor ).xyz;
                col = col*lin;
                col += 0.6*pow(1.0-fre,32.0)*occ*vec3(0.5,1.0,1.5);        
                col *= exp(-0.3*t);
            }
            col.z += 0.01;
        
            return sqrt(col);
        }
        
        void mainImage( out vec4 fragColor, in vec2 fragCoord )
        {
            float time = iTime*0.15 + 0.005*iMouse.x;
            
            vec3 tot = vec3(0.35);
            #if AA>1
            for( int jj=0; jj<AA; jj++ )
            for( int ii=0; ii<AA; ii++ )
            #else
            int ii = 0, jj = 0;
            #endif
            {
                vec2 q = fragCoord+vec2(float(ii),float(jj))/float(AA);
        
                // camera
                vec3 ro = vec3( 2.8*cos(0.1+.33*time), 0.5 + 0.20*cos(0.37*time), 2.8*cos(0.5+0.35*time) );
                vec3 ta = vec3( 1.9*cos(1.2+.41*time), 0.5 + 0.10*cos(0.27*time), 1.9*cos(2.0+0.38*time) );
                float roll = 0.2*cos(0.1*time);
                vec3 cw = normalize(ta-ro);
                vec3 cp = vec3(sin(roll), cos(roll),0.0);
                vec3 cu = normalize(cross(cw,cp));
                vec3 cv = normalize(cross(cu,cw));
        
                #if 1
                vec2 p = (2.0*q-iResolution.xy)/iResolution.y;
                vec3 rd = normalize( p.x*cu + p.y*cv + 2.0*cw );
                #else
                vec2 p = q/iResolution.xy;
                vec2 an = 3.1415926535898 * (p*vec2(2.0, 1.0) - vec2(0.0,0.5));
                vec3 rd = vec3(cos(an.y) * sin(an.x), sin(an.y), cos(an.y) * cos(an.x));
                #endif
        
                tot += render( ro, rd );
            }
            
            tot = tot/float(AA*AA);
            
            fragColor = vec4( tot*tot, 1.0 );	
        
        }
        
        void mainVR( out vec4 fragColor, in vec2 fragCoord, in vec3 fragRayOri, in vec3 fragRayDir )
        {
            vec3 col = render( fragRayOri + vec3(0.82,1.3,-0.3), fragRayDir );
            fragColor = vec4( col, 1.0 );
        }        
        void main(void)
        {
            mainImage(fragColor, gl_FragCoord.xy);
        }`;

        worker.onmessage = (ev: MessageEvent) => {
            let msg = ev.data as IBus;
            if (msg.topic === "init") {
                worker.postMessage({
                    topic: "start",
                    data: {}
                });
            } else {
                ctx["transferFromImageBitmap"](msg.data.bitmap);
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
                    }]
            }
        }, [this.offScreen]);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let instance = new TestApp();
})
