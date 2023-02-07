"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.effectsIncludeReverb = exports.effectsIncludeEcho = exports.effectsIncludeChorus = exports.effectsIncludePanning = exports.effectsIncludeBitcrusher = exports.effectsIncludeDistortion = exports.effectsIncludeNoteFilter = exports.effectsIncludeVibrato = exports.effectsIncludeDetune = exports.effectsIncludePitchShift = exports.effectsIncludeChord = exports.effectsIncludeTransition = exports.toNameMap = exports.getArpeggioPitchIndex = exports.drawNoiseSpectrum = exports.getDrumWave = exports.getPulseWidthRatio = exports.performIntegral = exports.Config = void 0;
class Config {
}
exports.Config = Config;
Config.scales = toNameMap([
    { name: "easy :)", realName: "pentatonic major", flags: [true, false, true, false, true, false, false, true, false, true, false, false] },
    { name: "easy :(", realName: "pentatonic minor", flags: [true, false, false, true, false, true, false, true, false, false, true, false] },
    { name: "island :)", realName: "ryukyu", flags: [true, false, false, false, true, true, false, true, false, false, false, true] },
    { name: "island :(", realName: "pelog selisir", flags: [true, true, false, true, false, false, false, true, true, false, false, false] },
    { name: "blues :)", realName: "blues major", flags: [true, false, true, true, true, false, false, true, false, true, false, false] },
    { name: "blues :(", realName: "blues", flags: [true, false, false, true, false, true, true, true, false, false, true, false] },
    { name: "normal :)", realName: "ionian", flags: [true, false, true, false, true, true, false, true, false, true, false, true] },
    { name: "normal :(", realName: "aeolian", flags: [true, false, true, true, false, true, false, true, true, false, true, false] },
    { name: "dbl harmonic :)", realName: "double harmonic major", flags: [true, true, false, false, true, true, false, true, true, false, false, true] },
    { name: "dbl harmonic :(", realName: "double harmonic minor", flags: [true, false, true, true, false, false, true, true, true, false, false, true] },
    { name: "strange", realName: "whole tone", flags: [true, false, true, false, true, false, true, false, true, false, true, false] },
    { name: "expert", realName: "chromatic", flags: [true, true, true, true, true, true, true, true, true, true, true, true] },
]);
Config.keys = toNameMap([
    { name: "C", isWhiteKey: true, basePitch: 12 },
    { name: "C♯", isWhiteKey: false, basePitch: 13 },
    { name: "D", isWhiteKey: true, basePitch: 14 },
    { name: "D♯", isWhiteKey: false, basePitch: 15 },
    { name: "E", isWhiteKey: true, basePitch: 16 },
    { name: "F", isWhiteKey: true, basePitch: 17 },
    { name: "F♯", isWhiteKey: false, basePitch: 18 },
    { name: "G", isWhiteKey: true, basePitch: 19 },
    { name: "G♯", isWhiteKey: false, basePitch: 20 },
    { name: "A", isWhiteKey: true, basePitch: 21 },
    { name: "A♯", isWhiteKey: false, basePitch: 22 },
    { name: "B", isWhiteKey: true, basePitch: 23 },
]);
Config.blackKeyNameParents = [-1, 1, -1, 1, -1, 1, -1, -1, 1, -1, 1, -1];
Config.tempoMin = 30;
Config.tempoMax = 300;
Config.echoDelayRange = 24;
Config.echoDelayStepTicks = 4;
Config.echoSustainRange = 8;
Config.echoShelfHz = 4000.0; // The cutoff freq of the shelf filter that is used to decay echoes.
Config.echoShelfGain = Math.pow(2.0, -0.5);
Config.reverbShelfHz = 8000.0; // The cutoff freq of the shelf filter that is used to decay reverb.
Config.reverbShelfGain = Math.pow(2.0, -1.5);
Config.reverbRange = 4;
Config.reverbDelayBufferSize = 16384; // TODO: Compute a buffer size based on sample rate.
Config.reverbDelayBufferMask = Config.reverbDelayBufferSize - 1; // TODO: Compute a buffer size based on sample rate.
Config.beatsPerBarMin = 3;
Config.beatsPerBarMax = 16;
Config.barCountMin = 1;
Config.barCountMax = 128;
Config.instrumentCountMin = 1;
Config.layeredInstrumentCountMax = 4;
Config.patternInstrumentCountMax = 10;
Config.partsPerBeat = 24;
Config.ticksPerPart = 2;
Config.rhythms = toNameMap([
    { name: "÷3 (triplets)", stepsPerBeat: 3, ticksPerArpeggio: 4, arpeggioPatterns: [[0], [0, 0, 1, 1], [0, 1, 2, 1]], roundUpThresholds: [/*0*/ 5, /*8*/ 12, /*16*/ 18 /*24*/] },
    { name: "÷4 (standard)", stepsPerBeat: 4, ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 0, 1, 1], [0, 1, 2, 1]], roundUpThresholds: [/*0*/ 3, /*6*/ 9, /*12*/ 17, /*18*/ 21 /*24*/] },
    { name: "÷6", stepsPerBeat: 6, ticksPerArpeggio: 4, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1]], roundUpThresholds: null },
    { name: "÷8", stepsPerBeat: 8, ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1]], roundUpThresholds: null },
    { name: "freehand", stepsPerBeat: 24, ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1]], roundUpThresholds: null },
]);
Config.instrumentTypeNames = ["chip", "FM", "noise", "spectrum", "drumset", "harmonics", "PWM", "Picked String"]; // See InstrumentType enum above.
Config.instrumentTypeHasSpecialInterval = [true, true, false, false, false, true, false, false];
Config.chipBaseExpression = 0.03375; // Doubled by unison feature, but affected by expression adjustments per unison setting and wave shape.
Config.fmBaseExpression = 0.03;
Config.noiseBaseExpression = 0.19;
Config.spectrumBaseExpression = 0.3; // Spectrum can be in pitch or noise channels, the expression is doubled for noise.
Config.drumsetBaseExpression = 0.45; // Drums tend to be loud but brief!
Config.harmonicsBaseExpression = 0.025;
Config.pwmBaseExpression = 0.04725; // It's actually closer to half of this, the synthesized pulse amplitude range is only .5 to -.5, but also note that the fundamental sine partial amplitude of a square wave is 4/π times the measured square wave amplitude.
Config.pickedStringBaseExpression = 0.025; // Same as harmonics.
Config.distortionBaseVolume = 0.011; // Distortion is not affected by pitchDamping, which otherwise approximately halves expression for notes around the middle of the range.
Config.bitcrusherBaseVolume = 0.010; // Also not affected by pitchDamping, used when bit crushing is maxed out (aka "1-bit" output).
Config.chipWaves = toNameMap([
    { name: "rounded", expression: 0.94, samples: centerWave([0.0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.95, 0.9, 0.85, 0.8, 0.7, 0.6, 0.5, 0.4, 0.2, 0.0, -0.2, -0.4, -0.5, -0.6, -0.7, -0.8, -0.85, -0.9, -0.95, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -0.95, -0.9, -0.85, -0.8, -0.7, -0.6, -0.5, -0.4, -0.2]) },
    { name: "triangle", expression: 1.0, samples: centerWave([1.0 / 15.0, 3.0 / 15.0, 5.0 / 15.0, 7.0 / 15.0, 9.0 / 15.0, 11.0 / 15.0, 13.0 / 15.0, 15.0 / 15.0, 15.0 / 15.0, 13.0 / 15.0, 11.0 / 15.0, 9.0 / 15.0, 7.0 / 15.0, 5.0 / 15.0, 3.0 / 15.0, 1.0 / 15.0, -1.0 / 15.0, -3.0 / 15.0, -5.0 / 15.0, -7.0 / 15.0, -9.0 / 15.0, -11.0 / 15.0, -13.0 / 15.0, -15.0 / 15.0, -15.0 / 15.0, -13.0 / 15.0, -11.0 / 15.0, -9.0 / 15.0, -7.0 / 15.0, -5.0 / 15.0, -3.0 / 15.0, -1.0 / 15.0]) },
    { name: "square", expression: 0.5, samples: centerWave([1.0, -1.0]) },
    { name: "1/4 pulse", expression: 0.5, samples: centerWave([1.0, -1.0, -1.0, -1.0]) },
    { name: "1/8 pulse", expression: 0.5, samples: centerWave([1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0]) },
    { name: "sawtooth", expression: 0.65, samples: centerWave([1.0 / 31.0, 3.0 / 31.0, 5.0 / 31.0, 7.0 / 31.0, 9.0 / 31.0, 11.0 / 31.0, 13.0 / 31.0, 15.0 / 31.0, 17.0 / 31.0, 19.0 / 31.0, 21.0 / 31.0, 23.0 / 31.0, 25.0 / 31.0, 27.0 / 31.0, 29.0 / 31.0, 31.0 / 31.0, -31.0 / 31.0, -29.0 / 31.0, -27.0 / 31.0, -25.0 / 31.0, -23.0 / 31.0, -21.0 / 31.0, -19.0 / 31.0, -17.0 / 31.0, -15.0 / 31.0, -13.0 / 31.0, -11.0 / 31.0, -9.0 / 31.0, -7.0 / 31.0, -5.0 / 31.0, -3.0 / 31.0, -1.0 / 31.0]) },
    { name: "double saw", expression: 0.5, samples: centerWave([0.0, -0.2, -0.4, -0.6, -0.8, -1.0, 1.0, -0.8, -0.6, -0.4, -0.2, 1.0, 0.8, 0.6, 0.4, 0.2]) },
    { name: "double pulse", expression: 0.4, samples: centerWave([1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0]) },
    { name: "spiky", expression: 0.4, samples: centerWave([1.0, -1.0, 1.0, -1.0, 1.0, 0.0]) },
]);
// Noise waves have too many samples to write by hand, they're generated on-demand by getDrumWave instead.
Config.chipNoises = toNameMap([
    { name: "retro", expression: 0.25, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
    { name: "white", expression: 1.0, basePitch: 69, pitchFilterMult: 8.0, isSoft: true, samples: null },
    // The "clang" and "buzz" noises are based on similar noises in the modded beepbox! :D
    { name: "clang", expression: 0.4, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
    { name: "buzz", expression: 0.3, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
    { name: "hollow", expression: 1.5, basePitch: 96, pitchFilterMult: 1.0, isSoft: true, samples: null },
]);
Config.filterFreqStep = 1.0 / 4.0;
Config.filterFreqRange = 34;
Config.filterFreqReferenceSetting = 28;
Config.filterFreqReferenceHz = 8000.0;
Config.filterFreqMaxHz = Config.filterFreqReferenceHz * Math.pow(2.0, Config.filterFreqStep * (Config.filterFreqRange - 1 - Config.filterFreqReferenceSetting)); // ~19khz
Config.filterFreqMinHz = 8.0;
Config.filterGainRange = 15;
Config.filterGainCenter = 7;
Config.filterGainStep = 1.0 / 2.0;
Config.filterMaxPoints = 8;
Config.filterTypeNames = ["low-pass", "high-pass", "peak"]; // See FilterType enum above.
Config.fadeInRange = 10;
Config.fadeOutTicks = [-24, -12, -6, -3, -1, 6, 12, 24, 48, 72, 96];
Config.fadeOutNeutral = 4;
Config.drumsetFadeOutTicks = 48;
Config.transitions = toNameMap([
    { name: "normal", isSeamless: false, continues: false, slides: false, slideTicks: 3, includeAdjacentPatterns: false },
    { name: "interrupt", isSeamless: true, continues: false, slides: false, slideTicks: 3, includeAdjacentPatterns: true },
    { name: "continue", isSeamless: true, continues: true, slides: false, slideTicks: 3, includeAdjacentPatterns: true },
    { name: "slide", isSeamless: true, continues: false, slides: true, slideTicks: 3, includeAdjacentPatterns: true },
    { name: "slide in pattern", isSeamless: true, continues: false, slides: true, slideTicks: 3, includeAdjacentPatterns: false },
]);
Config.vibratos = toNameMap([
    { name: "none", amplitude: 0.0, periodsSeconds: [0.14], delayTicks: 0 },
    { name: "light", amplitude: 0.15, periodsSeconds: [0.14], delayTicks: 0 },
    { name: "delayed", amplitude: 0.3, periodsSeconds: [0.14], delayTicks: 37 },
    { name: "heavy", amplitude: 0.45, periodsSeconds: [0.14], delayTicks: 0 },
    { name: "shaky", amplitude: 0.1, periodsSeconds: [0.11, 1.618 * 0.11, 3 * 0.11], delayTicks: 0 },
]);
Config.unisons = toNameMap([
    { name: "none", voices: 1, spread: 0.0, offset: 0.0, expression: 1.4, sign: 1.0 },
    { name: "shimmer", voices: 2, spread: 0.018, offset: 0.0, expression: 0.8, sign: 1.0 },
    { name: "hum", voices: 2, spread: 0.045, offset: 0.0, expression: 1.0, sign: 1.0 },
    { name: "honky tonk", voices: 2, spread: 0.09, offset: 0.0, expression: 1.0, sign: 1.0 },
    { name: "dissonant", voices: 2, spread: 0.25, offset: 0.0, expression: 0.9, sign: 1.0 },
    { name: "fifth", voices: 2, spread: 3.5, offset: 3.5, expression: 0.9, sign: 1.0 },
    { name: "octave", voices: 2, spread: 6.0, offset: 6.0, expression: 0.8, sign: 1.0 },
    { name: "bowed", voices: 2, spread: 0.02, offset: 0.0, expression: 1.0, sign: -1.0 },
    { name: "piano", voices: 2, spread: 0.01, offset: 0.0, expression: 1.0, sign: 0.7 },
]);
Config.effectNames = ["reverb", "chorus", "panning", "distortion", "bitcrusher", "note filter", "echo", "pitch shift", "detune", "vibrato", "transition type", "chord type"];
Config.effectOrder = [10 /* EffectType.transition */, 11 /* EffectType.chord */, 7 /* EffectType.pitchShift */, 8 /* EffectType.detune */, 9 /* EffectType.vibrato */, 5 /* EffectType.noteFilter */, 3 /* EffectType.distortion */, 4 /* EffectType.bitcrusher */, 2 /* EffectType.panning */, 1 /* EffectType.chorus */, 6 /* EffectType.echo */, 0 /* EffectType.reverb */];
Config.noteSizeMax = 3;
Config.volumeRange = 8;
Config.volumeLogScale = -0.5;
Config.panCenter = 4;
Config.panMax = Config.panCenter * 2;
Config.panDelaySecondsMax = 0.0005;
Config.chorusRange = 4;
Config.chorusPeriodSeconds = 2.0;
Config.chorusDelayRange = 0.0034;
Config.chorusDelayOffsets = [[1.51, 2.10, 3.35], [1.47, 2.15, 3.25]];
Config.chorusPhaseOffsets = [[0.0, 2.1, 4.2], [3.2, 5.3, 1.0]];
Config.chorusMaxDelay = Config.chorusDelayRange * (1.0 + Config.chorusDelayOffsets[0].concat(Config.chorusDelayOffsets[1]).reduce((x, y) => Math.max(x, y)));
Config.chords = toNameMap([
    { name: "simultaneous", customInterval: false, arpeggiates: false, strumParts: 0, singleTone: false },
    { name: "strum", customInterval: false, arpeggiates: false, strumParts: 1, singleTone: false },
    { name: "arpeggio", customInterval: false, arpeggiates: true, strumParts: 0, singleTone: true },
    { name: "custom interval", customInterval: true, arpeggiates: false, strumParts: 0, singleTone: true },
]);
Config.maxChordSize = 4;
Config.operatorCount = 4;
Config.maxPitchOrOperatorCount = Math.max(Config.maxChordSize, Config.operatorCount);
Config.algorithms = toNameMap([
    { name: "1←(2 3 4)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2, 3, 4], [], [], []] },
    { name: "1←(2 3←4)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2, 3], [], [4], []] },
    { name: "1←2←(3 4)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2], [3, 4], [], []] },
    { name: "1←(2 3)←4", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2, 3], [4], [4], []] },
    { name: "1←2←3←4", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2], [3], [4], []] },
    { name: "1←3 2←4", carrierCount: 2, associatedCarrier: [1, 2, 1, 2], modulatedBy: [[3], [4], [], []] },
    { name: "1 2←(3 4)", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[], [3, 4], [], []] },
    { name: "1 2←3←4", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[], [3], [4], []] },
    { name: "(1 2)←3←4", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[3], [3], [4], []] },
    { name: "(1 2)←(3 4)", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[3, 4], [3, 4], [], []] },
    { name: "1 2 3←4", carrierCount: 3, associatedCarrier: [1, 2, 3, 3], modulatedBy: [[], [], [4], []] },
    { name: "(1 2 3)←4", carrierCount: 3, associatedCarrier: [1, 2, 3, 3], modulatedBy: [[4], [4], [4], []] },
    { name: "1 2 3 4", carrierCount: 4, associatedCarrier: [1, 2, 3, 4], modulatedBy: [[], [], [], []] },
]);
Config.operatorCarrierInterval = [0.0, 0.04, -0.073, 0.091];
Config.operatorAmplitudeMax = 15;
Config.operatorFrequencies = toNameMap([
    { name: "1×", mult: 1.0, hzOffset: 0.0, amplitudeSign: 1.0 },
    { name: "~1×", mult: 1.0, hzOffset: 1.5, amplitudeSign: -1.0 },
    { name: "2×", mult: 2.0, hzOffset: 0.0, amplitudeSign: 1.0 },
    { name: "~2×", mult: 2.0, hzOffset: -1.3, amplitudeSign: -1.0 },
    { name: "3×", mult: 3.0, hzOffset: 0.0, amplitudeSign: 1.0 },
    { name: "4×", mult: 4.0, hzOffset: 0.0, amplitudeSign: 1.0 },
    { name: "5×", mult: 5.0, hzOffset: 0.0, amplitudeSign: 1.0 },
    { name: "6×", mult: 6.0, hzOffset: 0.0, amplitudeSign: 1.0 },
    { name: "7×", mult: 7.0, hzOffset: 0.0, amplitudeSign: 1.0 },
    { name: "8×", mult: 8.0, hzOffset: 0.0, amplitudeSign: 1.0 },
    { name: "9×", mult: 9.0, hzOffset: 0.0, amplitudeSign: 1.0 },
    { name: "11×", mult: 11.0, hzOffset: 0.0, amplitudeSign: 1.0 },
    { name: "13×", mult: 13.0, hzOffset: 0.0, amplitudeSign: 1.0 },
    { name: "16×", mult: 16.0, hzOffset: 0.0, amplitudeSign: 1.0 },
    { name: "20×", mult: 20.0, hzOffset: 0.0, amplitudeSign: 1.0 },
]);
Config.envelopes = toNameMap([
    { name: "none", type: 1 /* EnvelopeType.none */, speed: 0.0 },
    { name: "note size", type: 0 /* EnvelopeType.noteSize */, speed: 0.0 },
    { name: "punch", type: 2 /* EnvelopeType.punch */, speed: 0.0 },
    { name: "flare 1", type: 3 /* EnvelopeType.flare */, speed: 32.0 },
    { name: "flare 2", type: 3 /* EnvelopeType.flare */, speed: 8.0 },
    { name: "flare 3", type: 3 /* EnvelopeType.flare */, speed: 2.0 },
    { name: "twang 1", type: 4 /* EnvelopeType.twang */, speed: 32.0 },
    { name: "twang 2", type: 4 /* EnvelopeType.twang */, speed: 8.0 },
    { name: "twang 3", type: 4 /* EnvelopeType.twang */, speed: 2.0 },
    { name: "swell 1", type: 5 /* EnvelopeType.swell */, speed: 32.0 },
    { name: "swell 2", type: 5 /* EnvelopeType.swell */, speed: 8.0 },
    { name: "swell 3", type: 5 /* EnvelopeType.swell */, speed: 2.0 },
    { name: "tremolo1", type: 6 /* EnvelopeType.tremolo */, speed: 4.0 },
    { name: "tremolo2", type: 6 /* EnvelopeType.tremolo */, speed: 2.0 },
    { name: "tremolo3", type: 6 /* EnvelopeType.tremolo */, speed: 1.0 },
    { name: "tremolo4", type: 7 /* EnvelopeType.tremolo2 */, speed: 4.0 },
    { name: "tremolo5", type: 7 /* EnvelopeType.tremolo2 */, speed: 2.0 },
    { name: "tremolo6", type: 7 /* EnvelopeType.tremolo2 */, speed: 1.0 },
    { name: "decay 1", type: 8 /* EnvelopeType.decay */, speed: 10.0 },
    { name: "decay 2", type: 8 /* EnvelopeType.decay */, speed: 7.0 },
    { name: "decay 3", type: 8 /* EnvelopeType.decay */, speed: 4.0 },
]);
Config.feedbacks = toNameMap([
    { name: "1⟲", indices: [[1], [], [], []] },
    { name: "2⟲", indices: [[], [2], [], []] },
    { name: "3⟲", indices: [[], [], [3], []] },
    { name: "4⟲", indices: [[], [], [], [4]] },
    { name: "1⟲ 2⟲", indices: [[1], [2], [], []] },
    { name: "3⟲ 4⟲", indices: [[], [], [3], [4]] },
    { name: "1⟲ 2⟲ 3⟲", indices: [[1], [2], [3], []] },
    { name: "2⟲ 3⟲ 4⟲", indices: [[], [2], [3], [4]] },
    { name: "1⟲ 2⟲ 3⟲ 4⟲", indices: [[1], [2], [3], [4]] },
    { name: "1→2", indices: [[], [1], [], []] },
    { name: "1→3", indices: [[], [], [1], []] },
    { name: "1→4", indices: [[], [], [], [1]] },
    { name: "2→3", indices: [[], [], [2], []] },
    { name: "2→4", indices: [[], [], [], [2]] },
    { name: "3→4", indices: [[], [], [], [3]] },
    { name: "1→3 2→4", indices: [[], [], [1], [2]] },
    { name: "1→4 2→3", indices: [[], [], [2], [1]] },
    { name: "1→2→3→4", indices: [[], [1], [2], [3]] },
]);
Config.chipNoiseLength = 1 << 15; // 32768
Config.spectrumNoiseLength = 1 << 15; // 32768
Config.spectrumBasePitch = 24;
Config.spectrumControlPoints = 30;
Config.spectrumControlPointsPerOctave = 7;
Config.spectrumControlPointBits = 3;
Config.spectrumMax = (1 << Config.spectrumControlPointBits) - 1;
Config.harmonicsControlPoints = 28;
Config.harmonicsRendered = 64;
Config.harmonicsRenderedForPickedString = 1 << 8; // 256
Config.harmonicsControlPointBits = 3;
Config.harmonicsMax = (1 << Config.harmonicsControlPointBits) - 1;
Config.harmonicsWavelength = 1 << 11; // 2048
Config.pulseWidthRange = 8;
Config.pulseWidthStepPower = 0.5;
Config.pitchChannelCountMin = 1;
Config.pitchChannelCountMax = 10;
Config.noiseChannelCountMin = 0;
Config.noiseChannelCountMax = 5;
Config.noiseInterval = 6;
Config.pitchesPerOctave = 12; // TODO: Use this for converting pitch to frequency.
Config.drumCount = 12;
Config.pitchOctaves = 7;
Config.maxPitch = Config.pitchOctaves * Config.pitchesPerOctave;
Config.maximumTonesPerChannel = Config.maxChordSize * 2;
Config.justIntonationSemitones = [1.0 / 2.0, 8.0 / 15.0, 9.0 / 16.0, 3.0 / 5.0, 5.0 / 8.0, 2.0 / 3.0, 32.0 / 45.0, 3.0 / 4.0, 4.0 / 5.0, 5.0 / 6.0, 8.0 / 9.0, 15.0 / 16.0, 1.0, 16.0 / 15.0, 9.0 / 8.0, 6.0 / 5.0, 5.0 / 4.0, 4.0 / 3.0, 45.0 / 32.0, 3.0 / 2.0, 8.0 / 5.0, 5.0 / 3.0, 16.0 / 9.0, 15.0 / 8.0, 2.0].map(x => Math.log2(x) * Config.pitchesPerOctave);
Config.pitchShiftRange = Config.justIntonationSemitones.length;
Config.pitchShiftCenter = Config.pitchShiftRange >> 1;
Config.detuneCenter = 9;
Config.detuneMax = Config.detuneCenter * 2;
Config.sineWaveLength = 1 << 8; // 256
Config.sineWaveMask = Config.sineWaveLength - 1;
Config.sineWave = generateSineWave();
// Picked strings have an all-pass filter with a corner frequency based on the tone fundamental frequency, in order to add a slight inharmonicity. (Which is important for distortion.)
Config.pickedStringDispersionCenterFreq = 6000.0; // The tone fundamental freq is pulled toward this freq for computing the all-pass corner freq.
Config.pickedStringDispersionFreqScale = 0.3; // The tone fundamental freq freq moves this much toward the center freq for computing the all-pass corner freq.
Config.pickedStringDispersionFreqMult = 4.0; // The all-pass corner freq is based on this times the adjusted tone fundamental freq.
Config.pickedStringShelfHz = 4000.0; // The cutoff freq of the shelf filter that is used to decay the high frequency energy in the picked string.
Config.stringSustainRange = 15;
Config.stringDecayRate = 0.12;
Config.sustainTypeNames = ["bright", "acoustic"]; // See SustainType enum above.
Config.distortionRange = 8;
Config.bitcrusherFreqRange = 14;
Config.bitcrusherOctaveStep = 0.5;
Config.bitcrusherQuantizationRange = 8;
Config.maxEnvelopeCount = 12;
Config.defaultAutomationRange = 13;
Config.instrumentAutomationTargets = toNameMap([
    { name: "none", computeIndex: null, displayName: "none", /*perNote: false,*/ interleave: false, isFilter: false, /*range: 0,                              */ maxCount: 1, effect: null, compatibleInstruments: null },
    { name: "noteVolume", computeIndex: 0 /* EnvelopeComputeIndex.noteVolume */, displayName: "note volume", /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.volumeRange,             */ maxCount: 1, effect: null, compatibleInstruments: null },
    { name: "pulseWidth", computeIndex: 2 /* EnvelopeComputeIndex.pulseWidth */, displayName: "pulse width", /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.pulseWidthRange,         */ maxCount: 1, effect: null, compatibleInstruments: [6 /* InstrumentType.pwm */] },
    { name: "stringSustain", computeIndex: 3 /* EnvelopeComputeIndex.stringSustain */, displayName: "sustain", /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.stringSustainRange,      */ maxCount: 1, effect: null, compatibleInstruments: [7 /* InstrumentType.pickedString */] },
    { name: "unison", computeIndex: 4 /* EnvelopeComputeIndex.unison */, displayName: "unison", /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.defaultAutomationRange,  */ maxCount: 1, effect: null, compatibleInstruments: [0 /* InstrumentType.chip */, 5 /* InstrumentType.harmonics */, 7 /* InstrumentType.pickedString */] },
    { name: "operatorFrequency", computeIndex: 5 /* EnvelopeComputeIndex.operatorFrequency0 */, displayName: "fm# freq", /*perNote:  true,*/ interleave: true, isFilter: false, /*range: Config.defaultAutomationRange,  */ maxCount: Config.operatorCount, effect: null, compatibleInstruments: [1 /* InstrumentType.fm */] },
    { name: "operatorAmplitude", computeIndex: 9 /* EnvelopeComputeIndex.operatorAmplitude0 */, displayName: "fm# volume", /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.operatorAmplitudeMax + 1,*/ maxCount: Config.operatorCount, effect: null, compatibleInstruments: [1 /* InstrumentType.fm */] },
    { name: "feedbackAmplitude", computeIndex: 13 /* EnvelopeComputeIndex.feedbackAmplitude */, displayName: "fm feedback", /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.operatorAmplitudeMax + 1,*/ maxCount: 1, effect: null, compatibleInstruments: [1 /* InstrumentType.fm */] },
    { name: "pitchShift", computeIndex: 14 /* EnvelopeComputeIndex.pitchShift */, displayName: "pitch shift", /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.pitchShiftRange,         */ maxCount: 1, effect: 7 /* EffectType.pitchShift */, compatibleInstruments: null },
    { name: "detune", computeIndex: 15 /* EnvelopeComputeIndex.detune */, displayName: "detune", /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.detuneMax + 1,           */ maxCount: 1, effect: 8 /* EffectType.detune */, compatibleInstruments: null },
    { name: "vibratoDepth", computeIndex: 16 /* EnvelopeComputeIndex.vibratoDepth */, displayName: "vibrato range", /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.defaultAutomationRange,  */ maxCount: 1, effect: 9 /* EffectType.vibrato */, compatibleInstruments: null },
    { name: "noteFilterAllFreqs", computeIndex: 1 /* EnvelopeComputeIndex.noteFilterAllFreqs */, displayName: "n. filter freqs", /*perNote:  true,*/ interleave: false, isFilter: true, /*range: null,                           */ maxCount: 1, effect: 5 /* EffectType.noteFilter */, compatibleInstruments: null },
    { name: "noteFilterFreq", computeIndex: 17 /* EnvelopeComputeIndex.noteFilterFreq0 */, displayName: "n. filter # freq", /*perNote:  true,*/ interleave: false /*true*/, isFilter: true, /*range: Config.filterFreqRange,     */ maxCount: Config.filterMaxPoints, effect: 5 /* EffectType.noteFilter */, compatibleInstruments: null },
    // Controlling filter gain is less obvious and intuitive than controlling filter freq, so to avoid confusion I've disabled it for now...
    //{name: "noteFilterGain",         computeIndex:       EnvelopeComputeIndex.noteFilterGain0,        displayName: "n. filter # vol",  /*perNote:  true,*/ interleave: false, isFilter:  true, range: Config.filterGainRange,             maxCount: Config.filterMaxPoints, effect: EffectType.noteFilter, compatibleInstruments: null},
    /*
    {name: "distortion",             computeIndex: InstrumentAutomationIndex.distortion,             displayName: "distortion",       perNote: false, interleave: false, isFilter: false, range: Config.distortionRange,             maxCount: 1,    effect: EffectType.distortion,   compatibleInstruments: null},
    {name: "bitcrusherQuantization", computeIndex: InstrumentAutomationIndex.bitcrusherQuantization, displayName: "bit crush",        perNote: false, interleave: false, isFilter: false, range: Config.bitcrusherQuantizationRange, maxCount: 1,    effect: EffectType.bitcrusher,   compatibleInstruments: null},
    {name: "bitcrusherFrequency",    computeIndex: InstrumentAutomationIndex.bitcrusherFrequency,    displayName: "freq crush",       perNote: false, interleave: false, isFilter: false, range: Config.bitcrusherFreqRange,         maxCount: 1,    effect: EffectType.bitcrusher,   compatibleInstruments: null},
    {name: "eqFilterAllFreqs",       computeIndex: InstrumentAutomationIndex.eqFilterAllFreqs,       displayName: "eq filter freqs",  perNote: false, interleave: false, isFilter:  true, range: null,                               maxCount: 1,    effect: null,                    compatibleInstruments: null},
    {name: "eqFilterFreq",           computeIndex: InstrumentAutomationIndex.eqFilterFreq0,          displayName: "eq filter # freq", perNote: false, interleave:  true, isFilter:  true, range: Config.filterFreqRange,             maxCount: Config.filterMaxPoints, effect: null,  compatibleInstruments: null},
    {name: "eqFilterGain",           computeIndex: InstrumentAutomationIndex.eqFilterGain0,          displayName: "eq filter # vol",  perNote: false, interleave: false, isFilter:  true, range: Config.filterGainRange,             maxCount: Config.filterMaxPoints, effect: null,  compatibleInstruments: null},
    {name: "panning",                computeIndex: InstrumentAutomationIndex.panning,                displayName: "panning",          perNote: false, interleave: false, isFilter: false, range: Config.panMax + 1,                  maxCount: 1,    effect: EffectType.panning,      compatibleInstruments: null},
    {name: "chorus",                 computeIndex: InstrumentAutomationIndex.chorus,                 displayName: "chorus",           perNote: false, interleave: false, isFilter: false, range: Config.chorusRange,                 maxCount: 1,    effect: EffectType.chorus,       compatibleInstruments: null},
    {name: "echoSustain",            computeIndex: InstrumentAutomationIndex.echoSustain,            displayName: "echo",             perNote: false, interleave: false, isFilter: false, range: Config.echoSustainRange,            maxCount: 1,    effect: EffectType.echo,         compatibleInstruments: null},
    {name: "echoDelay",              computeIndex: InstrumentAutomationIndex.echoDelay,              displayName: "echo delay",       perNote: false, interleave: false, isFilter: false, range: Config.echoDelayRange,              maxCount: 1,    effect: EffectType.echo,         compatibleInstruments: null}, // wait until after we're computing a tick's settings for multiple run lengths.
    {name: "reverb",                 computeIndex: InstrumentAutomationIndex.reverb,                 displayName: "reverb",           perNote: false, interleave: false, isFilter: false, range: Config.reverbRange,                 maxCount: 1,    effect: EffectType.reverb,       compatibleInstruments: null},
    {name: "mixVolume",              computeIndex: InstrumentAutomationIndex.mixVolume,              displayName: "mix volume",       perNote: false, interleave: false, isFilter: false, range: Config.volumeRange,                 maxCount: 1,    effect: null,                    compatibleInstruments: null},
    {name: "envelope#",              computeIndex: null,                                             displayName: "envelope",         perNote: false, interleave: false, isFilter: false, range: Config.defaultAutomationRange,      maxCount: Config.maxEnvelopeCount, effect: null, compatibleInstruments: null}, // maxCount special case for envelopes to be allowed to target earlier ones.
    */
]);
function centerWave(wave) {
    let sum = 0.0;
    for (let i = 0; i < wave.length; i++)
        sum += wave[i];
    const average = sum / wave.length;
    for (let i = 0; i < wave.length; i++)
        wave[i] -= average;
    performIntegral(wave);
    // The first sample should be zero, and we'll duplicate it at the end for easier interpolation.
    wave.push(0);
    return new Float32Array(wave);
}
function performIntegral(wave) {
    // Perform the integral on the wave. The synth function will perform the derivative to get the original wave back but with antialiasing.
    let cumulative = 0.0;
    for (let i = 0; i < wave.length; i++) {
        const temp = wave[i];
        wave[i] = cumulative;
        cumulative += temp;
    }
}
exports.performIntegral = performIntegral;
function getPulseWidthRatio(pulseWidth) {
    return Math.pow(0.5, (Config.pulseWidthRange - 1 - pulseWidth) * Config.pulseWidthStepPower) * 0.5;
}
exports.getPulseWidthRatio = getPulseWidthRatio;
// The function arguments will be defined in FFT.ts, but I want
// SynthConfig.ts to be at the top of the compiled JS so I won't directly
// depend on FFT here. synth.ts will take care of importing FFT.ts.
//function inverseRealFourierTransform(array: {length: number, [index: number]: number}, fullArrayLength: number): void;
//function scaleElementsByFactor(array: {length: number, [index: number]: number}, factor: number): void;
function getDrumWave(index, inverseRealFourierTransform, scaleElementsByFactor) {
    let wave = Config.chipNoises[index].samples;
    if (wave == null) {
        wave = new Float32Array(Config.chipNoiseLength + 1);
        Config.chipNoises[index].samples = wave;
        if (index == 0) {
            // The "retro" drum uses a "Linear Feedback Shift Register" similar to the NES noise channel.
            let drumBuffer = 1;
            for (let i = 0; i < Config.chipNoiseLength; i++) {
                wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
                let newBuffer = drumBuffer >> 1;
                if (((drumBuffer + newBuffer) & 1) == 1) {
                    newBuffer += 1 << 14;
                }
                drumBuffer = newBuffer;
            }
        }
        else if (index == 1) {
            // White noise is just random values for each sample.
            for (let i = 0; i < Config.chipNoiseLength; i++) {
                wave[i] = Math.random() * 2.0 - 1.0;
            }
        }
        else if (index == 2) {
            // The "clang" noise wave is based on a similar noise wave in the modded beepbox made by DAzombieRE.
            let drumBuffer = 1;
            for (let i = 0; i < Config.chipNoiseLength; i++) {
                wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
                let newBuffer = drumBuffer >> 1;
                if (((drumBuffer + newBuffer) & 1) == 1) {
                    newBuffer += 2 << 14;
                }
                drumBuffer = newBuffer;
            }
        }
        else if (index == 3) {
            // The "buzz" noise wave is based on a similar noise wave in the modded beepbox made by DAzombieRE.
            let drumBuffer = 1;
            for (let i = 0; i < Config.chipNoiseLength; i++) {
                wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
                let newBuffer = drumBuffer >> 1;
                if (((drumBuffer + newBuffer) & 1) == 1) {
                    newBuffer += 10 << 2;
                }
                drumBuffer = newBuffer;
            }
        }
        else if (index == 4) {
            // "hollow" drums, designed in frequency space and then converted via FFT:
            drawNoiseSpectrum(wave, Config.chipNoiseLength, 10, 11, 1, 1, 0);
            drawNoiseSpectrum(wave, Config.chipNoiseLength, 11, 14, .6578, .6578, 0);
            inverseRealFourierTransform(wave, Config.chipNoiseLength);
            scaleElementsByFactor(wave, 1.0 / Math.sqrt(Config.chipNoiseLength));
        }
        else {
            throw new Error("Unrecognized drum index: " + index);
        }
        wave[Config.chipNoiseLength] = wave[0];
    }
    return wave;
}
exports.getDrumWave = getDrumWave;
function drawNoiseSpectrum(wave, waveLength, lowOctave, highOctave, lowPower, highPower, overallSlope) {
    const referenceOctave = 11;
    const referenceIndex = 1 << referenceOctave;
    const lowIndex = Math.pow(2, lowOctave) | 0;
    const highIndex = Math.min(waveLength >> 1, Math.pow(2, highOctave) | 0);
    const retroWave = getDrumWave(0, null, null);
    let combinedAmplitude = 0.0;
    for (let i = lowIndex; i < highIndex; i++) {
        let lerped = lowPower + (highPower - lowPower) * (Math.log2(i) - lowOctave) / (highOctave - lowOctave);
        let amplitude = Math.pow(2, (lerped - 1) * 7 + 1) * lerped;
        amplitude *= Math.pow(i / referenceIndex, overallSlope);
        combinedAmplitude += amplitude;
        // Add two different sources of psuedo-randomness to the noise
        // (individually they aren't random enough) but in a deterministic
        // way so that live spectrum editing doesn't result in audible pops.
        // Multiply all the sine wave amplitudes by 1 or -1 based on the
        // LFSR retro wave (effectively random), and also rotate the phase
        // of each sine wave based on the golden angle to disrupt the symmetry.
        amplitude *= retroWave[i];
        const radians = 0.61803398875 * i * i * Math.PI * 2.0;
        wave[i] = Math.cos(radians) * amplitude;
        wave[waveLength - i] = Math.sin(radians) * amplitude;
    }
    return combinedAmplitude;
}
exports.drawNoiseSpectrum = drawNoiseSpectrum;
function generateSineWave() {
    const wave = new Float32Array(Config.sineWaveLength + 1);
    for (let i = 0; i < Config.sineWaveLength + 1; i++) {
        wave[i] = Math.sin(i * Math.PI * 2.0 / Config.sineWaveLength);
    }
    return wave;
}
function getArpeggioPitchIndex(pitchCount, rhythm, arpeggio) {
    const arpeggioPattern = Config.rhythms[rhythm].arpeggioPatterns[pitchCount - 1];
    if (arpeggioPattern != null) {
        return arpeggioPattern[arpeggio % arpeggioPattern.length];
    }
    else {
        return arpeggio % pitchCount;
    }
}
exports.getArpeggioPitchIndex = getArpeggioPitchIndex;
// Pardon the messy type casting. This allows accessing array members by numerical index or string name.
function toNameMap(array) {
    const dictionary = {};
    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        value.index = i;
        dictionary[value.name] = value;
    }
    const result = array;
    result.dictionary = dictionary;
    return result;
}
exports.toNameMap = toNameMap;
function effectsIncludeTransition(effects) {
    return (effects & (1 << 10 /* EffectType.transition */)) != 0;
}
exports.effectsIncludeTransition = effectsIncludeTransition;
function effectsIncludeChord(effects) {
    return (effects & (1 << 11 /* EffectType.chord */)) != 0;
}
exports.effectsIncludeChord = effectsIncludeChord;
function effectsIncludePitchShift(effects) {
    return (effects & (1 << 7 /* EffectType.pitchShift */)) != 0;
}
exports.effectsIncludePitchShift = effectsIncludePitchShift;
function effectsIncludeDetune(effects) {
    return (effects & (1 << 8 /* EffectType.detune */)) != 0;
}
exports.effectsIncludeDetune = effectsIncludeDetune;
function effectsIncludeVibrato(effects) {
    return (effects & (1 << 9 /* EffectType.vibrato */)) != 0;
}
exports.effectsIncludeVibrato = effectsIncludeVibrato;
function effectsIncludeNoteFilter(effects) {
    return (effects & (1 << 5 /* EffectType.noteFilter */)) != 0;
}
exports.effectsIncludeNoteFilter = effectsIncludeNoteFilter;
function effectsIncludeDistortion(effects) {
    return (effects & (1 << 3 /* EffectType.distortion */)) != 0;
}
exports.effectsIncludeDistortion = effectsIncludeDistortion;
function effectsIncludeBitcrusher(effects) {
    return (effects & (1 << 4 /* EffectType.bitcrusher */)) != 0;
}
exports.effectsIncludeBitcrusher = effectsIncludeBitcrusher;
function effectsIncludePanning(effects) {
    return (effects & (1 << 2 /* EffectType.panning */)) != 0;
}
exports.effectsIncludePanning = effectsIncludePanning;
function effectsIncludeChorus(effects) {
    return (effects & (1 << 1 /* EffectType.chorus */)) != 0;
}
exports.effectsIncludeChorus = effectsIncludeChorus;
function effectsIncludeEcho(effects) {
    return (effects & (1 << 6 /* EffectType.echo */)) != 0;
}
exports.effectsIncludeEcho = effectsIncludeEcho;
function effectsIncludeReverb(effects) {
    return (effects & (1 << 0 /* EffectType.reverb */)) != 0;
}
exports.effectsIncludeReverb = effectsIncludeReverb;
