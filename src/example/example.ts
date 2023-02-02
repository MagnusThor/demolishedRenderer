import { DR } from "../DR"

import { bufferBFragment } from "./bufferB";
import { mainFragment } from "./mainFragment";
import { mainVertex } from "./mainVertex";

export const runner = () => {
    const dr = new DR(document.querySelector("canvas"),mainVertex,mainFragment);
    dr.aB("iChannel0",mainVertex,bufferBFragment,[],{});
    return dr;
}


const demo = runner();


demo.run(0,60);