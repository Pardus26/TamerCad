export type BRepParameterType = "number" | "integer" | "boolean" | "string" | "angle" | "length" | "area" | "volume" | "mass" | "time" | "custom";
export interface BRepParameterOptions {
    id: string;
    name: string;
    type: BRepParameterType;
    value: any;
    unit?: string;
    min?: number;
    max?: number;
    readOnly?: boolean;
}
export interface SerializedParameter {
    id: string;
    name: string;
    type: BRepParameterType;
    value: any;
    unit?: string;
}
export declare class BRepParameter {
    readonly id: string;
    name: string;
    readonly type: BRepParameterType;
    unit?: string;
    private _value;
    min?: number;
    max?: number;
    readOnly: boolean;
    dirty: boolean;
    version: number;
    constructor(options: BRepParameterOptions);
    get value(): any;
    set value(v: any);
    setValue(v: any): void;
    validate(v: any): void;
    clearDirty(): void;
    clone(): BRepParameter;
    serialize(): SerializedParameter;
    static deserialize(data: SerializedParameter): BRepParameter;
    info(): {
        id: string;
        name: string;
        type: BRepParameterType;
        value: any;
        dirty: boolean;
        version: number;
    };
}
