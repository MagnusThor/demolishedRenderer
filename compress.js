"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var demolishedcompressor_1 = require("demolishedcompressor");
// packs foo.js into output.png.html
var html = "<canvas style=\"width:100%;height:100vh;left:0;position:absolute\" id=main width=800 height=450>\n<style>body{margin:0;background:0}</style>";
demolishedcompressor_1.Compressor.Pngify("./index.min.js", "output.png.html", html);
