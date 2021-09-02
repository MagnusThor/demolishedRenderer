"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAINVERTEX = void 0;
exports.MAINVERTEX = "layout(location = 0) in vec2 pos; \nout vec4 fragColor;\nvoid main(){\n    gl_Position = vec4(pos.xy,0.0,1.0);\n}";
