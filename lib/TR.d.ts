export interface I2D {
    key: string;
    ctx: CanvasRenderingContext2D;
    fn: (timeStamp: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;
}
export declare class TR {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    layers: Map<string, I2D>;
    properties: Array<number>;
    constructor(w: number, h: number);
    data(): any;
    D(key: string): void;
    A(key: string, fn: (timeStamp: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void): void;
    R(t: number, pre?: string): TR;
}
//# sourceMappingURL=TR.d.ts.map