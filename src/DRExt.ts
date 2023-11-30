import { DR } from "./DR";
import { ShaderError } from "./controlls/DRSourceEditor";
/**
 *
 *
 * @export
 * @class DRExt
 * @extends {DR}
 */
export class DRExt extends DR {
        constructor(public canvas: HTMLCanvasElement, v: string, f: string, public cU: any = {}) {
                super(canvas, v, f, cU);
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
        getUniform(location: WebGLUniformLocation) {
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
        private toShaderErrors(error: string): Array<ShaderError> {
                let index = 0;
                let indexEnd: number = 0;
                let lineNum: number = 0;
                let errorLines = new Array<ShaderError>();
                while (index >= 0) {
                    index = error.indexOf("ERROR: 0:", index);
                    if (index < 0) { break; }
                    index += 9;
                    indexEnd = error.indexOf(':', index);
                    if (indexEnd > index) {
                        lineNum = parseInt(error.substring(index, indexEnd));
                        lineNum -= this.header.split(`\n`).length -1;
                        if ((!isNaN(lineNum)) && (lineNum > 0)) {
                            index = indexEnd + 1;
                            indexEnd = error.indexOf("ERROR: 0:", index);
                            let lineError = (indexEnd > index) ? error.substring(index, indexEnd) : error.substring(index);
                            errorLines.push(new ShaderError(lineNum, lineError));
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
        commpileShader(type: number, source: string, name: string): Promise<string> {
                return new Promise<string>((resolve, reject) => {
                        let gl = this.gl;
                        let shader = gl.createShader(this.gl.FRAGMENT_SHADER)
                        gl.shaderSource(shader, this. header + source);
                        gl.compileShader(shader);
                        if (!gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
                                reject(this.toShaderErrors(gl.getShaderInfoLog(shader)));
                        } else resolve(source);
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
        updateShaderProgram(key: string, fragmentSource: string): Promise<string> {                           
                return this.commpileShader(this.gl.FRAGMENT_SHADER, fragmentSource, key);                        
        }
}
