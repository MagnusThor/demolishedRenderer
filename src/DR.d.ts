export interface ITx {
    src?: any;
    fn?(prg: WebGLProgram, gl: WebGLRenderingContext, src: any): Function;
    w?: number;
    h?: number;
}
export declare class Dt {
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
    programs: Map<string, {
        program: WebGLProgram;
        state: boolean;
    }>;
    surfaceBuffer: WebGLBuffer;
    textureCache: Map<string, ITx>;
    targets: Map<string, Dt>;
    mainUniforms: Map<string, WebGLUniformLocation>;
    buffer: WebGLBuffer;
    vertexPosition: number;
    screenVertexPosition: number;
    frameCount: number;
    deltaTime: number;
    header: string;
    cS(program: WebGLProgram, type: number, source: string): void;
    aP(name: string): WebGLProgram;
    t(data: HTMLImageElement | Uint8Array, d: number): WebGLTexture;
    tC(sources: Array<any>, d: number): WebGLTexture;
    aA(assets: any, cb: (r?: any) => void): this;
    aB(name: string, vertex: string, fragment: string, textures?: Array<string>, customUniforms?: any): DR;
    sP(key: string, state: boolean): void;
    R(time: number): void;
    cT(width: number, height: number, textures: Array<string>, customUniforms: any): Dt;
    run(t: number, fps: number): this;
    constructor(canvas: HTMLCanvasElement, v: string, f: string, cU?: any);
    static gT(mainVertex: string, mainFrag: string, textureVertex: string, textureFrag: any, w: number, h: number): HTMLCanvasElement;
}
