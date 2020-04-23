!function(e){var r={};function t(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var i in e)t.d(n,i,function(r){return e[r]}.bind(null,i));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n,i=t(1),a=self;a.addEventListener("message",function(e){var r=e.data;if("init"===r.topic)n=new i.DR(r.data.canvas,r.data.vert,r.data.frag,r.data.customUniforms||{}),r.data.buffers.forEach(function(e){n.aB(e.name,e.vert,e.frag,e.textures,e.customUniforms)}),function(e,r,t){a.postMessage({topic:e,data:r},t||[])}("init",{});else if("start"===r.topic){var t=function(e){requestAnimationFrame(t);var r=e/1e3;n.R(r)};t(0)}})},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=function(){function e(e,r,t,n){void 0===n&&(n={}),this.canvas=e,this.cU=n,this.header="#version 300 es\n#ifdef GL_ES\nprecision highp float;\nprecision highp int;\nprecision mediump sampler3D;\n#endif\n",this.targets=new Map,this.programs=new Map,this.textureCache=new Map,this.gl=e.getContext("webgl2",{preserveDrawingBuffer:!0});var i,a=this.gl,o=0;for(var f in a)"function"==typeof a[f]&&(a[i=(i=(255&o++).toString(16)).match(/^[0-9].*$/)?"x"+i:i]=a[f]);if(a.viewport(0,0,e.width,e.height),this.buffer=a.createBuffer(),this.surfaceBuffer=a.createBuffer(),this.mainProgram=a.createProgram(),this.cS(this.mainProgram,35633,this.header+r),this.cS(this.mainProgram,35632,this.header+t),a.linkProgram(this.mainProgram),this.gl.validateProgram(this.mainProgram),!a.getProgramParameter(this.mainProgram,a.LINK_STATUS))throw"Could not compile WebGL program. \n\n"+a.getProgramInfoLog(this.mainProgram);a.useProgram(this.mainProgram),this.screenVertexPosition=a.getAttribLocation(this.mainProgram,"pos"),a.enableVertexAttribArray(this.screenVertexPosition),a.bindBuffer(34962,this.buffer),a.bufferData(34962,new Float32Array([-1,-1,1,-1,-1,1,1,-1,1,1,-1,1]),35044)}return e.prototype.cS=function(e,r,t){var n=this.gl,i=n.createShader(r);if(n.shaderSource(i,t),n.compileShader(i),n.attachShader(e,i),!this.gl.getShaderParameter(i,35713))throw this.gl.getShaderInfoLog(i).trim().split("\n").forEach(function(e){return console.error("[shader] "+e)}),new Error("Error while compiling vertex/fragment"+t)},e.prototype.aP=function(e){var r=this.gl.createProgram();return this.programs.set(e,r),r},e.prototype.t=function(e,r){var t=this.gl,n=t.createTexture();if(t.activeTexture(r),t.bindTexture(3553,n),e instanceof Image){e.width,e.height;t.texImage2D(3553,0,6408,6408,5121,e)}else t.texImage2D(t.TEXTURE_2D,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,e);return t.generateMipmap(3553),n},e.prototype.aA=function(e,r){var t=this,n=function(e,r,n,i){t.textureCache.set(e,{num:r,src:n,fn:i})};return Promise.all(Object.keys(e).map(function(r){return function(e,r){return new Promise(function(i,a){if(r.src){var o=new Image;o.onload=function(a){var f=r.num;n(e,f,t.t(o,f),null),i(e)},o.src=r.src}else{var f=r.num;n(e,f,t.t(new Uint8Array(1024),f),r.fn),i(e)}})}(r,e[r])})).then(function(e){r()}).catch(function(e){console.log(e)}),this},e.prototype.aB=function(e,r,t,n,i){var a=this,o=this.gl,f=this.cT(this.canvas.width,this.canvas.height,n||[],i||{});this.targets.set(e,f);var u=this.aP(e);if(this.cS(u,35633,this.header+r),this.cS(u,35632,this.header+t),o.linkProgram(u),o.validateProgram(u),!o.getProgramParameter(u,o.LINK_STATUS))throw"Could not compile WebGL program. \n\n"+o.getProgramInfoLog(u);o.useProgram(u),n&&n.forEach(function(e){o.bindTexture(3553,a.textureCache.get(e).src)}),this.vertexPosition=o.getAttribLocation(u,"pos"),o.enableVertexAttribArray(this.vertexPosition);for(var s=o.getProgramParameter(u,o.ACTIVE_UNIFORMS),c=0;c<s;++c){var m=o.getActiveUniform(u,c);f.locations.set(m.name,o.getUniformLocation(u,m.name))}return this},e.prototype.R=function(e){var r=this,t=this.gl,n=this.mainProgram,i=0;this.programs.forEach(function(n,a){t.useProgram(n);var o=r.targets.get(a);t.uniform2f(o.locations.get("resolution"),r.canvas.width,r.canvas.height),t.uniform1f(o.locations.get("time"),e);var f=o.uniforms;f&&Object.keys(f).forEach(function(r){f[r](o.locations.get(r),t,n,e)}),o.textures.forEach(function(e,a){var o=r.textureCache.get(e);o.fn&&o.fn(t,o.src);var f=t.getUniformLocation(n,e);t.uniform1i(f,a),t.activeTexture(o.num),t.bindTexture(t.TEXTURE_2D,o.src),i++}),t.bindBuffer(34962,r.surfaceBuffer),t.vertexAttribPointer(0,2,5126,!1,0,0),t.bindBuffer(34962,r.buffer),t.vertexAttribPointer(0,2,5126,!1,0,0),t.bindFramebuffer(36160,o.framebuffer),t.clear(16640),t.drawArrays(4,0,6)}),t.useProgram(n),t.uniform2f(t.getUniformLocation(n,"resolution"),this.canvas.width,this.canvas.height),t.uniform1f(t.getUniformLocation(n,"time"),e),Object.keys(this.cU).forEach(function(i){r.cU[i](t.getUniformLocation(n,i),t,n,e)}),t.bindBuffer(34962,this.buffer),t.vertexAttribPointer(0,2,5126,!1,0,0),this.targets.forEach(function(e,r){t.uniform1i(t.getUniformLocation(n,r),i),t.activeTexture(33984+i),t.bindTexture(3553,e.texture),i++}),t.bindFramebuffer(36160,null),t.clear(16640),t.drawArrays(4,0,6)},e.prototype.cT=function(e,r,t,n){var i=this.gl,a={framebuffer:i.createFramebuffer(),renderbuffer:i.createRenderbuffer(),texture:i.createTexture(),textures:t,uniforms:n,locations:new Map};return i.bindTexture(3553,a.texture),i.texImage2D(3553,0,6408,e,r,0,6408,5121,null),i.texParameteri(3553,10242,33071),i.texParameteri(3553,10243,33071),i.texParameteri(3553,10240,9728),i.texParameteri(3553,10241,9728),i.bindFramebuffer(36160,a.framebuffer),i.framebufferTexture2D(36160,36064,3553,a.texture,0),i.bindRenderbuffer(36161,a.renderbuffer),i.renderbufferStorage(36161,33189,e,r),i.framebufferRenderbuffer(36160,36096,36161,a.renderbuffer),i.bindTexture(3553,null),i.bindRenderbuffer(36161,null),i.bindFramebuffer(36160,null),a},e.prototype.run=function(e,r){var t=this,n=performance.now(),i=1e3/r,a=0,o=function(e){requestAnimationFrame(o),(a=e-n)>i&&(n=e-a%i,t.R(n/1e3))};return o(0|e),this},e}();r.DR=n}]);