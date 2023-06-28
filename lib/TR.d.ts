export interface IE2D {
    key: string;
    animate: (timeStamp: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, props?: any) => void;
    props: any;
}
export declare class Geometry {
}
export declare class Vector2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
export declare class Vector3 extends Vector2 {
    z: number;
    constructor(x: number, y: number, z: number);
    rotateX(a: number): Vector3;
    rotateY(a: number): Vector3;
    rotateZ(a: number): Vector3;
    scale(n: number): void;
    clone(): Vector3;
    length(): number;
    normalize(): Vector3;
    dot(vectorB: Vector3): number;
    angle(b: Vector3): number;
    cross(vectorB: Vector3): void;
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
    assets: Map<string, Blob>;
    constructor(w: number, h: number, ww?: number, vh?: number);
    AA(key: string, blob: Blob): TR;
    data(): any;
    G(key: string): IE2D;
    D(key: string): void;
    A(e: IE2D): void;
    R(t: number, pre?: string): TR;
}
//# sourceMappingURL=TR.d.ts.map