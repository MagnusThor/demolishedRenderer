"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DasSequencer = exports.Scene = void 0;
class Scene {
    constructor(duration) {
        this.duration = 0;
        this.ms = 0;
        this.msStart = 0;
        this.msStop = 0;
        this.duration = duration;
    }
    execute(...args) {
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
    beatToMs(beat) {
        return Math.abs(this.timeDiff = this.timeDiff + this.now - beat * this.msPerBeat);
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
        this.now = time - this.timeDiff;
        this.tick = (this.now / this.msPerTick) | 0;
        this.beat = (this.now / this.msPerBeat) | 0;
        if (this.tick != this.oldTick) {
            this.oldTick = this.tick;
        }
        if (this.beat != this.oldBeat) {
            this.oldBeat = this.beat;
        }
    }
    goTo(beat) {
        this.timeDiff = this.timeDiff + this.now - beat * this.msPerBeat;
    }
    addScene(id, scene) {
        scene.ms = scene.duration * this.msPerBeat;
        scene.msStart = this.duration;
        scene.msStop = this.duration + scene.ms;
        this.scenes.set(id, scene);
        this.duration += scene.ms;
    }
    run(t, cb) {
        this.isPlaying = true;
        this.frame++;
        this.time = t;
        this.setProps(t);
        cb(this.getSceneByBeat(this.beat));
    }
}
exports.DasSequencer = DasSequencer;
