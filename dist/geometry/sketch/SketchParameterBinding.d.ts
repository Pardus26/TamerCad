import { BRepParameter } from "../brep/parametric/BRepParameter";
export type BindingDirection = "parameter-to-sketch" | "sketch-to-parameter" | "bidirectional";
export interface SketchParameterBindingOptions {
    parameter: BRepParameter;
    target: object;
    property: string;
    direction?: BindingDirection;
}
export declare class SketchParameterBinding {
    readonly parameter: BRepParameter;
    readonly target: object;
    readonly property: string;
    readonly direction: BindingDirection;
    enabled: boolean;
    constructor(options: SketchParameterBindingOptions);
    syncParameterToSketch(): void;
    syncSketchToParameter(): void;
    synchronize(): void;
    validate(): boolean;
    enable(): void;
    disable(): void;
    info(): {
        engine: string;
        parameter: string;
        property: string;
        direction: BindingDirection;
        enabled: boolean;
    };
}
