import { BRepSolid } from "./BRepSolid";
import { MaterialDefinition } from "./BRepMaterial";
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}
export interface FEMNode {
    id: number;
    position: Vector3;
    displacement: Vector3;
}
export interface FEMElement {
    id: number;
    nodes: number[];
    material: MaterialDefinition;
}
export interface BoundaryCondition {
    node: number;
    fixed: boolean;
    value: Vector3;
}
export interface FEALoad {
    node: number;
    force: Vector3;
}
export interface FEAResult {
    success: boolean;
    nodes: number;
    elements: number;
    maxDisplacement: number;
}
export declare class BRepFEA {
    solid: BRepSolid | null;
    material: MaterialDefinition | null;
    nodes: FEMNode[];
    elements: FEMElement[];
    boundaries: BoundaryCondition[];
    loads: FEALoad[];
    stiffness: number[][];
    constructor();
    /**
     * Model yükleme
     */
    load(solid: BRepSolid, material: MaterialDefinition): void;
    /**
     * FEM mesh oluşturma
     */
    generateMesh(density: number): void;
    /**
     * Node ekleme
     */
    addNode(node: FEMNode): void;
    /**
     * Element ekleme
     */
    addElement(element: FEMElement): void;
    /**
     * Boundary condition
     */
    addBoundary(condition: BoundaryCondition): void;
    /**
     * Kuvvet yükleme
     */
    addLoad(load: FEALoad): void;
    /**
     * Stiffness matrix oluşturma
     */
    assembleStiffness(): void;
    /**
     * Linear solver
     */
    solveLinearSystem(): {
        solved: boolean;
    };
    /**
     * Ana FEA çözümü
     */
    solve(): FEAResult;
    /**
     * Displacement hesabı
     */
    maximumDisplacement(): number;
    /**
     * Stress recovery
     */
    calculateStress(): void;
    /**
     * Güvenlik raporu
     */
    report(): {
        nodes: number;
        elements: number;
        status: string;
    };
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        nodes: number;
        elements: number;
        status: string;
    };
}
