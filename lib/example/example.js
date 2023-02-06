"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runner = void 0;
const DR_1 = require("../DR");
const synth_1 = require("./BeepBoxSynth/synth");
const bufferB_1 = require("./bufferB");
const bufferC_1 = require("./bufferC");
const mainFragment_1 = require("./mainFragment");
const mainVertex_1 = require("./mainVertex");
const song_json_1 = __importDefault(require("../example/BeepBoxSynth/song.json"));
let scene = 0;
const runner = () => {
    const dr = new DR_1.DR(document.querySelector("canvas"), mainVertex_1.mainVertex, mainFragment_1.mainFragment, {
        "outTexture": (location, gl, program, time) => {
            gl.uniform1f(location, scene);
        }
    });
    dr.aB("iChannel0", mainVertex_1.mainVertex, bufferB_1.bufferBFragment); // bufferA
    dr.aB("iChannel1", mainVertex_1.mainVertex, bufferC_1.bufferCFragment); // bufferB
    //    dr.sP("iChannel1",false); // toggle render state = iChannel1 will be skipped.
    document.addEventListener("keyup", () => {
        scene = (scene ? 0 : 1);
    });
    return dr;
};
exports.runner = runner;
const demo = (0, exports.runner)();
// fetch(new Request("/src/example/BeepBoxSynth/song.json")) .then((response) => response.json())
// .then((data) => {
document.addEventListener("click", () => {
    document.addEventListener("keydown", (k) => {
        console.log(k.key);
    });
    const p = new synth_1.AP(song_json_1.default);
    p.play();
    demo.run(0, 60);
});
// });
