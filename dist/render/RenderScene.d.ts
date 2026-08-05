import { MeshBody } from "../geometry/mesh/MeshBody";
export interface RenderObject {
    id: string;
    visible: boolean;
}
export interface SceneSelection {
    id: string;
    type: "MeshBody" | "Object";
}
export interface BackgroundColor {
    r: number;
    g: number;
    b: number;
    a: number;
}
export interface RenderSceneStatistics {
    meshBodies: number;
    renderObjects: number;
    vertices: number;
    triangles: number;
    selected: SceneSelection | null;
}
export declare class RenderScene {
    private readonly meshBodies;
    private readonly objects;
    private selection;
    private revision;
    private backgroundColor;
    constructor();
    addMeshBody(body: MeshBody): void;
    removeMeshBody(id: string): boolean;
    getMeshBody(id: string): MeshBody | undefined;
    getMeshBodies(): readonly MeshBody[];
    getVisibleMeshBodies(): readonly MeshBody[];
    clearMeshBodies(): void;
    addObject(object: RenderObject): void;
    removeObject(id: string): boolean;
    getObjects(): readonly RenderObject[];
    getVisibleObjects(): readonly RenderObject[];
    select(selection: SceneSelection | null): void;
    selectMeshBody(id: string): boolean;
    clearSelection(): void;
    private clearBodySelection;
    getSelection(): SceneSelection | null;
    getSelectedBody(): MeshBody | null;
    setMeshVisibility(id: string, visible: boolean): boolean;
    setObjectVisibility(id: string, visible: boolean): boolean;
    getRenderables(): readonly MeshBody[];
    clear(): void;
    isEmpty(): boolean;
    setBackgroundColor(r: number, g: number, b: number, a?: number): void;
    getBackgroundColor(): BackgroundColor;
    getStatistics(): RenderSceneStatistics;
    getRevision(): number;
    private touch;
    debugInfo(): {
        type: string;
        revision: number;
        meshBodies: number;
        objects: number;
        selection: SceneSelection | null;
    };
}
