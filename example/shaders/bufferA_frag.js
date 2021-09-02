"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUFFER_A_FRAG = void 0;
exports.BUFFER_A_FRAG = "uniform float time;\nuniform vec2 mouse;\nuniform vec2 resolution;\n\nuniform sampler2D iChannel0;\nuniform sampler2D iChannel1;\nuniform sampler2D iChannel2;\nuniform sampler2D iChannel3;\nuniform sampler2D iChannel4;\n\nout vec4 fragColor;\n\n\nvoid main(){\n    \n  vec2 uv=(-resolution.xy+2.*gl_FragCoord.xy)/resolution.y;\n  vec4 t = texture(iChannel1,uv);\n  fragColor = t; // vec4(vec3(1.,0.,0.1),1.);\n    \n}\n\n";
