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
        this.gl.viewport(0, 0, canvas.width, canvas.height);
        var gl = this.gl;
        this.buffer = gl.createBuffer();
        this.surfaceBuffer = gl.createBuffer();
        this.mainProgram = gl.createProgram();
        this.createShader(this.mainProgram, this.gl.VERTEX_SHADER, this.header + v);
        this.createShader(this.mainProgram, this.gl.FRAGMENT_SHADER, this.header + f);
        this.gl.linkProgram(this.mainProgram);
        this.gl.validateProgram(this.mainProgram);
        if (!gl.getProgramParameter(this.mainProgram, gl.LINK_STATUS)) {
            var info = gl.getProgramInfoLog(this.mainProgram);
            throw 'Could not compile WebGL program. \n\n' + info;
        }
        this.gl.useProgram(this.mainProgram);
        this.screenVertexPosition = gl.getAttribLocation(this.mainProgram, "pos");
        gl.enableVertexAttribArray(this.screenVertexPosition);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0]), gl.STATIC_DRAW);
    }
    DR.prototype.createShader = function (program, type, source) {
        var shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        this.gl.attachShader(program, shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            this.gl.getShaderInfoLog(shader).trim().split("\n").forEach(function (l) {
                return console.error("[shader] " + l);
            });
            throw new Error("Error while compiling vertex/fragment" + source);
        }
        ;
    };
    DR.prototype.addProgram = function (name) {
        var p = this.gl.createProgram();
        this.programs.set(name, p);
        return p;
    };
    DR.prototype.ct = function (image) {
        var gl = this.gl;
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
        return texture;
    };
    DR.prototype.addAssets = function (textures, cb) {
        var _this = this;
        var c = Object.keys(textures).length;
        Object.keys(textures).forEach(function (key) {
            var m = new Image();
            m.onload = function (e) {
                _this.textureCache.set(key, _this.ct(m));
                if (_this.textureCache.size === c)
                    cb();
            };
            m.src = textures[key].src;
        });
    };
    DR.prototype.addBuffer = function (name, vertex, fragment, textures) {
        var _this = this;
        var gl = this.gl;
        var target = this.createTarget(this.canvas.width, this.canvas.height, textures ? textures : []);
        this.targets.set(name, target);
        var program = this.addProgram(name);
        this.createShader(program, gl.VERTEX_SHADER, this.header + vertex);
        this.createShader(program, gl.FRAGMENT_SHADER, this.header + fragment);
        gl.linkProgram(program);
        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            var info = gl.getProgramInfoLog(program);
            throw 'Could not compile WebGL program. \n\n' + info;
        }
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
    DR.prototype.render = function (time) {
        var _this = this;
        var gl = this.gl;
        var main = this.mainProgram;
        var i = 0;
        this.programs.forEach(function (current, key) {
            gl.useProgram(current);
            var target = _this.targets.get(key);
            gl.uniform2f(gl.getUniformLocation(current, "resolution"), _this.canvas.width, _this.canvas.height);
            gl.uniform1f(gl.getUniformLocation(current, "time"), time);
            target.textures.forEach(function (tk) {
                var loc = gl.getUniformLocation(current, tk);
                gl.activeTexture(gl.TEXTURE0 + i);
                gl.uniform1i(loc, i);
                i++;
            });
            gl.bindBuffer(gl.ARRAY_BUFFER, _this.surfaceBuffer);
            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, _this.buffer);
            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
            gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        });
        gl.useProgram(main);
        gl.uniform2f(gl.getUniformLocation(main, "resolution"), this.canvas.width, this.canvas.height);
        gl.uniform1f(gl.getUniformLocation(main, "time"), time);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        this.targets.forEach(function (target, key) {
            gl.uniform1i(gl.getUniformLocation(main, key), i);
            gl.activeTexture(gl.TEXTURE0 + i);
            gl.bindTexture(gl.TEXTURE_2D, target.texture);
            i++;
        });
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    DR.prototype.createTarget = function (width, height, textures) {
        var gl = this.gl;
        var t = {
            "framebuffer": gl.createFramebuffer(),
            "renderbuffer": gl.createRenderbuffer(),
            "texture": gl.createTexture(),
            "textures": textures
        };
        gl.bindTexture(gl.TEXTURE_2D, t.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindFramebuffer(gl.FRAMEBUFFER, t.framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t.texture, 0);
        gl.bindRenderbuffer(gl.RENDERBUFFER, t.renderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, t.renderbuffer);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        return t;
    };
    return DR;
}());
exports.DR = DR;
