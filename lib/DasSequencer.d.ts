export declare class Scene {
    duration: number;
    ms: number;
    msStart: number;
    msStop: number;
    constructor(duration: number);
    execute(...args: any[]): void;
}
export declare class DasSequencer {
    time: number;
    sec: number;
    min: number;
    msPerBeat: number;
    msPerTick: number;
    scenes: Map<string, Scene>;
    isPlaying: boolean;
    frame: number;
    timeDiff: number;
    now: number;
    tick: number;
    beat: number;
    oldTick: number;
    oldBeat: number;
    duration: number;
    constructor(bpm: number, tpb: number);
    beatToMs(beat: number): number;
    getScenesToPlay(time: number): Array<Scene>;
    getSceneByBeat(beat: number): Scene[];
    setProps(time: number): void;
    goTo(beat: number): void;
    addScene(id: string, scene: Scene): void;
    run(t: number, cb?: (t: Scene[]) => void): void;
}
//# sourceMappingURL=DasSequencer.d.ts.map