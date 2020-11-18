"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var demolishedcompressor_1 = require("demolishedcompressor");
var html = "<canvas style=\"width:100%;height:100vh;left:0;position:absolute\" id=w width=1280 height=720/>\n  <style>body{margin:0;background:#000}</style>";
demolishedcompressor_1.Compressor.Mjolnir("/test/build/hope-bundle.js", "/test/build/demo-mjolnir.js", "/test/build/mjolnir-webgl.json").then(function () {
    console.log("WebGL calls mjolnired...");
    demolishedcompressor_1.Compressor.Pngify("/test/build/demo-mjolnir.js", "/test/build/hopoe.png.html", html).catch(function (err) {
        console.error(err);
    }).then(function () {
        console.log("Done building release");
    });
});
