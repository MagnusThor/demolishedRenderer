"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DR = (function () {
    function DR(canvas, v, f) {
        this.canvas = canvas;
        this.header = "#version 300 es\n        #ifdef GL_ES\n                precision highp float;\n                precision highp int;\n                precision mediump sampler3D;\n        #endif\n        ";
        this.targets = new Map();
        this.programs = new Map();
        this.textureCache = new Map();
        this.gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true });
        var gl = this.gl;
        var c = 0, d;
        for (var i in gl)
            "function" == typeof gl[i] && (d = (c++ & 255).toString(16), d = d.match(/^[0-9].*$/) ? "x" + d : d, gl[d] = gl[i]);
        gl.viewport(0, 0, canvas.width, canvas.height);
        this.buffer = gl.createBuffer();
        this.surfaceBuffer = gl.createBuffer();
        this.mainProgram = gl.createProgram();
        this.cS(this.mainProgram, 35633, this.header + v);
        this.cS(this.mainProgram, 35632, this.header + f);
        gl.linkProgram(this.mainProgram);
        gl.useProgram(this.mainProgram);
        this.screenVertexPosition = gl.getAttribLocation(this.mainProgram, "pos");
        gl.enableVertexAttribArray(this.screenVertexPosition);
        gl.bindBuffer(34962, this.buffer);
        gl.bufferData(34962, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0]), 35044);
    }
    DR.prototype.cS = function (program, type, source) {
        var gl = this.gl;
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        gl.attachShader(program, shader);
    };
    DR.prototype.aP = function (name) {
        var p = this.gl.createProgram();
        this.programs.set(name, p);
        return p;
    };
    DR.prototype.t = function (image) {
        var gl = this.gl;
        var texture = gl.createTexture();
        gl.bindTexture(3553, texture);
        gl.texImage2D(3553, 0, 6408, 6408, 5121, image);
        gl.generateMipmap(3553);
        return texture;
    };
    DR.prototype.aA = function (textures, cb) {
        var _this = this;
        var c = Object.keys(textures).length;
        Object.keys(textures).forEach(function (key) {
            var m = new Image();
            m.onload = function (e) {
                _this.textureCache.set(key, _this.t(m));
                if (_this.textureCache.size === c)
                    cb();
            };
            m.src = textures[key].src;
        });
        return this;
    };
    DR.prototype.aB = function (name, vertex, fragment, textures) {
        var _this = this;
        var gl = this.gl;
        var target = this.cT(this.canvas.width, this.canvas.height, textures ? textures : []);
        this.targets.set(name, target);
        var program = this.aP(name);
        this.cS(program, 35633, this.header + vertex);
        this.cS(program, 35632, this.header + fragment);
        gl.linkProgram(program);
        gl.useProgram(program);
        if (textures) {
            textures.forEach(function (tk) {
                var m = _this.textureCache.get(tk);
                gl.bindTexture(3553, m);
            });
        }
        this.vertexPosition = gl.getAttribLocation(program, "pos");
        gl.enableVertexAttribArray(this.vertexPosition);
        return this;
    };
    DR.prototype.R = function (time, customUniforms) {
        var _this = this;
        var gl = this.gl;
        var main = this.mainProgram;
        var i = 0;
        this.programs.forEach(function (current, key) {
            gl.linkProgram(current);
            gl.useProgram(current);
            var target = _this.targets.get(key);
            gl.uniform2f(gl.getUniformLocation(current, "resolution"), _this.canvas.width, _this.canvas.height);
            gl.uniform1f(gl.getUniformLocation(current, "time"), time);
            customUniforms && Object.keys(customUniforms).forEach(function (v) {
                customUniforms[v](gl.getUniformLocation(current, v), gl, current, time);
            });
            target.textures.forEach(function (tk) {
                var loc = gl.getUniformLocation(current, tk);
                gl.activeTexture(33984 + i);
                gl.uniform1i(loc, i);
                i++;
            });
            gl.bindBuffer(34962, _this.surfaceBuffer);
            gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);
            gl.bindBuffer(34962, _this.buffer);
            gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);
            gl.bindFramebuffer(36160, target.framebuffer);
            gl.clear(16384 | 256);
            gl.drawArrays(4, 0, 6);
        });
        gl.linkProgram(main);
        gl.useProgram(main);
        gl.uniform2f(gl.getUniformLocation(main, "resolution"), this.canvas.width, this.canvas.height);
        gl.uniform1f(gl.getUniformLocation(main, "time"), time);
        gl.bindBuffer(34962, this.buffer);
        gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);
        this.targets.forEach(function (target, key) {
            gl.uniform1i(gl.getUniformLocation(main, key), i);
            gl.activeTexture(33984 + i);
            gl.bindTexture(3553, target.texture);
            i++;
        });
        gl.bindFramebuffer(36160, null);
        gl.clear(16384 | 256);
        gl.drawArrays(4, 0, 6);
    };
    DR.prototype.cT = function (width, height, textures) {
        var gl = this.gl;
        var t = {
            "framebuffer": gl.createFramebuffer(),
            "renderbuffer": gl.createRenderbuffer(),
            "texture": gl.createTexture(),
            "textures": textures
        };
        gl.bindTexture(3553, t.texture);
        gl.texImage2D(3553, 0, 6408, width, height, 0, 6408, 5121, null);
        gl.texParameteri(3553, 10242, 33071);
        gl.texParameteri(3553, 10243, 33071);
        gl.texParameteri(3553, 10240, 9728);
        gl.texParameteri(3553, 10241, 9728);
        gl.bindFramebuffer(36160, t.framebuffer);
        gl.framebufferTexture2D(36160, 36064, 3553, t.texture, 0);
        gl.bindRenderbuffer(36161, t.renderbuffer);
        gl.renderbufferStorage(36161, 33189, width, height);
        gl.framebufferRenderbuffer(36160, 36096, 36161, t.renderbuffer);
        gl.bindTexture(3553, null);
        gl.bindRenderbuffer(36161, null);
        gl.bindFramebuffer(36160, null);
        return t;
    };
    DR.prototype.run = function (t, customUniforms) {
        var _this = this;
        var fps = 60;
        var pt = performance.now();
        var interval = 1000 / fps;
        var dt = 0;
        var a = function (t) {
            requestAnimationFrame(a);
            dt = t - pt;
            if (dt > interval) {
                pt = t - (dt % interval);
                _this.R(pt / 1000, customUniforms);
            }
        };
        a(t | 0);
        return this;
    };
    return DR;
}());
exports.DR = DR;
