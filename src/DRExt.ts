import { DR } from "./DR";

export class DRExt extends DR {
        constructor(public canvas: HTMLCanvasElement, v: string, f: string, public cU: any = {}) {
                super(canvas, v, f, cU);
        }
        getUniforms(){
                return Array.from(this.fT.activeUniforms.values());
        }
        getUniform(location:WebGLUniformLocation){
                return this.gl.getUniform(this.currentProgram,location);
        }
}
