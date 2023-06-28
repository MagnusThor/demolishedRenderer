import { DasSequencer } from "../sequencer/DasSequencer";
export declare class DOMUtils {
    static get<T extends HTMLElement>(query: string, parent?: Element): T;
    static getAll(query: string, parent?: Element): Array<Element>;
    static on<T extends HTMLElement>(event: string, element: string | HTMLElement, fn: (event?: any, el?: HTMLElement | any) => void, options?: AddEventListenerOptions): T;
    static removeChilds(parent: any): void;
    static create<T extends HTMLElement>(p: string | T, textContent?: string, attr?: Object): T;
    static prettify(text: string): string;
    static linkify(text: string): string;
    static toDOM(html: string): any;
    static makeDraggable(el: HTMLElement): void;
}
export declare class DRTime {
    parent: HTMLElement;
    seq: DasSequencer;
    onPlaybackChange: (state: boolean) => void;
    onTimelineChange: (value: number) => void;
    isPlaying: boolean;
    currentTime: number;
    renderTime: HTMLInputElement;
    constructor(parent: HTMLElement, seq: DasSequencer);
    updateTimeline(time: number): void;
    render(): void;
}
//# sourceMappingURL=DRTime.d.ts.map