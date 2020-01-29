export declare class CH {
    a: RT;
    b: RT;
    textures: any;
    c: RT;
    constructor(a: RT, b: RT, textures: any);
    swap(): void;
}
export declare class RT {
    framebuffer: WebGLFramebuffer;
    renderBuffer: WebGLRenderbuffer;
    texture: WebGLTexture;
    constructor(gl: WebGLRenderingContext, width: number, height: number);
}
export declare class DR {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    mainProgram: WebGLProgram;
    channels: Map<string, CH>;
    programs: Map<string, WebGLProgram>;
    surfaceBuffer: WebGLBuffer;
    buffer: WebGLBuffer;
    vertexPosition: number;
    screenVertexPosition: number;
    header: string;
    textureCache: Map<string, any>;
    cS(program: WebGLProgram, type: number, source: string): void;
    aP(name: string): WebGLProgram;
    t(image: any): WebGLTexture;
    aA(textures: any, cb: () => void): this;
    aB(name: string, vertex: string, fragment: string, textures?: Array<string>): this;
    R(time: number, customUniforms?: any): void;
    cC(width: number, height: number, textures: Array<string>): CH;
    run(t: number, customUniforms: any | {}): this;
    constructor(canvas: HTMLCanvasElement, v: string, f: string);
}
