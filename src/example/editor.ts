import { DRTime } from "../controlls/DRTime";
import { DRUniforms } from "../controlls/DRUniforms";
import { clampWithWrapped, DOMUtils } from "../controlls/DOMUtils";

import { Scene0 } from "./shaders/Scene0";
import { Scene1 } from "./shaders/Scene1";
import { Scene2 } from "./shaders/Scene2";
import { Scene3 } from "./shaders/Scene3";
import { Scene4 } from "./shaders/Scene4";

import { DasSequencer, Scene } from "../sequencer/DasSequencer";
import { DR } from "../DR"

import { mainVertex } from "./shaders/mainVertex";
import { mainFragment } from './shaders/mainFragment';
import { DemolishedStreamingMusic } from "../sound/DRSound";
import { DRExt } from "../DRExt";

import { DRSourceEditor, ShaderError } from "../controlls/DRSourceEditor";
import { IBuf } from "../IBuf";


/**
* This is just a concept of how to control time and rendering flow using sequencer
* will implement ann editor and make it similar to the demolished Editor project.
* @return {*} 
*/


export class SimpleEditor {
    rafl: number;
    renderTime: number;
    dr: DRExt;
    audio: DemolishedStreamingMusic;
    drTimeline: DRTime;
    drUniforms: DRUniforms;
    drSourceEditor: DRSourceEditor;
    currentScene: Scene;
    isEditing: boolean;

    constructor(public buffers: Array<IBuf>, public sequencer: DasSequencer) {

        this.rafl = 0;
        this.renderTime = 0;
        this.audio = new DemolishedStreamingMusic();

        this.dr = new DRExt(DOMUtils.get("canvas"), mainVertex, mainFragment, {});


        this.drTimeline = new DRTime(DOMUtils.get(".top-controls"), sequencer);

        this.drUniforms = new DRUniforms(DOMUtils.get("#modals"), this.dr);

        this.drSourceEditor = new DRSourceEditor(DOMUtils.get("#modals"),
            Array.from(this.sequencer.scenes.keys())
        );

        this.drTimeline.render();
        this.drUniforms.render();
        this.drSourceEditor.render();

        const animate = (t: number) => {
            
            // ensue time 

            t = clampWithWrapped(t,1000,sequencer.duration*1000);
            

            sequencer.run(t, (arr, beat) => {
                this.dr.R(t / 1000, [arr[0].key], (gl: WebGLRenderingContext, u: Map<string, WebGLUniformLocation>) => {
                    this.currentScene = arr[0];

                    if (u.has("sI"))
                        gl.uniform1f(u.get("sI"), this.currentScene.uniforms.sI);

                    const ct = sequencer.msToMinutesAndSeconds(t);

                    const timeEl = DOMUtils.get(".frame-info time");
                    const beatEl = DOMUtils.get(".frame-info mark");

                    beatEl.innerText = `${ct.minutes}:${ct.seconds}`;
                    timeEl.innerText = Math.round(t).toFixed(0);

                })
            });
        }


        // clampWithWrapped
        this.drTimeline.onPlaybackChange = (state) => {
            if (state) {
                this.audio.currentTime = this.drTimeline.currentTime;
                this.audio.play();
                let then = performance.now();
                const renderLoop = () => {
                    this.rafl = requestAnimationFrame(renderLoop);
                    let now = performance.now();
                    this.renderTime = now - then;
                    let renderTimeWithOffset = this.drTimeline.currentTime * 1000 + this.renderTime;

                    if (this.isEditing)  renderTimeWithOffset = clampWithWrapped(renderTimeWithOffset,
                        this.currentScene.msStart,this.currentScene.msStop)

                    animate(renderTimeWithOffset);
                    if(!this.isEditing)
                        this.drTimeline.updateTimeline(renderTimeWithOffset / 1000);
                }
                renderLoop();
            } else {
                this.audio.stop();
                cancelAnimationFrame(this.rafl);
            }
        }
        this.drTimeline.onTimelineChange = (time) => {
            animate(time * 1000);
            this.audio.currentTime = time;
        }

        // uniform editor
        DOMUtils.get("#btn-uniforms").addEventListener("click", () => {
            this.drUniforms.update();
        });


        DOMUtils.get("#mod-source").addEventListener("shown.bs.modal", (e) => {
            this.isEditing = true;
            DOMUtils.get("#video-render-result").classList.toggle("d-none");
            const stream = DOMUtils.get<HTMLCanvasElement>("canvas").captureStream();

            const pip = DOMUtils.get<HTMLVideoElement>("video");
            pip.addEventListener("canplay", () => {
                if(document.pictureInPictureEnabled)
                    pip.requestPictureInPicture();
            });
            pip.srcObject = stream;
            



        });


        DOMUtils.get("#mod-source").addEventListener("hidden.bs.modal", (e) => {
            this.isEditing = false;
            DOMUtils.get("#video-render-result").classList.toggle("d-none");
            if(document.pictureInPictureElement)
                    document.exitPictureInPicture();
        });
        // source (fragment shader editor)
        // todo: move to DRSourceEditor
        this.drSourceEditor.onSelectShader = (e => {            
            const tar = (e.target) as HTMLSelectElement
            const buffer = this.buffers.find(pre => {
                return pre.name == tar.value
            });
            this.drSourceEditor.update(buffer);
            DOMUtils.get<HTMLOptionElement>(`option[value="${buffer.name}"]`).selected = true;
        });

        this.drSourceEditor.onBuild = (r) => {
            this.dr.updateShaderProgram(this.currentScene.key, r).then(shader => {
                DOMUtils.get(".badge").textContent = "0";
                const errorNodes = DOMUtils.getAll(".error-info");
                errorNodes.forEach((el: Element) => {
                    el.classList.remove("error-info");
                });
                this.dr.aB(this.currentScene.key, mainVertex, shader);
            }).catch((errors: Array<ShaderError>) => {
                DOMUtils.get(".badge").textContent = errors.length.toString();
                this.drSourceEditor.markErrors(errors);
            });
        };
        DOMUtils.get("#btn-source").addEventListener("click", () => {
            // get the fragment source from the sequence by time;
            const scene = this.sequencer.getScenesToPlay(this.sequencer.time);
            const buffer = this.buffers.find(pre => {
                return pre.name == scene[0].key
            });
            this.drSourceEditor.update(buffer);
            DOMUtils.get<HTMLOptionElement>(`option[value="${buffer.name}"]`).selected = true

        });


        // add assets, in this case none, add 1-n buffers and await compile and done.
        this.dr.aA({}).then(a => {
            this.dr.abS(buffers)
                .then(dr => {
                    const readyButton = DOMUtils.get("#btn-init");
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
                            DOMUtils.getAll(".await-init").forEach(el => {
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


const sequencer = new DasSequencer(240, 30);

const a = new Scene("iChannel0", 48, { sI: 0 });
const b = new Scene("iChannel1", 48, { sI: 1 });
const c = new Scene("iChannel2", 48, { sI: 2 });
const d = new Scene("iChannel3", 48, { sI: 3 });
const e = new Scene("iChannel4", 48, { sI: 4 });

sequencer.addScenes([a, , b, c, d, e]);

let buffers: IBuf[] = [
    { name: "iChannel0", vertex: mainVertex, fragment: Scene0, textures: [] },
    { name: "iChannel1", vertex: mainVertex, fragment: Scene1, textures: [] },
    { name: "iChannel2", vertex: mainVertex, fragment: Scene2, textures: [] },
    { name: "iChannel3", vertex: mainVertex, fragment: Scene3, textures: [] },
    { name: "iChannel4", vertex: mainVertex, fragment: Scene4, textures: [] }
]

let demo = new SimpleEditor(buffers, sequencer);

