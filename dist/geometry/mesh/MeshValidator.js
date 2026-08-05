export class MeshValidator {
    validate(mesh) {
        const issues = [];
        if (mesh.vertexCount() === 0 ||
            mesh.triangleCount() === 0) {
            issues.push({
                type: "EMPTY_MESH",
                message: "Mesh contains no geometry."
            });
        }
        this.validateTriangles(mesh, issues);
        this.validateEdges(mesh, issues);
        return {
            valid: issues.length === 0,
            issues
        };
    }
    validateTriangles(mesh, issues) {
        const triangleSet = new Set();
        for (const triangle of mesh.getTriangles()) {
            if (triangle.isDegenerate()) {
                issues.push({
                    type: "DEGENERATE_TRIANGLE",
                    triangleId: triangle.id,
                    message: `Triangle ${triangle.id} is degenerate.`
                });
            }
            for (const index of triangle.getVertexIndices()) {
                if (index < 0 ||
                    index >=
                        mesh.vertexCount()) {
                    issues.push({
                        type: "INVALID_VERTEX_INDEX",
                        triangleId: triangle.id,
                        message: `Triangle ${triangle.id} references invalid vertex ${index}.`
                    });
                }
            }
            const key = [...triangle
                    .getVertexIndices()]
                .sort((a, b) => a - b)
                .join("_");
            if (triangleSet.has(key)) {
                issues.push({
                    type: "DUPLICATE_TRIANGLE",
                    triangleId: triangle.id,
                    message: `Duplicate triangle detected.`
                });
            }
            else {
                triangleSet.add(key);
            }
        }
    }
    validateEdges(mesh, issues) {
        const edgeMap = new Map();
        for (const triangle of mesh.getTriangles()) {
            const v = triangle.getVertexIndices();
            this.addEdge(v[0], v[1], edgeMap);
            this.addEdge(v[1], v[2], edgeMap);
            this.addEdge(v[2], v[0], edgeMap);
        }
        for (const [edge, count] of edgeMap) {
            if (count === 1) {
                issues.push({
                    type: "OPEN_EDGE",
                    message: `Open edge ${edge}`
                });
            }
            if (count > 2) {
                issues.push({
                    type: "NON_MANIFOLD_EDGE",
                    message: `Non-manifold edge ${edge}`
                });
            }
        }
    }
    addEdge(a, b, map) {
        const key = a < b
            ? `${a}_${b}`
            : `${b}_${a}`;
        map.set(key, (map.get(key)
            ?? 0) + 1);
    }
}
//# sourceMappingURL=MeshValidator.js.map