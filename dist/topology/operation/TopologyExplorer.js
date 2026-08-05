export class TopologyExplorer {
    solid;
    constructor(solid) {
        this.solid = solid;
    }
    getSolids() {
        return [
            this.solid
        ];
    }
    getShells() {
        return this.solid
            .getShells();
    }
    getFaces() {
        return this.solid
            .getFaces();
    }
    getEdges() {
        return this.solid
            .getEdges();
    }
    getVertices() {
        return this.solid
            .getVertices();
    }
    getWires() {
        const wires = [];
        for (const face of this.getFaces()) {
            for (const wire of face.getWires()) {
                if (!wires.includes(wire)) {
                    wires.push(wire);
                }
            }
        }
        return wires;
    }
    getEdgesOfFace(face) {
        return face
            .getEdges();
    }
    getVerticesOfFace(face) {
        const vertices = [];
        for (const edge of face.getEdges()) {
            if (!vertices.includes(edge.start)) {
                vertices.push(edge.start);
            }
            if (!vertices.includes(edge.end)) {
                vertices.push(edge.end);
            }
        }
        return vertices;
    }
    getFacesOfEdge(edge) {
        const result = [];
        for (const face of this.getFaces()) {
            if (face.containsEdge(edge)) {
                result.push(face);
            }
        }
        return result;
    }
    getEdgesOfVertex(vertex) {
        return vertex
            .getEdges();
    }
    getFacesOfVertex(vertex) {
        const result = [];
        for (const face of this.getFaces()) {
            if (face.getVertices()
                .includes(vertex)) {
                result.push(face);
            }
        }
        return result;
    }
    getConnectedFaces(face) {
        const connected = [];
        for (const edge of face.getEdges()) {
            for (const neighbour of this.getFacesOfEdge(edge)) {
                if (neighbour !== face
                    &&
                        !connected.includes(neighbour)) {
                    connected.push(neighbour);
                }
            }
        }
        return connected;
    }
    getAdjacentEdges(edge) {
        const result = [];
        const vertices = [
            edge.start,
            edge.end
        ];
        for (const vertex of vertices) {
            for (const other of vertex.getEdges()) {
                if (other !== edge
                    &&
                        !result.includes(other)) {
                    result.push(other);
                }
            }
        }
        return result;
    }
    findFaceByEdge(edge) {
        const faces = this.getFacesOfEdge(edge);
        return faces.length
            ?
                faces[0]
            :
                null;
    }
    findFacesByEdge(edge) {
        return this.getFacesOfEdge(edge);
    }
    findVertexByPosition(vertex, tolerance = 1e-6) {
        for (const v of this.getVertices()) {
            if (v.equals(vertex, tolerance)) {
                return v;
            }
        }
        return null;
    }
    countFaces() {
        return this.getFaces()
            .length;
    }
    countEdges() {
        return this.getEdges()
            .length;
    }
    countVertices() {
        return this.getVertices()
            .length;
    }
    isManifold() {
        for (const edge of this.getEdges()) {
            const faces = this.getFacesOfEdge(edge);
            if (faces.length !== 2) {
                return false;
            }
        }
        for (const shell of this.getShells()) {
            if (!shell.isClosed()) {
                return false;
            }
        }
        return true;
    }
}
//# sourceMappingURL=TopologyExplorer.js.map