import { Document } from "../../persistence/core/Document";
import { STLTriangle } from "./STLReader";
export declare class STLMeshConverter {
    convert(triangles: STLTriangle[]): Document;
}
