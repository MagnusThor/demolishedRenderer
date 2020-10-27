"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dt = (function () {
    function Dt(gl, textures, customUniforms) {
        this.textures = new Array();
        this.locations = new Map();
        this.framebuffer = gl.createFramebuffer();
        this.renderbuffer = gl.createRenderbuffer();
        this.texture = gl.createTexture();
        this.textures = textures;
        this.uniforms = customUniforms;
    }
    return Dt;
}());
exports.Dt = Dt;
