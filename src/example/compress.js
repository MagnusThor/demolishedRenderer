"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const demolishedcompressor_1 = require("demolishedcompressor");
let html = `<style>body{margin:0;background:#000};</style><div id="p" style="right:50%;bottom:50%;transform:translate(50%,50%);position:absolute;z-index:2;height:40px;background:#fff"></div><canvas style="width:100vw;height:100vh;left:0;position:absolute;z-index:1" id=w width=640 height=360/>`;
let customScript = `z=function(){c=String.fromCharCode,q=document.querySelector.bind(document),i=q("img"),x=q("#c").getContext("2d"),x.drawImage(q("img"),0,0),d=x.getImageData(0,0,i.width,i.height).data,b=[],s=1e3,p=b.push.bind(b),l=function(a){var e=(a-s)/d.length*100;for(q("#p").style.width=e+"%",i=a;i<a+s&&i<d.length;i+=4)p(c(d[i])),p(c(d[i+1])),p(c(d[i+2]));a<d.length?setTimeout((function(){l(a+s)}),10):(s=b.join("").replace(/\\0/g," "),(0,eval)(s),q("#p").style.display="none")},l(0)};`;
console.clear();
demolishedcompressor_1.Compressor.Pngify("../../public/js/runner.js", "./runner.png.html", html, customScript).catch(err => {
    console.error(err);
}).then(r => {
    console.log("done..");
});
