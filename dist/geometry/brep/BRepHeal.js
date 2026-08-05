import { BRepValidator } from "./BRepValidator";
export class BRepHeal {
    /**
     * Ana healing pipeline
     */
    static heal(solid) {
        let result = solid.clone();
        let vertices = 0;
        let edges = 0;
        let faces = 0;
        let shells = 0;
        result =
            this.removeDuplicateTopology(result);
        result =
            this.repairShells(result);
        result =
            this.repairFaces(result);
        const validation = BRepValidator
            .validateSolid(result);
        return {
            solid: result,
            report: {
                success: validation.valid,
                fixedVertices: vertices,
                fixedEdges: edges,
                fixedFaces: faces,
                fixedShells: shells,
                warnings: validation.warnings
            }
        };
    }
    /**
     * Duplicate topology temizleme
     */
    static removeDuplicateTopology(solid) {
        const result = solid.clone();
        /*
            Gerçek kernel:

            - vertex welding
            - edge merge
            - tolerance check

        */
        return result;
    }
    /**
     * Vertex iyileştirme
     */
    static healVertices(solid, tolerance = 1e-6) {
        const result = solid.clone();
        /*
            Aynı koordinattaki
            vertexler birleştirilir.

        */
        return result;
    }
    /**
     * Edge onarma
     */
    static healEdges(shell) {
        const result = shell.clone();
        for (const face of result.faces) {
            const loops = [
                face.outerLoop,
                ...face.innerLoops
            ];
            for (const loop of loops) {
                loop.removeInvalidEdges();
            }
        }
        return result;
    }
    /**
     * Loop kapatma
     */
    static closeLoops(face) {
        if (!face.outerLoop) {
            return false;
        }
        return (face.outerLoop
            .isClosed());
    }
    /**
     * Face iyileştirme
     */
    static repairFaces(solid) {
        const result = solid.clone();
        for (const shell of result.shells) {
            for (const face of shell.faces) {
                this.closeLoops(face);
            }
        }
        return result;
    }
    /**
     * Shell iyileştirme
     */
    static repairShells(solid) {
        const result = solid.clone();
        for (const shell of result.shells) {
            if (!shell.isClosed()) {
                /*
                    Gap closing algoritması
                    ileri aşamada:

                    - boundary detection
                    - face creation
                    - shell rebuild

                */
            }
        }
        return result;
    }
    /**
     * Küçük boşluk kapatma
     */
    static closeGaps(solid, tolerance = 1e-6) {
        const result = solid.clone();
        return result;
    }
    /**
     * Healing sonucu kontrol
     */
    static isHealed(solid) {
        return (BRepValidator
            .validateSolid(solid)
            .valid);
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepHeal",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepHeal.js.map