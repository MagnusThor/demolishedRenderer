"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleEditor = void 0;
const DRTime_1 = require("../controlls/DRTime");
const DRUniforms_1 = require("../controlls/DRUniforms");
const DOMUtils_1 = require("../controlls/DOMUtils");
const Scene0_1 = require("./shaders/Scene0");
const Scene1_1 = require("./shaders/Scene1");
const Scene2_1 = require("./shaders/Scene2");
const Scene3_1 = require("./shaders/Scene3");
const DasSequencer_1 = require("../sequencer/DasSequencer");
const mainVertex_1 = require("./shaders/mainVertex");
const mainFragment_1 = require("./shaders/mainFragment");
const DRSound_1 = require("../sound/DRSound");
const DRExt_1 = require("../DRExt");
const DRSourceEditor_1 = require("../controlls/DRSourceEditor");
/**
* This is just a concept of how to control time and rendering flow using sequencer
* will implement ann editor and make it similar to the demolished Editor project.
* @return {*}
*/
class SimpleEditor {
    constructor(buffers, sequencer) {
        this.buffers = buffers;
        this.sequencer = sequencer;
        this.rafl = 0;
        this.renderTime = 0;
        this.audio = new DRSound_1.DemolishedStreamingMusic();
        this.dr = new DRExt_1.DRExt(DOMUtils_1.DOMUtils.get("canvas"), mainVertex_1.mainVertex, mainFragment_1.mainFragment, {});
        this.drTimeline = new DRTime_1.DRTime(DOMUtils_1.DOMUtils.get(".top-controls"), sequencer);
        this.drUniforms = new DRUniforms_1.DRUniforms(DOMUtils_1.DOMUtils.get("#modals"), this.dr);
        this.drSourceEditor = new DRSourceEditor_1.DRSourceEditor(DOMUtils_1.DOMUtils.get("#modals"));
        this.drTimeline.render();
        this.drUniforms.render();
        this.drSourceEditor.render();
        const animate = (t) => {
            sequencer.run(t, (arr, beat) => {
                this.dr.R(t / 1000, [arr[0].key], (gl, u) => {
                    this.currentScene = arr[0];
                    if (u.has("sI"))
                        gl.uniform1f(u.get("sI"), this.currentScene.uniforms.sI);
                    const ct = sequencer.msToMinutesAndSeconds(t);
                    const timeEl = DOMUtils_1.DOMUtils.get(".frame-info time");
                    const beatEl = DOMUtils_1.DOMUtils.get(".frame-info mark");
                    beatEl.innerText = `${ct.minutes}:${ct.seconds}`;
                    timeEl.innerText = Math.round(t).toFixed(0);
                });
            });
        };
        this.drTimeline.onPlaybackChange = (state) => {
            if (state) {
                this.audio.currentTime = this.drTimeline.currentTime;
                this.audio.play();
                let then = performance.now();
                const renderLoop = () => {
                    this.rafl = requestAnimationFrame(renderLoop);
                    let now = performance.now();
                    this.renderTime = now - then;
                    const renderTimeWithOffset = this.drTimeline.currentTime * 1000 + this.renderTime;
                    animate(renderTimeWithOffset);
                    this.drTimeline.updateTimeline(renderTimeWithOffset / 1000);
                };
                renderLoop();
            }
            else {
                this.audio.stop();
                cancelAnimationFrame(this.rafl);
            }
        };
        this.drTimeline.onTimelineChange = (time) => {
            animate(time * 1000);
            this.audio.currentTime = time;
        };
        // uniform editor
        DOMUtils_1.DOMUtils.get("#btn-uniforms").addEventListener("click", () => {
            console.log("1");
            this.drUniforms.update();
        });
        DOMUtils_1.DOMUtils.get("#mod-source").addEventListener("shown.bs.modal", (e) => {
            console.log("2");
            DOMUtils_1.DOMUtils.get("#video-render-result").classList.toggle("d-none");
            const stream = DOMUtils_1.DOMUtils.get("canvas").captureStream();
            DOMUtils_1.DOMUtils.get("video").srcObject = stream;
        });
        DOMUtils_1.DOMUtils.get("#mod-source").addEventListener("hidden.bs.modal", (e) => {
            DOMUtils_1.DOMUtils.get("#video-render-result").classList.toggle("d-none");
        });
        // source (fragment shader editor)
        // todo: move to DRSourceEditor
        this.drSourceEditor.onBuild = (r) => {
            this.dr.updateShaderProgram(this.currentScene.key, r).then(shader => {
                DOMUtils_1.DOMUtils.get(".badge").textContent = "0";
                //     DOMUtils.get("#apply-source").removeAttribute("disabled");
                let errorNodes = DOMUtils_1.DOMUtils.getAll(".error-info");
                errorNodes.forEach((el) => {
                    el.classList.remove("error-info");
                });
                this.dr.aB(this.currentScene.key, mainVertex_1.mainVertex, shader);
            }).catch((errors) => {
                DOMUtils_1.DOMUtils.get(".badge").textContent = errors.length.toString();
                //  DOMUtils.get("#apply-source").setAttribute("disabled","disabled");
                this.drSourceEditor.markErrors(errors);
            });
        };
        DOMUtils_1.DOMUtils.get("#btn-source").addEventListener("click", () => {
            // get the fragment source from the sequence by time;
            const scene = this.sequencer.getScenesToPlay(this.sequencer.time);
            const buffer = this.buffers.find(pre => {
                return pre.name == scene[0].key;
            });
            this.drSourceEditor.update(buffer.fragment);
        });
        // add assets, in this case none, add 4 buffers and await compile and done.
        this.dr.aA({}).then(a => {
            this.dr.abS(buffers)
                .then(dr => {
                const readyButton = DOMUtils_1.DOMUtils.get("#btn-init");
                readyButton.removeAttribute("disabled");
                readyButton.textContent = "Click to initialize";
                readyButton.addEventListener("click", () => {
                    readyButton.textContent = "Please wait...";
                    readyButton.setAttribute("disabled", "disabled");
                    this.audio.createAudio({
                        audioFile: "/editor/audio/Virgill - Rhodium.mp3",
                        audioAnalyzerSettings: { smoothingTimeConstant: 0.85, fftSize: 4096 }
                    }).then(r => {
                        readyButton.remove();
                        DOMUtils_1.DOMUtils.getAll(".await-init").forEach(el => {
                            el.classList.remove("d-none");
                        });
                    });
                });
            }).catch(err => {
                console.log(err);
            });
        });
    }
}
exports.SimpleEditor = SimpleEditor;
const sequencer = new DasSequencer_1.DasSequencer(96, 30);
const a = new DasSequencer_1.Scene("iChannel0", 48, { sI: 0 });
const b = new DasSequencer_1.Scene("iChannel1", 48, { sI: 1 });
const c = new DasSequencer_1.Scene("iChannel2", 48, { sI: 2 });
const d = new DasSequencer_1.Scene("iChannel3", 48 * 2, { sI: 3 });
sequencer.addScenes([a, , b, c, d]);
let buffers = [
    { name: "iChannel0", vertex: mainVertex_1.mainVertex, fragment: Scene0_1.Scene0, textures: [] },
    { name: "iChannel1", vertex: mainVertex_1.mainVertex, fragment: Scene1_1.Scene1, textures: [] },
    { name: "iChannel2", vertex: mainVertex_1.mainVertex, fragment: Scene2_1.Scene2, textures: [] },
    { name: "iChannel3", vertex: mainVertex_1.mainVertex, fragment: Scene3_1.Scene3, textures: [] }
];
let demo = new SimpleEditor(buffers, sequencer);
