import { Mesh3 } from "./Mesh3";
export class Tessellator3 {
    options;
    constructor(options = {
        uSegments: 20,
        vSegments: 20
    }) {
        this.options =
            options;
    }
    /**
     * Solid → Mesh dönüşümü
     */
    tessellateSolid(solid) {
        const mesh = new Mesh3();
        for (const surface of solid.getSurfaces()) {
            this.tessellateSurface(surface, mesh);
        }
        mesh.computeNormals();
        return mesh;
    }
    /**
     * Surface → Triangle Mesh
     */
    tessellateSurface(surface, mesh) {
        const vertexGrid = [];
        for (let i = 0; i <= this.options.uSegments; i++) {
            vertexGrid[i] = [];
            const u = i /
                this.options.uSegments;
            for (let j = 0; j <= this.options.vSegments; j++) {
                const v = j /
                    this.options.vSegments;
                const point = surface.evaluate(u, v);
                const index = mesh.addVertex(point);
                vertexGrid[i][j] =
                    index;
            }
        }
        /*
            Grid triangle oluşturma
        */
        for (let i = 0; i < this.options.uSegments; i++) {
            for (let j = 0; j < this.options.vSegments; j++) {
                const a = vertexGrid[i][j];
                const b = vertexGrid[i + 1][j];
                const c = vertexGrid[i + 1][j + 1];
                const d = vertexGrid[i][j + 1];
                mesh.addTriangle(a, b, c);
                mesh.addTriangle(a, c, d);
            }
        }
    }
    /**
     * Kalite artırma
     */
    refine(level) {
        this.options.uSegments *=
            level;
        this.options.vSegments *=
            level;
    }
    /**
     * Hızlı düşük çözünürlük mesh
     */
    static preview(solid) {
        const tessellator = new Tessellator3({
            uSegments: 8,
            vSegments: 8
        });
        return tessellator
            .tessellateSolid(solid);
    }
    /**
     * Yüksek kalite üretim mesh
     */
    static production(solid) {
        const tessellator = new Tessellator3({
            uSegments: 64,
            vSegments: 64
        });
        return tessellator
            .tessellateSolid(solid);
    }
    /**
     * STL için optimize edilmiş mesh
     */
    static stl(solid) {
        const tessellator = new Tessellator3({
            uSegments: 48,
            vSegments: 48
        });
        return tessellator
            .tessellateSolid(solid);
    }
}
//# sourceMappingURL=Tessellator3.js.map