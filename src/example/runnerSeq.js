"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunnerW = void 0;
const DasSequencer_1 = require("../sequencer/DasSequencer");
const runner_1 = require("./runner");
const Scene0_1 = require("./shaders/Scene0");
const Scene1_1 = require("./shaders/Scene1");
const Scene2_1 = require("./shaders/Scene2");
const Scene3_1 = require("./shaders/Scene3");
const mainVertex_1 = require("./shaders/mainVertex");
class RunnerW extends runner_1.Runner {
    constructor(bpm, tickPerbeat, assets, buffers, scenes) {
        super(assets, buffers);
        this.seq = new DasSequencer_1.DasSequencer(bpm, tickPerbeat);
        scenes.forEach(s => {
            this.seq.addScene(s);
        });
    }
    run() {
        const a = (t) => {
            this.seq.run(t, (arr, beat) => {
                const scene = arr[0];
                this.render.R(t / 1000, [scene.key], (ctx, u) => {
                    if (u.has("sI")) {
                        ctx.uniform1f(u.get("sI"), scene.uniforms.sI);
                    }
                });
            });
        };
        let rafl = 0;
        let rt = 0, then = 0;
        const renderLoop = () => {
            rafl = requestAnimationFrame(renderLoop);
            rt = performance.now() - then;
            a(rt);
        };
        renderLoop();
    }
}
exports.RunnerW = RunnerW;
// set up a sequence of scenes
const scenes = new Array(new DasSequencer_1.Scene("iChannel0", 48, { sI: 0 }), new DasSequencer_1.Scene("iChannel1", 48 * 2, { sI: 1 }), new DasSequencer_1.Scene("iChannel2", 48, { sI: 2 }), new DasSequencer_1.Scene("iChannel3", 48, { sI: 3 }));
new RunnerW(96, 30, {}, [{ name: "iChannel0", vertex: mainVertex_1.mainVertex, fragment: Scene0_1.Scene0, textures: [] },
    { name: "iChannel1", vertex: mainVertex_1.mainVertex, fragment: Scene1_1.Scene1, textures: [] },
    { name: "iChannel2", vertex: mainVertex_1.mainVertex, fragment: Scene2_1.Scene2, textures: [] },
    { name: "iChannel3", vertex: mainVertex_1.mainVertex, fragment: Scene3_1.Scene3, textures: [] }
], scenes).run();
