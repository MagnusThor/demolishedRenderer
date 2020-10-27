export interface ITx {
    unit: number;
    src?: any;
    fn?(currentProgram: WebGLProgram, src: any): Function;
    w?: number;
    h?: number;
}
