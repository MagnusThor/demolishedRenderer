import { IBuf } from "../IBuf";
import { DasSequencer, Scene } from "../sequencer/DasSequencer";
import { Runner } from "./runner";
export declare class RunnerW extends Runner {
    seq: DasSequencer;
    constructor(bpm: number, tickPerbeat: number, assets: any, buffers: Array<IBuf>, scenes: Array<Scene>);
    run(): void;
}
//# sourceMappingURL=runnerSeq.d.ts.map