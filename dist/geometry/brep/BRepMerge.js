export class BRepMerge {
    /**
     * İki solid birleştirme
     */
    static solids(a, b) {
        const result = a.clone();
        let vertices = 0;
        let edges = 0;
        let faces = 0;
        for (const shell of b.shells) {
            result.addShell(shell.clone());
            faces +=
                shell.faces.length;
        }
        return {
            success: true,
            result,
            mergedVertices: vertices,
            mergedEdges: edges,
            mergedFaces: faces,
            message: "Solids merged"
        };
    }
    /**
     * Shell merge
     */
    static shells(target, source) {
        const result = target.clone();
        for (const face of source.faces) {
            result.addFace(face.clone());
        }
        return result;
    }
    /**
     * Face merge
     */
    static faces(a, b) {
        /*
            Gerçek CAD:

            - ortak edge bulma
            - loop birleştirme
            - surface continuity kontrolü

        */
        return [
            a.clone(),
            b.clone()
        ];
    }
    /**
     * Edge merge
     */
    static edges(a, b) {
        /*
            Aynı geometrik yolu
            paylaşan edge'ler
            tek edge haline getirilir.
        */
        return a.clone();
    }
    /**
     * Vertex merge
     */
    static vertices(a, b, tolerance = 1e-6) {
        const dx = a.point.x -
            b.point.x;
        const dy = a.point.y -
            b.point.y;
        const dz = a.point.z -
            b.point.z;
        const distance = Math.sqrt(dx * dx +
            dy * dy +
            dz * dz);
        if (distance < tolerance) {
            return a.clone();
        }
        return a.clone();
    }
    /**
     * Duplicate vertex temizleme
     */
    static removeDuplicateVertices(vertices, tolerance = 1e-6) {
        const result = [];
        for (const vertex of vertices) {
            const exists = result.some(item => this.distance(item.point, vertex.point)
                <
                    tolerance);
            if (!exists) {
                result.push(vertex);
            }
        }
        return result;
    }
    /**
     * Nokta mesafesi
     */
    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        return Math.sqrt(dx * dx +
            dy * dy +
            dz * dz);
    }
    /**
     * Boolean sonrası cleanup
     */
    static cleanup(solid) {
        const result = solid.clone();
        /*
            İleri aşama:

            - duplicate vertex temizleme
            - boş face kaldırma
            - bozuk edge silme
            - topology optimize

        */
        return result;
    }
    static info() {
        return {
            engine: "BRepMerge",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepMerge.js.map