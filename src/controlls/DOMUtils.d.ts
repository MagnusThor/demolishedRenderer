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
//# sourceMappingURL=DOMUtils.d.ts.map