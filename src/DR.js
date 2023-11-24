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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DR = void 0;
const Dt_1 = require("./Dt");
class DR {
    //  SQ: SQ;
    /**
     * Create a Shader
     *
     * @param {WebGLProgram} program
     * @param {number} type
     * @param {string} source
     * @memberof DR
     */
    cS(program, type, source, name) {
        let gl = this.gl;
        let shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        gl.attachShader(program, shader);
        if (!gl.getShaderParameter(shader, 35713)) { // this.gl.COMPILE_STATUS
            gl.getShaderInfoLog(shader).trim().split("\n").forEach((l) => console.error(`[${name}] ` + l));
            throw new Error("Error while compiling vertex/fragment" + source);
        }
        ;
    }
    /**
     * Create and a WebGLProgram
     *
     * @param {string} name
     * @returns {WebGLProgram}
     * @memberof DR
     */
    aP(name) {
        let p = this.gl.createProgram();
        this.programs.set(name, { program: p, state: true });
        return p;
    }
    /**
     *  Create a new WEBGLTexture
     *
     * @param {*} data  image or UInt8Array
     * @returns WebGLTexture
     * @memberof DR
     */
    t(data, d) {
        let gl = this.gl;
        let texture = gl.createTexture();
        gl.activeTexture(33985 + d);
        gl.bindTexture(3553, texture);
        if (data instanceof Image) {
            gl.texImage2D(3553, 0, 6408, 6408, 5121, data);
        }
        else {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        }
        gl.generateMipmap(3553);
        return texture;
    }
    /**
     * Create a texture cube map
     *
     * @param {Array<any>} sources
     * @param {number} d
     * @returns {WebGLTexture}
     * @memberof DR
     */
    tC(sources, d) {
        let gl = this.gl;
        let texture = gl.createTexture();
        gl.activeTexture(33985 + d);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        const fetchAll = (src, key) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(src);
                const blob = yield response.blob();
                let image = new Image();
                image.dataset.key = key;
                image.onerror = reject;
                image.onload = () => {
                    resolve(image);
                };
                image.src = src;
            }));
        };
        Promise.all(sources.map(i => {
            return fetchAll(i.d, i.t);
        })).then(data => {
            data.forEach(image => {
                const target = image.dataset.key;
                const level = 0;
                const internalFormat = gl.RGBA;
                const width = 512;
                const height = 512;
                const format = gl.RGBA;
                const type = gl.UNSIGNED_BYTE;
                gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                gl.texImage2D(target, level, internalFormat, format, type, image);
                gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
            });
        });
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        return texture;
    }
    /**
     * add assets ( textures,textures cubes,fft data etc. )
     *
     * @param {*} assets
     * @param {()=>void} cb
     * @returns {this}
     * @memberof DR
     */
    aA(assets) {
        const cache = (k, v, f) => {
            this.textureCache.set(k, { src: v, fn: f });
        };
        const p = (key, texture, unit) => {
            return new Promise((resolve) => {
                if (!texture.src) {
                    cache(key, this.t(new Uint8Array(1024), unit), texture.fn);
                    resolve(key);
                }
                else {
                    if (!Array.isArray(texture.src)) {
                        const i = new Image();
                        i.onload = (e) => {
                            cache(key, this.t(i, unit), null);
                            resolve(key);
                        };
                        i.src = texture.src;
                    }
                    else {
                        cache(key, this.tC(texture.src, unit), texture.fn);
                        resolve(key);
                    }
                }
            });
        };
        return Promise.all(Object.keys(assets).map((key, index) => {
            return p(key, assets[key], index);
        })).then((result) => {
            return this;
        }).catch((err) => {
            return err;
        });
    }
    /**
     * add a new buffer / shader program
     *
     * @param {string} name
     * @param {string} vertex
     * @param {string} fragment
     * @param {Array<string>} [textures]
     * @param {*} [customUniforms]
     * @returns {this}
     * @memberof DR
     */
    aB(name, vertex, fragment, textures, customUniforms) {
        let gl = this.gl;
        let tA = this.cT(this.canvas.width, this.canvas.height, textures ? textures : [], customUniforms ? customUniforms : {});
        let tB = this.cT(this.canvas.width, this.canvas.height, textures ? textures : [], customUniforms ? customUniforms : {});
        this.targets.set(name, tA);
        this.targets.set(`_${name}`, tB);
        let program = this.aP(name);
        this.cS(program, 35633, this.header + vertex, name);
        this.cS(program, 35632, this.header + fragment, name);
        gl.linkProgram(program);
        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const info = gl.getProgramInfoLog(program);
            throw `Could not compile ${name} program. \n\n${info}`;
        }
        gl.useProgram(program);
        if (textures) {
            textures.forEach((tk) => {
                gl.bindTexture(3553, this.textureCache.get(tk).src);
            });
        }
        this.vertexPosition = gl.getAttribLocation(program, "pos");
        gl.enableVertexAttribArray(this.vertexPosition);
        for (let i = 0; i < gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); ++i) {
            const u = gl.getActiveUniform(program, i);
            tA.activeUniforms.set(u.name, { name: u.name, size: u.size, type: u.type, index: i, location: gl.getUniformLocation(program, u.name) });
        }
        return this;
    }
    /**
     * add 1-n buffers (IBuf) to the renderer
     *
     * @param {Array<IBuf>} buffers
     * @return {*}  {Promise<DR>}
     * @memberof DR
     */
    abS(buffers) {
        return new Promise((resolve, reject) => {
            try {
                buffers.forEach(b => this.aB(b.name, b.vertex, b.fragment, b.textures, b.customUniforms));
                resolve(this);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    /**
     * Set program state ( enable / or disable)
     *
     * @param {string} key
     * @param {boolean} state
     * @memberof DR
     */
    sP(key, state) {
        this.programs.get(key).state = state;
    }
    /**
     * Render : todo:// this needs to be refactored.
     *
     * @param {number} time
     * @memberof DR
     */
    R(time, buffers, onFrame) {
        let gl = this.gl;
        let main = this.mainProgram;
        let tc = 0;
        this.programs.forEach((l, key) => {
            this.currentProgram = l.program;
            this.fT = this.targets.get(key);
            let bT = this.targets.get(`_${key}`);
            let lg = this.fT.activeUniforms;
            if (buffers.includes(key)) {
                gl.useProgram(this.currentProgram);
                if (lg.has("resolution"))
                    gl.uniform2f(lg.get("resolution").location, this.canvas.width, this.canvas.height);
                if (lg.has("time"))
                    gl.uniform1f(lg.get("time").location, time);
                if (lg.has("frame"))
                    gl.uniform1f(lg.get("frame").location, this.frameCount);
                let customUniforms = this.fT.customUniforms;
                customUniforms && Object.keys(customUniforms).forEach((v) => {
                    customUniforms[v](lg.get(v).location, gl, this.currentProgram, time);
                });
                let bl = gl.getUniformLocation(this.currentProgram, key); // todo: get this from cache?
                gl.uniform1i(bl, 0);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, bT.texture);
                this.fT.textures.forEach((tk, index) => {
                    let ct = this.textureCache.get(tk);
                    gl.activeTexture(33985 + index);
                    gl.bindTexture(gl.TEXTURE_2D, ct.src);
                    if (ct.fn)
                        ct.fn(this.currentProgram, gl, ct.src);
                    let loc = gl.getUniformLocation(this.currentProgram, tk); // todo: get this from cache?  
                    gl.uniform1i(loc, index + 1);
                    tc++;
                });
                gl.bindBuffer(34962, this.surfaceBuffer);
                gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);
                gl.bindBuffer(34962, this.buffer);
                gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);
                gl.bindFramebuffer(36160, this.fT.framebuffer);
                gl.clear(16384 | 256);
                gl.drawArrays(4, 0, 6);
                bT = this.fT;
                this.fT = bT;
            }
        });
        gl.useProgram(main);
        const mu = this.mainUniforms;
        gl.uniform2f(mu.get("resolution"), this.canvas.width, this.canvas.height);
        gl.uniform1f(mu.get("time"), time);
        if (onFrame)
            onFrame(gl, mu);
        Object.keys(this.cU).forEach((v) => {
            this.cU[v](gl.getUniformLocation(main, v), gl, main, time); // todo: use cached locations
        });
        gl.bindBuffer(34962, this.buffer);
        gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);
        this.targets.forEach((target, key) => {
            gl.uniform1i(gl.getUniformLocation(main, key), tc); // todo: use cached locations
            gl.activeTexture(33984 + tc);
            gl.bindTexture(3553, target.texture);
            tc++;
        });
        gl.bindFramebuffer(36160, null);
        gl.clear(16384 | 256);
        gl.drawArrays(4, 0, 6);
        this.frameCount++;
        this.deltaTime = -(this.deltaTime - time);
    }
    /**
     * Create render target
     *
     * @param {number} width
     * @param {number} height
     * @param {Array<string>} textures
     * @returns {*}
     * @memberof DR
     */
    cT(width, height, textures, customUniforms) {
        let gl = this.gl;
        let target = new Dt_1.Dt(gl, textures, customUniforms);
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
    }
    constructor(canvas, v, f, cU = {}) {
        this.canvas = canvas;
        this.cU = cU;
        this.frameCount = 0;
        this.deltaTime = 0;
        this.header = `#version 300 es
    #ifdef GL_ES
    precision highp float;
    precision highp int;
    precision mediump sampler3D;
    #endif
    `;
        this.targets = new Map();
        this.mainUniforms = new Map();
        this.programs = new Map();
        this.textureCache = new Map();
        let gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true });
        this.gl = gl;
        let mp = gl.createProgram();
        this.mainProgram = mp;
        gl.viewport(0, 0, canvas.width, canvas.height);
        this.buffer = gl.createBuffer();
        this.surfaceBuffer = gl.createBuffer();
        this.cS(mp, 35633, this.header + v, "mv");
        this.cS(mp, 35632, this.header + f, "mf");
        gl.linkProgram(mp);
        gl.validateProgram(mp);
        if (!gl.getProgramParameter(mp, gl.LINK_STATUS)) {
            const info = gl.getProgramInfoLog(mp);
            throw `Could not compile main program. \n\n${info}`;
        }
        gl.useProgram(mp);
        for (let i = 0; i < gl.getProgramParameter(mp, gl.ACTIVE_UNIFORMS); ++i) {
            const u = gl.getActiveUniform(mp, i);
            this.mainUniforms.set(u.name, gl.getUniformLocation(mp, u.name));
        }
        this.screenVertexPosition = gl.getAttribLocation(mp, "pos");
        gl.enableVertexAttribArray(this.screenVertexPosition);
        gl.bindBuffer(34962, this.buffer);
        gl.bufferData(34962, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0]), 35044);
    }
    /**
     *  Generate a texture and return a canvas element
     *
     * @static
     * @param {string} mainVertex
     * @param {string} mainFrag
     * @param {string} textureVertex
     * @param {*} textureFrag
     * @param {number} w
     * @param {number} h
     * @returns {HTMLCanvasElement}
     * @memberof DR
     */
    static gT(mainVertex, mainFrag, textureVertex, textureFrag, w, h) {
        let canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        let dr = new DR(canvas, mainVertex, mainFrag);
        dr.aB("A", textureVertex, textureFrag);
        for (var i = 0; i < 2; i++) {
            dr.R(i, ["A"], () => { });
        }
        return canvas;
    }
}
exports.DR = DR;
