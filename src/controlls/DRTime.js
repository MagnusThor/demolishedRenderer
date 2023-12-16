"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DRTime = void 0;
const DOMUtils_1 = require("./DOMUtils");
class DRTime {
    constructor(parent, seq) {
        this.parent = parent;
        this.seq = seq;
        this.currentTime = 0;
    }
    updateTimeline(time) {
        this.renderTime.value = time.toString();
    }
    render() {
        let html = `
            <div class="timeline">
            <input type="range" value="0" min="0" max="${this.seq.duration / 1000}" id="rendertime" list="markers" step="0.5">
            <datalist id="markers"></datalist>
            <i class="bi bi-play-btn-fill" id="toogle-playback"></i>
            </div>`;
        let result = DOMUtils_1.DOMUtils.toDOM(html);
        this.parent.appendChild(result);
        const playButton = DOMUtils_1.DOMUtils.get(".bi-play-btn-fill", this.parent);
        DOMUtils_1.DOMUtils.on("click", playButton, () => {
            this.isPlaying = !this.isPlaying;
            console.log(this.isPlaying);
            this.onPlaybackChange(this.isPlaying);
            playButton.classList.toggle("bi-play-btn-fill");
            playButton.classList.toggle("bi-pause-btn-fill");
        });
        this.renderTime = DOMUtils_1.DOMUtils.get("#rendertime", this.parent);
        DOMUtils_1.DOMUtils.on("input", this.renderTime, (e) => {
            this.currentTime = parseInt(this.renderTime.value);
            this.onTimelineChange(this.currentTime);
        });
        this.seq.scenes.forEach(s => {
            const el = document.createElement("option");
            el.value = (s.msStart / 1000).toString();
            DOMUtils_1.DOMUtils.get("#markers").appendChild(el);
        });
    }
}
exports.DRTime = DRTime;
