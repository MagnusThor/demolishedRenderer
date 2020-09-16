"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DR_1 = require("../src/DR");
var iChannel0_glsl_1 = __importDefault(require("../test/glsl/iChannel0.glsl"));
var mainImage_glsl_1 = __importDefault(require("../test/glsl/mainImage.glsl"));
var TestApp = (function () {
    function TestApp() {
        this.mainCanvas = document.querySelector("canvas");
        var loop = function (t) {
            dr.R(t / 1000);
            requestAnimationFrame(loop);
        };
        var vertex = "layout(location = 0) in vec2 pos; \n        out vec4 fragColor;\n        void main(){gl_Position = vec4(pos.xy,0.0,1.0);\n        }";
        var dr = new DR_1.DR(this.mainCanvas, vertex, mainImage_glsl_1.default);
        var textures = {
            "iChannel1": {
                num: 33985,
                src: "/test/assets/texture.jpg"
            }
        };
        dr.aA(textures, function () {
            dr.aB("iChannel0", vertex, iChannel0_glsl_1.default, ["iChannel1"]);
            dr.R(10.00);
        });
    }
    return TestApp;
}());
exports.TestApp = TestApp;
document.addEventListener("DOMContentLoaded", function () {
    var instance = new TestApp();
});
