declare global {
    interface String {
        C(this: string): string;
    }
}

import { DR } from "../DR"
import { TR } from "../TR";
import { bufferAFragment } from "./bufferA";
import { bufferBFragment } from "./bufferB";
import { bufferCFragment } from "./bufferC";
import { bufferDFragment } from "./bufferD";
import { bufferEFragment } from "./bufferE";
import { common } from "./common";

import { mainFragment } from "./mainFragment";
import { mainVertex } from "./mainVertex";
import { Synth } from "./synth/synth";

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
    [255, 0x0000 | 0x0000, 0, []]  // end
];


String.prototype.C = function (this: string) {  // handle some kinf of include.
    //return this; // do nothing now.
    return this.replace("//#C", common);
}

export const runner = () => {


    const tr = new TR(512, 512);  

    tr.A("iLogo", (t, cs, x) => { // generare a logo ( overlay for iLogo)
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
    });

    const dr = new DR(document.querySelector("canvas"), mainVertex, mainFragment, {}, { data: sequence, duration: 150000 });


    dr.aA({"iLogo": {
        src: tr.R(10).data()
         }}, () => {

    
        dr.aB("iChannel4", mainVertex, bufferEFragment.C(),["iLogo"]); // bufferA 0
        dr.aB("iChannel0", mainVertex, bufferBFragment.C(),["iLogo"]); // bufferA 0
        dr.aB("iChannel1", mainVertex, bufferCFragment.C(),["iLogo"]) // bufferB 1
        dr.aB("iChannel2", mainVertex, bufferDFragment.C(),["iLogo"]) // bufferC 2
        dr.aB("iChannel3", mainVertex, bufferAFragment.C(),["iLogo"]) // bufferC 2  

    });


    return dr;
}

const demo = runner();
let isRunning = false;
document.addEventListener("click", () => {
    if (isRunning) return;
    const synth: Synth = new
        Synth("9n31s0k0l00e0jt22a7g0nj07r1i0o432T0v1ue2f0q8y10m723d08w5h3E1b8T1v1u01f0qwx10p711d03A5F9B9Q0001PfaedE4b762663777T1v0ufbf0q00d02A0F0B0Q9000Pf000E250617T4v1u04f0q0x10p71z6666ji8k8k3jSBKSJJAArriiiiii07JCABrzrrrrrrr00YrkqHrsrrrrjr005zrAqzrjzrrqr1jRjrqGGrrzsrsA099ijrABJJJIAzrrtirqrqjqixzsrAjrqjiqaqqysttAJqjikikrizrHtBJJAzArzrIsRCITKSS099ijrAJS____Qg99habbCAYrDzh00E1bib000hd3ghd3g000004h4h4h4h4h4h4g004h8h4h8h4h8h4g000000000000000000p22pFE-547hlhjgnQAs2ptdMvoVJdHYkSnM8V8zwOeMzSyeEzF8X2caqfVjjjjjjjbh3jjcsgQQwaqfUhQ4t17ghQ4t17ghQ4uwhQ4t17ghIOYmCnyyz9bsyyz9bIyyz9X8EE0FEO17ghQ4t17ghQ4t17ghw0");
    synth.play()
    demo.run(0, 60, performance.now());
    isRunning = true;

});





