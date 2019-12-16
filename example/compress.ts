import { Compressor } from 'demolishedcompressor';
// packs /tiny/rawsong.json into tiny.png
let html = ``;

Compressor.Pngify("/example/plain.min.js","/example/example.png",html,false)

Compressor.Pngify("/example/lib/tiny.js","/example/tiny-player.png",'',false);


