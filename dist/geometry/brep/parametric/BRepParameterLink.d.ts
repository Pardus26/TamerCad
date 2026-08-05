import { BRepParameter } from "./BRepParameter";
export interface ParameterLinkOptions {
    parameter: BRepParameter;
    target: any;
    property: string;
}
export declare class BRepParameterLink {
    readonly parameter: BRepParameter;
    readonly target: any;
    readonly property: string;
    enabled: boolean;
    constructor(options: ParameterLinkOptions);
    synchronize(): void;
    write(): void;
    read(): void;
    validate(): boolean;
    detach(): void;
    attach(): void;
    info(): {
        parameter: string;
        property: string;
        enabled: boolean;
    };
}
