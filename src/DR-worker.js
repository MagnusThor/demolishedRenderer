"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DR_1 = require("./DR");
var ctx = self;
var postMessage = function (topic, data, transferables) {
    ctx.postMessage({
        topic: topic,
        data: data
    }, transferables || []);
};
var _rd;
ctx.addEventListener("message", function (ev) {
    var msg = ev.data;
    if (msg.topic === "init") {
        _rd = new DR_1.DR(msg.data.canvas, msg.data.vert, msg.data.frag, msg.data.customUniforms || {});
        msg.data.buffers.forEach(function (b) {
            _rd.aB(b.name, b.vert, b.frag, b.textures, b.customUniforms);
        });
        postMessage("init", {});
    }
    else if (msg.topic === "start") {
        var animate_1 = function (ts) {
            requestAnimationFrame(animate_1);
            var t = ts / 1000;
            _rd.R(t);
            postMessage("render", {
                bitmap: _rd.canvas["transferToImageBitmap"]()
            });
        };
        animate_1(0);
    }
});
