"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUFFER_A_VERTEX = void 0;
exports.BUFFER_A_VERTEX = "layout(location = 0) in vec2 pos; \nout vec4 fragColor;\nvoid main(){\n    gl_Position = vec4(pos.xy,0.0,1.0);\n}";
