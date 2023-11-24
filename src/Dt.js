"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dt = void 0;
class Dt {
    getUniformLocation(key) {
        return this.activeUniforms.get(key).location;
    }
    constructor(gl, textures, customUniforms) {
        this.textures = new Array();
        this.framebuffer = gl.createFramebuffer();
        this.renderbuffer = gl.createRenderbuffer();
        this.texture = gl.createTexture();
        this.textures = textures;
        this.customUniforms = customUniforms;
        this.activeUniforms = new Map();
    }
}
exports.Dt = Dt;
