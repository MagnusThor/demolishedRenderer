"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DRExt = void 0;
const DR_1 = require("./DR");
const DRSourceEditor_1 = require("./controlls/DRSourceEditor");
/**
 *
 *
 * @export
 * @class DRExt
 * @extends {DR}
 */
class DRExt extends DR_1.DR {
    constructor(canvas, v, f, cU = {}) {
        super(canvas, v, f, cU);
        this.canvas = canvas;
        this.cU = cU;
    }
    /**
     *
     *
     * @return {*}
     * @memberof DRExt
     */
    getUniforms() {
        return Array.from(this.fT.activeUniforms.values());
    }
    /**
     *
     *
     * @param {WebGLUniformLocation} location
     * @return {*}
     * @memberof DRExt
     */
    getUniform(location) {
        return this.gl.getUniform(this.currentProgram, location);
    }
    /**
     *
     *
     * @private
     * @param {string} error
     * @return {*}  {Array<ShaderError>}
     * @memberof DRExt
     */
    toShaderErrors(error) {
        let index = 0;
        let indexEnd = 0;
        let lineNum = 0;
        let errorLines = new Array();
        while (index >= 0) {
            index = error.indexOf("ERROR: 0:", index);
            if (index < 0) {
                break;
            }
            index += 9;
            indexEnd = error.indexOf(':', index);
            if (indexEnd > index) {
                lineNum = parseInt(error.substring(index, indexEnd));
                lineNum -= this.header.split(`\n`).length - 1;
                if ((!isNaN(lineNum)) && (lineNum > 0)) {
                    index = indexEnd + 1;
                    indexEnd = error.indexOf("ERROR: 0:", index);
                    let lineError = (indexEnd > index) ? error.substring(index, indexEnd) : error.substring(index);
                    errorLines.push(new DRSourceEditor_1.ShaderError(lineNum, lineError));
                }
            }
        }
        return errorLines;
    }
    /**
     *
     *
     * @param {number} type
     * @param {string} source
     * @param {string} name
     * @return {*}  {Promise<string>}
     * @memberof DRExt
     */
    commpileShader(type, source, name) {
        return new Promise((resolve, reject) => {
            let gl = this.gl;
            let shader = gl.createShader(this.gl.FRAGMENT_SHADER);
            gl.shaderSource(shader, this.header + source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
                reject(this.toShaderErrors(gl.getShaderInfoLog(shader)));
            }
            else
                resolve(source);
        });
    }
    /**
     *
     *
     * @param {string} key
     * @param {string} fragmentSource
     * @return {*}  {Promise<string>}
     * @memberof DRExt
     */
    updateShaderProgram(key, fragmentSource) {
        return this.commpileShader(this.gl.FRAGMENT_SHADER, fragmentSource, key);
    }
}
exports.DRExt = DRExt;
