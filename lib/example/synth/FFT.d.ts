interface NumberArray {
    length: number;
    [index: number]: number;
}
export declare function scaleElementsByFactor(array: NumberArray, factor: number): void;
export declare function discreteFourierTransform(realArray: NumberArray, imagArray: NumberArray): number[][];
export declare function fastFourierTransform(realArray: NumberArray, imagArray: NumberArray): void;
export declare function forwardRealFourierTransform(array: NumberArray): void;
export declare function inverseRealFourierTransform(array: NumberArray, fullArrayLength: number): void;
export {};
//# sourceMappingURL=FFT.d.ts.map