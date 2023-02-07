/*!
Copyright (c) 2012-2022 John Nesky and contributing authors

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
export interface Dictionary<T> {
    [K: string]: T;
}
export interface DictionaryArray<T> extends ReadonlyArray<T> {
    dictionary: Dictionary<T>;
}
export declare const enum FilterType {
    lowPass = 0,
    highPass = 1,
    peak = 2,
    length = 3
}
export declare const enum SustainType {
    bright = 0,
    acoustic = 1,
    length = 2
}
export declare const enum EnvelopeType {
    noteSize = 0,
    none = 1,
    punch = 2,
    flare = 3,
    twang = 4,
    swell = 5,
    tremolo = 6,
    tremolo2 = 7,
    decay = 8
}
export declare const enum InstrumentType {
    chip = 0,
    fm = 1,
    noise = 2,
    spectrum = 3,
    drumset = 4,
    harmonics = 5,
    pwm = 6,
    pickedString = 7,
    length = 8
}
export declare const enum EffectType {
    reverb = 0,
    chorus = 1,
    panning = 2,
    distortion = 3,
    bitcrusher = 4,
    noteFilter = 5,
    echo = 6,
    pitchShift = 7,
    detune = 8,
    vibrato = 9,
    transition = 10,
    chord = 11,
    length = 12
}
export declare const enum EnvelopeComputeIndex {
    noteVolume = 0,
    noteFilterAllFreqs = 1,
    pulseWidth = 2,
    stringSustain = 3,
    unison = 4,
    operatorFrequency0 = 5,
    operatorFrequency1 = 6,
    operatorFrequency2 = 7,
    operatorFrequency3 = 8,
    operatorAmplitude0 = 9,
    operatorAmplitude1 = 10,
    operatorAmplitude2 = 11,
    operatorAmplitude3 = 12,
    feedbackAmplitude = 13,
    pitchShift = 14,
    detune = 15,
    vibratoDepth = 16,
    noteFilterFreq0 = 17,
    noteFilterFreq1 = 18,
    noteFilterFreq2 = 19,
    noteFilterFreq3 = 20,
    noteFilterFreq4 = 21,
    noteFilterFreq5 = 22,
    noteFilterFreq6 = 23,
    noteFilterFreq7 = 24,
    noteFilterGain0 = 25,
    noteFilterGain1 = 26,
    noteFilterGain2 = 27,
    noteFilterGain3 = 28,
    noteFilterGain4 = 29,
    noteFilterGain5 = 30,
    noteFilterGain6 = 31,
    noteFilterGain7 = 32,
    length = 33
}
export interface BeepBoxOption {
    readonly index: number;
    readonly name: string;
}
export interface Scale extends BeepBoxOption {
    readonly flags: ReadonlyArray<boolean>;
    readonly realName: string;
}
export interface Key extends BeepBoxOption {
    readonly isWhiteKey: boolean;
    readonly basePitch: number;
}
export interface Rhythm extends BeepBoxOption {
    readonly stepsPerBeat: number;
    readonly ticksPerArpeggio: number;
    readonly arpeggioPatterns: ReadonlyArray<ReadonlyArray<number>>;
    readonly roundUpThresholds: number[] | null;
}
export interface ChipWave extends BeepBoxOption {
    readonly expression: number;
    readonly samples: Float32Array;
}
export interface ChipNoise extends BeepBoxOption {
    readonly expression: number;
    readonly basePitch: number;
    readonly pitchFilterMult: number;
    readonly isSoft: boolean;
    samples: Float32Array | null;
}
export interface Transition extends BeepBoxOption {
    readonly isSeamless: boolean;
    readonly continues: boolean;
    readonly slides: boolean;
    readonly slideTicks: number;
    readonly includeAdjacentPatterns: boolean;
}
export interface Vibrato extends BeepBoxOption {
    readonly amplitude: number;
    readonly periodsSeconds: ReadonlyArray<number>;
    readonly delayTicks: number;
}
export interface Unison extends BeepBoxOption {
    readonly voices: number;
    readonly spread: number;
    readonly offset: number;
    readonly expression: number;
    readonly sign: number;
}
export interface Chord extends BeepBoxOption {
    readonly customInterval: boolean;
    readonly arpeggiates: boolean;
    readonly strumParts: number;
    readonly singleTone: boolean;
}
export interface Algorithm extends BeepBoxOption {
    readonly carrierCount: number;
    readonly associatedCarrier: ReadonlyArray<number>;
    readonly modulatedBy: ReadonlyArray<ReadonlyArray<number>>;
}
export interface OperatorFrequency extends BeepBoxOption {
    readonly mult: number;
    readonly hzOffset: number;
    readonly amplitudeSign: number;
}
export interface Feedback extends BeepBoxOption {
    readonly indices: ReadonlyArray<ReadonlyArray<number>>;
}
export interface Envelope extends BeepBoxOption {
    readonly type: EnvelopeType;
    readonly speed: number;
}
export interface AutomationTarget extends BeepBoxOption {
    readonly computeIndex: EnvelopeComputeIndex | null;
    readonly displayName: string;
    readonly interleave: boolean;
    readonly isFilter: boolean;
    readonly maxCount: number;
    readonly effect: EffectType | null;
    readonly compatibleInstruments: InstrumentType[] | null;
}
export declare class Config {
    static readonly scales: DictionaryArray<Scale>;
    static readonly keys: DictionaryArray<Key>;
    static readonly blackKeyNameParents: ReadonlyArray<number>;
    static readonly tempoMin: number;
    static readonly tempoMax: number;
    static readonly echoDelayRange: number;
    static readonly echoDelayStepTicks: number;
    static readonly echoSustainRange: number;
    static readonly echoShelfHz: number;
    static readonly echoShelfGain: number;
    static readonly reverbShelfHz: number;
    static readonly reverbShelfGain: number;
    static readonly reverbRange: number;
    static readonly reverbDelayBufferSize: number;
    static readonly reverbDelayBufferMask: number;
    static readonly beatsPerBarMin: number;
    static readonly beatsPerBarMax: number;
    static readonly barCountMin: number;
    static readonly barCountMax: number;
    static readonly instrumentCountMin: number;
    static readonly layeredInstrumentCountMax: number;
    static readonly patternInstrumentCountMax: number;
    static readonly partsPerBeat: number;
    static readonly ticksPerPart: number;
    static readonly rhythms: DictionaryArray<Rhythm>;
    static readonly instrumentTypeNames: ReadonlyArray<string>;
    static readonly instrumentTypeHasSpecialInterval: ReadonlyArray<boolean>;
    static readonly chipBaseExpression: number;
    static readonly fmBaseExpression: number;
    static readonly noiseBaseExpression: number;
    static readonly spectrumBaseExpression: number;
    static readonly drumsetBaseExpression: number;
    static readonly harmonicsBaseExpression: number;
    static readonly pwmBaseExpression: number;
    static readonly pickedStringBaseExpression: number;
    static readonly distortionBaseVolume: number;
    static readonly bitcrusherBaseVolume: number;
    static readonly chipWaves: DictionaryArray<ChipWave>;
    static readonly chipNoises: DictionaryArray<ChipNoise>;
    static readonly filterFreqStep: number;
    static readonly filterFreqRange: number;
    static readonly filterFreqReferenceSetting: number;
    static readonly filterFreqReferenceHz: number;
    static readonly filterFreqMaxHz: number;
    static readonly filterFreqMinHz: number;
    static readonly filterGainRange: number;
    static readonly filterGainCenter: number;
    static readonly filterGainStep: number;
    static readonly filterMaxPoints: number;
    static readonly filterTypeNames: ReadonlyArray<string>;
    static readonly fadeInRange: number;
    static readonly fadeOutTicks: ReadonlyArray<number>;
    static readonly fadeOutNeutral: number;
    static readonly drumsetFadeOutTicks: number;
    static readonly transitions: DictionaryArray<Transition>;
    static readonly vibratos: DictionaryArray<Vibrato>;
    static readonly unisons: DictionaryArray<Unison>;
    static readonly effectNames: ReadonlyArray<string>;
    static readonly effectOrder: ReadonlyArray<EffectType>;
    static readonly noteSizeMax: number;
    static readonly volumeRange: number;
    static readonly volumeLogScale: number;
    static readonly panCenter: number;
    static readonly panMax: number;
    static readonly panDelaySecondsMax: number;
    static readonly chorusRange: number;
    static readonly chorusPeriodSeconds: number;
    static readonly chorusDelayRange: number;
    static readonly chorusDelayOffsets: ReadonlyArray<ReadonlyArray<number>>;
    static readonly chorusPhaseOffsets: ReadonlyArray<ReadonlyArray<number>>;
    static readonly chorusMaxDelay: number;
    static readonly chords: DictionaryArray<Chord>;
    static readonly maxChordSize: number;
    static readonly operatorCount: number;
    static readonly maxPitchOrOperatorCount: number;
    static readonly algorithms: DictionaryArray<Algorithm>;
    static readonly operatorCarrierInterval: ReadonlyArray<number>;
    static readonly operatorAmplitudeMax: number;
    static readonly operatorFrequencies: DictionaryArray<OperatorFrequency>;
    static readonly envelopes: DictionaryArray<Envelope>;
    static readonly feedbacks: DictionaryArray<Feedback>;
    static readonly chipNoiseLength: number;
    static readonly spectrumNoiseLength: number;
    static readonly spectrumBasePitch: number;
    static readonly spectrumControlPoints: number;
    static readonly spectrumControlPointsPerOctave: number;
    static readonly spectrumControlPointBits: number;
    static readonly spectrumMax: number;
    static readonly harmonicsControlPoints: number;
    static readonly harmonicsRendered: number;
    static readonly harmonicsRenderedForPickedString: number;
    static readonly harmonicsControlPointBits: number;
    static readonly harmonicsMax: number;
    static readonly harmonicsWavelength: number;
    static readonly pulseWidthRange: number;
    static readonly pulseWidthStepPower: number;
    static readonly pitchChannelCountMin: number;
    static readonly pitchChannelCountMax: number;
    static readonly noiseChannelCountMin: number;
    static readonly noiseChannelCountMax: number;
    static readonly noiseInterval: number;
    static readonly pitchesPerOctave: number;
    static readonly drumCount: number;
    static readonly pitchOctaves: number;
    static readonly maxPitch: number;
    static readonly maximumTonesPerChannel: number;
    static readonly justIntonationSemitones: number[];
    static readonly pitchShiftRange: number;
    static readonly pitchShiftCenter: number;
    static readonly detuneCenter: number;
    static readonly detuneMax: number;
    static readonly sineWaveLength: number;
    static readonly sineWaveMask: number;
    static readonly sineWave: Float32Array;
    static readonly pickedStringDispersionCenterFreq: number;
    static readonly pickedStringDispersionFreqScale: number;
    static readonly pickedStringDispersionFreqMult: number;
    static readonly pickedStringShelfHz: number;
    static readonly stringSustainRange: number;
    static readonly stringDecayRate: number;
    static readonly sustainTypeNames: ReadonlyArray<string>;
    static readonly distortionRange: number;
    static readonly bitcrusherFreqRange: number;
    static readonly bitcrusherOctaveStep: number;
    static readonly bitcrusherQuantizationRange: number;
    static readonly maxEnvelopeCount: number;
    static readonly defaultAutomationRange: number;
    static readonly instrumentAutomationTargets: DictionaryArray<AutomationTarget>;
}
export declare function performIntegral(wave: {
    length: number;
    [index: number]: number;
}): void;
export declare function getPulseWidthRatio(pulseWidth: number): number;
export declare function getDrumWave(index: number, inverseRealFourierTransform: Function | null, scaleElementsByFactor: Function | null): Float32Array;
export declare function drawNoiseSpectrum(wave: Float32Array, waveLength: number, lowOctave: number, highOctave: number, lowPower: number, highPower: number, overallSlope: number): number;
export declare function getArpeggioPitchIndex(pitchCount: number, rhythm: number, arpeggio: number): number;
export declare function toNameMap<T extends BeepBoxOption>(array: Array<Pick<T, Exclude<keyof T, "index">>>): DictionaryArray<T>;
export declare function effectsIncludeTransition(effects: number): boolean;
export declare function effectsIncludeChord(effects: number): boolean;
export declare function effectsIncludePitchShift(effects: number): boolean;
export declare function effectsIncludeDetune(effects: number): boolean;
export declare function effectsIncludeVibrato(effects: number): boolean;
export declare function effectsIncludeNoteFilter(effects: number): boolean;
export declare function effectsIncludeDistortion(effects: number): boolean;
export declare function effectsIncludeBitcrusher(effects: number): boolean;
export declare function effectsIncludePanning(effects: number): boolean;
export declare function effectsIncludeChorus(effects: number): boolean;
export declare function effectsIncludeEcho(effects: number): boolean;
export declare function effectsIncludeReverb(effects: number): boolean;
//# sourceMappingURL=SynthConfig.d.ts.map