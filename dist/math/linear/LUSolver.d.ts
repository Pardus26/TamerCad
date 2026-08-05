export declare class LUSolver {
    solve(A: number[][], b: number[]): number[];
    residual(A: number[][], x: number[], b: number[]): number;
    info(): {
        engine: string;
    };
}
