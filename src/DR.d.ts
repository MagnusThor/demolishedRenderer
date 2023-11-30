import { Dt } from "./Dt";
import { ITx } from "./ITx";
import { IBuf } from "./IBuf";
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
    fT: Dt;
    shaders: Map<string, WebGLShader>;
    currentProgram: WebGLProgram;
    /**
     * Create a Shader
     *
     * @param {WebGLProgram} program
     * @param {number} type
     * @param {string} source
     * @memberof DR
     */
    cS(program: WebGLProgram, type: number, source: string, name: string): void;
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
     * add assets ( textures,textures cubes,fft data etc. )
     *
     * @param {*} assets
     * @param {()=>void} cb
     * @returns {this}
     * @memberof DR
     */
    aA(assets: any): Promise<DR>;
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
     * add 1-n buffers (IBuf) to the renderer
     *
     * @param {Array<IBuf>} buffers
     * @return {*}  {Promise<DR>}
     * @memberof DR
     */
    abS(buffers: Array<IBuf>): Promise<DR>;
    /**
     * Set program state ( enable / or disable)
     *
     * @param {string} key
     * @param {boolean} state
     * @memberof DR
     */
    sP(key: string, state: boolean): void;
    /**
     * Render : todo:// this needs to be refactored.
     *
     * @param {number} time
     * @memberof DR
     */
    R(time: number, buffers: string[], onFrame?: (gl: WebGLRenderingContext, uniforms: Map<string, WebGLUniformLocation>) => void): void;
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
    constructor(canvas: HTMLCanvasElement, v: string, f: string, cU?: any);
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