"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var demolishedcompressor_1 = require("demolishedcompressor");
var html = "";
demolishedcompressor_1.Compressor.Pngify("/example/plain.min.js", "/example/example.png", html, false).then(function () {
    demolishedcompressor_1.Compressor.Pngify("/example/lib/tiny.js", "/example/tiny-player.png", '', false);
});
