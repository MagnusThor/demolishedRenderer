import { DasSequencer } from "../sequencer/DasSequencer";
export declare class DRTime {
    parent: HTMLElement;
    seq: DasSequencer;
    onPlaybackChange: (state: boolean) => void;
    onTimelineChange: (value: number) => void;
    isPlaying: boolean;
    currentTime: number;
    renderTime: HTMLInputElement;
    constructor(parent: HTMLElement, seq: DasSequencer);
    updateTimeline(time: number): void;
    render(): void;
}
//# sourceMappingURL=DRTime.d.ts.map