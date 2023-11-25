import { DR } from "./DR";
import { ShaderError } from "./controlls/DRSourceEditor";
export class DRExt extends DR {
        constructor(public canvas: HTMLCanvasElement, v: string, f: string, public cU: any = {}) {
                super(canvas, v, f, cU);
        }
        getUniforms() {
                return Array.from(this.fT.activeUniforms.values());
        }
        getUniform(location: WebGLUniformLocation) {
                return this.gl.getUniform(this.currentProgram, location);
        }
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

        commpileShader(type: number, source: string, name: string): Promise<WebGLShader> {
                return new Promise<WebGLShader>((resolve, reject) => {

                        let errors = new Array<ShaderError>();
                        let gl = this.gl;
                        let shader = gl.createShader(this.gl.FRAGMENT_SHADER)
                        gl.shaderSource(shader, source);
                        gl.compileShader(shader);
                        if (!gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
                                reject(this.toShaderErrors(gl.getShaderInfoLog(shader)));
                        } else resolve(shader);
                });
        }
        updateShaderProgram(key: string, fragmentSource: string): Promise<WebGLShader> {                           
                return this.commpileShader(this.gl.FRAGMENT_SHADER, this. header + fragmentSource, key);                        
        }
}
