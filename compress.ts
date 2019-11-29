 import { Compressor } from 'demolishedcompressor';

// packs foo.js into output.png.html

let html = `<canvas style="width:100%;height:100vh;left:0;position:absolute" id=main width=800 height=450>
<style>body{margin:0;background:0}</style>`;

Compressor.Pngify("./index.min.js","output.png.html",html);