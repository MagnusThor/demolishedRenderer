"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TR = exports.E2D = void 0;
class E2D {
    constructor(key, animate) {
        this.key = key;
        this.animate = animate;
        this.active = true;
        this.props = new Map();
    }
    G(key) {
        return this.props.get(key);
    }
    S(key, value) {
        this.props.set(key, value);
    }
    extend(sources) {
        const O = (item) => {
            return (item && typeof item === 'object' && !Array.isArray(item));
        };
        const M = (target, ...sources) => {
            if (!sources.length)
                return target;
            const source = sources.shift();
            if (O(target) && O(source)) {
                for (const key in source) {
                    if (O(source[key])) {
                        if (!target[key])
                            Object.assign(target, { [key]: {} });
                        M(target[key], source[key]);
                    }
                    else {
                        Object.assign(target, { [key]: source[key] });
                    }
                }
            }
            return M(target, ...sources);
        };
        return M(this, sources);
    }
}
exports.E2D = E2D;
class TR {
    constructor(w, h, ww, vh) {
        this.entities = new Map();
        let canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
    }
    data() {
        return this.canvas.toDataURL("image/png", 1.0);
    }
    G(key) {
        return this.entities.get(key);
    }
    D(key) {
        this.entities.delete(key);
    }
    A(e) {
        this.entities.set(e.key, e);
    }
    R(t, pre) {
        const c = this.canvas;
        const x = this.ctx;
        x.clearRect(0, 0, c.width, c.height);
        if (!pre) {
            this.entities.forEach((v) => {
                v.animate(t, c, x, Object.fromEntries(v.props));
            });
        }
        else
            Array.from(this.entities.values()).map((p) => p.animate(t, c, x, Object.fromEntries(p.props)));
        return this;
    }
}
exports.TR = TR;
