import { DR } from "../src/DR";
//import { TextureBase, TextureGen } from 'demolishedtexture'

import bufferA from "../test/glsl/volcanic-frag.glsl";
import mainImage from "../test/glsl/volcanic-main.glsl";
import mainTexture from "../test/glsl/mainTexture.glsl";
import noiseFrag from "../test/glsl/noise.texture.frag.glsl";

// import bufferA from "../test/glsl/orbital-frag.glsl";
// import mainImage from "../test/glsl/mainImage.glsl";

import Stats from 'stats.js'

export class TestApp {
    canvas: HTMLCanvasElement;
    stats: any;
    constructor() {

        this.stats = new Stats();

        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom);

        this.canvas = document.querySelector("canvas") as HTMLCanvasElement;

        // generate a noise texture using demoloshedTexture, not in use but illustrates how to generate
        // textures.
        // const noise = TextureGen.G(256, 256, function (pixel: any, x: number, y: number, w: any, h: any, v: any) {
        //     x /= w; y /= h;
        //     var s = 1024;                           
        //     var r,g,b: number;
        //     r = Math.round(256 * this.noise(s * x, s * y, .2));
        //     g = Math.round(256 * this.noise(s * x, s * y, 0.6));
        //     b = Math.round(256 * this.noise(s * x, s * y, .8));
        //     return [r, g, b || 8]; 
        // });

        const loop = (t: number) => {
            this.stats.begin();
            dr.R(t / 1000);
            this.stats.end();
            requestAnimationFrame(loop);
        };

        const vertex = `layout(location = 0) in vec2 pos; 
        out vec4 fragColor;
        void main(){gl_Position = vec4(pos.xy,0.0,1.0);
        }`;

        let dr = new DR(this.canvas, vertex, mainImage);

        let iqNoise = DR.gT(vertex,mainTexture,vertex,noiseFrag,256,256);

        const base64 = iqNoise.toDataURL();

        console.log("base 64");

    
        // to use demolishedTexture call i.e noise.toBase64()
        let volcanicTexture = {
            "iChannel2": {
                unit: 33987,
                src: "/test/assets/texture2.jpg"
            },
            "iChannel1": {
                unit: 33986,
                src: "/test/assets/texture.jpg"
            },
            "iChannel0": {
                unit: 33985,
                src: "/test/assets/noise.png"
            }
        };
        // src: "/test/assets/noise.png"
        /*
            volcanic textures
        {
            "iChannel2": {
                unit: 33987,
                src: "/test/assets/texture.jpg"
            },
            "iChannel1": {
                unit: 33986,
                src: "/test/assets/texture2.jpg"
            },
            "iChannel0": {
                unit: 33985,
                src: "/test/assets/noise.png"
            }
        };
        }
        */

        let orbitalTextures =
        {
            "iChannel1": {
                unit: 33985,
                src: "/test/assets/texture2.jpg"
            },
        };
        dr.aA(volcanicTexture, () => {
            // iChannel0", "iChannel1", "iChannel2"
            dr.aB("bufferA", vertex, bufferA, ["iChannel0", "iChannel1", "iChannel2"]);
            let ts = parseInt(location.hash.replace("#", ""));
            loop(ts || performance.now());
        });
    }
}


//document.addEventListener("DOMContentLoaded", () => {

let instance = new TestApp();

//})
