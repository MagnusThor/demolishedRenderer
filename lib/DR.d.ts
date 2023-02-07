export interface ITx {
    src?: any;
    fn?(prg: WebGLProgram, gl: WebGLRenderingContext, src: any): Function;
    w?: number;
    h?: number;
}
export declare class SQ {
    ss: Array<any>;
    L: number;
    si: any;
    end: boolean;
    s: Array<number>;
    sp: number;
    sc: number;
    st: number;
    constructor(ss: Array<any>, L: number);
    b(n: number): number;
    c(n: number): number;
    R(t: number): void;
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
    SQ: SQ;
    /**
     * Create a Shader
     *
     * @param {WebGLProgram} program
     * @param {number} type
     * @param {string} source
     * @memberof DR
     */
    cS(program: WebGLProgram, type: number, source: string): void;
    /**
     * Create and a WebGLProgram
     *
     * @param {string} name
     * @returns {WebGLProgram}
     * @memberof DR
     */
    aP(name: string): WebGLProgram;
    /**
     *  Create a new WEBGLTexture
     *
     * @param {*} data  image or UInt8Array
     * @returns WebGLTexture
     * @memberof DR
     */
    t(data: HTMLImageElement | Uint8Array, d: number): WebGLTexture;
    /**
     * Create a texture cube map
     *
     * @param {Array<any>} sources
     * @param {number} d
     * @returns {WebGLTexture}
     * @memberof DR
     */
    tC(sources: Array<any>, d: number): WebGLTexture;
    /**
     * add assets ( textures )
     *
     * @param {*} assets
     * @param {()=>void} cb
     * @returns {this}
     * @memberof DR
     */
    aA(assets: any, cb: (r?: any) => void): this;
    /**
     * add a new buffer / shader program
     *
     * @param {string} name
     * @param {string} vertex
     * @param {string} fragment
     * @param {Array<string>} [textures]
     * @param {*} [customUniforms]
     * @returns {this}
     * @memberof DR
     */
    aB(name: string, vertex: string, fragment: string, textures?: Array<string>, customUniforms?: any): DR;
    /**
     * Set program state ( enable / or disable)
     *
     * @param {string} key
     * @param {boolean} state
     * @memberof DR
     */
    sP(key: string, state: boolean): void;
    /**
     * Render
     *
     * @param {number} time
     * @memberof DR
     */
    R(time: number): void;
    /**
     * Create render target
     *
     * @param {number} width
     * @param {number} height
     * @param {Array<string>} textures
     * @returns {*}
     * @memberof DR
     */
    cT(width: number, height: number, textures: Array<string>, customUniforms: any): Dt;
    /**
     * Render loop
     *
     * @param {number} t
     * @param {number} fps
     * @returns {this}
     * @memberof DR
     */
    run(t: number, fps: number): this;
    constructor(canvas: HTMLCanvasElement, v: string, f: string, cU?: any, seqence?: {
        data: Array<any>;
        duration: number;
    });
    /**
     *  Generate a texture and return a canvas element
     *
     * @static
     * @param {string} mainVertex
     * @param {string} mainFrag
     * @param {string} textureVertex
     * @param {*} textureFrag
     * @param {number} w
     * @param {number} h
     * @returns {HTMLCanvasElement}
     * @memberof DR
     */
    static gT(mainVertex: string, mainFrag: string, textureVertex: string, textureFrag: any, w: number, h: number): HTMLCanvasElement;
}
//# sourceMappingURL=DR.d.ts.map