import { IUni } from "./IUni";
export declare class Dt {
    framebuffer: WebGLFramebuffer;
    renderbuffer: WebGLRenderbuffer;
    texture: WebGLTexture;
    textures: Array<string>;
    customUniforms: any;
    activeUniforms: Map<string, IUni>;
    getUniformLocation(key: string): WebGLUniformLocation;
    constructor(gl: WebGLRenderingContext, textures: string[], customUniforms: any);
}
//# sourceMappingURL=Dt.d.ts.map