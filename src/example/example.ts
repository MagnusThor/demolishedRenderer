

import { GlslShader, GlslVariable, GlslVariableMap } from 'webpack-glsl-minify';

let _a = require('../../minified/src/example/a.glsl.js') as GlslShader;
let _b = require('../../minified/src/example/b.glsl.js') as GlslShader;
let _c = require('../../minified/src/example/c.glsl.js') as GlslShader;
let _d = require('../../minified/src/example/d.glsl.js') as GlslShader;
let _e = require('../../minified/src/example/e.glsl.js') as GlslShader;
let _f = require('../../minified/src/example/f.glsl.js') as GlslShader;



import { DasSequencer, Scene } from "../DasSequencer";
import { DR } from "../DR"
import { E2D, IE2D, TR } from "../TR";


//let mainFragment = require('../../minified/src/example/mainFragment.glsl.js');

import { mainVertex } from "./mainVertex";
import { mainFragment } from './mainFragment';


// total time 2.5 mins, 150 000 ms
// seg = (duration_ms/441*2*10)
// sceneDuration = scene_duration_ms/s

//console.log(SQ.sceneDuration(150000,30000))

const sequence = [
    [4.41, 0x0000 | 0x4000, 4, ["iChannel4"]], // loop 1
    [4.41, 0x0000 | 0x4000, 1, ["iChannel1"]], // loop 2
    [4.41, 0x0000 | 0x4000, 2, ["iChannel2"]], // loop 3
    [4.41, 0x0020 | 0x6000, 3, ["iChannel3"]], // loop 4
    [4.41, 0x0020 | 0x6000, 0, ["iChannel0"]], // loop 5 
    [4.41, 0x0020 | 0x6000, 5, ["iChannel5"]], // loop 5 
    [255, 0x0000 | 0x0000, 0, []]  // end
];

const sequencer = new DasSequencer(82,60);

const a = new Scene(16);
const b = new Scene(32);
const c = new Scene(16);

sequencer.addScene("scene a",a);
sequencer.addScene("scene b",b);
sequencer.addScene("scene c",c);


const fA = (ac: AudioContext): {
    analyser: AnalyserNode,
    update: any} => {

        
    let an = ac.createAnalyser();
    an.fftSize = 8192;
    an.connect(ac.destination);

    return {analyser: an,update:(gl: WebGLRenderingContext,texture: WebGLTexture, size: number, bytes: Uint8Array) => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, bytes);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }};
}






export const runner = () => {

    const tr = new TR(512, 512);


    const logo = tr.A(new E2D("iLogo", (t, cs, x) => { // genereate a FoL overlay -> iLogo
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
    }).extend({m: function(this:E2D) {
        this.S("x",100)
    
    }}));
  
    const dr = new DR(document.querySelector("canvas"), mainVertex, mainFragment, {}, { data: sequence, duration: 150000 });
  
    dr.aA({
        "iLogo": {
            src: tr.R(10).data()
        },
        "iFFT": {
            fn:  (gl: any, c: any,b:any) =>{
               
            }
        }
    }, () => {

        /*
        dr.aB("iChannel4", mainVertex, bufferEFragment.C(),["iLogo"]); // bufferA 0
        dr.aB("iChannel0", mainVertex, bufferBFragment.C(),["iLogo"]); // bufferA 0
        dr.aB("iChannel1", mainVertex, bufferCFragment.C(),["iLogo"]) // bufferB 1
        dr.aB("iChannel2", mainVertex, bufferDFragment.C(),["iLogo"]) // bufferC 2
        dr.aB("iChannel3", mainVertex, bufferAFragment.C(),["iLogo"]) // bufferC 2  

        */

        dr.aB("iChannel4", mainVertex,_e.sourceCode, ["iLogo","iFFT"]); // bufferE 0
        dr.aB("iChannel0", mainVertex, _b.sourceCode, ["iLogo","iFFT"]); // bufferB 1
        dr.aB("iChannel1", mainVertex, _c.sourceCode, ["iLogo","iFFT"]) // bufferC 2
        dr.aB("iChannel2", mainVertex, _d.sourceCode, ["iLogo","iFFT"]) // bufferD 3
        dr.aB("iChannel3", mainVertex, _a.sourceCode, ["iLogo","iFFT"]) // bufferA 4  
        dr.aB("iChannel5", mainVertex, _f.sourceCode, ["iLogo","iFFT"]) // bufferA 4  

    });


    return dr;
}



const demo = runner();

let isRunning = false;
document.addEventListener("click", () => {
    if (isRunning) return;    
    const a = document.querySelector("audio") as HTMLAudioElement;
    a.play();

    demo.run(0, 60, performance.now(),(t:number) =>{
        sequencer.run(t, (arr) => {         
        });
    
    } );
    isRunning = true;
});