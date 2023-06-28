


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

const sequencer = new DasSequencer(96, 30);

window["zoom"] = 1;






const a = new Scene("iChannel0", 48, { sI: 0 });
const b = new Scene("iChannel1", 48 * 2, { sI: 1 });
const c = new Scene("iChannel2", 48 * 3, { sI: 2 });

sequencer.addScene(a).addScene(b).addScene(c);






let offset = 0;

export const runner = () => {


   

    const animate = (t: number) => {
       

        sequencer.run(t, (arr, beat) => {
         
            demo.R(t / 1000, [arr[0].key], (gl: WebGLRenderingContext, u: Map<string, WebGLUniformLocation>) => {
                const scene = arr[0];
                if (u.has("sI"))
                    gl.uniform1f(u.get("sI"), scene.uniforms.sI);
            })
        });


      
    }


    const tr = new TR(512, 512);


    const drControls = new DRTime(document.querySelector(".debug"), sequencer);

    drControls.render();


    let rafl = 0;

    drControls.onPlaybackChange = (state) => {
        if(state){


          

            let then = performance.now();

            const doit = () => 
                {
                    rafl  = requestAnimationFrame(doit);

                    let now = performance.now();
                    let offset = now-then;

                    console.log(offset,offset+(drControls.currentTime));

                    const vvb = drControls.currentTime*1000+offset;

                    animate(vvb);
               
                    
                    drControls.updateTimeline(vvb/1000);
                 
            }
                doit();
            


        }else{
                cancelAnimationFrame(rafl);
        }
       
    }
    drControls.onTimelineChange = (time) => {
        console.log(time);
        animate(time * 1000);
        offset = time * 1000;
    }




    tr.A(new E2D("iLogo", (t, cs, x) => { // genereate a FoL overlay -> iLogo
        const c = "#fff";
        x.fillStyle = c
        x.strokeStyle = c;
        x.lineWidth = 10;
        x.strokeRect(20, 20, 512 - 40, 512 - 40);
        x.stroke();
        x.font = "120px 'Arial'";
        x.fillText("FRUIT", 80, 160);
        x.fillText("LOOM", 80, 430);
        x.font = "100px 'Arial'";
        x.fillText("OF the", 100, 280);
    }));

    const dr = new DR(document.querySelector("#c"), mainVertex, mainFragment, {});

    dr.aA({
        "iLogo": {
            src: tr.R(10).data()
        }
    }, () => {


        dr.aB("iChannel0", mainVertex, Scene0, ["iLogo"]
        ).aB("iChannel1", mainVertex, Scene1, ["iLogo"], {
            "zoomFactor": (a, b, c, d) => {
                b.uniform1f(a, window["zoom"])

            }
        }).aB("iChannel2", mainVertex, Scene2, ["iLogo"], {
            "zoomFactor": (a, b, c, d) => {
                b.uniform1f(a, window["zoom"])
            }
        })
    });


    return dr;
}


const demo = runner();


let isRunning = false;
//document.addEventListener("click", () => {

    // if (isRunning) return;    
    // const a = document.querySelector("audio") as HTMLAudioElement;
    // a.play();

    // sequencer.onBeat = (beat:number,scenes) => {
    //     console.log(scenes,beat);
    // };

    


    // animate(0);

   // isRunning = true;
//});