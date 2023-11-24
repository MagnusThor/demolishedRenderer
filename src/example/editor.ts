import { DRTime } from "../controlls/DRTime";
import { DRUniforms } from "../controlls/DRUniforms";
import { DOMUtils } from "../controlls/DOMUtils";

import { Scene0 } from "./shaders/Scene0";
import { Scene1 } from "./shaders/Scene1";
import { Scene2 } from "./shaders/Scene2";
import { Scene3 } from "./shaders/Scene3";

import { DasSequencer, Scene } from "../sequencer/DasSequencer";
import { DR } from "../DR"

import { mainVertex } from "./shaders/mainVertex";
import { mainFragment } from './shaders/mainFragment';
import { DemolishedStreamingMusic } from "../sound/DRSound";
import { DRExt } from "../DRExt";

import { DRSourceEditor } from "../controlls/DRSourceEditor";
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

    constructor(public buffers:Array<IBuf>,public sequencer:DasSequencer) {

        this.rafl = 0;
        this.renderTime = 0;
        this.audio = new DemolishedStreamingMusic();

        this.dr = new DRExt(DOMUtils.get("canvas"), mainVertex, mainFragment, {});
    

        this.drTimeline = new DRTime(DOMUtils.get(".time-line "), sequencer);

        this.drUniforms= new DRUniforms(DOMUtils.get("#modals"),this.dr);
        this.drSourceEditor = new DRSourceEditor(DOMUtils.get("#modals"));

        this.drTimeline.render();
        this.drUniforms.render();
        this.drSourceEditor.render();

        const animate = (t: number) => {
            sequencer.run(t, (arr, beat) => {
                this.dr.R(t / 1000, [arr[0].key], (gl: WebGLRenderingContext, u: Map<string, WebGLUniformLocation>) => {
                    this.currentScene =  arr[0];
                    
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

        // source (fragment shader editor)

    

     DOMUtils.get("#btn-source").addEventListener("click",() => {
            // get the fragment source from the sequence by time;
            const scene = this.sequencer.getScenesToPlay(this.sequencer.time);
            const buffer = this.buffers.find ( pre => {
                return pre.name == scene[0].key
            });
            this.drSourceEditor.update(buffer.fragment);          
     });
     
     
     // add assets, in this case none, add 4 buffers and await compile and done.
        this.dr.aA({}).then(a => {
            this.dr.abS(buffers)
                .then(dr => {
                    const readyButton = DOMUtils.get("#btn-init");
                    readyButton.removeAttribute("disabled");
                    readyButton.textContent = "Click to initialize";
                    readyButton.addEventListener("click", () => {
                        
                        readyButton.textContent = "Please wait...";
                        readyButton.setAttribute("disabled","disabled");

                        this.audio.createAudio({
                            audioFile: "/public/audio/Virgill - Rhodium.mp3",
                            audioAnalyzerSettings: { smoothingTimeConstant: 0.85, fftSize: 4096 }
                        }).then(r => {
                            readyButton.remove();
                            
                            DOMUtils.getAll(".await-init").forEach ( el => {
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


const sequencer = new DasSequencer(96, 30);

const a = new Scene("iChannel0", 48, { sI: 0 });
const b = new Scene("iChannel1", 48, { sI: 1 });
const c = new Scene("iChannel2", 48, { sI: 2 });
const d = new Scene("iChannel3", 48 * 2, { sI: 3 });

sequencer.addScenes([a, , b, c, d]);


let buffers:IBuf[] = [
    { name: "iChannel0", vertex: mainVertex, fragment: Scene0, textures: [] },
    { name: "iChannel1", vertex: mainVertex, fragment: Scene1, textures: [] },
    { name: "iChannel2", vertex: mainVertex, fragment: Scene2, textures: [] },
    { name: "iChannel3", vertex: mainVertex, fragment: Scene3, textures: [] }]

let demo = new SimpleEditor(buffers,sequencer);

