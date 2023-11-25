import { DR } from "./DR";
export declare class DRExt extends DR {
    canvas: HTMLCanvasElement;
    cU: any;
    constructor(canvas: HTMLCanvasElement, v: string, f: string, cU?: any);
    getUniforms(): import("./IUni").IUni[];
    getUniform(location: WebGLUniformLocation): any;
    private toShaderErrors;
    commpileShader(type: number, source: string, name: string): Promise<WebGLShader>;
    updateShaderProgram(key: string, fragmentSource: string): Promise<WebGLShader>;
}
//# sourceMappingURL=DRExt.d.ts.map