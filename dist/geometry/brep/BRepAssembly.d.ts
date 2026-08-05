import { BRepSolid } from "./BRepSolid";
export declare enum AssemblyJointType {
    FIXED = "fixed",
    REVOLUTE = "revolute",
    SLIDER = "slider",
    CYLINDRICAL = "cylindrical",
    BALL = "ball"
}
export declare enum MateType {
    COINCIDENT = "coincident",
    CONCENTRIC = "concentric",
    DISTANCE = "distance",
    ANGLE = "angle"
}
export interface Transform {
    x: number;
    y: number;
    z: number;
    rx: number;
    ry: number;
    rz: number;
}
export interface AssemblyComponent {
    id: string;
    name: string;
    solid: BRepSolid;
    transform: Transform;
    parent: string | null;
}
export interface MateConstraint {
    id: string;
    type: MateType;
    componentA: string;
    componentB: string;
    value: number;
}
export interface Joint {
    id: string;
    type: AssemblyJointType;
    componentA: string;
    componentB: string;
}
export interface AssemblyResult {
    success: boolean;
    components: number;
    solved: boolean;
    warnings: string[];
}
export declare class BRepAssembly {
    id: string;
    name: string;
    components: AssemblyComponent[];
    mates: MateConstraint[];
    joints: Joint[];
    constructor(id: string, name: string);
    /**
     * Component ekleme
     */
    addComponent(component: AssemblyComponent): void;
    /**
     * Mate constraint ekleme
     */
    addMate(mate: MateConstraint): void;
    /**
     * Joint ekleme
     */
    addJoint(joint: Joint): void;
    /**
     * Assembly çözümü
     */
    solve(): {
        solved: boolean;
        iterations: number;
    };
    /**
     * Component bulma
     */
    findComponent(id: string): AssemblyComponent | null;
    /**
     * Transform güncelleme
     */
    updateTransform(id: string, transform: Transform): void;
    /**
     * Fixed joint
     */
    fixedJoint(a: string, b: string): void;
    /**
     * Revolute joint
     */
    revoluteJoint(a: string, b: string): void;
    /**
     * Montaj ağacı
     */
    hierarchy(): {
        id: string;
        parent: string | null;
    }[];
    /**
     * Component sayısı
     */
    count(): number;
    /**
     * Temizleme
     */
    clear(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        components: number;
        mates: number;
        joints: number;
    };
}
