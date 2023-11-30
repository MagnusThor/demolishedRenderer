import { DR } from "./DR";
/**
 *
 *
 * @export
 * @class DRExt
 * @extends {DR}
 */
export declare class DRExt extends DR {
    canvas: HTMLCanvasElement;
    cU: any;
    constructor(canvas: HTMLCanvasElement, v: string, f: string, cU?: any);
    /**
     *
     *
     * @return {*}
     * @memberof DRExt
     */
    getUniforms(): import("./IUni").IUni[];
    /**
     *
     *
     * @param {WebGLUniformLocation} location
     * @return {*}
     * @memberof DRExt
     */
    getUniform(location: WebGLUniformLocation): any;
    /**
     *
     *
     * @private
     * @param {string} error
     * @return {*}  {Array<ShaderError>}
     * @memberof DRExt
     */
    private toShaderErrors;
    /**
     *
     *
     * @param {number} type
     * @param {string} source
     * @param {string} name
     * @return {*}  {Promise<string>}
     * @memberof DRExt
     */
    commpileShader(type: number, source: string, name: string): Promise<string>;
    /**
     *
     *
     * @param {string} key
     * @param {string} fragmentSource
     * @return {*}  {Promise<string>}
     * @memberof DRExt
     */
    updateShaderProgram(key: string, fragmentSource: string): Promise<string>;
}
//# sourceMappingURL=DRExt.d.ts.map