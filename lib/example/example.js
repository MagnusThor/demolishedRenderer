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
const sequence = [
    [4.41, 0x0000 | 0x4000, 4, ["iChannel4"]],
    [4.41, 0x0000 | 0x4000, 1, ["iChannel1"]],
    [4.41, 0x0000 | 0x4000, 2, ["iChannel2"]],
    [4.41, 0x0020 | 0x6000, 3, ["iChannel3"]],
    [4.41, 0x0020 | 0x6000, 0, ["iChannel0"]],
    [4.41, 0x0020 | 0x6000, 5, ["iChannel5"]],
    [255, 0x0000 | 0x0000, 0, []] // end
];
const sequencer = new DasSequencer_1.DasSequencer(82, 60);
const a = new DasSequencer_1.Scene(16);
const b = new DasSequencer_1.Scene(32);
const c = new DasSequencer_1.Scene(16);
sequencer.addScene("scene a", a);
sequencer.addScene("scene b", b);
sequencer.addScene("scene c", c);
const runner = () => {
    const tr = new TR_1.TR(512, 512);
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
    const dr = new DR_1.DR(document.querySelector("#c"), mainVertex_1.mainVertex, mainFragment_1.mainFragment, {}, { data: sequence, duration: 150000 });
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
    demo.run(0, 60, performance.now(), (t) => {
        sequencer.run(t, (arr) => {
        });
    });
    isRunning = true;
});
