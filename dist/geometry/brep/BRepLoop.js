export class BRepLoop {
    id;
    /**
     * Loop edge sırası
     */
    edges;
    /**
     * Dış sınır mı?
     */
    outer;
    /**
     * Metadata
     */
    metadata;
    constructor(outer = true) {
        this.id =
            crypto.randomUUID();
        this.edges =
            [];
        this.outer =
            outer;
        this.metadata =
            {};
    }
    /**
     * Edge ekleme
     */
    addEdge(edge) {
        this.edges.push(edge);
    }
    /**
     * Edge kaldırma
     */
    removeEdge(edgeId) {
        this.edges =
            this.edges.filter(e => e.id !== edgeId);
    }
    /**
     * Edge sayısı
     */
    edgeCount() {
        return this.edges.length;
    }
    /**
     * Loop kapalı mı?
     */
    isClosed(tolerance = 0.000001) {
        if (this.edges.length < 2) {
            return false;
        }
        for (let i = 0; i < this.edges.length; i++) {
            const current = this.edges[i];
            const next = this.edges[(i + 1)
                %
                    this.edges.length];
            if (current.endPoint()
                .distanceTo(next.startPoint())
                >
                    tolerance) {
                return false;
            }
        }
        return true;
    }
    /**
     * Loop başlangıç noktası
     */
    startPoint() {
        if (this.edges.length === 0) {
            return null;
        }
        return this.edges[0]
            .startPoint();
    }
    /**
     * Loop uzunluğu
     */
    perimeter() {
        let length = 0;
        for (const edge of this.edges) {
            length +=
                edge.length();
        }
        return length;
    }
    /**
     * Edge sırasını ters çevirme
     */
    reverse() {
        this.edges.reverse();
        for (const edge of this.edges) {
            edge.reverse();
        }
    }
    /**
     * Dış / iç loop değişimi
     */
    toggleOuter() {
        this.outer =
            !this.outer;
    }
    /**
     * Loop kopyalama
     */
    clone() {
        const loop = new BRepLoop(this.outer);
        loop.edges =
            this.edges.map(e => e.clone());
        loop.metadata =
            {
                ...this.metadata
            };
        return loop;
    }
    /**
     * Loop doğrulama
     */
    isValid() {
        return (this.edges.length > 0
            &&
                this.isClosed());
    }
    /**
     * JSON export
     */
    toJSON() {
        return {
            id: this.id,
            edges: this.edges.map(e => e.id),
            outer: this.outer
        };
    }
    toString() {
        return (`BRepLoop(` +
            `Edges:${this.edges.length}, ` +
            `Outer:${this.outer}` +
            `)`);
    }
}
//# sourceMappingURL=BRepLoop.js.map