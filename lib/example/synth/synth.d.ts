import { Dictionary, DictionaryArray, FilterType, SustainType, EnvelopeType, InstrumentType, Transition, Chord, Envelope, Config } from "./SynthConfig";
import { FilterCoefficients, FrequencyResponse, DynamicBiquadFilter } from "./filtering";
declare global {
    interface Window {
        AudioContext: any;
        webkitAudioContext: any;
    }
}
export declare function clamp(min: number, max: number, val: number): number;
export interface NotePin {
    interval: number;
    time: number;
    size: number;
}
export declare function makeNotePin(interval: number, time: number, size: number): NotePin;
export declare class Note {
    pitches: number[];
    pins: NotePin[];
    start: number;
    end: number;
    continuesLastPattern: boolean;
    constructor(pitch: number, start: number, end: number, size: number, fadeout?: boolean);
    pickMainInterval(): number;
    clone(): Note;
    getEndPinIndex(part: number): number;
}
export declare class Pattern {
    notes: Note[];
    readonly instruments: number[];
    cloneNotes(): Note[];
    reset(): void;
    toJsonObject(song: Song): any;
    fromJsonObject(patternObject: any, song: Song, channel: Channel, importedPartsPerBeat: number, isNoiseChannel: boolean): void;
}
export declare class Operator {
    frequency: number;
    amplitude: number;
    constructor(index: number);
    reset(index: number): void;
}
export declare class SpectrumWave {
    spectrum: number[];
    hash: number;
    constructor(isNoiseChannel: boolean);
    reset(isNoiseChannel: boolean): void;
    markCustomWaveDirty(): void;
}
export declare class HarmonicsWave {
    harmonics: number[];
    hash: number;
    constructor();
    reset(): void;
    markCustomWaveDirty(): void;
}
export declare class FilterControlPoint {
    freq: number;
    gain: number;
    type: FilterType;
    set(freqSetting: number, gainSetting: number): void;
    getHz(): number;
    static getHzFromSettingValue(value: number): number;
    static getSettingValueFromHz(hz: number): number;
    static getRoundedSettingValueFromHz(hz: number): number;
    getLinearGain(peakMult?: number): number;
    static getRoundedSettingValueFromLinearGain(linearGain: number): number;
    toCoefficients(filter: FilterCoefficients, sampleRate: number, freqMult?: number, peakMult?: number): void;
    getVolumeCompensationMult(): number;
}
export declare class FilterSettings {
    readonly controlPoints: FilterControlPoint[];
    controlPointCount: number;
    constructor();
    reset(): void;
    addPoint(type: FilterType, freqSetting: number, gainSetting: number): void;
    toJsonObject(): Object;
    fromJsonObject(filterObject: any): void;
    convertLegacySettings(legacyCutoffSetting: number, legacyResonanceSetting: number, legacyEnv: Envelope): void;
}
export declare class EnvelopeSettings {
    target: number;
    index: number;
    envelope: number;
    constructor();
    reset(): void;
    toJsonObject(): Object;
    fromJsonObject(envelopeObject: any): void;
}
interface LegacySettings {
    filterCutoff?: number;
    filterResonance?: number;
    filterEnvelope?: Envelope;
    pulseEnvelope?: Envelope;
    operatorEnvelopes?: Envelope[];
    feedbackEnvelope?: Envelope;
}
export declare class Instrument {
    type: InstrumentType;
    preset: number;
    chipWave: number;
    chipNoise: number;
    eqFilter: FilterSettings;
    noteFilter: FilterSettings;
    envelopes: EnvelopeSettings[];
    envelopeCount: number;
    fadeIn: number;
    fadeOut: number;
    transition: number;
    pitchShift: number;
    detune: number;
    vibrato: number;
    unison: number;
    effects: number;
    chord: number;
    volume: number;
    pan: number;
    pulseWidth: number;
    stringSustain: number;
    stringSustainType: SustainType;
    distortion: number;
    bitcrusherFreq: number;
    bitcrusherQuantization: number;
    chorus: number;
    reverb: number;
    echoSustain: number;
    echoDelay: number;
    algorithm: number;
    feedbackType: number;
    feedbackAmplitude: number;
    readonly operators: Operator[];
    readonly spectrumWave: SpectrumWave;
    readonly harmonicsWave: HarmonicsWave;
    readonly drumsetEnvelopes: number[];
    readonly drumsetSpectrumWaves: SpectrumWave[];
    constructor(isNoiseChannel: boolean);
    setTypeAndReset(type: InstrumentType, isNoiseChannel: boolean): void;
    convertLegacySettings(legacySettings: LegacySettings): void;
    toJsonObject(): Object;
    fromJsonObject(instrumentObject: any, isNoiseChannel: boolean, legacyGlobalReverb?: number): void;
    static frequencyFromPitch(pitch: number): number;
    addEnvelope(target: number, index: number, envelope: number): void;
    supportsEnvelopeTarget(target: number, index: number): boolean;
    clearInvalidEnvelopeTargets(): void;
    getTransition(): Transition;
    getFadeInSeconds(): number;
    getFadeOutTicks(): number;
    getChord(): Chord;
    getDrumsetEnvelope(pitch: number): Envelope;
}
export declare class Channel {
    octave: number;
    readonly instruments: Instrument[];
    readonly patterns: Pattern[];
    readonly bars: number[];
    muted: boolean;
}
export declare class Song {
    private static readonly _format;
    private static readonly _oldestVersion;
    private static readonly _latestVersion;
    scale: number;
    key: number;
    tempo: number;
    beatsPerBar: number;
    barCount: number;
    patternsPerChannel: number;
    rhythm: number;
    layeredInstruments: boolean;
    patternInstruments: boolean;
    loopStart: number;
    loopLength: number;
    pitchChannelCount: number;
    noiseChannelCount: number;
    readonly channels: Channel[];
    constructor(string?: string);
    getChannelCount(): number;
    getMaxInstrumentsPerChannel(): number;
    getMaxInstrumentsPerPattern(channelIndex: number): number;
    getMaxInstrumentsPerPatternForChannel(channel: Channel): number;
    getChannelIsNoise(channelIndex: number): boolean;
    initToDefault(andResetChannels?: boolean): void;
    toBase64String(): string;
    private static _envelopeFromLegacyIndex;
    fromBase64String(compressed: string): void;
    toJsonObject(enableIntro?: boolean, loopCount?: number, enableOutro?: boolean): Object;
    fromJsonObject(jsonObject: any): void;
    getPattern(channelIndex: number, bar: number): Pattern | null;
    getBeatsPerMinute(): number;
    static getNeededBits(maxValue: number): number;
}
export declare class Synth {
    private syncSongState;
    private warmUpSynthesizer;
    private static operatorAmplitudeCurve;
    samplesPerSecond: number;
    panningDelayBufferSize: number;
    panningDelayBufferMask: number;
    chorusDelayBufferSize: number;
    chorusDelayBufferMask: number;
    song: Song | null;
    preferLowerLatency: boolean;
    anticipatePoorPerformance: boolean;
    liveInputDuration: number;
    liveInputStarted: boolean;
    liveInputPitches: number[];
    liveInputChannel: number;
    liveInputInstruments: number[];
    loopRepeatCount: number;
    volume: number;
    enableMetronome: boolean;
    countInMetronome: boolean;
    private playheadInternal;
    private bar;
    private prevBar;
    private nextBar;
    private beat;
    private part;
    private tick;
    isAtStartOfTick: boolean;
    tickSampleCountdown: number;
    private isPlayingSong;
    private isRecording;
    private liveInputEndTime;
    private browserAutomaticallyClearsAudioBuffer;
    static readonly tempFilterStartCoefficients: FilterCoefficients;
    static readonly tempFilterEndCoefficients: FilterCoefficients;
    private tempDrumSetControlPoint;
    tempFrequencyResponse: FrequencyResponse;
    private static readonly fmSynthFunctionCache;
    private static readonly effectsFunctionCache;
    private static readonly pickedStringFunctionCache;
    private readonly channels;
    private readonly tonePool;
    private readonly tempMatchedPitchTones;
    private startedMetronome;
    private metronomeSamplesRemaining;
    private metronomeAmplitude;
    private metronomePrevAmplitude;
    private metronomeFilter;
    private limit;
    private tempMonoInstrumentSampleBuffer;
    private audioCtx;
    private scriptNode;
    get playing(): boolean;
    get recording(): boolean;
    get playhead(): number;
    set playhead(value: number);
    getSamplesPerBar(): number;
    getTicksIntoBar(): number;
    getCurrentPart(): number;
    getTotalBars(enableIntro: boolean, enableOutro: boolean): number;
    constructor(song?: Song | string | null);
    setSong(song: Song | string): void;
    private computeDelayBufferSizes;
    private activateAudio;
    private deactivateAudio;
    maintainLiveInput(): void;
    play(): void;
    pause(): void;
    startRecording(): void;
    snapToStart(): void;
    goToBar(bar: number): void;
    snapToBar(): void;
    resetEffects(): void;
    jumpIntoLoop(): void;
    goToNextBar(): void;
    goToPrevBar(): void;
    private getNextBar;
    private audioProcessCallback;
    synthesize(outputDataL: Float32Array, outputDataR: Float32Array, outputBufferLength: number, playSong?: boolean): void;
    private freeTone;
    private newTone;
    private releaseTone;
    private freeReleasedTone;
    freeAllTones(): void;
    private determineLiveInputTones;
    private adjacentPatternHasCompatibleInstrumentTransition;
    static adjacentNotesHaveMatchingPitches(firstNote: Note, secondNote: Note): boolean;
    private moveTonesIntoOrderedTempMatchedList;
    private determineCurrentActiveTones;
    private clearTempMatchedPitchTones;
    private playTone;
    private static computeChordExpression;
    private computeTone;
    static getLFOAmplitude(instrument: Instrument, secondsIntoBar: number): number;
    static getInstrumentSynthFunction(instrument: Instrument): Function;
    private static chipSynth;
    private static harmonicsSynth;
    private static pickedStringSynth;
    private static effectsSynth;
    private static pulseWidthSynth;
    private static fmSourceTemplate;
    private static operatorSourceTemplate;
    private static noiseSynth;
    private static spectrumSynth;
    private static drumsetSynth;
    private static findRandomZeroCrossing;
    static instrumentVolumeToVolumeMult(instrumentVolume: number): number;
    static volumeMultToInstrumentVolume(volumeMult: number): number;
    static noteSizeToVolumeMult(size: number): number;
    static volumeMultToNoteSize(volumeMult: number): number;
    static fadeInSettingToSeconds(setting: number): number;
    static secondsToFadeInSetting(seconds: number): number;
    static fadeOutSettingToTicks(setting: number): number;
    static ticksToFadeOutSetting(ticks: number): number;
    static detuneToCents(detune: number): number;
    static centsToDetune(cents: number): number;
    private getSamplesPerTick;
    static fittingPowerOfTwo(x: number): number;
    private sanitizeFilters;
    static sanitizeDelayLine(delayLine: Float32Array, lastIndex: number, mask: number): void;
    static applyFilters(sample: number, input1: number, input2: number, filterCount: number, filters: DynamicBiquadFilter[]): number;
}
export { Dictionary, DictionaryArray, FilterType, EnvelopeType, InstrumentType, Transition, Chord, Envelope, Config };
//# sourceMappingURL=synth.d.ts.map