"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runner = void 0;
const DR_1 = require("../DR");
const Scene0_1 = require("./shaders/Scene0");
const mainFragment_1 = require("./shaders/mainFragment");
const mainVertex_1 = require("./shaders/mainVertex");
class Runner {
    constructor(assets, buffers) {
        this.render = new DR_1.DR(document.querySelector("canvas"), mainVertex_1.mainVertex, mainFragment_1.mainFragment);
        this.render.aA(assets).then((dr) => {
            buffers.forEach(b => {
                this.render.aB(b.name, b.vertex, b.fragment, b.textures, b.customUniforms);
            });
        });
    }
    run(bufferName) {
        const a = (t) => {
            this.render.R(t / 1000, [bufferName], (ctx, u) => {
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
exports.Runner = Runner;
new Runner({}, [{ name: "iChannel0", vertex: mainVertex_1.mainVertex, fragment: Scene0_1.Scene0, textures: [] }]).run("iChannel0");
