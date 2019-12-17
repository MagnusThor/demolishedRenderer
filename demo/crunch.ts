import { Compressor } from "demolishedcompressor";

// create a hash (map) of the methods tp replace
// this is just to build the hash (map) of abbrevations
/*

var w = (o,h) =>{
    let c=0,d;
  	//typeof (o[i]) == "function" && (o[d]  = o[i]);
  
    for(var i in o)     {
		if( typeof (o[i]) == "function"){
  

        d = (c++ & 0xFF).toString(16);
        d = d.match(/^[0-9].*$/) ? "x" +d : d;
        h[d] = i;
        }

    }          
    return o;
}
var o = {}; // o contais out JSON, map of abbrevations
var gl = w((document.createElement("canvas")).getContext("webgl2"),o);

*/

/*
  'Mjolnir' the mighty hammer of Thor creates abbreviations of native API i.e WebGL2RenderingContext 
  parses code and shrinks as good as possible.Pngify packs into a single executable .html file using PNGCompression and
  adds decompressor, and executes. 

*/

//Compressor.Mjolnir("/src/DR.min.js", "/src/DR.mjolnir.min.js", "/trash/mjolnir-webgl.json").then(() => {

//console.log("Done.");

let html = `<canvas style="width:100%;height:100vh;left:0;position:absolute" id=w width=640 height=360/>
  <style>body{margin:0;background:#000}</style>`;

Compressor.Pngify("/demo/bundle.js", "/demo/FoL01.png.html", html, true).catch(err => {
  console.error(err);
}).then(() => {
  console.log("Done..");
});


// }).catch((err) => {
//   console.error(err);
// });


/*
  Within i.e constructor or after you create the WegGLRenderingContext, call ->
  var gl = document.createElement("canvas").getContext("webgl2");
  var c=0,i;for(i in gl)"function"==typeof gl[i]&&(d=(c++&255).toString(16),d=d.match(/^[0-9].*$/)?"x"+d:d,gl[d]=gl[i]);

  i.e look at foo.js example/build folder

*/


