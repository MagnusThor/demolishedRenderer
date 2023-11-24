"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DRExt = void 0;
const DR_1 = require("./DR");
class DRExt extends DR_1.DR {
    constructor(canvas, v, f, cU = {}) {
        super(canvas, v, f, cU);
        this.canvas = canvas;
        this.cU = cU;
    }
    getUniforms() {
        return Array.from(this.fT.activeUniforms.values());
    }
    getUniform(location) {
        return this.gl.getUniform(this.currentProgram, location);
    }
}
exports.DRExt = DRExt;
