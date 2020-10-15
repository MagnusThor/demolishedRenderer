declare class Dt {
    framebuffer: WebGLFramebuffer;
    renderbuffer: WebGLRenderbuffer;
    texture: WebGLTexture;
    textures: Array<string>;
    uniforms: any;
    locations: Map<string, WebGLUniformLocation>;
    constructor(gl: WebGLRenderingContext, textures: string[], customUniforms: any);
}
export declare class DR {
    canvas: HTMLCanvasElement;
    cU: any;
    gl: WebGLRenderingContext;
    mainProgram: WebGLProgram;
    programs: Map<string, WebGLProgram>;
    surfaceBuffer: WebGLBuffer;
    textureCache: Map<string, {
        num: number;
        src: any;
        fn: Function;
    }>;
    targets: Map<string, Dt>;
    buffer: WebGLBuffer;
    vertexPosition: number;
    screenVertexPosition: number;
    frameCount: number;
    header: string;
    cS(program: WebGLProgram, type: number, source: string): void;
    aP(name: string): WebGLProgram;
    t(data: any, d: number): WebGLTexture;
    aA(assets: any, cb: () => void): this;
    aB(name: string, vertex: string, fragment: string, textures?: Array<string>, customUniforms?: any): this;
    R(time: number): void;
    cT(width: number, height: number, textures: Array<string>, customUniforms: any): Dt;
    run(t: number, fps: number): this;
    constructor(canvas: HTMLCanvasElement, v: string, f: string, cU?: any);
}
export {};
