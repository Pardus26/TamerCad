import { RenderCamera } from "../RenderCamera";
import { MeshBody } from "../../geometry/mesh/MeshBody";
export interface MeshRenderContext {
    viewportWidth: number;
    viewportHeight: number;
    time?: number;
    wireframe?: boolean;
}
export interface MeshRendererStatistics {
    drawCalls: number;
    renderedTriangles: number;
    renderedVertices: number;
    skippedObjects: number;
}
export declare class MeshRenderer {
    private statistics;
    constructor();
    beginFrame(): void;
    render(body: MeshBody, camera: RenderCamera, context: MeshRenderContext): void;
    private drawMesh;
    renderBodies(bodies: readonly MeshBody[], camera: RenderCamera, context: MeshRenderContext): void;
    getStatistics(): MeshRendererStatistics;
    endFrame(): void;
    reset(): void;
}
