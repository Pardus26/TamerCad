import { Matrix4 } from "../../math/matrix/Matrix4";
export class MeshRenderer {
    statistics = {
        drawCalls: 0,
        renderedTriangles: 0,
        renderedVertices: 0,
        skippedObjects: 0
    };
    constructor() { }
    // ------------------------------------------------
    // Frame
    // ------------------------------------------------
    beginFrame() {
        this.statistics = {
            drawCalls: 0,
            renderedTriangles: 0,
            renderedVertices: 0,
            skippedObjects: 0
        };
    }
    // ------------------------------------------------
    // Render MeshBody
    // ------------------------------------------------
    render(body, camera, context) {
        /*
            Visibility
        */
        if (!body.visible) {
            this.statistics.skippedObjects++;
            return;
        }
        /*
            Locked object still renders

            but cannot be edited

        */
        const mesh = body.mesh;
        if (mesh.isEmpty()) {
            this.statistics.skippedObjects++;
            return;
        }
        /*
            Matrices


            Model:

                MeshBody transform


            View:

                Camera


            Projection:

                Camera


        */
        const modelMatrix = Matrix4.fromArray(body.transform);
        const viewMatrix = camera.getViewMatrix();
        const projectionMatrix = camera.getProjectionMatrix();
        /*
            GPU rendering point


            Later:

                OpenGL ES

                WebGPU

                Vulkan


        */
        this.drawMesh(mesh, modelMatrix, viewMatrix, projectionMatrix, context, body.selected);
        this.statistics.drawCalls++;
        this.statistics.renderedVertices +=
            mesh.vertexCount();
        this.statistics.renderedTriangles +=
            mesh.triangleCount();
    }
    // ------------------------------------------------
    // GPU Draw Placeholder
    // ------------------------------------------------
    drawMesh(mesh, model, view, projection, context, selected) {
        /*
        
        Buraya gerçek GPU kodu gelecek.


        OpenGL ES:

            glBindBuffer()
            glDrawElements()



        WebGPU:

            passEncoder.drawIndexed()



        Shader:

            uModel
            uView
            uProjection



        */
        void mesh;
        void model;
        void view;
        void projection;
        void context;
        void selected;
    }
    // ------------------------------------------------
    // Batch Render
    // ------------------------------------------------
    renderBodies(bodies, camera, context) {
        for (const body of bodies) {
            this.render(body, camera, context);
        }
    }
    // ------------------------------------------------
    // Statistics
    // ------------------------------------------------
    getStatistics() {
        return {
            ...this.statistics
        };
    }
    endFrame() {
        /*
            GPU sync


            SwapBuffers


        */
    }
    reset() {
        this.statistics = {
            drawCalls: 0,
            renderedTriangles: 0,
            renderedVertices: 0,
            skippedObjects: 0
        };
    }
}
//# sourceMappingURL=MeshRenderer.js.map