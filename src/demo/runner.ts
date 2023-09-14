import { DOMUtils, DRTime } from "../controlls/DRTime";
import { DasSequencer, Scene } from "../sequencer/DasSequencer";
import { DR } from "../DR"

import { mainVertex } from "./shaders/mainVertex";
import { mainFragment } from './shaders/mainFragment';

import { DemolishedStreamingMusic } from "../sound/DRSound";
import { Scene0 } from "./shaders/Scenes";

const sequencer = new DasSequencer(96, 30);

window["zoom"] = 1;

const a = new Scene("iChannel0", 186000, { sI: 0 });


sequencer.addScene(a);

export const runner = () => {
    let rafl = 0;
    let isRunning = false;
    let renderTime = 0;
    let audio = new DemolishedStreamingMusic();

    const drControls = new DRTime(document.querySelector(".debug"), sequencer);
    drControls.render();

    audio.createAudio({
        audioFile: "src/example/Virgill - Rhodium.mp3",
        audioAnalyzerSettings: { smoothingTimeConstant: 0.85, fftSize: 4096 }
    }).then(r => {
   
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
        )
    });
    return dr;
}

const demo = runner();
