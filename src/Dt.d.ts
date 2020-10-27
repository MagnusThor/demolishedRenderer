export declare class Dt {
    framebuffer: WebGLFramebuffer;
    renderbuffer: WebGLRenderbuffer;
    texture: WebGLTexture;
    textures: Array<string>;
    uniforms: any;
    locations: Map<string, WebGLUniformLocation>;
    constructor(gl: WebGLRenderingContext, textures: string[], customUniforms: any);
}
