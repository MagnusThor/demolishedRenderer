"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runner = void 0;
const DRTime_1 = require("../controlls/DRTime");
//let _a = require('../../minified/src/example/scens.glsl.js') ;
const Scene0_1 = require("./Scene0");
const Scene1_1 = require("./Scene1");
const Scene2_1 = require("./Scene2");
const DasSequencer_1 = require("../sequencer/DasSequencer");
const DR_1 = require("../DR");
const mainVertex_1 = require("./mainVertex");
const mainFragment_1 = require("./mainFragment");
const sequencer = new DasSequencer_1.DasSequencer(96, 30);
window["zoom"] = 1;
const a = new DasSequencer_1.Scene("iChannel0", 48, { sI: 0 });
const b = new DasSequencer_1.Scene("iChannel1", 48 * 2, { sI: 1 });
const c = new DasSequencer_1.Scene("iChannel2", 48 * 3, { sI: 2 });
sequencer.addScene(a).addScene(b).addScene(c);
const runner = () => {
    let rafl = 0;
    let isRunning = false;
    let renderTime = 0;
    const animate = (t) => {
        sequencer.run(t, (arr, beat) => {
            demo.R(t / 1000, [arr[0].key], (gl, u) => {
                const scene = arr[0];
                if (u.has("sI"))
                    gl.uniform1f(u.get("sI"), scene.uniforms.sI);
            });
        });
    };
    const drControls = new DRTime_1.DRTime(document.querySelector(".debug"), sequencer);
    drControls.render();
    drControls.onPlaybackChange = (state) => {
        isRunning = state;
        if (state) {
            let then = performance.now();
            const renderLoop = () => {
                rafl = requestAnimationFrame(renderLoop);
                let now = performance.now();
                renderTime = now - then;
                const renderTimeWithOffset = drControls.currentTime * 1000 + renderTime;
                animate(renderTimeWithOffset);
                drControls.updateTimeline(renderTimeWithOffset / 1000);
            };
            renderLoop();
        }
        else {
            cancelAnimationFrame(rafl);
        }
    };
    drControls.onTimelineChange = (time) => {
        animate(time * 1000);
    };
    const dr = new DR_1.DR(document.querySelector("#c"), mainVertex_1.mainVertex, mainFragment_1.mainFragment, {});
    dr.aA({}, () => {
        dr.aB("iChannel0", mainVertex_1.mainVertex, Scene0_1.Scene0, []).aB("iChannel1", mainVertex_1.mainVertex, Scene1_1.Scene1, [], {
            "zoomFactor": (a, b, c, d) => {
                b.uniform1f(a, window["zoom"]);
            }
        }).aB("iChannel2", mainVertex_1.mainVertex, Scene2_1.Scene2, [], {
            "zoomFactor": (a, b, c, d) => {
                b.uniform1f(a, window["zoom"]);
            }
        });
    });
    return dr;
};
exports.runner = runner;
const demo = (0, exports.runner)();
