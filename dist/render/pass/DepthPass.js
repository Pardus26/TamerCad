import { RenderPass } from "./RenderPass";
export class DepthPass extends RenderPass {
    depthBuffer = null;
    renderer = null;
    reverseZ = false;
    constructor(options = {}) {
        super({
            name: "DepthPass",
            priority: 50,
            clearDepth: true
        });
        if (options.depthBuffer) {
            this.depthBuffer =
                options.depthBuffer;
        }
        if (options.renderer) {
            this.renderer =
                options.renderer;
        }
        if (options.reverseZ !== undefined) {
            this.reverseZ =
                options.reverseZ;
        }
    }
    setDepthBuffer(depth) {
        this.depthBuffer =
            depth;
    }
    setRenderer(renderer) {
        this.renderer =
            renderer;
    }
    begin(context) {
        this.depthBuffer?.bind();
        super.begin(context);
    }
    execute(context, scene, camera) {
        if (!this.renderer) {
            return;
        }
        const meshes = scene.getVisibleMeshes
            ? scene.getVisibleMeshes(camera)
            : [];
        for (const mesh of meshes) {
            this.renderDepthMesh(context, mesh, camera);
        }
    }
    renderDepthMesh(context, mesh, camera) {
        if (!mesh.visible) {
            return;
        }
        if (mesh.castShadow === false) {
            return;
        }
        this.renderer?.renderDepth?.(context, mesh, camera);
    }
    end(context) {
        this.depthBuffer?.unbind();
    }
    debugInfo() {
        return {
            type: "DepthPass",
            reverseZ: this.reverseZ,
            hasDepthBuffer: this.depthBuffer !== null,
            hasRenderer: this.renderer !== null
        };
    }
}
//# sourceMappingURL=DepthPass.js.map