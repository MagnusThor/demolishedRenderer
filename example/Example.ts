import { DR } from "../src/DR";
import { BUFFER_A_FRAG } from "./shaders/bufferA_frag";
import { BUFFER_B_FRAG } from "./shaders/bufferB_frag";
import { BUFFER_A_VERTEX } from "./shaders/bufferA_vertex";
import { MAINFRAG } from "./shaders/main_frag";
import { MAINVERTEX } from "./shaders/main_vertex";



document.addEventListener("DOMContentLoaded", () => {
    const dr = new DR(document.querySelector("canvas"), MAINVERTEX, MAINFRAG);
    const maxFps = 25;
    let startTime = null;
    let frame = -1;
    const renderLoop = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        let segment = Math.floor((timestamp - startTime) / (1000 / maxFps));
        if (segment > frame) {
            frame = segment;
            dr.R(timestamp / 1000);
        }
        requestAnimationFrame(renderLoop);
    };
    const assets = {
        "iChannel0": {
            src: "assets/channel0.jpg"
        },
        "iChannel1": {
            src: "assets/channel1.jpg"
        },
        "iChannel2": {
            src: "assets/channel2.jpg"
        }
    };
    dr.aA(assets, () => {
        dr.aB("bufferA", BUFFER_A_VERTEX, BUFFER_A_FRAG, ["iChannel0","iChannel1"])
        dr.aB("bufferB", BUFFER_A_VERTEX, BUFFER_B_FRAG, ["iChannel0","iChannel1","iChannel2"])
        
        renderLoop(0);
    });
});