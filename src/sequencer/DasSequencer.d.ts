export declare class Scene {
    key: string;
    duration: number;
    uniforms: any;
    ms: number;
    msStart: number;
    msStop: number;
    constructor(key: string, duration: number, uniforms: any);
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
    onBeat: (beat: number, scenes: Scene[]) => void;
    duration: number;
    constructor(bpm: number, tpb: number);
    msToMinutesAndSeconds(milliseconds: number): {
        minutes: number;
        seconds: number;
    };
    beatToMs(beat: number): number;
    getScenesToPlay(time: number): Array<Scene>;
    getSceneByBeat(beat: number): Scene[];
    setProps(time: number): void;
    goTo(beat: number): void;
    addScene(scene: Scene): this;
    addScenes(scens: Array<Scene>): this;
    run(t: number, cb?: (t: Scene[], beat: number) => void): void;
}
//# sourceMappingURL=DasSequencer.d.ts.map