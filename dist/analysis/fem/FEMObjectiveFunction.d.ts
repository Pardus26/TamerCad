export interface FEMObjectiveContext {
    displacement: number[];
    stress: number[];
    strain?: number[];
    temperature?: number[];
    mass?: number;
}
export declare abstract class FEMObjectiveFunction {
    protected weight: number;
    evaluate(context: FEMObjectiveContext): number;
    gradient(context: FEMObjectiveContext): number[];
    setWeight(weight: number): void;
    getWeight(): number;
    protected abstract: any;
    compute(context: FEMObjectiveContext): number;
    protected abstract: any;
    computeGradient(context: FEMObjectiveContext): number[];
    info(): {
        engine: string;
        weight: number;
    };
}
