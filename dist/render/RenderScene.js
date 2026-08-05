// src/render/RenderScene.ts
export class RenderScene {
    meshBodies = new Map();
    objects = new Map();
    selection = null;
    revision = 0;
    backgroundColor = {
        r: 0.15,
        g: 0.15,
        b: 0.18,
        a: 1.0
    };
    constructor() { }
    // =================================================
    // MeshBody
    // =================================================
    addMeshBody(body) {
        this.meshBodies.set(body.id, body);
        this.touch();
    }
    removeMeshBody(id) {
        const removed = this.meshBodies.delete(id);
        if (removed &&
            this.selection?.id === id) {
            this.clearSelection();
        }
        this.touch();
        return removed;
    }
    getMeshBody(id) {
        return this.meshBodies.get(id);
    }
    getMeshBodies() {
        return Array.from(this.meshBodies.values());
    }
    getVisibleMeshBodies() {
        return this.getMeshBodies()
            .filter(b => b.visible);
    }
    clearMeshBodies() {
        this.meshBodies.clear();
        this.clearSelection();
        this.touch();
    }
    // =================================================
    // Render Objects
    // =================================================
    addObject(object) {
        this.objects.set(object.id, object);
        this.touch();
    }
    removeObject(id) {
        const removed = this.objects.delete(id);
        if (removed &&
            this.selection?.id === id) {
            this.clearSelection();
        }
        this.touch();
        return removed;
    }
    getObjects() {
        return Array.from(this.objects.values());
    }
    getVisibleObjects() {
        return this.getObjects()
            .filter(o => o.visible);
    }
    // =================================================
    // Selection
    // =================================================
    select(selection) {
        this.clearBodySelection();
        if (selection === null) {
            this.selection = null;
            return;
        }
        if (selection.type === "MeshBody") {
            const body = this.meshBodies.get(selection.id);
            if (!body)
                return;
            body.selected = true;
        }
        this.selection = {
            id: selection.id,
            type: selection.type
        };
        this.touch();
    }
    selectMeshBody(id) {
        const body = this.meshBodies.get(id);
        if (!body)
            return false;
        this.clearBodySelection();
        body.selected = true;
        this.selection = {
            id,
            type: "MeshBody"
        };
        this.touch();
        return true;
    }
    clearSelection() {
        this.clearBodySelection();
        this.selection = null;
        this.touch();
    }
    clearBodySelection() {
        for (const body of this.meshBodies.values()) {
            body.selected = false;
        }
    }
    getSelection() {
        return this.selection;
    }
    getSelectedBody() {
        if (!this.selection ||
            this.selection.type !== "MeshBody") {
            return null;
        }
        return (this.meshBodies.get(this.selection.id) ?? null);
    }
    // =================================================
    // Visibility
    // =================================================
    setMeshVisibility(id, visible) {
        const body = this.meshBodies.get(id);
        if (!body)
            return false;
        body.visible = visible;
        this.touch();
        return true;
    }
    setObjectVisibility(id, visible) {
        const object = this.objects.get(id);
        if (!object)
            return false;
        object.visible = visible;
        this.touch();
        return true;
    }
    // =================================================
    // Renderer Access
    // =================================================
    getRenderables() {
        return this.getVisibleMeshBodies();
    }
    // =================================================
    // Scene
    // =================================================
    clear() {
        this.meshBodies.clear();
        this.objects.clear();
        this.selection = null;
        this.touch();
    }
    isEmpty() {
        return (this.meshBodies.size === 0 &&
            this.objects.size === 0);
    }
    // =================================================
    // Background
    // =================================================
    setBackgroundColor(r, g, b, a = 1) {
        this.backgroundColor = {
            r,
            g,
            b,
            a
        };
    }
    getBackgroundColor() {
        return {
            ...this.backgroundColor
        };
    }
    // =================================================
    // Statistics
    // =================================================
    getStatistics() {
        let vertices = 0;
        let triangles = 0;
        for (const body of this.meshBodies.values()) {
            vertices +=
                body.getVertexCount();
            triangles +=
                body.getTriangleCount();
        }
        return {
            meshBodies: this.meshBodies.size,
            renderObjects: this.objects.size,
            vertices,
            triangles,
            selected: this.selection
        };
    }
    getRevision() {
        return this.revision;
    }
    touch() {
        this.revision++;
    }
    debugInfo() {
        return {
            type: "RenderScene",
            revision: this.revision,
            meshBodies: this.meshBodies.size,
            objects: this.objects.size,
            selection: this.selection
        };
    }
}
//# sourceMappingURL=RenderScene.js.map