export declare class Vector {
    private readonly values;
    readonly size: number;
    constructor(values: number[]);
    static zeros(size: number): Vector;
    get(index: number): number;
    set(index: number, value: number): void;
    clone(): Vector;
    add(other: Vector): Vector;
    subtract(other: Vector): Vector;
    scale(value: number): Vector;
    dot(other: Vector): number;
    norm(): number;
    normalize(): Vector;
    max(): number;
    min(): number;
    toArray(): number[];
    serialize(): {
        size: number;
        values: number[];
    };
    private assertSameSize;
    info(): {
        size: number;
    };
}
