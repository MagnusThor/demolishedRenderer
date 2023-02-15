export interface IE2D {
    key: string;
    animate: (timeStamp: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, props?: any) => void;
    props: any;
}
export declare class E2D implements IE2D {
    key: string;
    animate: (timeStamp: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, props?: any) => void;
    ctx: CanvasRenderingContext2D;
    active: boolean;
    props: Map<string, any>;
    constructor(key: string, animate: (timeStamp: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, props?: any) => void);
    G<T>(key: any): T;
    S<T>(key: any, value: T): void;
    extend<T>(sources: any): T;
}
export declare class TR {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    entities: Map<string, IE2D>;
    constructor(w: number, h: number, ww?: number, vh?: number);
    data(): any;
    G(key: string): IE2D;
    D(key: string): void;
    A(e: IE2D): void;
    R(t: number, pre?: string): TR;
}
//# sourceMappingURL=TR.d.ts.map