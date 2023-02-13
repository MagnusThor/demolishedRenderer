"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dt = void 0;
class Dt {
    constructor(gl, textures, customUniforms) {
        this.textures = new Array();
        this.locations = new Map();
        this.framebuffer = gl.createFramebuffer();
        this.renderbuffer = gl.createRenderbuffer();
        this.texture = gl.createTexture();
        this.textures = textures;
        this.uniforms = customUniforms;
    }
}
exports.Dt = Dt;
