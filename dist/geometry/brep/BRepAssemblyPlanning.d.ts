export type AssemblyOperation = "INSERT" | "SCREW" | "WELD" | "SNAP" | "PRESS";
export interface AssemblyComponent {
    id: string;
    name: string;
    mass: number;
    assembled: boolean;
}
export interface AssemblyConstraint {
    componentA: string;
    componentB: string;
    type: "FIX" | "ALIGN" | "CONTACT";
}
export interface AssemblyStep {
    order: number;
    operation: AssemblyOperation;
    component: string;
    duration: number;
}
export interface AssemblyResult {
    success: boolean;
    steps: number;
    collisions: number;
    assemblyTime: number;
}
export declare class BRepAssemblyPlanning {
    components: AssemblyComponent[];
    constraints: AssemblyConstraint[];
    steps: AssemblyStep[];
    collisions: number;
    constructor();
    /**
     * Component ekleme
     */
    addComponent(component: AssemblyComponent): void;
    /**
     * Constraint ekleme
     */
    addConstraint(constraint: AssemblyConstraint): void;
    /**
     * Montaj planı oluşturma
     */
    generatePlan(): AssemblyResult;
    /**
     * Çarpışma kontrolü
     */
    checkCollisions(): number;
    /**
     * Hizalama kontrolü
     */
    solveConstraints(): boolean;
    /**
     * Vida planlama
     */
    planFasteners(): {
        screws: never[];
        bolts: never[];
        washers: never[];
    };
    /**
     * Kaynak planlama
     */
    planWelding(): {
        weldPaths: never[];
        length: number;
    };
    /**
     * Servis erişimi
     */
    analyzeServiceability(): {
        removableParts: number;
        accessible: boolean;
    };
    /**
     * Montaj süresi
     */
    calculateAssemblyTime(): number;
    /**
     * Montaj optimizasyonu
     */
    optimizeSequence(): void;
    /**
     * Assembly simulation
     */
    simulate(): {
        running: boolean;
        steps: number;
    };
    /**
     * Report
     */
    report(): {
        components: number;
        constraints: number;
        steps: number;
        collisions: number;
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
        components: number;
        status: string;
    };
}
