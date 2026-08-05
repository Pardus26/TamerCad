export class BRepVertex {
    id;
    /**
     * Geometrik konum
     */
    point;
    /**
     * Bağlı edge listesi
     */
    edges;
    /**
     * Kullanıcı metadata
     */
    metadata;
    constructor(point) {
        this.id =
            crypto.randomUUID();
        this.point =
            point.clone();
        this.edges =
            [];
        this.metadata =
            {};
    }
    /**
     * Edge bağlantısı ekleme
     */
    addEdge(edgeId) {
        if (!this.edges.includes(edgeId)) {
            this.edges.push(edgeId);
        }
    }
    /**
     * Edge bağlantısı silme
     */
    removeEdge(edgeId) {
        const index = this.edges.indexOf(edgeId);
        if (index !== -1) {
            this.edges.splice(index, 1);
        }
    }
    /**
     * Bağlı edge sayısı
     */
    edgeCount() {
        return this.edges.length;
    }
    /**
     * Nokta güncelleme
     */
    move(point) {
        this.point =
            point.clone();
    }
    /**
     * Vertex kopyalama
     */
    clone() {
        const vertex = new BRepVertex(this.point.clone());
        vertex.edges =
            [
                ...this.edges
            ];
        vertex.metadata =
            {
                ...this.metadata
            };
        return vertex;
    }
    /**
     * İki vertex eşit mi?
     */
    equals(other, tolerance = 0.000001) {
        return (this.point.distanceTo(other.point)
            <
                tolerance);
    }
    /**
     * Serialize
     */
    toJSON() {
        return {
            id: this.id,
            point: {
                x: this.point.x,
                y: this.point.y,
                z: this.point.z
            },
            edges: this.edges
        };
    }
    toString() {
        return (`BRepVertex(` +
            `${this.point.toString()}, ` +
            `Edges:${this.edges.length}` +
            `)`);
    }
}
//# sourceMappingURL=BRepVertex.js.map