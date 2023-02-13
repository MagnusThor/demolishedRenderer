"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TR = void 0;
class TR {
    constructor(w, h) {
        this.layers = new Map();
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        this.properties = [w, h, w / 2, h / 2];
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
    }
    data() {
        return this.canvas.toDataURL("image/png", 1.0);
    }
    D(key) {
        this.layers.delete(key);
    }
    A(key, fn) {
        this.layers.set(key, { key: key, ctx: this.ctx, fn: fn });
    }
    R(t, pre) {
        const c = this.canvas;
        const x = this.ctx;
        x.clearRect(0, 0, c.width, c.height);
        if (!pre) {
            this.layers.forEach((v) => {
                v.fn(t, c, x);
            });
        }
        else
            Array.from(this.layers.values()).map((p) => p.fn(t, c, x));
        return this;
    }
}
exports.TR = TR;
