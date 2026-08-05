export class BRepModel {
    solids = [];
    activeSolid = null;
    info;
    constructor(info = {}) {
        this.info = {
            createdAt: new Date(),
            ...info
        };
    }
    addSolid(solid) {
        if (!this.solids.includes(solid)) {
            this.solids.push(solid);
            this.activeSolid =
                solid;
        }
    }
    removeSolid(solid) {
        const index = this.solids.indexOf(solid);
        if (index === -1) {
            return false;
        }
        this.solids.splice(index, 1);
        if (this.activeSolid === solid) {
            this.activeSolid =
                this.solids.length > 0
                    ?
                        this.solids[this.solids.length - 1]
                    :
                        null;
        }
        return true;
    }
    findSolid(predicate) {
        return this.solids.find(predicate);
    }
    getSolids() {
        return [
            ...this.solids
        ];
    }
    getActiveSolid() {
        return this.activeSolid;
    }
    setActiveSolid(solid) {
        if (!this.solids.includes(solid)) {
            return false;
        }
        this.activeSolid =
            solid;
        return true;
    }
    getFaces() {
        const faces = [];
        for (const solid of this.solids) {
            for (const face of solid.getFaces()) {
                if (!faces.includes(face)) {
                    faces.push(face);
                }
            }
        }
        return faces;
    }
    getEdges() {
        const edges = [];
        for (const solid of this.solids) {
            for (const edge of solid.getEdges()) {
                if (!edges.some(e => e.equals(edge))) {
                    edges.push(edge);
                }
            }
        }
        return edges;
    }
    getVertices() {
        const vertices = [];
        for (const solid of this.solids) {
            for (const vertex of solid.getVertices()) {
                if (!vertices.includes(vertex)) {
                    vertices.push(vertex);
                }
            }
        }
        return vertices;
    }
    clear() {
        this.solids = [];
        this.activeSolid =
            null;
    }
    isEmpty() {
        return (this.solids.length === 0);
    }
    solidCount() {
        return this.solids.length;
    }
    clone() {
        const model = new BRepModel({
            ...this.info
        });
        for (const solid of this.solids) {
            model.addSolid(solid.clone());
        }
        if (this.activeSolid) {
            const index = this.solids.indexOf(this.activeSolid);
            if (index >= 0) {
                model.activeSolid =
                    model.solids[index];
            }
        }
        return model;
    }
    validate() {
        if (this.solids.length === 0) {
            return false;
        }
        return this.solids
            .every(solid => solid.isValid());
    }
}
//# sourceMappingURL=BRepModel.js.map