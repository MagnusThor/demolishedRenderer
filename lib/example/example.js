"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runner = void 0;
const DR_1 = require("../DR");
const bufferA_1 = require("./bufferA");
const bufferB_1 = require("./bufferB");
const bufferC_1 = require("./bufferC");
const bufferD_1 = require("./bufferD");
const bufferE_1 = require("./bufferE");
const mainFragment_1 = require("./mainFragment");
const mainVertex_1 = require("./mainVertex");
const synth_1 = require("./synth/synth");
// total time 2.5 mins, 150 000 ms
// seg = (duration_ms/441*2*10)
// sceneDuration = scene_duration_ms/s
const t = DR_1.SQ.sceneDuration(180000, 50000);
const sequence = [
    [4.41, 0x0000 | 0x4000, 4, ["iChannel4"]],
    [4.41, 0x0000 | 0x4000, 1, ["iChannel1"]],
    [4.41, 0x0000 | 0x4000, 2, ["iChannel2"]],
    [4.41, 0x0020 | 0x6000, 3, ["iChannel3"]],
    [4.41, 0x0020 | 0x6000, 0, ["iChannel0"]], ,
    [255, 0x0000 | 0x0000, 0, []] // end
];
const runner = () => {
    const dr = new DR_1.DR(document.querySelector("canvas"), mainVertex_1.mainVertex, mainFragment_1.mainFragment, {}, { data: sequence, duration: 180000 });
    dr.aB("iChannel0", mainVertex_1.mainVertex, bufferB_1.bufferBFragment); // bufferA 0
    dr.aB("iChannel1", mainVertex_1.mainVertex, bufferC_1.bufferCFragment); // bufferB 1
    dr.aB("iChannel2", mainVertex_1.mainVertex, bufferD_1.bufferDFragment); // bufferC 2
    dr.aB("iChannel3", mainVertex_1.mainVertex, bufferA_1.bufferAFragment); // bufferC 2  
    dr.aB("iChannel4", mainVertex_1.mainVertex, bufferE_1.bufferEFragment); // bufferA 0
    document.addEventListener("keyup", () => {
    });
    return dr;
};
exports.runner = runner;
const demo = (0, exports.runner)();
let isRunning = false;
document.addEventListener("click", () => {
    if (isRunning)
        return;
    const synth = new synth_1.Synth("9n31s0k0l00e0jt22a7g0nj07r1i0o432T0v1ue2f0q8y10m723d08w5h3E1b8T1v1u01f0qwx10p711d03A5F9B9Q0001PfaedE4b762663777T1v0ufbf0q00d02A0F0B0Q9000Pf000E250617T4v1u04f0q0x10p71z6666ji8k8k3jSBKSJJAArriiiiii07JCABrzrrrrrrr00YrkqHrsrrrrjr005zrAqzrjzrrqr1jRjrqGGrrzsrsA099ijrABJJJIAzrrtirqrqjqixzsrAjrqjiqaqqysttAJqjikikrizrHtBJJAzArzrIsRCITKSS099ijrAJS____Qg99habbCAYrDzh00E1bib000hd3ghd3g000004h4h4h4h4h4h4g004h8h4h8h4h8h4g000000000000000000p22pFE-547hlhjgnQAs2ptdMvoVJdHYkSnM8V8zwOeMzSyeEzF8X2caqfVjjjjjjjbh3jjcsgQQwaqfUhQ4t17ghQ4t17ghQ4uwhQ4t17ghIOYmCnyyz9bsyyz9bIyyz9X8EE0FEO17ghQ4t17ghQ4t17ghw0");
    synth.play();
    demo.run(0, 60);
    isRunning = true;
});
