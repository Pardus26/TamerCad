import { RenderPass } from "./RenderPass";
export class GeometryPass extends RenderPass {
    gBuffer = null;
    renderer = null;
    constructor(options = {}) {
        super({
            name: "GeometryPass",
            priority: 100,
            clearDepth: true
        });
        this.gBuffer =
            options.gBuffer ?? null;
        this.renderer =
            options.renderer ?? null;
    }
    reads() {
        return [
            "Depth"
        ];
    }
    writes() {
        return [
            "GBuffer_Position",
            "GBuffer_Normal",
            "GBuffer_Albedo",
            "GBuffer_Material",
            "ObjectID"
        ];
    }
    setGBuffer(buffer) {
        this.gBuffer = buffer;
    }
    setRenderer(renderer) {
        this.renderer = renderer;
    }
    begin(context) {
        this.gBuffer?.bind();
        super.begin(context);
    }
    execute(context, scene, camera) {
        if (!this.renderer)
            return;
        const meshes = scene.getVisibleMeshes
            ? scene.getVisibleMeshes(camera)
            : [];
        for (const mesh of meshes) {
            this.renderMesh(context, mesh, camera);
        }
    }
    renderMesh(context, mesh, camera) {
        if (!mesh.visible)
            return;
        this.renderer?.render(context, mesh, camera);
    }
    end(context) {
        this.gBuffer?.unbind();
    }
}
//# sourceMappingURL=GeometryPass.js.map