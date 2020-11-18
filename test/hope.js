"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hope = void 0;
var DR_1 = require("../src/DR");
var hope_frag_glsl_1 = __importDefault(require("../test/glsl/hope.frag.glsl"));
var hope_vert_glsl_1 = __importDefault(require("../test/glsl/hope.vert.glsl"));
var Hope = (function () {
    function Hope() {
        var L = function (t) {
            dr.R(t / 1000);
            requestAnimationFrame(L);
        };
        var vertex = "layout(location = 0) in vec2 pos; \n        out vec4 fragColor;\n        void main(){\n            gl_Position = vec4(pos.xy,0.0,1.0);\n        }";
        var dr = new DR_1.DR(document.querySelector("canvas#w"), vertex, hope_vert_glsl_1.default);
        dr.aA({}, function () {
            console.log("!..");
            dr.aB("bufferA", vertex, hope_frag_glsl_1.default);
            var ts = parseInt(location.hash.replace("#", ""));
            L(ts || performance.now());
        });
    }
    Hope.I = function () {
        return new Hope();
    };
    return Hope;
}());
exports.Hope = Hope;
window.setTimeout(function () {
    return Hope.I();
}, 2000);
