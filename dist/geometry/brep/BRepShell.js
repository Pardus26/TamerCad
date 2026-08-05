import { Mesh3 } from "../mesh/Mesh3";
export class BRepShell {
    id;
    /**
     * Shell yüzleri
     */
    faces;
    /**
     * İç shell mi?
     */
    inner;
    /**
     * Metadata
     */
    metadata;
    constructor(inner = false) {
        this.id =
            crypto.randomUUID();
        this.faces =
            [];
        this.inner =
            inner;
        this.metadata =
            {};
    }
    /**
     * Face ekleme
     */
    addFace(face) {
        this.faces.push(face);
    }
    /**
     * Face kaldırma
     */
    removeFace(faceId) {
        this.faces =
            this.faces.filter(f => f.id !== faceId);
    }
    /**
     * Face sayısı
     */
    faceCount() {
        return this.faces.length;
    }
    /**
     * Kapalı shell kontrolü
     *
     * Basitleştirilmiş topoloji kontrolü
     */
    isClosed() {
        if (this.faces.length === 0) {
            return false;
        }
        for (const face of this.faces) {
            if (!face.isValid()) {
                return false;
            }
        }
        return true;
    }
    /**
     * Shell mesh üretimi
     */
    tessellate() {
        const mesh = new Mesh3();
        for (const face of this.faces) {
            const faceMesh = face.tessellate();
            for (const vertex of faceMesh.vertices) {
                mesh.addVertex(vertex);
            }
            for (const triangle of faceMesh.triangles) {
                mesh.addTriangle(triangle.a, triangle.b, triangle.c);
            }
        }
        mesh.computeNormals();
        return mesh;
    }
    /**
     * Yaklaşık yüzey alanı
     */
    area() {
        let total = 0;
        for (const face of this.faces) {
            total +=
                face.area();
        }
        return total;
    }
    /**
     * Shell yön tersleme
     */
    reverse() {
        for (const face of this.faces) {
            face.reverse();
        }
    }
    /**
     * Geçerlilik kontrolü
     */
    isValid() {
        return (this.faces.length > 0);
    }
    /**
     * Clone
     */
    clone() {
        const shell = new BRepShell(this.inner);
        shell.faces =
            this.faces.map(face => face.clone());
        shell.metadata =
            {
                ...this.metadata
            };
        return shell;
    }
    toJSON() {
        return {
            id: this.id,
            faces: this.faces.map(f => f.id),
            inner: this.inner
        };
    }
    toString() {
        return (`BRepShell(` +
            `Faces:${this.faces.length}, ` +
            `Inner:${this.inner}` +
            `)`);
    }
}
//# sourceMappingURL=BRepShell.js.map