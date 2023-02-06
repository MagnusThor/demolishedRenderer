import { DR } from "../DR"
import { AP } from "./BeepBoxSynth/synth";

import { bufferBFragment } from "./bufferB";
import { bufferCFragment } from "./bufferC";

import { mainFragment } from "./mainFragment";

import { mainVertex } from "./mainVertex";

import song from "../example/BeepBoxSynth/song.json"



let scene = 0;

export const runner = () => {
    const dr = new DR(document.querySelector("canvas"), mainVertex, mainFragment, {
        "outTexture": (location, gl, program, time) => {
            gl.uniform1f(location, scene);
        }
    }
    );
    dr.aB("iChannel0", mainVertex, bufferBFragment); // bufferA
    dr.aB("iChannel1", mainVertex, bufferCFragment) // bufferB
    //    dr.sP("iChannel1",false); // toggle render state = iChannel1 will be skipped.
    document.addEventListener("keyup", () => {
        scene = (scene ? 0 : 1);
    });
    return dr;
}



const demo = runner();

// fetch(new Request("/src/example/BeepBoxSynth/song.json")) .then((response) => response.json())
// .then((data) => {
document.addEventListener("click", () => {
    const p = new AP(song);
    p.play();
    demo.run(0, 60);
});

// });




