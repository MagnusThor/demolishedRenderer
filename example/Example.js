"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DR_1 = require("../src/DR");
var bufferA_frag_1 = require("./shaders/bufferA_frag");
var bufferA_vertex_1 = require("./shaders/bufferA_vertex");
var main_frag_1 = require("./shaders/main_frag");
var main_vertex_1 = require("./shaders/main_vertex");
document.addEventListener("DOMContentLoaded", function () {
    var dr = new DR_1.DR(document.querySelector("canvas"), main_vertex_1.MAINVERTEX, main_frag_1.MAINFRAG);
    var maxFps = 25;
    var startTime = null;
    var frame = -1;
    var renderLoop = function (timestamp) {
        if (!startTime)
            startTime = timestamp;
        var segment = Math.floor((timestamp - startTime) / (1000 / maxFps));
        if (segment > frame) {
            frame = segment;
            dr.R(timestamp / 1000);
        }
        requestAnimationFrame(renderLoop);
    };
    var assets = {
        "iChannel0": {
            unit: 33985,
            src: "assets/example.jpg"
        }
    };
    dr.aA(assets, function () {
        dr.aB("bufferA", bufferA_vertex_1.BUFFER_A_VERTEX, bufferA_frag_1.BUFFER_A_FRAG, ["iChannel0"]);
        renderLoop(0);
    });
});
