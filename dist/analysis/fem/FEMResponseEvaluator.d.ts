export interface FEMResult {
    displacement: number[];
    stress: number[];
    strain?: number[];
    forces?: number[];
}
export interface FEMResponse {
    compliance: number;
    maxStress: number;
    maxDisplacement: number;
    strainEnergy: number;
}
export declare abstract class FEMResponseEvaluator {
    evaluate(result: FEMResult): FEMResponse;
    objective(response: FEMResponse): number;
    constraints(response: FEMResponse): number[];
    protected abstract: any;
    computeCompliance(result: FEMResult): number;
    protected abstract: any;
    computeMaxStress(result: FEMResult): number;
    protected abstract: any;
    computeMaxDisplacement(result: FEMResult): number;
    protected abstract: any;
    computeStrainEnergy(result: FEMResult): number;
    info(): {
        engine: string;
    };
}
