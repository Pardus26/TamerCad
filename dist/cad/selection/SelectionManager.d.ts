import { MeshBody } from "../../geometry/mesh/MeshBody";
export declare class SelectionManager {
    private selected;
    select(body: MeshBody): void;
    add(body: MeshBody): void;
    clear(): void;
    getSelected(): readonly MeshBody[];
}
