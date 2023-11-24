import { DR } from "../DR";
import { IBuf } from "../IBuf";
import { Scene0 } from "./shaders/Scene0";
import { mainFragment } from "./shaders/mainFragment";
import { mainVertex } from "./shaders/mainVertex";

export class Runner {
    render: DR;
    constructor(assets:any,buffers:Array<IBuf>){
        this.render = new DR(document.querySelector("canvas"),mainVertex,mainFragment);
        this.render.aA(assets).then( (dr) => {
            buffers.forEach( b => {
                this.render.aB(b.name,b.vertex,b.fragment,b.textures,b.customUniforms);  
            })
        });
    }
    run(bufferName:string):void{
        const a = (t: number) => {
                this.render.R(t / 1000, [bufferName], (ctx: WebGLRenderingContext, u: Map<string, WebGLUniformLocation>) => {
                });
        }
        let rafl =0;
        let rt  = 0,then = 0;
        const renderLoop = () => {
            rafl = requestAnimationFrame(renderLoop);
            rt = performance.now() - then;
            a(rt);
        }
        renderLoop();    
    }
}
new Runner({},[{name:"iChannel0",vertex: mainVertex, fragment: Scene0,textures:[]}]).run("iChannel0");