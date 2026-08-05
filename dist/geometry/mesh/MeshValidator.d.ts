import { Mesh } from "./Mesh";
export interface MeshValidationIssue {
    type: "EMPTY_MESH" | "DEGENERATE_TRIANGLE" | "INVALID_VERTEX_INDEX" | "DUPLICATE_TRIANGLE" | "NON_MANIFOLD_EDGE" | "OPEN_EDGE";
    message: string;
    triangleId?: number;
}
export interface MeshValidationResult {
    valid: boolean;
    issues: MeshValidationIssue[];
}
export declare class MeshValidator {
    validate(mesh: Mesh): MeshValidationResult;
    private validateTriangles;
    private validateEdges;
    private addEdge;
}
