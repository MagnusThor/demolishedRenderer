"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestApp = void 0;
var DR_1 = require("../src/DR");
var volcanic_frag_glsl_1 = __importDefault(require("../test/glsl/volcanic-frag.glsl"));
var volcanic_main_glsl_1 = __importDefault(require("../test/glsl/volcanic-main.glsl"));
var mainTexture_glsl_1 = __importDefault(require("../test/glsl/mainTexture.glsl"));
var noise_texture_frag_glsl_1 = __importDefault(require("../test/glsl/noise.texture.frag.glsl"));
var stats_js_1 = __importDefault(require("stats.js"));
var TestApp = (function () {
    function TestApp() {
        var _this = this;
        this.stats = new stats_js_1.default();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);
        this.canvas = document.querySelector("canvas");
        var loop = function (t) {
            _this.stats.begin();
            dr.R(t / 1000);
            _this.stats.end();
            requestAnimationFrame(loop);
        };
        var vertex = "layout(location = 0) in vec2 pos; \n        out vec4 fragColor;\n        void main(){\n            gl_Position = vec4(pos.xy,0.0,1.0);\n        }";
        var dr = new DR_1.DR(this.canvas, vertex, volcanic_main_glsl_1.default);
        var iqNoise = DR_1.DR.gT(vertex, mainTexture_glsl_1.default, vertex, noise_texture_frag_glsl_1.default, 512, 512);
        var base64 = iqNoise.toDataURL();
        var image = document.createElement("img");
        image.src = base64;
        document.querySelector(".debug").appendChild(image);
        var volcanicTexture = {
            "iChannel2": {
                unit: 33987,
                src: "assets/texture2.jpg"
            },
            "iChannel1": {
                unit: 33986,
                src: "assets/texture.jpg"
            },
            "iChannel0": {
                unit: 33985,
                src: "assets/noise.png"
            },
            "iChannel4": {
                unit: 33988,
                src: [{
                        t: 0x8515,
                        d: base64
                    }, {
                        t: 0x8516,
                        d: base64
                    },
                    {
                        t: 0x8517,
                        d: base64
                    }, {
                        t: 0x8519,
                        d: base64
                    }, {
                        t: 0x8519,
                        d: base64
                    },
                    {
                        t: 0x851A,
                        d: base64
                    }
                ]
            }
        };
        var orbitalTextures = {
            "iChannel1": {
                unit: 33985,
                src: "assets/texture2.jpg"
            },
        };
        dr.aA(volcanicTexture, function () {
            dr.aB("bufferA", vertex, volcanic_frag_glsl_1.default, ["iChannel0", "iChannel1", "iChannel2"]);
            var ts = parseInt(location.hash.replace("#", ""));
            loop(ts || performance.now());
        });
    }
    return TestApp;
}());
exports.TestApp = TestApp;
var instance = new TestApp();
