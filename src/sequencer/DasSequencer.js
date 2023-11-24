"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DasSequencer = exports.Scene = void 0;
class Scene {
    constructor(key, duration, uniforms) {
        this.key = key;
        this.duration = duration;
        this.uniforms = uniforms;
        this.ms = 0;
        this.msStart = 0;
        this.msStop = 0;
    }
}
exports.Scene = Scene;
class DasSequencer {
    constructor(bpm, tpb) {
        this.sec = 60;
        this.min = 1000 * 60;
        this.isPlaying = false;
        this.frame = 0;
        this.timeDiff = 0;
        this.now = 0;
        this.tick = 0;
        this.beat = 0;
        this.oldTick = 0;
        this.oldBeat = 0;
        this.duration = 0;
        this.time = 0;
        this.msPerBeat = this.min / bpm;
        this.msPerTick = this.msPerBeat / tpb;
        this.scenes = new Map();
    }
    msToMinutesAndSeconds(milliseconds) {
        var minutes = Math.floor(milliseconds / 60000);
        var seconds = Math.floor((milliseconds % 60000) / 1000);
        return {
            minutes: minutes,
            seconds: seconds
        };
    }
    beatToMs(beat) {
        return Math.abs((this.timeDiff + this.now) - beat * this.msPerBeat);
    }
    getScenesToPlay(time) {
        return Array.from(this.scenes.values()).filter(pre => {
            return time >= pre.msStart && time <= pre.msStop;
        });
    }
    getSceneByBeat(beat) {
        return this.getScenesToPlay(this.beatToMs(beat));
    }
    setProps(time) {
        this.timeDiff = 0;
        this.now = time - this.timeDiff;
        this.tick = (this.now / this.msPerTick) | 0;
        this.beat = (this.now / this.msPerBeat) | 0;
        if (this.tick != this.oldTick) {
            this.oldTick = this.tick;
        }
        if (this.beat != this.oldBeat) {
            this.oldBeat = this.beat;
            if (this.onBeat)
                this.onBeat(this.beat, this.getScenesToPlay(this.time));
        }
    }
    goTo(beat) {
        this.timeDiff = this.timeDiff + this.now - beat * this.msPerBeat;
    }
    addScene(scene) {
        scene.ms = scene.duration * this.msPerBeat;
        scene.msStart = this.duration;
        scene.msStop = this.duration + scene.ms;
        this.scenes.set(scene.key, scene);
        this.duration += scene.ms;
        return this;
    }
    addScenes(scens) {
        scens.forEach(s => {
            console.log(s.uniforms);
            this.addScene(s);
        });
        return this;
    }
    run(t, cb) {
        this.isPlaying = true;
        this.frame++;
        this.time = t;
        this.setProps(t);
        cb(this.getScenesToPlay(this.time), this.beat);
    }
}
exports.DasSequencer = DasSequencer;
