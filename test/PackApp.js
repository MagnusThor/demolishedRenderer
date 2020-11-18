"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var demolishedcompressor_1 = require("demolishedcompressor");
var html = "<canvas style=\"width:100%;height:100vh;left:0;position:absolute\" id=w width=1280 height=720/>\n  <style>body{margin:0;background:#000}</style>";
demolishedcompressor_1.Compressor.Pngify("/test/build/hope-bundle.js", "/test/build/hope.png.html", html).catch(function (err) {
    console.error(err);
});
