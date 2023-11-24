import { DRTime } from "../controlls/DRTime";
import { DRUniforms } from "../controlls/DRUniforms";
import { DasSequencer } from "../sequencer/DasSequencer";
import { DemolishedStreamingMusic } from "../sound/DRSound";
import { DRExt } from "../DRExt";
import { DRSourceEditor } from "../controlls/DRSourceEditor";
import { IBuf } from "../IBuf";
/**
* This is just a concept of how to control time and rendering flow using sequencer
* will implement ann editor and make it similar to the demolished Editor project.
* @return {*}
*/
export declare class SimpleEditor {
    buffers: Array<IBuf>;
    sequencer: DasSequencer;
    rafl: number;
    renderTime: number;
    dr: DRExt;
    audio: DemolishedStreamingMusic;
    drTimeline: DRTime;
    drUniforms: DRUniforms;
    drSourceEditor: DRSourceEditor;
    constructor(buffers: Array<IBuf>, sequencer: DasSequencer);
}
//# sourceMappingURL=editor.d.ts.map