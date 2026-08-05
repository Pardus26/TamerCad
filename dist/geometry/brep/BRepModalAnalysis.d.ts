export interface Matrix {
    rows: number;
    cols: number;
    values: number[][];
}
export interface ModeShape {
    id: number;
    eigenvalue: number;
    frequency: number;
    displacement: number[];
}
export interface ModalResult {
    success: boolean;
    modes: number;
    frequencies: number[];
}
export interface Damping {
    coefficient: number;
}
export declare class BRepModalAnalysis {
    stiffness: Matrix | null;
    mass: Matrix | null;
    modes: ModeShape[];
    damping: Damping;
    constructor();
    /**
     * FEM matrix yükleme
     */
    loadMatrices(stiffness: Matrix, mass: Matrix): void;
    /**
     * Ana modal çözüm
     */
    solve(modeCount: number): ModalResult;
    /**
     * Eigen mode çözümü
     */
    calculateEigenModes(count: number): void;
    /**
     * Doğal frekanslar
     */
    naturalFrequencies(): number[];
    /**
     * Mode shape alma
     */
    getModeShape(id: number): ModeShape | undefined;
    /**
     * Rezonans kontrolü
     */
    checkResonance(excitationFrequency: number): boolean;
    /**
     * Harmonic response hazırlığı
     */
    harmonicResponse(frequency: number, force: number): {
        frequency: number;
        amplitude: number;
    };
    /**
     * Damping etkisi
     */
    applyDamping(amplitude: number): number;
    /**
     * Eigenvalue solver
     */
    eigenSolve(): {
        values: number[];
    };
    /**
     * Dynamic response
     */
    dynamicResponse(time: number): number[];
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        modes: number;
        status: string;
    };
}
