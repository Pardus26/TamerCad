export class BRepEdge {
    id;
    /**
     * Başlangıç vertex
     */
    startVertex;
    /**
     * Bitiş vertex
     */
    endVertex;
    /**
     * Edge geometrisi
     */
    curve;
    /**
     * Bağlı yüzler
     */
    faces;
    /**
     * Yön
     */
    reversed;
    /**
     * Metadata
     */
    metadata;
    constructor(startVertex, endVertex, curve) {
        this.id =
            crypto.randomUUID();
        this.startVertex =
            startVertex;
        this.endVertex =
            endVertex;
        this.curve =
            curve;
        this.faces =
            [];
        this.reversed =
            false;
        this.metadata =
            {};
        /*
            Vertex topoloji bağlantısı
        */
        this.startVertex
            .addEdge(this.id);
        this.endVertex
            .addEdge(this.id);
    }
    /**
     * Edge uzunluğu
     */
    length() {
        return this.curve.length();
    }
    /**
     * Başlangıç noktası
     */
    startPoint() {
        return this.startVertex
            .point
            .clone();
    }
    /**
     * Bitiş noktası
     */
    endPoint() {
        return this.endVertex
            .point
            .clone();
    }
    /**
     * Yüz bağlantısı ekleme
     */
    addFace(faceId) {
        if (!this.faces.includes(faceId)) {
            this.faces.push(faceId);
        }
    }
    /**
     * Yüz bağlantısı silme
     */
    removeFace(faceId) {
        const index = this.faces.indexOf(faceId);
        if (index !== -1) {
            this.faces.splice(index, 1);
        }
    }
    /**
     * Bağlı yüz sayısı
     */
    faceCount() {
        return this.faces.length;
    }
    /**
     * Edge yön ters çevirme
     */
    reverse() {
        const temp = this.startVertex;
        this.startVertex =
            this.endVertex;
        this.endVertex =
            temp;
        this.reversed =
            !this.reversed;
    }
    /**
     * Edge üzerinde nokta
     */
    evaluate(t) {
        return this.curve.evaluate(t);
    }
    /**
     * Clone
     */
    clone() {
        return new BRepEdge(this.startVertex.clone(), this.endVertex.clone(), this.curve.clone());
    }
    /**
     * Edge doğrulama
     */
    isValid() {
        return (this.startVertex !==
            this.endVertex
            &&
                this.curve !== undefined);
    }
    toJSON() {
        return {
            id: this.id,
            startVertex: this.startVertex.id,
            endVertex: this.endVertex.id,
            faces: this.faces,
            reversed: this.reversed
        };
    }
    toString() {
        return (`BRepEdge(` +
            `${this.startVertex.id}` +
            " -> " +
            `${this.endVertex.id}, ` +
            `Faces:${this.faces.length}` +
            `)`);
    }
}
//# sourceMappingURL=BRepEdge.js.map