export class BRepTopologyGraph {
    vertices;
    edges;
    faces;
    /**
     * Vertex bağlantıları
     */
    vertexGraph;
    /**
     * Face komşulukları
     */
    faceGraph;
    constructor() {
        this.vertices =
            new Map();
        this.edges =
            new Map();
        this.faces =
            new Map();
        this.vertexGraph =
            new Map();
        this.faceGraph =
            new Map();
    }
    /**
     * Solid'den graph oluşturma
     */
    static fromSolid(solid) {
        const graph = new BRepTopologyGraph();
        for (const shell of solid.shells) {
            graph.addShell(shell);
        }
        return graph;
    }
    /**
     * Shell ekleme
     */
    addShell(shell) {
        for (const face of shell.faces) {
            this.addFace(face);
        }
    }
    /**
     * Face ekleme
     */
    addFace(face) {
        this.faces.set(face.id, face);
        this.faceGraph.set(face.id, []);
        this.processLoop(face);
    }
    /**
     * Loop işleme
     */
    processLoop(face) {
        const loops = [
            face.outerLoop,
            ...face.innerLoops
        ];
        for (const loop of loops) {
            for (const edge of loop.edges) {
                this.addEdge(edge);
                this.linkFaceEdge(face, edge);
            }
        }
    }
    /**
     * Edge ekleme
     */
    addEdge(edge) {
        this.edges.set(edge.id, edge);
        this.addVertex(edge.startVertex);
        this.addVertex(edge.endVertex);
        this.connectVertices(edge.startVertex, edge.endVertex);
    }
    /**
     * Vertex ekleme
     */
    addVertex(vertex) {
        if (!this.vertices.has(vertex.id)) {
            this.vertices.set(vertex.id, vertex);
            this.vertexGraph.set(vertex.id, []);
        }
    }
    /**
     * Vertex bağlantısı
     */
    connectVertices(a, b) {
        this.vertexGraph
            .get(a.id)
            ?.push(b.id);
        this.vertexGraph
            .get(b.id)
            ?.push(a.id);
    }
    /**
     * Face adjacency bağlantısı
     */
    linkFaceEdge(face, edge) {
        for (const otherFace of edge.faces) {
            if (otherFace !== face.id) {
                this.faceGraph
                    .get(face.id)
                    ?.push(otherFace);
            }
        }
    }
    /**
     * Vertex komşuları
     */
    vertexNeighbors(vertexId) {
        return (this.vertexGraph
            .get(vertexId)
            ??
                []);
    }
    /**
     * Face komşuları
     */
    faceNeighbors(faceId) {
        return (this.faceGraph
            .get(faceId)
            ??
                []);
    }
    /**
     * Edge alma
     */
    getEdge(id) {
        return this.edges.get(id);
    }
    /**
     * Face alma
     */
    getFace(id) {
        return this.faces.get(id);
    }
    /**
     * Graph node sayıları
     */
    statistics() {
        return {
            vertices: this.vertices.size,
            edges: this.edges.size,
            faces: this.faces.size
        };
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepTopologyGraph",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepTopologyGraph.js.map