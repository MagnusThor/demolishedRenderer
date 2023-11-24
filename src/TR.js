"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TR = exports.E2D = exports.Vector3 = exports.Vector2 = exports.Geometry = void 0;
class Geometry {
}
exports.Geometry = Geometry;
class Vector2 {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
}
exports.Vector2 = Vector2;
class Vector3 extends Vector2 {
    constructor(x, y, z) {
        super(x, y);
        this.z = 0;
        this.z = z;
    }
    rotateX(a) {
        const rad = a * Math.PI / 180;
        const cosa = Math.cos(rad);
        const sina = Math.sin(rad);
        const y = this.y * cosa - this.z * sina;
        const z = this.y * sina + this.z * cosa;
        return new Vector3(this.x, y, z);
    }
    rotateY(a) {
        const rad = a * Math.PI / 180;
        const cosa = Math.cos(rad);
        const sina = Math.sin(rad);
        const z = this.z * cosa - this.x * sina;
        const x = this.z * sina + this.x * cosa;
        return new Vector3(x, this.y, this.z);
    }
    rotateZ(a) {
        const rad = a * Math.PI / 180;
        const cosa = Math.cos(rad);
        const sina = Math.sin(rad);
        const x = this.x * cosa - this.y * sina;
        const y = this.x * sina + this.y * cosa;
        return new Vector3(x, y, this.z);
    }
    scale(n) {
        this.x *= n;
        this.y *= n;
        this.z *= n;
    }
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    normalize() {
        const len = this.length();
        return new Vector3(this.x /= len, this.y /= len, this.x /= len);
    }
    dot(vectorB) {
        return this.x * vectorB.x + this.y * vectorB.y + this.z * vectorB.z;
    }
    angle(b) {
        const an = this.normalize();
        const bn = b.normalize();
        return Math.acos(an.dot(bn));
    }
    cross(vectorB) {
        let tmp = this.clone();
        tmp.x = (this.y * vectorB.z) - (this.z * vectorB.y);
        tmp.y = (this.z * vectorB.x) - (this.x * vectorB.z);
        tmp.z = (this.x * vectorB.y) - (this.y * vectorB.x);
    }
}
exports.Vector3 = Vector3;
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
        this.assets = new Map();
        let canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
    }
    AA(key, blob) {
        this.assets.set(key, blob);
        return this;
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
        let c = this.canvas;
        let x = this.ctx;
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
