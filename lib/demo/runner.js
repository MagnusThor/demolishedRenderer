"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runner = void 0;
const DRTime_1 = require("../controlls/DRTime");
const DasSequencer_1 = require("../sequencer/DasSequencer");
const DR_1 = require("../DR");
const mainVertex_1 = require("./shaders/mainVertex");
const mainFragment_1 = require("./shaders/mainFragment");
const DRSound_1 = require("../sound/DRSound");
const Scenes_1 = require("./shaders/Scenes");
const sequencer = new DasSequencer_1.DasSequencer(96, 30);
window["zoom"] = 1;
const a = new DasSequencer_1.Scene("iChannel0", 186000, { sI: 0 });
sequencer.addScene(a);
const runner = () => {
    let rafl = 0;
    let isRunning = false;
    let renderTime = 0;
    let audio = new DRSound_1.DemolishedStreamingMusic();
    const drControls = new DRTime_1.DRTime(document.querySelector(".debug"), sequencer);
    drControls.render();
    audio.createAudio({
        audioFile: "src/example/Virgill - Rhodium.mp3",
        audioAnalyzerSettings: { smoothingTimeConstant: 0.85, fftSize: 4096 }
    }).then(r => {
        if (r)
            document.querySelector(".debug").classList.remove("hide");
    });
    const timeEl = DRTime_1.DOMUtils.get(".frame-info time");
    const beatEl = DRTime_1.DOMUtils.get(".frame-info mark");
    const animate = (t) => {
        sequencer.run(t, (arr, beat) => {
            demo.R(t / 1000, [arr[0].key], (gl, u) => {
                const scene = arr[0];
                if (u.has("sI"))
                    gl.uniform1f(u.get("sI"), scene.uniforms.sI);
                const ct = sequencer.msToMinutesAndSeconds(t);
                beatEl.innerText = `${ct.minutes}:${ct.seconds}`;
                timeEl.innerText = Math.round(t).toFixed(0);
            });
        });
    };
    DRTime_1.DOMUtils.get(".frame-info button").addEventListener("click", () => {
        DRTime_1.DOMUtils.get(".uniforms div").classList.toggle("hide");
    });
    drControls.onPlaybackChange = (state) => {
        isRunning = state;
        if (state) {
            audio.currentTime = drControls.currentTime;
            audio.play();
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
            audio.stop();
            cancelAnimationFrame(rafl);
        }
    };
    drControls.onTimelineChange = (time) => {
        animate(time * 1000);
        audio.currentTime = time;
    };
    const dr = new DR_1.DR(document.querySelector("#c"), mainVertex_1.mainVertex, mainFragment_1.mainFragment, {});
    dr.aA({}, () => {
        dr.aB("iChannel0", mainVertex_1.mainVertex, Scenes_1.Scene0, []);
    });
    return dr;
};
exports.runner = runner;
const demo = (0, exports.runner)();
