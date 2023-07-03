"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DRTime = exports.DOMUtils = void 0;
class DOMUtils {
    static get(query, parent) {
        return parent ? parent.querySelector(query) : document.querySelector(query);
    }
    static getAll(query, parent) {
        var results = new Array();
        let queryResult = parent ? parent.querySelectorAll(query) : document.querySelectorAll(query);
        for (let i = 0; i < queryResult.length; i++)
            results.push(queryResult.item(i));
        return results;
    }
    static on(event, element, fn, options) {
        typeof (element) === "string" ? element = DOMUtils.get(element) : element = element;
        element.addEventListener(event, (e) => {
            fn(e, element);
        }, options);
        return element;
    }
    static removeChilds(parent) {
        while (parent.firstChild) {
            parent.firstChild.remove();
        }
    }
    static create(p, textContent, attr) {
        let node;
        typeof (p) === "string" ? node = document.createElement(p) : node = p;
        if (textContent)
            node.textContent = textContent;
        if (attr) {
            Object.keys(attr).forEach((k) => {
                node.setAttribute(k, attr[k]);
            });
        }
        return node;
    }
    static prettify(text) {
        let result = text.replace(/^["'](.+(?=["']$))["']$/, '$1'); // remove qoutes at start and end of string
        return result;
    }
    static linkify(text) {
        text = DOMUtils.prettify(text);
        const regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(regex, (url) => {
            return `<a href="${url}" target="_blank">${url}</a>`;
        });
    }
    static toDOM(html) {
        var d = document, i, a = d.createElement("div"), b = d.createDocumentFragment();
        a.innerHTML = html;
        while (i = a.firstChild)
            b.appendChild(i);
        return b;
    }
    static makeDraggable(el) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const elementDrag = (e) => {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
        };
        el.onmousedown = (e) => {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = (e) => {
                document.onmouseup = null;
                document.onmousemove = null;
            };
            document.onmousemove = elementDrag;
        };
    }
}
exports.DOMUtils = DOMUtils;
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
            <div class="controls">
            <input type="range" value="0" min="0" max="${this.seq.duration / 1000}" id="rendertime" list="markers" step="0.5">
            <datalist id="markers"></datalist>
            <i class="bi bi-play-btn-fill" id="toogle-playback"></i>
            </div>            `;
        let result = DOMUtils.toDOM(html);
        this.parent.appendChild(result);
        const playButton = DOMUtils.get(".bi-play-btn-fill", this.parent);
        DOMUtils.on("click", playButton, () => {
            this.isPlaying = !this.isPlaying;
            this.onPlaybackChange(this.isPlaying);
            playButton.classList.toggle("bi-play-btn-fill");
            playButton.classList.toggle("bi-pause-btn-fill");
        });
        this.renderTime = DOMUtils.get("#rendertime", this.parent);
        DOMUtils.on("input", this.renderTime, (e) => {
            this.currentTime = parseInt(this.renderTime.value);
            this.onTimelineChange(this.currentTime);
        });
        this.seq.scenes.forEach(s => {
            const el = document.createElement("option");
            el.value = (s.msStart / 1000).toString();
            DOMUtils.get("#markers").appendChild(el);
        });
    }
}
exports.DRTime = DRTime;
