export declare class BRepParameterDependencyGraph {
    private forward;
    private reverse;
    addDependency(source: string, target: string): void;
    removeDependency(source: string, target: string): void;
    clear(): void;
    dependenciesOf(parameter: string): string[];
    dependentsOf(parameter: string): string[];
    topologicalOrder(): string[];
    detectCycles(): string[][];
    affectedParameters(parameter: string): string[];
    info(): {
        engine: string;
        nodes: number;
        edges: number;
    };
}
