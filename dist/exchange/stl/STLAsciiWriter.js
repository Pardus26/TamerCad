export class STLAsciiWriter {
    write(body, options = {}) {
        const mesh = body.mesh;
        const solidName = options.solidName ??
            body.name ??
            "Mesh";
        const lines = [];
        lines.push(`solid ${solidName}`);
        for (const triangle of mesh.getTriangles()) {
            const normal = this.computeNormal(mesh, triangle);
            lines.push(`  facet normal ${normal[0]} ${normal[1]} ${normal[2]}`);
            lines.push(`    outer loop`);
            for (const index of triangle.getVertexIndices()) {
                const vertex = mesh.getVertex(index);
                lines.push(`      vertex ${vertex.position.x} ${vertex.position.y} ${vertex.position.z}`);
            }
            lines.push(`    endloop`);
            lines.push(`  endfacet`);
        }
        lines.push(`endsolid ${solidName}`);
        return lines.join("\n");
    }
    computeNormal(mesh, triangle) {
        const indices = triangle.getVertexIndices();
        const p0 = mesh.getVertex(indices[0]).position;
        const p1 = mesh.getVertex(indices[1]).position;
        const p2 = mesh.getVertex(indices[2]).position;
        const ux = p1.x - p0.x;
        const uy = p1.y - p0.y;
        const uz = p1.z - p0.z;
        const vx = p2.x - p0.x;
        const vy = p2.y - p0.y;
        const vz = p2.z - p0.z;
        let nx = uy * vz -
            uz * vy;
        let ny = uz * vx -
            ux * vz;
        let nz = ux * vy -
            uy * vx;
        const length = Math.sqrt(nx * nx +
            ny * ny +
            nz * nz);
        if (length > 0) {
            nx /= length;
            ny /= length;
            nz /= length;
        }
        return [
            nx,
            ny,
            nz
        ];
    }
}
//# sourceMappingURL=STLAsciiWriter.js.map