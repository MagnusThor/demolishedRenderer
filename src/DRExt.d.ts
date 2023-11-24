import { DR } from "./DR";
export declare class DRExt extends DR {
    canvas: HTMLCanvasElement;
    cU: any;
    constructor(canvas: HTMLCanvasElement, v: string, f: string, cU?: any);
    getUniforms(): import("./IUni").IUni[];
    getUniform(location: WebGLUniformLocation): any;
}
//# sourceMappingURL=DRExt.d.ts.map