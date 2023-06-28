


import { DRTime } from "../controlls/DRTime";

//let _a = require('../../minified/src/example/scens.glsl.js') ;

import { Scene0 } from "./Scene0";
import { Scene1 } from "./Scene1";
import { Scene2 } from "./Scene2";


import { DasSequencer, Scene } from "../sequencer/DasSequencer";
import { DR } from "../DR"
import { E2D, TR } from "../TR";

import { mainVertex } from "./mainVertex";
import { mainFragment } from './mainFragment';
import { DemolishedStreamingMusic } from "../sound/DRSound";

const sequencer = new DasSequencer(96, 30);

window["zoom"] = 1;






const a = new Scene("iChannel0", 48, { sI: 0 });
const b = new Scene("iChannel1", 48 * 2, { sI: 1 });
const c = new Scene("iChannel2", 48 * 3, { sI: 2 });

sequencer.addScene(a).addScene(b).addScene(c);





export const runner = () => {


    let rafl = 0;
    let isRunning = false;
    let renderTime = 0;


    let p = new DemolishedStreamingMusic();

    p.createAudio({
        audioFile: "src/example/Virgill - Rhodium.mp3",
        audioAnalyzerSettings: { smoothingTimeConstant: 0.85: fftSize: 4096 }
    }).then(r => {

      
        if(r) document.querySelector(".debug").classList.remove("hide");


    });



    const animate = (t: number) => {
        sequencer.run(t, (arr, beat) => {
            demo.R(t / 1000, [arr[0].key], (gl: WebGLRenderingContext, u: Map<string, WebGLUniformLocation>) => {
                const scene = arr[0];
                if (u.has("sI"))
                    gl.uniform1f(u.get("sI"), scene.uniforms.sI);
            })
        });
    }

    const drControls = new DRTime(document.querySelector(".debug"), sequencer);
    drControls.render();

    drControls.onPlaybackChange = (state) => {
        isRunning = state;
        if (state) {

            p.currentTime = drControls.currentTime;
            p.play();

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
            p.stop();
            cancelAnimationFrame(rafl);
        }
    }

    drControls.onTimelineChange = (time) => {
        animate(time * 1000);
        p.currentTime = time;

    }



    const dr = new DR(document.querySelector("#c"), mainVertex, mainFragment, {});

    dr.aA({
    }, () => {


        dr.aB("iChannel0", mainVertex, Scene0, []
        ).aB("iChannel1", mainVertex, Scene1, [], {
            "zoomFactor": (a, b, c, d) => {
                b.uniform1f(a, window["zoom"])

            }
        }).aB("iChannel2", mainVertex, Scene2, [], {
            "zoomFactor": (a, b, c, d) => {
                b.uniform1f(a, window["zoom"])
            }
        })
    });


    return dr;




}


const demo = runner();

