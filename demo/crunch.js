"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var demolishedcompressor_1 = require("demolishedcompressor");
var html = "<canvas style=\"width:100%;height:100vh;left:0;position:absolute\" id=w width=640 height=360/>\n  <style>body{margin:0;background:#000}</style>";
demolishedcompressor_1.Compressor.Pngify("/demo/bundle.js", "/demo/FoL01.png.html", html, true).catch(function (err) {
    console.error(err);
}).then(function () {
    console.log("Done..");
});
