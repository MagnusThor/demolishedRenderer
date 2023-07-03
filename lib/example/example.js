"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runner = void 0;
const DRTime_1 = require("../controlls/DRTime");
const Scene0_1 = require("./Scene0");
const Scene1_1 = require("./Scene1");
const Scene2_1 = require("./Scene2");
const Scene3_1 = require("./Scene3");
const DasSequencer_1 = require("../sequencer/DasSequencer");
const DR_1 = require("../DR");
const mainVertex_1 = require("./mainVertex");
const mainFragment_1 = require("./mainFragment");
const DRSound_1 = require("../sound/DRSound");
const sequencer = new DasSequencer_1.DasSequencer(96, 30);
window["zoom"] = 1;
const a = new DasSequencer_1.Scene("iChannel0", 48, { sI: 0 });
const b = new DasSequencer_1.Scene("iChannel1", 48 * 2, { sI: 1 });
const c = new DasSequencer_1.Scene("iChannel2", 48, { sI: 2 });
const d = new DasSequencer_1.Scene("iChannel3", 48, { sI: 3 });
sequencer.addScene(a).addScene(b).addScene(c).addScene(d);
const runner = () => {
    let rafl = 0;
    let isRunning = false;
    let renderTime = 0;
    let audio = new DRSound_1.DemolishedStreamingMusic();
    let peeks = new Array();
    const drControls = new DRTime_1.DRTime(document.querySelector(".debug"), sequencer);
    drControls.render();
    audio.createAudio({
        audioFile: "src/example/Virgill - Rhodium.mp3",
        audioAnalyzerSettings: { smoothingTimeConstant: 0.85, fftSize: 4096 }
    }).then(r => {
        // peeks = DemolishedSoundPeaks.peaks(audio.audioBuffer,1024)
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
        dr.aB("iChannel0", mainVertex_1.mainVertex, Scene0_1.Scene0, []).aB("iChannel1", mainVertex_1.mainVertex, Scene1_1.Scene1, [], {
            "zoomFactor": (a, b) => {
                b.uniform1f(a, window["zoom"]);
            }
        }).aB("iChannel2", mainVertex_1.mainVertex, Scene2_1.Scene2, [], {
            "zoomFactor": (a, b) => {
                b.uniform1f(a, window["zoom"]);
            }
        }).aB("iChannel3", mainVertex_1.mainVertex, Scene3_1.Scene3, [], {
            "zoomFactor": (a, b) => {
                b.uniform1f(a, window["zoom"]);
            }
        });
    });
    return dr;
};
exports.runner = runner;
const demo = (0, exports.runner)();
