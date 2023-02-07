export declare class Deque<T> {
    private _capacity;
    private _buffer;
    private _mask;
    private _offset;
    private _count;
    pushFront(element: T): void;
    pushBack(element: T): void;
    popFront(): T;
    popBack(): T;
    peakFront(): T;
    peakBack(): T;
    count(): number;
    set(index: number, element: T): void;
    get(index: number): T;
    remove(index: number): void;
    private _expandCapacity;
}
//# sourceMappingURL=Deque.d.ts.map