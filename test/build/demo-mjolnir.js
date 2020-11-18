/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/hope.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/DR.js":
/*!*******************!*\
  !*** ./src/DR.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Dt_1 = __webpack_require__(/*! ./Dt */ \"./src/Dt.js\");\nvar DR = (function () {\n    function DR(canvas, v, f, cU) {\n        if (cU === void 0) { cU = {}; }\n        this.canvas = canvas;\n        this.cU = cU;\n        this.frameCount = 0;\n        this.header = \"#version 300 es\\n#ifdef GL_ES\\nprecision highp float;\\nprecision highp int;\\nprecision mediump sampler3D;\\n#endif\\n\";\n        this.targets = new Map();\n        this.mainUniforms = new Map();\n        this.programs = new Map();\n        this.textureCache = new Map();\n        var gl = canvas.getContext(\"webgl2\", { preserveDrawingBuffer: true });\n        var c = 0, d;\n        for (var i in gl)\n            \"function\" == typeof gl[i] && (d = (c++ & 255).toString(16), d = d.match(/^[0-9].*$/) ? \"x\" + d : d, gl[d] = gl[i]);\n        this.gl = gl;\n        var mp = gl.x73();\n        this.mainProgram = mp;\n        gl.df(0, 0, canvas.width, canvas.height);\n        this.buffer = gl.createBuffer();\n        this.surfaceBuffer = gl.createBuffer();\n        this.cS(mp, 35633, this.header + v);\n        this.cS(mp, 35632, this.header + f);\n        gl.af(mp);\n        gl.d5(mp);\n        if (!gl.x98(mp, gl.LINK_STATUS)) {\n            var info = gl.x99(mp);\n            throw 'Could not compile WebGL program. \\n\\n' + info;\n        }\n        gl.d4(mp);\n        for (var i_1 = 0; i_1 < gl.x98(mp, gl.ACTIVE_UNIFORMS); ++i_1) {\n            var u = gl.x8f(mp, i_1);\n            this.mainUniforms.set(u.name, gl.a2(mp, u.name));\n        }\n        this.screenVertexPosition = gl.x91(mp, \"pos\");\n        gl.x87(this.screenVertexPosition);\n        gl.x5b(34962, this.buffer);\n        gl.x64(34962, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0]), 35044);\n    }\n    DR.prototype.cS = function (program, type, source) {\n        var gl = this.gl;\n        var shader = gl.x75(type);\n        gl.b6(shader, source);\n        gl.x6c(shader);\n        gl.x59(program, shader);\n        if (!gl.x9b(shader, 35713)) {\n            gl.x9c(shader).trim().split(\"\\n\").forEach(function (l) {\n                return console.error(\"[shader] \" + l);\n            });\n            throw new Error(\"Error while compiling vertex/fragment\" + source);\n        }\n        ;\n    };\n    DR.prototype.aP = function (name) {\n        var p = this.gl.x73();\n        this.programs.set(name, p);\n        return p;\n    };\n    DR.prototype.t = function (data, d) {\n        var gl = this.gl;\n        var texture = gl.x76();\n        gl.x58(d);\n        gl.x5e(3553, texture);\n        if (data instanceof Image) {\n            gl.bf(3553, 0, 6408, 6408, 5121, data);\n        }\n        else {\n            gl.bf(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);\n        }\n        gl.x8d(3553);\n        return texture;\n    };\n    DR.prototype.tC = function (sources, d) {\n        var gl = this.gl;\n        var texture = gl.x76();\n        gl.x58(d);\n        gl.x5e(gl.TEXTURE_CUBE_MAP, texture);\n        var fetchAll = function (src, key) {\n            return new Promise(function (resolve, reject) {\n                var image = new Image();\n                image.dataset.key = key;\n                image.onerror = reject;\n                image.onload = function () {\n                    resolve(image);\n                };\n                image.src = src;\n            });\n        };\n        Promise.all(sources.map(function (i) {\n            return fetchAll(i.d, i.t);\n        })).then(function (data) {\n            data.forEach(function (image) {\n                var target = image.dataset.key;\n                var level = 0;\n                var internalFormat = gl.RGBA;\n                var width = 512;\n                var height = 512;\n                var format = gl.RGBA;\n                var type = gl.UNSIGNED_BYTE;\n                gl.bf(target, level, internalFormat, width, height, 0, format, type, null);\n                gl.x5e(gl.TEXTURE_CUBE_MAP, texture);\n                gl.bf(target, level, internalFormat, format, type, image);\n                gl.x8d(gl.TEXTURE_CUBE_MAP);\n            });\n        });\n        gl.x8d(gl.TEXTURE_CUBE_MAP);\n        gl.be(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);\n        return texture;\n    };\n    DR.prototype.aA = function (assets, cb) {\n        var _this = this;\n        var cache = function (k, n, v, f) {\n            _this.textureCache.set(k, { unit: n, src: v, fn: f });\n        };\n        var p = function (key, texture) {\n            var unit = texture.unit;\n            return new Promise(function (resolve) {\n                if (!texture.src) {\n                    cache(key, unit, _this.t(new Uint8Array(1024), unit), texture.fn);\n                    resolve(key);\n                }\n                else {\n                    if (!Array.isArray(texture.src)) {\n                        var i_2 = new Image();\n                        i_2.onload = function (e) {\n                            cache(key, unit, _this.t(i_2, unit), null);\n                            resolve(key);\n                        };\n                        i_2.src = texture.src;\n                    }\n                    else {\n                        cache(key, unit, _this.tC(texture.src, unit), texture.fn);\n                        resolve(key);\n                    }\n                }\n            });\n        };\n        Promise.all(Object.keys(assets).map(function (key) {\n            return p(key, assets[key]);\n        })).then(function (result) {\n            cb(result);\n        }).catch(function () {\n        });\n        return this;\n    };\n    DR.prototype.aB = function (name, vertex, fragment, textures, customUniforms) {\n        var _this = this;\n        var gl = this.gl;\n        var tA = this.cT(this.canvas.width, this.canvas.height, textures ? textures : [], customUniforms ? customUniforms : {});\n        var tB = this.cT(this.canvas.width, this.canvas.height, textures ? textures : [], customUniforms ? customUniforms : {});\n        this.targets.set(name, tA);\n        this.targets.set(\"_\" + name, tB);\n        var program = this.aP(name);\n        this.cS(program, 35633, this.header + vertex);\n        this.cS(program, 35632, this.header + fragment);\n        gl.af(program);\n        gl.d5(program);\n        if (!gl.x98(program, gl.LINK_STATUS)) {\n            var info = gl.x99(program);\n            throw 'Could not compile WebGL program. \\n\\n' + info;\n        }\n        gl.d4(program);\n        if (textures) {\n            textures.forEach(function (tk) {\n                gl.x5e(3553, _this.textureCache.get(tk).src);\n            });\n        }\n        this.vertexPosition = gl.x91(program, \"pos\");\n        gl.x87(this.vertexPosition);\n        for (var i = 0; i < gl.x98(program, gl.ACTIVE_UNIFORMS); ++i) {\n            var u = gl.x8f(program, i);\n            tA.locations.set(u.name, gl.a2(program, u.name));\n        }\n        return this;\n    };\n    DR.prototype.R = function (time) {\n        var _this = this;\n        var gl = this.gl;\n        var main = this.mainProgram;\n        var tc = 0;\n        this.programs.forEach(function (current, key) {\n            gl.d4(current);\n            var fT = _this.targets.get(key);\n            var bT = _this.targets.get(\"_\" + key);\n            gl.c5(fT.locations.get(\"resolution\"), _this.canvas.width, _this.canvas.height);\n            gl.c1(fT.locations.get(\"time\"), time);\n            gl.c1(fT.locations.get(\"frame\"), _this.frameCount);\n            var customUniforms = fT.uniforms;\n            customUniforms && Object.keys(customUniforms).forEach(function (v) {\n                customUniforms[v](fT.locations.get(v), gl, current, time);\n            });\n            var offset = 1;\n            var bl = gl.a2(current, key);\n            gl.c3(bl, 0);\n            gl.x58(gl.TEXTURE0);\n            gl.x5e(gl.TEXTURE_2D, bT.texture);\n            fT.textures.forEach(function (tk, index) {\n                var ct = _this.textureCache.get(tk);\n                ct.fn &&\n                    ct.fn(gl, ct.src);\n                var loc = gl.a2(current, tk);\n                gl.c3(loc, index + offset);\n                gl.x58(ct.unit);\n                gl.x5e(gl.TEXTURE_2D, ct.src);\n                tc++;\n            });\n            gl.x5b(34962, _this.surfaceBuffer);\n            gl.de(0, 2, 5126, false, 0, 0);\n            gl.x5b(34962, _this.buffer);\n            gl.de(0, 2, 5126, false, 0, 0);\n            gl.x5c(36160, fT.framebuffer);\n            gl.x67(16384 | 256);\n            gl.x84(4, 0, 6);\n            bT = fT;\n            fT = bT;\n        });\n        gl.d4(main);\n        gl.c5(this.mainUniforms.get(\"resolution\"), this.canvas.width, this.canvas.height);\n        gl.c1(this.mainUniforms.get(\"time\"), time);\n        Object.keys(this.cU).forEach(function (v) {\n            _this.cU[v](gl.a2(main, v), gl, main, time);\n        });\n        gl.x5b(34962, this.buffer);\n        gl.de(0, 2, 5126, false, 0, 0);\n        this.targets.forEach(function (target, key) {\n            gl.c3(gl.a2(main, key), tc);\n            gl.x58(33984 + tc);\n            gl.x5e(3553, target.texture);\n            tc++;\n        });\n        gl.x5c(36160, null);\n        gl.x67(16384 | 256);\n        gl.x84(4, 0, 6);\n        this.frameCount++;\n    };\n    DR.prototype.cT = function (width, height, textures, customUniforms) {\n        var gl = this.gl;\n        var target = new Dt_1.Dt(gl, textures, customUniforms);\n        gl.x5e(3553, target.texture);\n        gl.bf(3553, 0, 6408, width, height, 0, 6408, 5121, null);\n        gl.be(3553, 10242, 33071);\n        gl.be(3553, 10243, 33071);\n        gl.be(3553, 10240, 9728);\n        gl.be(3553, 10241, 9728);\n        gl.x5c(36160, target.framebuffer);\n        gl.x8b(36160, 36064, 3553, target.texture, 0);\n        gl.x5d(36161, target.renderbuffer);\n        gl.b3(36161, 33189, width, height);\n        gl.x8a(36160, 36096, 36161, target.renderbuffer);\n        gl.x5e(3553, null);\n        gl.x5d(36161, null);\n        gl.x5c(36160, null);\n        return target;\n    };\n    DR.prototype.run = function (t, fps) {\n        var _this = this;\n        var pt = performance.now();\n        var interval = 1000 / fps;\n        var dt = 0;\n        var a = function (t) {\n            requestAnimationFrame(a);\n            dt = t - pt;\n            if (dt > interval) {\n                pt = t - (dt % interval);\n                _this.R(pt / 1000);\n            }\n        };\n        a(t | 0);\n        return this;\n    };\n    DR.gT = function (mainVertex, mainFrag, textureVertex, textureFrag, w, h) {\n        var canvas = document.createElement(\"canvas\");\n        canvas.width = w;\n        canvas.height = h;\n        console.log(canvas.width, canvas.height);\n        var dr = new DR(canvas, mainVertex, mainFrag);\n        dr.aB(\"A\", textureVertex, textureFrag);\n        for (var i = 0; i < 2; i++) {\n            dr.R(i);\n        }\n        return canvas;\n    };\n    return DR;\n}());\nexports.DR = DR;\n\n\n//# sourceURL=webpack:///./src/DR.js?");

/***/ }),

/***/ "./src/Dt.js":
/*!*******************!*\
  !*** ./src/Dt.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Dt = (function () {\n    function Dt(gl, textures, customUniforms) {\n        this.textures = new Array();\n        this.locations = new Map();\n        this.framebuffer = gl.x72();\n        this.renderbuffer = gl.x74();\n        this.texture = gl.x76();\n        this.textures = textures;\n        this.uniforms = customUniforms;\n    }\n    return Dt;\n}());\nexports.Dt = Dt;\n\n\n//# sourceURL=webpack:///./src/Dt.js?");

/***/ }),

/***/ "./test/glsl/hope.frag.glsl":
/*!**********************************!*\
  !*** ./test/glsl/hope.frag.glsl ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"uniform float time;\\nuniform vec2 mouse;\\nuniform vec2 resolution;\\nuniform sampler2D iChannel0;\\nuniform sampler2D iChannel1;\\nuniform sampler2D iChannel2;\\nuniform int frame;\\nuniform vec3 iMouse;\\n\\nout vec4 fragColor;\\n\\n\\n#define iTime time\\n\\n#define rot(a)    mat2( cos(a+vec4(0,11,33,0)) )                    // rotation                  \\n#define B(a,l,L)  max(  max( abs(a).x, abs(a).y ) -l, abs(a).z -L ) // bar\\n\\nvoid mainImage(out vec4 O, vec2 U) {\\n    \\n    float t=9., a;\\n    vec3  R = vec3(resolution.xy,.5); \\n\\t    \\n\\t    vec3 e = vec3(5,-5,0), X=e.xzz, Z=e.zzx,\\n\\t\\t    \\n          M = iMouse.z > 0. ? iMouse.xyz/R : .01*cos(.5*iTime+vec3(0,11,0)),\\n          D = normalize(vec3( U+U, -2.*R.y ) - R ),      // ray direction\\n          p = 50./R, q,s;                                // marching point along ray \\n    \\n    for (O-=O ; O.x < 1. && t > .01 ; O+=.01 )\\n\\t    \\n        q = p, t=9.,\\n        q.yz *= rot(-.4 -6.3*M.y),                       // rotations\\n        q.xz *= rot(-.4 -6.3*M.x),\\n        s = q = q.xzy,\\n        t = min( t, max( -B((q-3.*Z),11.,2.), a = abs(q.z-15.)-1.5 ) ), // roof hole\\n        q.y += 2., q.yz *= rot(.4),\\n        t = min( t, B(abs(q)-X,.7,30.) ),                // ladder sides\\n        t = t = min( t, max( abs(q.z)-28.,  B(vec3(mod(q.z+2.5,5.)-2.5,q.yx),.5,5.) ) ),\\n        p += t*D;                                        // step forward = dist to obj          \\n\\n   if ( a==t || O.x>1. && s.z<200.) O *= 0.;             // roof & horizon = blaxk\\n// if (s.z>200.) O *= vec4(.7,1,1,0);                    // coloring\\n}\\n\\n\\n\\nvoid main(void){\\n    mainImage(fragColor,gl_FragCoord.xy);\\n}\\n\\n\\n\");\n\n//# sourceURL=webpack:///./test/glsl/hope.frag.glsl?");

/***/ }),

/***/ "./test/glsl/hope.vert.glsl":
/*!**********************************!*\
  !*** ./test/glsl/hope.vert.glsl ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"uniform vec2 resolution;\\nuniform sampler2D bufferA;\\nuniform float time;\\nout vec4 fragColor;\\n\\nvoid mainImage(out vec4 fragColor,in vec2 fragCoord)\\n{\\n    vec2 q=fragCoord/resolution.xy;\\n    vec3 col=texture(bufferA,q).xyz;\\n    // gamma\\n    //col=pow(col,vec3(.4545));\\n    // // color correct - it seems my laptop has a fucked up contrast/gamma seeting, so I need\\n    // //                 to do this for the picture to look okey in all computers but mine...\\n    col=col*1.1-.06;\\n    // // vignetting\\n    // col*=.8+.3*sqrt(16.*q.x*q.y*(1.-q.x)*(1.-q.y));\\n    fragColor=vec4(col,1.);\\n}\\n\\n\\nvoid main(void){\\n    mainImage(fragColor,gl_FragCoord.xy);\\n}\");\n\n//# sourceURL=webpack:///./test/glsl/hope.vert.glsl?");

/***/ }),

/***/ "./test/hope.js":
/*!**********************!*\
  !*** ./test/hope.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar DR_1 = __webpack_require__(/*! ../src/DR */ \"./src/DR.js\");\nvar hope_frag_glsl_1 = __importDefault(__webpack_require__(/*! ../test/glsl/hope.frag.glsl */ \"./test/glsl/hope.frag.glsl\"));\nvar hope_vert_glsl_1 = __importDefault(__webpack_require__(/*! ../test/glsl/hope.vert.glsl */ \"./test/glsl/hope.vert.glsl\"));\nvar Hope = (function () {\n    function Hope() {\n        var L = function (t) {\n            dr.R(t / 1000);\n            requestAnimationFrame(L);\n        };\n        var vertex = \"layout(location = 0) in vec2 pos; \\n        out vec4 fragColor;\\n        void main(){\\n            gl_Position = vec4(pos.xy,0.0,1.0);\\n        }\";\n        var dr = new DR_1.DR(document.querySelector(\"canvas\"), vertex, hope_vert_glsl_1.default);\n        dr.aA({}, function () {\n            console.log(\"!..\");\n            dr.aB(\"bufferA\", vertex, hope_frag_glsl_1.default);\n            var ts = parseInt(location.hash.replace(\"#\", \"\"));\n            L(ts || performance.now());\n        });\n    }\n    Hope.I = function () {\n        return new Hope();\n    };\n    return Hope;\n}());\nexports.Hope = Hope;\nHope.I();\n\n\n//# sourceURL=webpack:///./test/hope.js?");

/***/ })

/******/ });