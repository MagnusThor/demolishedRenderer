"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAINFRAG = void 0;
exports.MAINFRAG = "uniform vec2 resolution;\nuniform sampler2D bufferA;\nout vec4 fragColor;\nvoid mainImage(out vec4 fragColor,in vec2 fragCoord)\n{\n    vec2 q=fragCoord/resolution.xy;\n    vec3 col=texture(bufferA,q).xyz;\n    fragColor=vec4(col,1.);\n}\nvoid main(void){\n    mainImage(fragColor,gl_FragCoord.xy);\n}";
