import { DR } from "../src/DR";
import bufferA from "../test/glsl/hope.frag.glsl";
import mainImage from "../test/glsl/hope.vert.glsl";
export class Hope {
    static I():Hope{
        return new Hope();
    }
    constructor() {
        const L = (t: number) => {
            dr.R(t / 1000);
            requestAnimationFrame(L);        
        };
        const vertex = `layout(location = 0) in vec2 pos; 
        out vec4 fragColor;
        void main(){
            gl_Position = vec4(pos.xy,0.0,1.0);
        }`;
        let dr = new DR(document.querySelector("canvas#w") as HTMLCanvasElement,vertex, mainImage);
        dr.aA({}, () => {
            console.log("!..");
            dr.aB("bufferA", vertex, bufferA);
            let ts = parseInt(location.hash.replace("#", ""));
            L(ts || performance.now());
        });
    }
}
//document.addEventListener("DOMContentLoaded", () => {
    window.setTimeout( () =>
   Hope.I(),2000);
//});
