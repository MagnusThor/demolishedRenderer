"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CH = (function () {
    function CH(a, b, textures) {
        this.a = a;
        this.b = b;
        this.textures = textures;
        this.l = new Map();
        this.c = a;
    }
    CH.prototype.swap = function () {
        var tmp = this.a;
        this.a = this.b;
        this.b = tmp;
    };
    return CH;
}());
exports.CH = CH;
var RT = (function () {
    function RT(gl, width, height) {
        this.framebuffer = gl.createFramebuffer();
        this.texture = gl.createTexture();
        this.renderBuffer = gl.createRenderbuffer();
        gl.bindTexture(3553, this.texture);
        gl.texImage2D(3553, 0, 6408, width, height, 0, 6408, 5121, null);
        gl.texParameteri(3553, 10242, 33071);
        gl.texParameteri(3553, 10243, 33071);
        gl.texParameteri(3553, 10240, 9728);
        gl.texParameteri(3553, 10241, 9728);
        gl.bindFramebuffer(36160, this.framebuffer);
        gl.framebufferTexture2D(36160, 36064, 3553, this.texture, 0);
        gl.bindRenderbuffer(36161, this.renderBuffer);
        gl.renderbufferStorage(36161, 33189, width, height);
        gl.framebufferRenderbuffer(36160, 36096, 36161, this.renderBuffer);
        gl.bindTexture(3553, null);
        gl.bindRenderbuffer(36161, null);
        gl.bindFramebuffer(36160, null);
    }
    return RT;
}());
exports.RT = RT;
var DR = (function () {
    function DR(canvas, v, f) {
        this.canvas = canvas;
        this.header = "#version 300 es\n        #ifdef GL_ES\n                precision highp float;\n                precision highp int;\n                precision mediump sampler3D;\n        #endif\n        ";
        this.channels = new Map();
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
        this.gl.validateProgram(this.mainProgram);
        if (!gl.getProgramParameter(this.mainProgram, gl.LINK_STATUS)) {
            var info = gl.getProgramInfoLog(this.mainProgram);
            throw 'Could not compile WebGL program. \n\n' + info;
        }
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
        if (!this.gl.getShaderParameter(shader, 35713)) {
            this.gl.getShaderInfoLog(shader).trim().split("\n").forEach(function (l) {
                return console.error("[shader] " + l);
            });
            throw new Error("Error while compiling vertex/fragment" + source);
        }
        ;
    };
    DR.prototype.aP = function (name) {
        var p = this.gl.createProgram();
        this.programs.set(name, p);
        return p;
    };
    DR.prototype.t = function (image, d) {
        var gl = this.gl;
        var texture = gl.createTexture();
        gl.activeTexture(d);
        gl.bindTexture(3553, texture);
        gl.texImage2D(3553, 0, 6408, 6408, 5121, image);
        gl.generateMipmap(3553);
        return texture;
    };
    DR.prototype.aA = function (textures, cb) {
        var _this = this;
        var c = Object.keys(textures).length;
        Object.keys(textures).forEach(function (key, index) {
            var m = new Image();
            m.onload = function (e) {
                _this.textureCache.set(key, _this.t(m, 33984 + index));
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
        var channel = this.cC(this.canvas.width, this.canvas.height, textures ? textures : []);
        this.channels.set(name, channel);
        var program = this.aP(name);
        this.cS(program, 35633, this.header + vertex);
        this.cS(program, 35632, this.header + fragment);
        gl.linkProgram(program);
        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            var info = gl.getProgramInfoLog(program);
            throw 'Could not compile WebGL program. \n\n' + info;
        }
        var au = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (var i = 0; i < au; i++) {
            var u = gl.getActiveUniform(program, i);
            channel.l.set(u.name, gl.getUniformLocation(program, u.name));
        }
        gl.useProgram(program);
        if (textures) {
            textures.forEach(function (tk, index) {
                gl.bindTexture(3553, _this.textureCache.get(tk));
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
            gl.useProgram(current);
            var channel = _this.channels.get(key);
            gl.uniform2f(gl.getUniformLocation(current, "resolution"), _this.canvas.width, _this.canvas.height);
            gl.uniform1f(gl.getUniformLocation(current, "time"), time);
            customUniforms && Object.keys(customUniforms).forEach(function (v) {
                customUniforms[v](gl.getUniformLocation(current, v), gl, current, time);
            });
            channel.textures.forEach(function (tk) {
                var loc = gl.getUniformLocation(current, tk);
                gl.uniform1i(loc, i);
                i++;
            });
            gl.bindBuffer(34962, _this.surfaceBuffer);
            gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);
            gl.bindBuffer(34962, _this.buffer);
            gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);
            gl.bindFramebuffer(36160, channel.a.framebuffer);
            gl.clear(16384 | 256);
            gl.drawArrays(4, 0, 6);
        });
        gl.useProgram(main);
        gl.uniform2f(gl.getUniformLocation(main, "resolution"), this.canvas.width, this.canvas.height);
        gl.uniform1f(gl.getUniformLocation(main, "time"), time);
        gl.bindBuffer(34962, this.buffer);
        gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);
        this.channels.forEach(function (target, key) {
            gl.uniform1i(gl.getUniformLocation(main, key), i);
            gl.activeTexture(33984 + i);
            gl.bindTexture(3553, target.a.texture);
            i++;
            target.swap();
        });
        gl.bindFramebuffer(36160, null);
        gl.clear(16384 | 256);
        gl.drawArrays(4, 0, 6);
    };
    DR.prototype.cC = function (width, height, textures) {
        var gl = this.gl;
        return new CH(new RT(gl, width, height), new RT(gl, width, height), textures);
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
