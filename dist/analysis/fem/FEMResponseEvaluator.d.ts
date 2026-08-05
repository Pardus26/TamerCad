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
    protected abstract computeCompliance(result: FEMResult): number;
    protected abstract computeMaxStress(result: FEMResult): number;
    protected abstract computeMaxDisplacement(result: FEMResult): number;
    protected abstract computeStrainEnergy(result: FEMResult): number;
    info(): {
        engine: string;
    };
}
