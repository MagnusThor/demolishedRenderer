"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DR_1 = require("../src/DR");
var demolishedtexture_1 = require("demolishedtexture");
var Example = (function () {
    function Example() {
    }
    Example.run = function () {
        var player;
        var mainVertex = "layout(location = 0) in vec2 pos; \n                out vec4 fragColor;                \n                void main() { \n                    gl_Position = vec4(pos.xy,0.0,1.0);\n                }";
        var mainFragment = "uniform vec2 resolution;\n                        uniform sampler2D A;\n                       // uniform sampler2D B;                \n                        out vec4 fragColor;\n                        void main(){\n                            vec2 uv = gl_FragCoord.xy/resolution.xy;\n                            \n                            fragColor = texture(A, uv);\n                        }";
        var bufferVertex = "layout(location = 0) in vec2 pos; \n        out vec4 fragColor;\n        void main() { \n            gl_Position = vec4(pos.xy,0.0,1.0);\n        }";
        var bufferFragment = "uniform float time;\n        uniform vec2 resolution;\n                        \n        uniform float sT;\n        uniform int sC; // use for controlling , cb - controllBits(n)\n        uniform int sI;\n        uniform float sP;\n        \n        uniform sampler2D iChannel0;\n        uniform sampler2D iChannel1;\n        uniform sampler2D iChannel2;\n        uniform sampler2D iChannel3;\n\n        out vec4 fragColor;    \n        \n        void main(){\n        \n            vec2 uv = (-resolution.xy + 2. * gl_FragCoord.xy) / resolution.y;\n        \n            vec4 a = texture(iChannel0,uv);\n            vec4 b = texture(iChannel1,uv);\n            vec4 c = texture(iChannel2,uv);\n            uv.y =   1.0 - uv.y;\n            vec4 d = texture(iChannel3,uv);\n            \n            vec4 e = mix(a,d,0.2);\n        \n            fragColor = e ; //texture(iChannel2,uv);\n        \n        }";
        var canvas = document.querySelector("#main");
        var customUniforms = {
            "seqTime": function (l, gl, p, t) {
                gl.uniform1f(l, 1);
            },
            "seqCode": function (l, gl, p, t) {
                gl.uniform1i(l, 32784);
            },
            "sProg": function (l, gl, p, t) {
                gl.uniform1f(l, 0.05);
            },
        };
        player = new DR_1.DR(canvas, mainVertex, mainFragment);
        player.aA({
            iChannel0: {
                src: "assets/iChannel0.png"
            },
            iChannel1: {
                src: 'assets/iChannel1.png'
            },
            iChannel2: {
                src: "assets/iChannel2.jpg"
            },
            iChannel3: {
                src: null,
                fn: function (gl, texture) {
                    var t = demolishedtexture_1.CanvasTextureGen.G(512, 512, function (ctx, w, h) {
                        var c = "#ffffff";
                        ctx.fillStyle = c;
                        ctx.strokeStyle = c;
                        ctx.lineWidth = 10;
                        ctx.strokeRect(20, 20, 512 - 40, 512 - 40);
                        ctx.stroke();
                        ctx.font = "120px 'Arial'";
                        ctx.fillText("FRUIT", 80, 160);
                        ctx.fillText("LOOM", 80, 430);
                        ctx.font = "100px 'Arial'";
                        ctx.fillText("OF the", 100, 280);
                        return ctx;
                    });
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, t.ctx.canvas);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                }
            }
        }, function () {
            player.aB("A", bufferVertex, bufferFragment, ["iChannel0", "iChannel1", "iChannel2", "iChannel3"], customUniforms).run(0, 60);
        });
    };
    return Example;
}());
exports.Example = Example;
setTimeout(function () {
    Example.run();
}, 3000);
