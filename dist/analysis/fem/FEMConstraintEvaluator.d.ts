export interface FEMConstraint {
    name: string;
    limit: number;
    evaluate(response: any): number;
}
export interface ConstraintEvaluation {
    values: number[];
    satisfied: boolean;
    violations: number[];
}
export declare abstract class FEMConstraintEvaluator {
    protected constraints: FEMConstraint[];
    addConstraint(constraint: FEMConstraint): void;
    evaluate(response: any): ConstraintEvaluation;
    getConstraints(): FEMConstraint[];
    protected abstract normalize(value: number): number;
    info(): {
        engine: string;
        constraints: number;
    };
}
