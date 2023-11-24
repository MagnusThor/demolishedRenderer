import { IBuf } from "../IBuf";
import { DasSequencer, Scene } from "../sequencer/DasSequencer";
import { Runner } from "./runner";
import { Scene0 } from "./shaders/Scene0";
import { Scene1 } from "./shaders/Scene1";
import { Scene2 } from "./shaders/Scene2";
import { Scene3 } from "./shaders/Scene3";
import { mainVertex } from "./shaders/mainVertex";

export class RunnerW extends Runner {
    seq: DasSequencer;

    constructor(bpm: number, tickPerbeat: number,
        assets: any,
        buffers: Array<IBuf>, scenes: Array<Scene>) {
        super(assets, buffers);
        this.seq = new DasSequencer(bpm, tickPerbeat);

        scenes.forEach(s => {
            this.seq.addScene(s);
        });
    }

    run(): void {
        const a = (t: number) => {

            this.seq.run(t, (arr, beat) => {
                const scene = arr[0];
                this.render.R(t / 1000, [scene.key], (ctx: WebGLRenderingContext, u: Map<string, WebGLUniformLocation>) => {
                    if (u.has("sI")) {

                        ctx.uniform1f(u.get("sI"), scene.uniforms.sI);
                    }
                });
            });
        }
        let rafl = 0;
        let rt = 0, then = 0;
        const renderLoop = () => {
            rafl = requestAnimationFrame(renderLoop);
            rt = performance.now() - then;
            a(rt);
        }
        renderLoop();
    }
}
// set up a sequence of scenes
const scenes = new Array<Scene>(new Scene("iChannel0", 48, { sI: 0 }), new Scene("iChannel1", 48 * 2, { sI: 1 }),
    new Scene("iChannel2", 48, { sI: 2 }), new Scene("iChannel3", 48, { sI: 3 }));




new RunnerW(96, 30, {}, [{ name: "iChannel0", vertex: mainVertex, fragment: Scene0, textures: [] },
{ name: "iChannel1", vertex: mainVertex, fragment: Scene1, textures: [] },
{ name: "iChannel2", vertex: mainVertex, fragment: Scene2, textures: [] },
{ name: "iChannel3", vertex: mainVertex, fragment: Scene3, textures: [] }

],scenes).run();


