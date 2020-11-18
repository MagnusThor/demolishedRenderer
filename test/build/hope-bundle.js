/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./test/glsl/hope.frag.glsl":
/*!**********************************!*\
  !*** ./test/glsl/hope.frag.glsl ***!
  \**********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"uniform float time;\\r\\nuniform vec2 mouse;\\r\\nuniform vec2 resolution;\\r\\nuniform sampler2D iChannel0;\\r\\nuniform sampler2D iChannel1;\\r\\nuniform sampler2D iChannel2;\\r\\nuniform int frame;\\r\\nuniform vec3 iMouse;\\r\\nout vec4 fragColor;\\r\\n#define iTime time\\r\\n#define rot(a)    mat2( cos(a+vec4(0,11,33,0)) )                    // rotation                  \\r\\n#define B(a,l,L)  max(  max( abs(a).x, abs(a).y ) -l, abs(a).z -L ) // bar\\r\\nvoid mainImage(out vec4 O, vec2 U) {\\r\\n    \\r\\n    float t=9., a;\\r\\n    vec3  R = vec3(resolution.xy,.5); \\r\\n\\t    \\r\\n\\t    vec3 e = vec3(5,-5,0), X=e.xzz, Z=e.zzx,\\r\\n\\t\\t    \\r\\n          M = iMouse.z > 0. ? iMouse.xyz/R : .01*cos(.5*iTime+vec3(0,11,0)),\\r\\n          D = normalize(vec3( U+U, -2.*R.y ) - R ),      // ray direction\\r\\n          p = 50./R, q,s;                                // marching point along ray \\r\\n    \\r\\n    for (O-=O ; O.x < 1. && t > .01 ; O+=.01 )\\r\\n\\t    \\r\\n        q = p, t=9.,\\r\\n        q.yz *= rot(-.4 -6.3*M.y),                       // rotations\\r\\n        q.xz *= rot(-.4 -6.3*M.x),\\r\\n        s = q = q.xzy,\\r\\n        t = min( t, max( -B((q-3.*Z),11.,2.), a = abs(q.z-15.)-1.5 ) ), // roof hole\\r\\n        q.y += 2., q.yz *= rot(.4),\\r\\n        t = min( t, B(abs(q)-X,.7,30.) ),                // ladder sides\\r\\n        t = t = min( t, max( abs(q.z)-28.,  B(vec3(mod(q.z+2.5,5.)-2.5,q.yx),.5,5.) ) ),\\r\\n        p += t*D;                                        // step forward = dist to obj          \\r\\n\\r\\n   if ( a==t || O.x>1. && s.z<200.) O *= 0.;             // roof & horizon = blaxk\\r\\n// if (s.z>200.) O *= vec4(.7,1,1,0);                    // coloring\\r\\n}\\r\\nvoid main(void){\\r\\n    mainImage(fragColor,gl_FragCoord.xy);\\r\\n}\\r\\n\\r\\n\\r\\n\");\n\n//# sourceURL=webpack://demolishedrenderer/./test/glsl/hope.frag.glsl?");

/***/ }),

/***/ "./test/glsl/hope.vert.glsl":
/*!**********************************!*\
  !*** ./test/glsl/hope.vert.glsl ***!
  \**********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"uniform vec2 resolution;\\r\\nuniform sampler2D bufferA;\\r\\nuniform float time;\\r\\nout vec4 fragColor;\\r\\n\\r\\nvoid mainImage(out vec4 fragColor,in vec2 fragCoord)\\r\\n{\\r\\n    vec2 q=fragCoord/resolution.xy;\\r\\n    vec3 col=texture(bufferA,q).xyz;\\r\\n    // gamma\\r\\n    //col=pow(col,vec3(.4545));\\r\\n    // // color correct - it seems my laptop has a fucked up contrast/gamma seeting, so I need\\r\\n    // //                 to do this for the picture to look okey in all computers but mine...\\r\\n    col=col*1.1-.06;\\r\\n    // // vignetting\\r\\n    // col*=.8+.3*sqrt(16.*q.x*q.y*(1.-q.x)*(1.-q.y));\\r\\n    fragColor=vec4(col,1.);\\r\\n}\\r\\n\\r\\n\\r\\nvoid main(void){\\r\\n    mainImage(fragColor,gl_FragCoord.xy);\\r\\n}\");\n\n//# sourceURL=webpack://demolishedrenderer/./test/glsl/hope.vert.glsl?");

/***/ }),

/***/ "./src/DR.js":
/*!*******************!*\
  !*** ./src/DR.js ***!
  \*******************/
/*! flagged exports */
/*! export DR [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.DR = void 0;\r\nvar Dt_1 = __webpack_require__(/*! ./Dt */ \"./src/Dt.js\");\r\nvar DR = (function () {\r\n    function DR(canvas, v, f, cU) {\r\n        if (cU === void 0) { cU = {}; }\r\n        this.canvas = canvas;\r\n        this.cU = cU;\r\n        this.frameCount = 0;\r\n        this.header = \"#version 300 es\\n#ifdef GL_ES\\nprecision highp float;\\nprecision highp int;\\nprecision mediump sampler3D;\\n#endif\\n\";\r\n        this.targets = new Map();\r\n        this.mainUniforms = new Map();\r\n        this.programs = new Map();\r\n        this.textureCache = new Map();\r\n        var gl = canvas.getContext(\"webgl2\", { preserveDrawingBuffer: true });\r\n        var c = 0, d;\r\n        for (var i in gl)\r\n            \"function\" == typeof gl[i] && (d = (c++ & 255).toString(16), d = d.match(/^[0-9].*$/) ? \"x\" + d : d, gl[d] = gl[i]);\r\n        this.gl = gl;\r\n        var mp = gl.createProgram();\r\n        this.mainProgram = mp;\r\n        gl.viewport(0, 0, canvas.width, canvas.height);\r\n        this.buffer = gl.createBuffer();\r\n        this.surfaceBuffer = gl.createBuffer();\r\n        this.cS(mp, 35633, this.header + v);\r\n        this.cS(mp, 35632, this.header + f);\r\n        gl.linkProgram(mp);\r\n        gl.validateProgram(mp);\r\n        if (!gl.getProgramParameter(mp, gl.LINK_STATUS)) {\r\n            var info = gl.getProgramInfoLog(mp);\r\n            throw 'Could not compile WebGL program. \\n\\n' + info;\r\n        }\r\n        gl.useProgram(mp);\r\n        for (var i_1 = 0; i_1 < gl.getProgramParameter(mp, gl.ACTIVE_UNIFORMS); ++i_1) {\r\n            var u = gl.getActiveUniform(mp, i_1);\r\n            this.mainUniforms.set(u.name, gl.getUniformLocation(mp, u.name));\r\n        }\r\n        this.screenVertexPosition = gl.getAttribLocation(mp, \"pos\");\r\n        gl.enableVertexAttribArray(this.screenVertexPosition);\r\n        gl.bindBuffer(34962, this.buffer);\r\n        gl.bufferData(34962, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0]), 35044);\r\n    }\r\n    DR.prototype.cS = function (program, type, source) {\r\n        var gl = this.gl;\r\n        var shader = gl.createShader(type);\r\n        gl.shaderSource(shader, source);\r\n        gl.compileShader(shader);\r\n        gl.attachShader(program, shader);\r\n        if (!gl.getShaderParameter(shader, 35713)) {\r\n            gl.getShaderInfoLog(shader).trim().split(\"\\n\").forEach(function (l) {\r\n                return console.error(\"[shader] \" + l);\r\n            });\r\n            throw new Error(\"Error while compiling vertex/fragment\" + source);\r\n        }\r\n        ;\r\n    };\r\n    DR.prototype.aP = function (name) {\r\n        var p = this.gl.createProgram();\r\n        this.programs.set(name, p);\r\n        return p;\r\n    };\r\n    DR.prototype.t = function (data, d) {\r\n        var gl = this.gl;\r\n        var texture = gl.createTexture();\r\n        gl.activeTexture(d);\r\n        gl.bindTexture(3553, texture);\r\n        if (data instanceof Image) {\r\n            gl.texImage2D(3553, 0, 6408, 6408, 5121, data);\r\n        }\r\n        else {\r\n            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);\r\n        }\r\n        gl.generateMipmap(3553);\r\n        return texture;\r\n    };\r\n    DR.prototype.tC = function (sources, d) {\r\n        var gl = this.gl;\r\n        var texture = gl.createTexture();\r\n        gl.activeTexture(d);\r\n        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);\r\n        var fetchAll = function (src, key) {\r\n            return new Promise(function (resolve, reject) {\r\n                var image = new Image();\r\n                image.dataset.key = key;\r\n                image.onerror = reject;\r\n                image.onload = function () {\r\n                    resolve(image);\r\n                };\r\n                image.src = src;\r\n            });\r\n        };\r\n        Promise.all(sources.map(function (i) {\r\n            return fetchAll(i.d, i.t);\r\n        })).then(function (data) {\r\n            data.forEach(function (image) {\r\n                var target = image.dataset.key;\r\n                var level = 0;\r\n                var internalFormat = gl.RGBA;\r\n                var width = 512;\r\n                var height = 512;\r\n                var format = gl.RGBA;\r\n                var type = gl.UNSIGNED_BYTE;\r\n                gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);\r\n                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);\r\n                gl.texImage2D(target, level, internalFormat, format, type, image);\r\n                gl.generateMipmap(gl.TEXTURE_CUBE_MAP);\r\n            });\r\n        });\r\n        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);\r\n        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);\r\n        return texture;\r\n    };\r\n    DR.prototype.aA = function (assets, cb) {\r\n        var _this = this;\r\n        var cache = function (k, n, v, f) {\r\n            _this.textureCache.set(k, { unit: n, src: v, fn: f });\r\n        };\r\n        var p = function (key, texture) {\r\n            var unit = texture.unit;\r\n            return new Promise(function (resolve) {\r\n                if (!texture.src) {\r\n                    cache(key, unit, _this.t(new Uint8Array(1024), unit), texture.fn);\r\n                    resolve(key);\r\n                }\r\n                else {\r\n                    if (!Array.isArray(texture.src)) {\r\n                        var i_2 = new Image();\r\n                        i_2.onload = function (e) {\r\n                            cache(key, unit, _this.t(i_2, unit), null);\r\n                            resolve(key);\r\n                        };\r\n                        i_2.src = texture.src;\r\n                    }\r\n                    else {\r\n                        cache(key, unit, _this.tC(texture.src, unit), texture.fn);\r\n                        resolve(key);\r\n                    }\r\n                }\r\n            });\r\n        };\r\n        Promise.all(Object.keys(assets).map(function (key) {\r\n            return p(key, assets[key]);\r\n        })).then(function (result) {\r\n            cb(result);\r\n        }).catch(function () {\r\n        });\r\n        return this;\r\n    };\r\n    DR.prototype.aB = function (name, vertex, fragment, textures, customUniforms) {\r\n        var _this = this;\r\n        var gl = this.gl;\r\n        var tA = this.cT(this.canvas.width, this.canvas.height, textures ? textures : [], customUniforms ? customUniforms : {});\r\n        var tB = this.cT(this.canvas.width, this.canvas.height, textures ? textures : [], customUniforms ? customUniforms : {});\r\n        this.targets.set(name, tA);\r\n        this.targets.set(\"_\" + name, tB);\r\n        var program = this.aP(name);\r\n        this.cS(program, 35633, this.header + vertex);\r\n        this.cS(program, 35632, this.header + fragment);\r\n        gl.linkProgram(program);\r\n        gl.validateProgram(program);\r\n        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\r\n            var info = gl.getProgramInfoLog(program);\r\n            throw 'Could not compile WebGL program. \\n\\n' + info;\r\n        }\r\n        gl.useProgram(program);\r\n        if (textures) {\r\n            textures.forEach(function (tk) {\r\n                gl.bindTexture(3553, _this.textureCache.get(tk).src);\r\n            });\r\n        }\r\n        this.vertexPosition = gl.getAttribLocation(program, \"pos\");\r\n        gl.enableVertexAttribArray(this.vertexPosition);\r\n        for (var i = 0; i < gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); ++i) {\r\n            var u = gl.getActiveUniform(program, i);\r\n            tA.locations.set(u.name, gl.getUniformLocation(program, u.name));\r\n        }\r\n        return this;\r\n    };\r\n    DR.prototype.R = function (time) {\r\n        var _this = this;\r\n        var gl = this.gl;\r\n        var main = this.mainProgram;\r\n        var tc = 0;\r\n        this.programs.forEach(function (current, key) {\r\n            gl.useProgram(current);\r\n            var fT = _this.targets.get(key);\r\n            var bT = _this.targets.get(\"_\" + key);\r\n            gl.uniform2f(fT.locations.get(\"resolution\"), _this.canvas.width, _this.canvas.height);\r\n            gl.uniform1f(fT.locations.get(\"time\"), time);\r\n            gl.uniform1f(fT.locations.get(\"frame\"), _this.frameCount);\r\n            var customUniforms = fT.uniforms;\r\n            customUniforms && Object.keys(customUniforms).forEach(function (v) {\r\n                customUniforms[v](fT.locations.get(v), gl, current, time);\r\n            });\r\n            var offset = 1;\r\n            var bl = gl.getUniformLocation(current, key);\r\n            gl.uniform1i(bl, 0);\r\n            gl.activeTexture(gl.TEXTURE0);\r\n            gl.bindTexture(gl.TEXTURE_2D, bT.texture);\r\n            fT.textures.forEach(function (tk, index) {\r\n                var ct = _this.textureCache.get(tk);\r\n                ct.fn &&\r\n                    ct.fn(gl, ct.src);\r\n                var loc = gl.getUniformLocation(current, tk);\r\n                gl.uniform1i(loc, index + offset);\r\n                gl.activeTexture(ct.unit);\r\n                gl.bindTexture(gl.TEXTURE_2D, ct.src);\r\n                tc++;\r\n            });\r\n            gl.bindBuffer(34962, _this.surfaceBuffer);\r\n            gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);\r\n            gl.bindBuffer(34962, _this.buffer);\r\n            gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);\r\n            gl.bindFramebuffer(36160, fT.framebuffer);\r\n            gl.clear(16384 | 256);\r\n            gl.drawArrays(4, 0, 6);\r\n            bT = fT;\r\n            fT = bT;\r\n        });\r\n        gl.useProgram(main);\r\n        gl.uniform2f(this.mainUniforms.get(\"resolution\"), this.canvas.width, this.canvas.height);\r\n        gl.uniform1f(this.mainUniforms.get(\"time\"), time);\r\n        Object.keys(this.cU).forEach(function (v) {\r\n            _this.cU[v](gl.getUniformLocation(main, v), gl, main, time);\r\n        });\r\n        gl.bindBuffer(34962, this.buffer);\r\n        gl.vertexAttribPointer(0, 2, 5126, false, 0, 0);\r\n        this.targets.forEach(function (target, key) {\r\n            gl.uniform1i(gl.getUniformLocation(main, key), tc);\r\n            gl.activeTexture(33984 + tc);\r\n            gl.bindTexture(3553, target.texture);\r\n            tc++;\r\n        });\r\n        gl.bindFramebuffer(36160, null);\r\n        gl.clear(16384 | 256);\r\n        gl.drawArrays(4, 0, 6);\r\n        this.frameCount++;\r\n    };\r\n    DR.prototype.cT = function (width, height, textures, customUniforms) {\r\n        var gl = this.gl;\r\n        var target = new Dt_1.Dt(gl, textures, customUniforms);\r\n        gl.bindTexture(3553, target.texture);\r\n        gl.texImage2D(3553, 0, 6408, width, height, 0, 6408, 5121, null);\r\n        gl.texParameteri(3553, 10242, 33071);\r\n        gl.texParameteri(3553, 10243, 33071);\r\n        gl.texParameteri(3553, 10240, 9728);\r\n        gl.texParameteri(3553, 10241, 9728);\r\n        gl.bindFramebuffer(36160, target.framebuffer);\r\n        gl.framebufferTexture2D(36160, 36064, 3553, target.texture, 0);\r\n        gl.bindRenderbuffer(36161, target.renderbuffer);\r\n        gl.renderbufferStorage(36161, 33189, width, height);\r\n        gl.framebufferRenderbuffer(36160, 36096, 36161, target.renderbuffer);\r\n        gl.bindTexture(3553, null);\r\n        gl.bindRenderbuffer(36161, null);\r\n        gl.bindFramebuffer(36160, null);\r\n        return target;\r\n    };\r\n    DR.prototype.run = function (t, fps) {\r\n        var _this = this;\r\n        var pt = performance.now();\r\n        var interval = 1000 / fps;\r\n        var dt = 0;\r\n        var a = function (t) {\r\n            requestAnimationFrame(a);\r\n            dt = t - pt;\r\n            if (dt > interval) {\r\n                pt = t - (dt % interval);\r\n                _this.R(pt / 1000);\r\n            }\r\n        };\r\n        a(t | 0);\r\n        return this;\r\n    };\r\n    DR.gT = function (mainVertex, mainFrag, textureVertex, textureFrag, w, h) {\r\n        var canvas = document.createElement(\"canvas\");\r\n        canvas.width = w;\r\n        canvas.height = h;\r\n        console.log(canvas.width, canvas.height);\r\n        var dr = new DR(canvas, mainVertex, mainFrag);\r\n        dr.aB(\"A\", textureVertex, textureFrag);\r\n        for (var i = 0; i < 2; i++) {\r\n            dr.R(i);\r\n        }\r\n        return canvas;\r\n    };\r\n    return DR;\r\n}());\r\nexports.DR = DR;\r\n\n\n//# sourceURL=webpack://demolishedrenderer/./src/DR.js?");

/***/ }),

/***/ "./src/Dt.js":
/*!*******************!*\
  !*** ./src/Dt.js ***!
  \*******************/
/*! flagged exports */
/*! export Dt [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Dt = void 0;\r\nvar Dt = (function () {\r\n    function Dt(gl, textures, customUniforms) {\r\n        this.textures = new Array();\r\n        this.locations = new Map();\r\n        this.framebuffer = gl.createFramebuffer();\r\n        this.renderbuffer = gl.createRenderbuffer();\r\n        this.texture = gl.createTexture();\r\n        this.textures = textures;\r\n        this.uniforms = customUniforms;\r\n    }\r\n    return Dt;\r\n}());\r\nexports.Dt = Dt;\r\n\n\n//# sourceURL=webpack://demolishedrenderer/./src/Dt.js?");

/***/ }),

/***/ "./test/hope.js":
/*!**********************!*\
  !*** ./test/hope.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:23-27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Hope = void 0;\r\nvar DR_1 = __webpack_require__(/*! ../src/DR */ \"./src/DR.js\");\r\nvar hope_frag_glsl_1 = __importDefault(__webpack_require__(/*! ../test/glsl/hope.frag.glsl */ \"./test/glsl/hope.frag.glsl\"));\r\nvar hope_vert_glsl_1 = __importDefault(__webpack_require__(/*! ../test/glsl/hope.vert.glsl */ \"./test/glsl/hope.vert.glsl\"));\r\nvar Hope = (function () {\r\n    function Hope() {\r\n        var L = function (t) {\r\n            dr.R(t / 1000);\r\n            requestAnimationFrame(L);\r\n        };\r\n        var vertex = \"layout(location = 0) in vec2 pos; \\n        out vec4 fragColor;\\n        void main(){\\n            gl_Position = vec4(pos.xy,0.0,1.0);\\n        }\";\r\n        var dr = new DR_1.DR(document.querySelector(\"canvas#w\"), vertex, hope_vert_glsl_1.default);\r\n        dr.aA({}, function () {\r\n            console.log(\"!..\");\r\n            dr.aB(\"bufferA\", vertex, hope_frag_glsl_1.default);\r\n            var ts = parseInt(location.hash.replace(\"#\", \"\"));\r\n            L(ts || performance.now());\r\n        });\r\n    }\r\n    Hope.I = function () {\r\n        return new Hope();\r\n    };\r\n    return Hope;\r\n}());\r\nexports.Hope = Hope;\r\nwindow.setTimeout(function () {\r\n    return Hope.I();\r\n}, 2000);\r\n\n\n//# sourceURL=webpack://demolishedrenderer/./test/hope.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./test/hope.js");
/******/ })()
;