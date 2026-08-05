import { Mesh3 } from "../mesh/Mesh3";
export class BRepSolid {
    id;
    /**
     * Solid shell listesi
     */
    shells;
    /**
     * Metadata
     */
    metadata;
    constructor() {
        this.id =
            crypto.randomUUID();
        this.shells =
            [];
        this.metadata =
            {};
    }
    /**
     * Shell ekleme
     */
    addShell(shell) {
        this.shells.push(shell);
    }
    /**
     * Shell kaldırma
     */
    removeShell(shellId) {
        this.shells =
            this.shells.filter(s => s.id !== shellId);
    }
    /**
     * Dış shell alma
     */
    outerShell() {
        for (const shell of this.shells) {
            if (!shell.inner) {
                return shell;
            }
        }
        return null;
    }
    /**
     * İç boşluk shellleri
     */
    innerShells() {
        return this.shells.filter(s => s.inner);
    }
    /**
     * Shell sayısı
     */
    shellCount() {
        return this.shells.length;
    }
    /**
     * Solid kapalı mı?
     */
    isClosed() {
        const outer = this.outerShell();
        if (outer === null) {
            return false;
        }
        return outer.isClosed();
    }
    /**
     * Solid geçerli mi?
     */
    isValid() {
        if (this.shells.length === 0) {
            return false;
        }
        for (const shell of this.shells) {
            if (!shell.isValid()) {
                return false;
            }
        }
        return true;
    }
    /**
     * Mesh oluşturma
     */
    tessellate() {
        const mesh = new Mesh3();
        for (const shell of this.shells) {
            const shellMesh = shell.tessellate();
            for (const vertex of shellMesh.vertices) {
                mesh.addVertex(vertex);
            }
            for (const triangle of shellMesh.triangles) {
                mesh.addTriangle(triangle.a, triangle.b, triangle.c);
            }
        }
        mesh.computeNormals();
        return mesh;
    }
    /**
     * Yaklaşık yüzey alanı
     */
    surfaceArea() {
        let area = 0;
        for (const shell of this.shells) {
            area +=
                shell.area();
        }
        return area;
    }
    /**
     * Hacim
     *
     * Mesh tabanlı yaklaşık hesap
     */
    volume() {
        const mesh = this.tessellate();
        let volume = 0;
        for (const triangle of mesh.triangles) {
            const a = mesh.vertices[triangle.a];
            const b = mesh.vertices[triangle.b];
            const c = mesh.vertices[triangle.c];
            volume +=
                a.dot(b.cross(c))
                    /
                        6;
        }
        return Math.abs(volume);
    }
    /**
     * Clone
     */
    clone() {
        const solid = new BRepSolid();
        solid.shells =
            this.shells.map(shell => shell.clone());
        solid.metadata =
            {
                ...this.metadata
            };
        return solid;
    }
    /**
     * Boolean operasyon hazırlığı
     */
    booleanReady() {
        return (this.isValid()
            &&
                this.isClosed());
    }
    /**
     * JSON export
     */
    toJSON() {
        return {
            id: this.id,
            shells: this.shells.map(s => s.id)
        };
    }
    toString() {
        return (`BRepSolid(` +
            `Shells:${this.shellCount()}` +
            `)`);
    }
}
//# sourceMappingURL=BRepSolid.js.map