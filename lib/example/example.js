"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runner = void 0;
let _a = require('../../minified/src/example/a.glsl.js');
let _b = require('../../minified/src/example/b.glsl.js');
let _c = require('../../minified/src/example/c.glsl.js');
let _d = require('../../minified/src/example/d.glsl.js');
let _e = require('../../minified/src/example/e.glsl.js');
let _f = require('../../minified/src/example/f.glsl.js');
const DasSequencer_1 = require("../DasSequencer");
const DR_1 = require("../DR");
const TR_1 = require("../TR");
const mainVertex_1 = require("./mainVertex");
const mainFragment_1 = require("./mainFragment");
const sequencer = new DasSequencer_1.DasSequencer(96, 30);
const a = new DasSequencer_1.Scene("iChannel4", 48, { sI: 4 });
const b = new DasSequencer_1.Scene("iChannel1", 48, { sI: 1 });
const c = new DasSequencer_1.Scene("iChannel2", 48, { sI: 2 });
const d = new DasSequencer_1.Scene("iChannel3", 48, { sI: 3 });
const e = new DasSequencer_1.Scene("iChannel0", 48, { sI: 0 });
const f = new DasSequencer_1.Scene("iChannel5", 48, { sI: 5 });
sequencer.addScene(a);
sequencer.addScene(b);
sequencer.addScene(c);
sequencer.addScene(d);
sequencer.addScene(e);
sequencer.addScene(f);
console.log("sceneToPlay", sequencer.getScenesToPlay(41768.461));
const runner = () => {
    const tr = new TR_1.TR(512, 512);
    /*

    ctx.fillStyle = "#fff";
    let dx = w / 2;
    let dy = h / 2;
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 512 - 40, 512 - 40);
    ctx.stroke();
    ctx.font = "120px 'Arial'";
    ctx.fillText("code	", 28 , 220, w);
    ctx.font = "bold 128px 'Arial'";
    ctx.fillText("BAGZY", 28, 370, w);
   
    */
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
        /*
        dr.aB("iChannel4", mainVertex, bufferEFragment.C(),["iLogo"]); // bufferA 0
        dr.aB("iChannel0", mainVertex, bufferBFragment.C(),["iLogo"]); // bufferA 0
        dr.aB("iChannel1", mainVertex, bufferCFragment.C(),["iLogo"]) // bufferB 1
        dr.aB("iChannel2", mainVertex, bufferDFragment.C(),["iLogo"]) // bufferC 2
        dr.aB("iChannel3", mainVertex, bufferAFragment.C(),["iLogo"]) // bufferC 2

        */
        dr.aB("iChannel4", mainVertex_1.mainVertex, _e, ["iLogo"]); // bufferE 0
        dr.aB("iChannel0", mainVertex_1.mainVertex, _b, ["iLogo"]); // bufferB 1
        dr.aB("iChannel1", mainVertex_1.mainVertex, _c, ["iLogo"]); // bufferC 2
        dr.aB("iChannel2", mainVertex_1.mainVertex, _d, ["iLogo"]); // bufferD 3
        dr.aB("iChannel3", mainVertex_1.mainVertex, _a, ["iLogo"]); // bufferA 4  
        dr.aB("iChannel5", mainVertex_1.mainVertex, _f, ["iLogo"]); // bufferA 4  
    });
    return dr;
};
exports.runner = runner;
const demo = (0, exports.runner)();
let isRunning = false;
document.addEventListener("click", () => {
    if (isRunning)
        return;
    const a = document.querySelector("audio");
    a.play();
    sequencer.onBeat = (beat, scenes) => {
        console.log(scenes, beat);
    };
    const then = performance.now();
    const animate = (t) => {
        let rt = t - then | 0;
        rt = rt < 0 ? 0 : rt;
        sequencer.run(t, (arr, beat) => {
            demo.R(rt / 1000, [arr[0].key], (gl, u) => {
                const scene = arr[0];
                gl.uniform1f(u.get("sI"), scene.uniforms.sI);
            });
        });
        setTimeout(() => {
            requestAnimationFrame(animate);
        }, 60 / 1000);
    };
    animate(0);
    isRunning = true;
});
