import { BRepParameter } from "./BRepParameter";
export interface ExpressionContext {
    parameters: Map<string, BRepParameter>;
}
export interface SerializedExpression {
    expression: string;
}
export declare class BRepParameterExpression {
    readonly expression: string;
    private dependencies;
    constructor(expression: string);
    private extractDependencies;
    getDependencies(): string[];
    evaluate(context: ExpressionContext): number;
    validate(context: ExpressionContext): boolean;
    serialize(): SerializedExpression;
    static deserialize(data: SerializedExpression): BRepParameterExpression;
    info(): {
        expression: string;
        dependencies: string[];
    };
}
