"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DR = exports.Dt = void 0;
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
var DR = (function () {
    function DR(canvas, v, f, cU) {
        if (cU === void 0) { cU = {}; }
        this.canvas = canvas;
        this.cU = cU;
        this.frameCount = 0;
        this.deltaTime = 0;
        this.header = "#version 300 es\n    #ifdef GL_ES\n    precision highp float;\n    precision highp int;\n    precision mediump sampler3D;\n    #endif\n    ";
        this.targets = new Map();
        this.mainUniforms = new Map();
        this.programs = new Map();
        this.textureCache = new Map();
        var gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true });
        var c = 0, d;
        for (var i in gl)
            "function" == typeof gl[i] && (d = (c++ & 255).toString(16), d = d.match(/^[0-9].*$/) ? "x" + d : d, gl[d] = gl[i]);
        this.gl = gl;
        var mp = gl.createProgram();
        this.mainProgram = mp;
        gl.viewport(0, 0, canvas.width, canvas.height);
        this.buffer = gl.createBuffer();
        this.surfaceBuffer = gl.createBuffer();
        this.cS(mp, 35633, this.header + v);
        this.cS(mp, 35632, this.header + f);
        gl.linkProgram(mp);
        gl.validateProgram(mp);
        if (!gl.getProgramParameter(mp, gl.LINK_STATUS)) {
            var info = gl.getProgramInfoLog(mp);
            throw 'Could not compile main program. \n\n' + info;
        }
        gl.useProgram(mp);
        for (var i = 0; i < gl.getProgramParameter(mp, gl.ACTIVE_UNIFORMS); ++i) {
            var u = gl.getActiveUniform(mp, i);
            this.mainUniforms.set(u.name, gl.getUniformLocation(mp, u.name));
        }
        this.screenVertexPosition = gl.getAttribLocation(mp, "pos");
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
        if (!gl.getShaderParameter(shader, 35713)) {
            gl.getShaderInfoLog(shader).trim().split("\n").forEach(function (l) {
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
    DR.prototype.t = function (data, d) {
        var gl = this.gl;
        var texture = gl.createTexture();
        gl.activeTexture(d);
        gl.bindTexture(3553, texture);
        if (data instanceof Image) {
            gl.texImage2D(3553, 0, 6408, 6408, 5121, data);
        }
        else {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        }
        gl.generateMipmap(3553);
        return texture;
    };
    DR.prototype.tC = function (sources, d) {
        var _this = this;
        var gl = this.gl;
        var texture = gl.createTexture();
        gl.activeTexture(d);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        var fetchAll = function (src, key) {
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var response, blob, image;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, fetch(src)];
                        case 1:
                            response = _a.sent();
                            return [4, response.blob()];
                        case 2:
                            blob = _a.sent();
                            image = new Image();
                            image.dataset.key = key;
                            image.onerror = reject;
                            image.onload = function () {
                                resolve(image);
                            };
                            image.src = src;
                            return [2];
                    }
                });
            }); });
        };
        Promise.all(sources.map(function (i) {
            return fetchAll(i.d, i.t);
        })).then(function (data) {
            data.forEach(function (image) {
                var target = image.dataset.key;
                var level = 0;
                var internalFormat = gl.RGBA;
                var width = 512;
                var height = 512;
                var format = gl.RGBA;
                var type = gl.UNSIGNED_BYTE;
                gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                gl.texImage2D(target, level, internalFormat, format, type, image);
                gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
            });
        });
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        return texture;
    };
    DR.prototype.aA = function (assets, cb) {
        var _this = this;
        var cache = function (k, n, v, f) {
            _this.textureCache.set(k, { unit: n, src: v, fn: f });
        };
        var p = function (key, texture) {
            var unit = texture.unit;
            return new Promise(function (resolve) {
                if (!texture.src) {
                    cache(key, unit, _this.t(new Uint8Array(1024), unit), texture.fn);
                    resolve(key);
                }
                else {
                    if (!Array.isArray(texture.src)) {
                        var i_1 = new Image();
                        i_1.onload = function (e) {
                            cache(key, unit, _this.t(i_1, unit), null);
                            resolve(key);
                        };
                        i_1.src = texture.src;
                    }
                    else {
                        cache(key, unit, _this.tC(texture.src, unit), texture.fn);
                        resolve(key);
                    }
                }
            });
        };
        Promise.all(Object.keys(assets).map(function (key) {
            return p(key, assets[key]);
        })).then(function (result) {
            cb(result);
        }).catch(function () {
        });
        return this;
    };
    DR.prototype.aB = function (name, vertex, fragment, textures, customUniforms) {
        var _this = this;
        var gl = this.gl;
        var tA = this.cT(this.canvas.width, this.canvas.height, textures ? textures : [], customUniforms ? customUniforms : {});
        var tB = this.cT(this.canvas.width, this.canvas.height, textures ? textures : [], customUniforms ? customUniforms : {});
        this.targets.set(name, tA);
        this.targets.set("_" + name, tB);
        var program = this.aP(name);
        this.cS(program, 35633, this.header + vertex);
        this.cS(program, 35632, this.header + fragment);
        gl.linkProgram(program);
        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            var info = gl.getProgramInfoLog(program);
            throw "Could not compile " + name + " program. \n\n" + info;
        }
        gl.useProgram(program);
        if (textures) {
            textures.forEach(function (tk) {
                gl.bindTexture(3553, _this.textureCache.get(tk).src);
            });
        }
        this.vertexPosition = gl.getAttribLocation(program, "pos");
        gl.enableVertexAttribArray(this.vertexPosition);
        for (var i = 0; i < gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); ++i) {
            var u = gl.getActiveUniform(program, i);
            tA.locations.set(u.name, gl.getUniformLocation(program, u.name));
        }
        return this;
    };
    DR.prototype.R = function (time) {
        var _this = this;
        var gl = this.gl;
        var main = this.mainProgram;
        var tc = 0;
        this.programs.forEach(function (current, key) {
            gl.useProgram(current);
            var fT = _this.targets.get(key);
            var bT = _this.targets.get("_" + key);
            gl.uniform2f(fT.locations.get("resolution"), _this.canvas.width, _this.canvas.height);
            gl.uniform1f(fT.locations.get("time"), time);
            gl.uniform1f(fT.locations.get("deltaTime"), _this.frameCount);
            gl.uniform1f(fT.locations.get("frame"), _this.frameCount);
            var customUniforms = fT.uniforms;
            customUniforms && Object.keys(customUniforms).forEach(function (v) {
                customUniforms[v](fT.locations.get(v), gl, current, time);
            });
            var bl = gl.getUniformLocation(current, key);
            gl.uniform1i(bl, 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, bT.texture);
            fT.textures.forEach(function (tk, index) {
                var ct = _this.textureCache.get(tk);
                gl.activeTexture(ct.unit);
                gl.bindTexture(gl.TEXTURE_2D, ct.src);
                if (ct.fn)
                    ct.fn(current, gl, ct.src);
                var loc = gl.getUniformLocation(current, tk);
                gl.uniform1i(loc, index + 1);
                tc++;
            });
            gl.bindBuffer(34962, _this.surfaceBuffer);
            gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);
            gl.bindBuffer(34962, _this.buffer);
            gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);
            gl.bindFramebuffer(36160, fT.framebuffer);
            gl.clear(16384 | 256);
            gl.drawArrays(4, 0, 6);
            bT = fT;
            fT = bT;
        });
        gl.useProgram(main);
        gl.uniform2f(this.mainUniforms.get("resolution"), this.canvas.width, this.canvas.height);
        gl.uniform1f(this.mainUniforms.get("time"), time);
        Object.keys(this.cU).forEach(function (v) {
            _this.cU[v](gl.getUniformLocation(main, v), gl, main, time);
        });
        gl.bindBuffer(34962, this.buffer);
        gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);
        this.targets.forEach(function (target, key) {
            gl.uniform1i(gl.getUniformLocation(main, key), tc);
            gl.activeTexture(33984 + tc);
            gl.bindTexture(3553, target.texture);
            tc++;
        });
        gl.bindFramebuffer(36160, null);
        gl.clear(16384 | 256);
        gl.drawArrays(4, 0, 6);
        this.frameCount++;
        this.deltaTime = -(this.deltaTime - time);
    };
    DR.prototype.cT = function (width, height, textures, customUniforms) {
        var gl = this.gl;
        var target = new Dt(gl, textures, customUniforms);
        gl.bindTexture(3553, target.texture);
        gl.texImage2D(3553, 0, 6408, width, height, 0, 6408, 5121, null);
        gl.texParameteri(3553, 10242, 33071);
        gl.texParameteri(3553, 10243, 33071);
        gl.texParameteri(3553, 10240, 9728);
        gl.texParameteri(3553, 10241, 9728);
        gl.bindFramebuffer(36160, target.framebuffer);
        gl.framebufferTexture2D(36160, 36064, 3553, target.texture, 0);
        gl.bindRenderbuffer(36161, target.renderbuffer);
        gl.renderbufferStorage(36161, 33189, width, height);
        gl.framebufferRenderbuffer(36160, 36096, 36161, target.renderbuffer);
        gl.bindTexture(3553, null);
        gl.bindRenderbuffer(36161, null);
        gl.bindFramebuffer(36160, null);
        return target;
    };
    DR.prototype.run = function (t, fps) {
        var _this = this;
        var pt = performance.now();
        var interval = 1000 / fps;
        var dt = 0;
        var a = function (t) {
            requestAnimationFrame(a);
            dt = t - pt;
            if (dt > interval) {
                pt = t - (dt % interval);
                _this.R(pt / 1000);
            }
        };
        a(t | 0);
        return this;
    };
    DR.gT = function (mainVertex, mainFrag, textureVertex, textureFrag, w, h) {
        var canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        var dr = new DR(canvas, mainVertex, mainFrag);
        dr.aB("A", textureVertex, textureFrag);
        for (var i = 0; i < 2; i++) {
            dr.R(i);
        }
        return canvas;
    };
    return DR;
}());
exports.DR = DR;
