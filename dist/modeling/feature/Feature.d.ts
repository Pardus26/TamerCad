import { Solid } from "../../topology/core/Solid";
export declare enum FeatureType {
    Primitive = "Primitive",
    Operation = "Operation",
    Modification = "Modification",
    Construction = "Construction"
}
export interface FeatureParameter {
    name: string;
    value: any;
}
export interface FeatureState {
    dirty: boolean;
    visible: boolean;
}
export declare abstract class Feature {
    id: string;
    name: string;
    type: FeatureType;
    parameters: FeatureParameter[];
    children: Feature[];
    parents: Feature[];
    protected result: Solid | null;
    protected state: FeatureState;
    constructor(id: string, name: string, type: FeatureType, parameters?: FeatureParameter[]);
    abstract rebuild(): Solid;
    evaluate(): Solid;
    getResult(): Solid;
    setParameter(name: string, value: any): void;
    getParameter(name: string): any;
    addChild(feature: Feature): void;
    removeChild(feature: Feature): void;
    invalidate(): void;
    setVisible(value: boolean): void;
    isVisible(): boolean;
    isDirty(): boolean;
    getParents(): Feature[];
    getChildren(): Feature[];
}
