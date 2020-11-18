import { Compressor } from 'demolishedcompressor'


let html = `<canvas style="width:100%;height:100vh;left:0;position:absolute" id=w width=1280 height=720/>
  <style>body{margin:0;background:#000}</style>`;

  // Compressor.Mjolnir("/test/build/hope-bundle.js", "/test/build/demo-mjolnir.js", "/test/build/mjolnir-webgl.json").then(() => {
  //   console.log("WebGL calls mjolnired...")
  Compressor.Pngify("/test/build/hope-bundle.js", "/test/build/hope.png.html", html).catch(err => {
    console.error(err);
  });
  // }).then(() => {
  //   console.log("Done building release");
  // });
//});
