import { Compressor } from 'demolishedcompressor';
// packs /tiny/rawsong.json into tiny.png
let html = ``;
Compressor.Pngify("/example/plain.min.js","/example/example.png",html,false)