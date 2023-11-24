"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemolishedStreamingMusic = exports.DemolishedSIDMusic = exports.DemolishedSoundBase = exports.DemolishedSoundPeaks = void 0;
class DemolishedSoundPeaks {
    static peaks(buffer, size) {
        let sampleSize = buffer.length / size;
        let sampleStep = ~~(sampleSize / 10) || 1;
        let channels = buffer.numberOfChannels;
        let peaks = new Array(size);
        for (var c = 0; c < channels; c++) {
            const chan = buffer.getChannelData(c);
            for (var i = 0; i < size; i++) {
                var start = ~~(i * sampleSize);
                var end = ~~(start + sampleSize);
                var min = 0;
                var max = 0;
                for (var j = start; j < end; j += sampleStep) {
                    var value = chan[j];
                    if (value > max) {
                        max = value;
                    }
                    if (value < min) {
                        min = value;
                    }
                }
                if (c == 0 || max > peaks[2 * i]) {
                    peaks[2 * i] = max;
                }
                if (c == 0 || min < peaks[2 * i + 1]) {
                    peaks[2 * i + 1] = min;
                }
            }
        }
        return peaks;
    }
}
exports.DemolishedSoundPeaks = DemolishedSoundPeaks;
/**
 *
 *
 * @export
 * @class DemolishedSoundBase
 */
class DemolishedSoundBase {
    getAudioEl() {
        return this.audio;
    }
    constructor() { }
}
exports.DemolishedSoundBase = DemolishedSoundBase;
/**
 *
 *
 * @export
 * @class DemolishedSIDMusic
 * @extends {DemolishedSoundBase}
 * @implements {IDemolisedAudioContext}
 */
class DemolishedSIDMusic extends DemolishedSoundBase {
    getTracks() {
        throw "not yet implemented";
    }
    get textureSize() {
        return 16;
    }
    constructor() {
        super();
    }
    play() {
        this.sid.play();
    }
    stop() {
        this.sid.pause();
    }
    mute(ismuted) {
        throw "not implemented";
    }
    getFrequenceData() {
        return this.sid.getFreqByteData();
    }
    get duration() {
        return 0;
    }
    get currentTime() {
        return this.sid._currentPlaytime;
    }
    set currentTime(n) {
        return;
    }
    createAudio(settings) {
        const useLess = () => { };
        let ScriptNodePlayer = window["ScriptNodePlayer"];
        let self = this;
        return new Promise(function (resolve, reject) {
            ScriptNodePlayer.createInstance(new SIDBackendAdapter(), "", [], true, useLess, function () {
                self.sid = this;
                resolve(true);
            }, useLess, useLess);
            ScriptNodePlayer.getInstance().loadMusicFromURL(settings.audioFile, {
                basePath: ""
            }, useLess, useLess);
        });
    }
}
exports.DemolishedSIDMusic = DemolishedSIDMusic;
/**
 *
 *
 * @export
 * @class DemolishedStreamingMusic
 * @extends {DemolishedSoundBase}
 * @implements {IDemolisedAudioContext}
 */
class DemolishedStreamingMusic extends DemolishedSoundBase {
    getTracks() {
        let ms = this.audio.captureStream();
        return ms.getAudioTracks();
    }
    constructor() {
        super();
    }
    get textureSize() {
        return 32;
    }
    getFrequenceData() {
        let bufferLength = this.audioAnalyser.frequencyBinCount;
        let freqArray = new Uint8Array(bufferLength);
        this.audioAnalyser.getByteFrequencyData(freqArray);
        return freqArray;
    }
    play() {
        this.audio.play();
    }
    stop() {
        this.audio.pause();
    }
    mute(ismuted) {
        this.audio.muted = ismuted;
    }
    get duration() {
        return Math.floor(this.audio.duration * 1000.);
    }
    get currentTime() {
        return this.audio.currentTime;
    }
    set currentTime(time) {
        this.audio.currentTime = time;
    }
    createAudio(audioSettings) {
        return new Promise((resolve, reject) => {
            fetch(audioSettings.audioFile).then((resp) => {
                return resp.arrayBuffer().then((buffer) => {
                    let audioCtx = new AudioContext();
                    audioCtx.decodeAudioData(buffer, (audioData) => {
                        this.audioBuffer = audioData;
                        let offlineCtx = new OfflineAudioContext(1, audioData.length, audioData.sampleRate);
                        var filteredSource = offlineCtx.createBufferSource();
                        filteredSource.buffer = audioData; // tell the source which sound to play
                        filteredSource.connect(offlineCtx.destination); // connect the source to the context's destination (the speakers)
                        var filterOffline = offlineCtx.createBiquadFilter();
                        filterOffline.type = 'highpass';
                        filterOffline.Q.value = 2;
                        filterOffline.frequency.value = 2000;
                        // Pipe the song into the filter, and the filter into the offline context
                        filteredSource.connect(filterOffline);
                        filterOffline.connect(offlineCtx.destination);
                        filteredSource.start(0);
                        let source = audioCtx.createBufferSource(); // creates a sound source
                        source.buffer = audioData; // tell the source which sound to play
                        source.connect(audioCtx.destination); // connect the source to the context's destination (the speakers)
                        offlineCtx.startRendering().then((renderedBuffer) => {
                            let audioCtx = new AudioContext();
                            let audioEl = new Audio();
                            audioEl.loop = true;
                            //  audioEl.preload = "auto";
                            audioEl.src = audioSettings.audioFile;
                            // audioEl.crossOrigin = "anonymous"
                            // audioEl.autoplay = false;
                            const onLoad = () => {
                                let source = audioCtx.createMediaElementSource(audioEl);
                                let analyser = audioCtx.createAnalyser();
                                analyser.smoothingTimeConstant = audioSettings.audioAnalyzerSettings.smoothingTimeConstant;
                                analyser.fftSize = audioSettings.audioAnalyzerSettings.fftSize;
                                //  analyser.maxDecibels = audioSettings.audioAnalyzerSettings.maxDecibels
                                //  analyser.minDecibels = audioSettings.audioAnalyzerSettings.minDecibels;
                                this.audio = audioEl;
                                source.connect(analyser);
                                analyser.connect(audioCtx.destination);
                                this.audioAnalyser = analyser;
                                resolve(true);
                                //  window.addEventListener("load", onLoad, false);
                            };
                            onLoad();
                            let bufferSource = audioCtx.createBufferSource();
                            bufferSource.buffer = renderedBuffer;
                        });
                    });
                });
            });
        });
    }
}
exports.DemolishedStreamingMusic = DemolishedStreamingMusic;
