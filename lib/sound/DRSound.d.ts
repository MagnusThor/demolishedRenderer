export declare class DemolishedSoundPeaks {
    static peaks(buffer: AudioBuffer, size: number): Array<number>;
}
/**
 *
 *
 * @export
 * @class DemolishedSoundBase
 */
export declare class DemolishedSoundBase {
    audioAnalyser: AnalyserNode;
    audio: any;
    audioBuffer: AudioBuffer;
    getAudioEl(): HTMLAudioElement;
    constructor();
}
/**
 *
 *
 * @export
 * @interface IDemolisedAudioContext
 */
export interface IDemolisedAudioContext {
    createAudio(settings: any): Promise<boolean>;
    play(tm?: number): void;
    stop(tm?: number): void;
    mute(ismuted: boolean): void;
    currentTime: number;
    getFrequenceData(): Uint8Array;
    textureSize: number;
    duration: number;
    getTracks(): MediaStreamTrack;
    audioBuffer: AudioBuffer;
    getAudioEl(): HTMLAudioElement;
}
/**
 *
 *
 * @export
 * @class DemolishedSIDMusic
 * @extends {DemolishedSoundBase}
 * @implements {IDemolisedAudioContext}
 */
export declare class DemolishedSIDMusic extends DemolishedSoundBase implements IDemolisedAudioContext {
    getTracks(): MediaStreamTrack;
    private sid;
    get textureSize(): number;
    constructor();
    play(): void;
    stop(): void;
    mute(ismuted: boolean): void;
    getFrequenceData(): Uint8Array;
    get duration(): number;
    get currentTime(): number;
    set currentTime(n: number);
    createAudio(settings: any): Promise<boolean>;
}
/**
 *
 *
 * @export
 * @class DemolishedStreamingMusic
 * @extends {DemolishedSoundBase}
 * @implements {IDemolisedAudioContext}
 */
export declare class DemolishedStreamingMusic extends DemolishedSoundBase implements IDemolisedAudioContext {
    getTracks(): MediaStreamTrack;
    constructor();
    get textureSize(): number;
    getFrequenceData(): Uint8Array;
    play(): void;
    stop(): void;
    mute(ismuted: boolean): void;
    get duration(): number;
    get currentTime(): number;
    set currentTime(time: number);
    createAudio(audioSettings: any): Promise<boolean>;
}
//# sourceMappingURL=DRSound.d.ts.map