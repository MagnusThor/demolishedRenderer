


let _a = require('../../minified/src/example/a.glsl.js') ;
let _b = require('../../minified/src/example/b.glsl.js') ;
let _c = require('../../minified/src/example/c.glsl.js') ;
let _d = require('../../minified/src/example/d.glsl.js') ;
let _e = require('../../minified/src/example/e.glsl.js') ;
let _f = require('../../minified/src/example/f.glsl.js') ;



import { DasSequencer, Scene } from "../DasSequencer";
import { DR } from "../DR"
import { E2D, TR } from "../TR";

import { mainVertex } from "./mainVertex";
import { mainFragment } from './mainFragment';


const sequencer = new DasSequencer(96,30);




const a = new Scene("iChannel4",48,{sI:4});
const b = new Scene("iChannel1",48,{sI:1});
const c = new Scene("iChannel2",48,{sI:2});
const d = new Scene("iChannel3",48,{sI:3});
const e = new Scene("iChannel0",48,{sI:0});
const f = new Scene("iChannel5",48,{sI:5});

sequencer.addScene(a);
sequencer.addScene(b);
sequencer.addScene(c);
sequencer.addScene(d);
sequencer.addScene(e);
sequencer.addScene(f);



console.log("sceneToPlay",sequencer.getScenesToPlay(41768.461));



export const runner = () => {
    const tr = new TR(512, 512);
    /*

    ctx.fillStyle = "#fff";
    let dx = w / 2;
    let dy = h / 2;
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 512 - 40, 512 - 40);
    ctx.stroke();
    ctx.font = "120px 'Arial'";
    ctx.fillText("code	", 28 , 220, w);
    ctx.font = "bold 128px 'Arial'";
    ctx.fillText("BAGZY", 28, 370, w);
   
    */


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

        /*
        dr.aB("iChannel4", mainVertex, bufferEFragment.C(),["iLogo"]); // bufferA 0
        dr.aB("iChannel0", mainVertex, bufferBFragment.C(),["iLogo"]); // bufferA 0
        dr.aB("iChannel1", mainVertex, bufferCFragment.C(),["iLogo"]) // bufferB 1
        dr.aB("iChannel2", mainVertex, bufferDFragment.C(),["iLogo"]) // bufferC 2
        dr.aB("iChannel3", mainVertex, bufferAFragment.C(),["iLogo"]) // bufferC 2  

        */

        dr.aB("iChannel4", mainVertex,_e, ["iLogo"]); // bufferE 0
        dr.aB("iChannel0", mainVertex, _b, ["iLogo"]); // bufferB 1
        dr.aB("iChannel1", mainVertex, _c, ["iLogo"]) // bufferC 2
        dr.aB("iChannel2", mainVertex, _d, ["iLogo"]) // bufferD 3
        dr.aB("iChannel3", mainVertex, _a, ["iLogo"]) // bufferA 4  
        dr.aB("iChannel5", mainVertex, _f, ["iLogo"]) // bufferA 4  

    });


    return dr;
}


const demo = runner();

let isRunning = false;
document.addEventListener("click", () => {
    
    if (isRunning) return;    
    const a = document.querySelector("audio") as HTMLAudioElement;
    a.play();

   
    sequencer.onBeat = (beat:number,scenes) => {
        console.log(scenes,beat);
    };


    const then = performance.now();

    const animate = (t: number) => {
        let rt = t - then | 0;
        rt = rt < 0 ? 0 : rt;

        sequencer.run(t, (arr,beat) => {   

            demo.R(rt/1000,[arr[0].key],(gl:WebGLRenderingContext,u:Map<string,WebGLUniformLocation>) => {

                const scene = arr[0];
                          
                gl.uniform1f(u.get("sI"), scene.uniforms.sI);

            })   
        });

       

       
        setTimeout(() => {
                requestAnimationFrame(animate);
        }, 60 / 1000);       
}


   animate(0);

    isRunning = true;
});