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
const TR_1 = require("../TR");
const mainVertex_1 = require("./mainVertex");
const mainFragment_1 = require("./mainFragment");
const sequencer = new DasSequencer_1.DasSequencer(96, 30);
window["zoom"] = 1;
const a = new DasSequencer_1.Scene("iChannel0", 48, { sI: 0 });
const b = new DasSequencer_1.Scene("iChannel1", 48 * 2, { sI: 1 });
const c = new DasSequencer_1.Scene("iChannel2", 48 * 3, { sI: 2 });
sequencer.addScene(a).addScene(b).addScene(c);
let offset = 0;
const runner = () => {
    const animate = (t) => {
        sequencer.run(t, (arr, beat) => {
            demo.R(t / 1000, [arr[0].key], (gl, u) => {
                const scene = arr[0];
                if (u.has("sI"))
                    gl.uniform1f(u.get("sI"), scene.uniforms.sI);
            });
        });
    };
    const tr = new TR_1.TR(512, 512);
    const drControls = new DRTime_1.DRTime(document.querySelector(".debug"), sequencer);
    drControls.render();
    let rafl = 0;
    drControls.onPlaybackChange = (state) => {
        if (state) {
            let then = performance.now();
            const doit = () => {
                rafl = requestAnimationFrame(doit);
                let now = performance.now();
                let offset = now - then;
                console.log(offset, offset + (drControls.currentTime));
                const vvb = drControls.currentTime * 1000 + offset;
                animate(vvb);
                drControls.updateTimeline(vvb / 1000);
            };
            doit();
        }
        else {
            cancelAnimationFrame(rafl);
        }
    };
    drControls.onTimelineChange = (time) => {
        console.log(time);
        animate(time * 1000);
        offset = time * 1000;
    };
    tr.A(new TR_1.E2D("iLogo", (t, cs, x) => {
        const c = "#fff";
        x.fillStyle = c;
        x.strokeStyle = c;
        x.lineWidth = 10;
        x.strokeRect(20, 20, 512 - 40, 512 - 40);
        x.stroke();
        x.font = "120px 'Arial'";
        x.fillText("FRUIT", 80, 160);
        x.fillText("LOOM", 80, 430);
        x.font = "100px 'Arial'";
        x.fillText("OF the", 100, 280);
    }));
    const dr = new DR_1.DR(document.querySelector("#c"), mainVertex_1.mainVertex, mainFragment_1.mainFragment, {});
    dr.aA({
        "iLogo": {
            src: tr.R(10).data()
        }
    }, () => {
        dr.aB("iChannel0", mainVertex_1.mainVertex, Scene0_1.Scene0, ["iLogo"]).aB("iChannel1", mainVertex_1.mainVertex, Scene1_1.Scene1, ["iLogo"], {
            "zoomFactor": (a, b, c, d) => {
                b.uniform1f(a, window["zoom"]);
            }
        }).aB("iChannel2", mainVertex_1.mainVertex, Scene2_1.Scene2, ["iLogo"], {
            "zoomFactor": (a, b, c, d) => {
                b.uniform1f(a, window["zoom"]);
            }
        });
    });
    return dr;
};
exports.runner = runner;
const demo = (0, exports.runner)();
let isRunning = false;
//document.addEventListener("click", () => {
// if (isRunning) return;    
// const a = document.querySelector("audio") as HTMLAudioElement;
// a.play();
// sequencer.onBeat = (beat:number,scenes) => {
//     console.log(scenes,beat);
// };
// animate(0);
// isRunning = true;
//});
