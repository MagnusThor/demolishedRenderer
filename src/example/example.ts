import { DOMUtils, DRTime } from "../controlls/DRTime";
import { Scene0 } from "./Scene0";
import { Scene1 } from "./Scene1";
import { Scene2 } from "./Scene2";
import { Scene3 } from "./Scene3";

import { DasSequencer, Scene } from "../sequencer/DasSequencer";
import { DR } from "../DR"

import { mainVertex } from "./mainVertex";
import { mainFragment } from './mainFragment';
import { DemolishedSoundPeaks, DemolishedStreamingMusic } from "../sound/DRSound";

const sequencer = new DasSequencer(96, 30);

window["zoom"] = 1;

const a = new Scene("iChannel0", 48, { sI: 0 });
const b = new Scene("iChannel1", 48 * 2, { sI: 1 });
const c = new Scene("iChannel2", 48, { sI: 2 });
const d = new Scene("iChannel3", 48, { sI: 3 });

sequencer.addScene(a).addScene(b).addScene(c).addScene(d);

export const runner = () => {
    let rafl = 0;
    let isRunning = false;
    let renderTime = 0;
    let audio = new DemolishedStreamingMusic();

    let peeks = new Array<number>();

    const drControls = new DRTime(document.querySelector(".debug"), sequencer);
    drControls.render();

    audio.createAudio({
        audioFile: "src/example/Virgill - Rhodium.mp3",
        audioAnalyzerSettings: { smoothingTimeConstant: 0.85, fftSize: 4096 }
    }).then(r => {
        // peeks = DemolishedSoundPeaks.peaks(audio.audioBuffer,1024)

        if (r) document.querySelector(".debug").classList.remove("hide");

    });


    const timeEl = DOMUtils.get(".frame-info time");
    const beatEl = DOMUtils.get(".frame-info mark");

    const animate = (t: number) => {
        sequencer.run(t, (arr, beat) => {
            demo.R(t / 1000, [arr[0].key], (gl: WebGLRenderingContext, u: Map<string, WebGLUniformLocation>) => {
                const scene = arr[0];
                if (u.has("sI"))
                    gl.uniform1f(u.get("sI"), scene.uniforms.sI);

                const ct = sequencer.msToMinutesAndSeconds(t);

                beatEl.innerText = `${ct.minutes}:${ct.seconds}`;
                timeEl.innerText = Math.round(t).toFixed(0);

            })
        });
    }


    DOMUtils.get(".frame-info button").addEventListener("click", () => {
        DOMUtils.get(".uniforms div").classList.toggle("hide");
    })

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
            }
            renderLoop();
        } else {
            audio.stop();
            cancelAnimationFrame(rafl);
        }
    }

    drControls.onTimelineChange = (time) => {
        animate(time * 1000);
        audio.currentTime = time;
    }

    const dr = new DR(document.querySelector("#c"), mainVertex, mainFragment, {});
    dr.aA({}, () => {

        dr.aB("iChannel0", mainVertex, Scene0, []
        ).aB("iChannel1", mainVertex, Scene1, [], {
            "zoomFactor": (a, b) => {
                b.uniform1f(a, window["zoom"]);
            }
        }).aB("iChannel2", mainVertex, Scene2, [], {
            "zoomFactor": (a, b) => {
                b.uniform1f(a, window["zoom"]);
            }
        }).aB("iChannel3", mainVertex, Scene3, [], {
            "zoomFactor": (a, b) => {
                b.uniform1f(a, window["zoom"]);
            }
        })
    });
    return dr;
}

const demo = runner();
