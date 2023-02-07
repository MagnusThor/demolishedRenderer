export declare class FilterCoefficients {
    readonly a: number[];
    readonly b: number[];
    order: number;
    linearGain0thOrder(linearGain: number): void;
    lowPass1stOrderButterworth(cornerRadiansPerSample: number): void;
    lowPass1stOrderSimplified(cornerRadiansPerSample: number): void;
    highPass1stOrderButterworth(cornerRadiansPerSample: number): void;
    highShelf1stOrder(cornerRadiansPerSample: number, shelfLinearGain: number): void;
    allPass1stOrderInvertPhaseAbove(cornerRadiansPerSample: number): void;
    allPass1stOrderFractionalDelay(delay: number): void;
    lowPass2ndOrderButterworth(cornerRadiansPerSample: number, peakLinearGain: number): void;
    lowPass2ndOrderSimplified(cornerRadiansPerSample: number, peakLinearGain: number): void;
    highPass2ndOrderButterworth(cornerRadiansPerSample: number, peakLinearGain: number): void;
    highShelf2ndOrder(cornerRadiansPerSample: number, shelfLinearGain: number, slope: number): void;
    peak2ndOrder(cornerRadiansPerSample: number, peakLinearGain: number, bandWidthScale: number): void;
}
export declare class FrequencyResponse {
    real: number;
    imag: number;
    denom: number;
    analyze(filter: FilterCoefficients, radiansPerSample: number): void;
    analyzeComplex(filter: FilterCoefficients, real: number, imag: number): void;
    magnitude(): number;
    angle(): number;
}
export declare class DynamicBiquadFilter {
    a1: number;
    a2: number;
    b0: number;
    b1: number;
    b2: number;
    a1Delta: number;
    a2Delta: number;
    b0Delta: number;
    b1Delta: number;
    b2Delta: number;
    output1: number;
    output2: number;
    useMultiplicativeInputCoefficients: boolean;
    resetOutput(): void;
    loadCoefficientsWithGradient(start: FilterCoefficients, end: FilterCoefficients, deltaRate: number, useMultiplicativeInputCoefficients: boolean): void;
}
export declare function warpNyquistToInfinity(radians: number): number;
export declare function warpInfinityToNyquist(radians: number): number;
//# sourceMappingURL=filtering.d.ts.map