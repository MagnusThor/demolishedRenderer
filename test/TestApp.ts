import { DR } from "../src/DR";

import iChannel0 from "../test/glsl/iChannel0.glsl";
import mainImage from "../test/glsl/mainImage.glsl";

export class TestApp {
    mainCanvas: HTMLCanvasElement;
    constructor() {
        this.mainCanvas = document.querySelector("canvas") as HTMLCanvasElement;

        const loop = (t: number) => {
            dr.R(t / 1000);
            requestAnimationFrame(loop);
        };

        const vertex = `layout(location = 0) in vec2 pos; 
        out vec4 fragColor;
        void main(){gl_Position = vec4(pos.xy,0.0,1.0);
        }`;

        let dr = new DR(this.mainCanvas, vertex, mainImage);

        let textures =
        {
            "iChannel1": {
                num: 33985,
                src: "/test/assets/texture.jpg"
            }
        };
        dr.aA(textures, () => {
            dr.aB("iChannel0", vertex, iChannel0, ["iChannel1"]);
            // loop(0);
            dr.R(10.00);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let instance = new TestApp();
})
