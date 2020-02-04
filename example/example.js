"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DR_1 = require("../src/DR");
var Example = (function () {
    function Example() {
    }
    Example.run = function () {
        var player;
        var vertex = "layout(location = 0) in vec2 pos; \n        out vec4 fragColor;\n        void main() { \n            gl_Position = vec4(pos.xy,0.0,1.0);\n        }";
        var fragment = "uniform float time;\n        uniform vec2 resolution;\n                        \n        uniform float sT;\n        uniform int sC; // use for controlling , cb - controllBits(n)\n        uniform int sI;\n        uniform float sP;\n        \n        uniform sampler2D iChannel0;\n        uniform sampler2D iChannel1;\n        uniform sampler2D iChannel2;\n        \n        out vec4 fragColor;    \n        \n        void main(){\n        \n            vec2 uv = (-resolution.xy + 2. * gl_FragCoord.xy) / resolution.y;\n        \n            vec4 a = texture(iChannel0,uv);\n            vec4 b = texture(iChannel1,uv);\n            vec4 c = texture(iChannel2,uv);\n            \n            vec4 d = mix(b,a,0.5);\n        \n            fragColor = d ; //texture(iChannel2,uv);\n        \n        }";
        var mainVertex = "layout(location = 0) in vec2 pos; \n        out vec4 fragColor;                \n        void main() { \n            gl_Position = vec4(pos.xy,0.0,1.0);\n        }";
        var mainFragment = "uniform vec2 resolution;\n                uniform sampler2D A;\n               // uniform sampler2D B;                \n                out vec4 fragColor;\n                void main(){\n                    vec2 uv = gl_FragCoord.xy/resolution.xy;\n                    \n                    fragColor = texture(A, uv);\n                }";
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
        }, function () {
            player.aB("A", vertex, fragment, ["iChannel0", "iChannel1", "iChannel2"]).run(0, customUniforms);
        });
    };
    return Example;
}());
exports.Example = Example;
setTimeout(function () {
    Example.run();
}, 3000);
