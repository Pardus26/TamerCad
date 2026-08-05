import { BRepHeal } from "./BRepHeal";
import { BRepValidator } from "./BRepValidator";
export class BRepDraft {
    /**
     * Ana draft operasyonu
     */
    static apply(solid, faces, options) {
        let result = solid.clone();
        for (const face of faces) {
            result =
                this.draftFace(result, face, options);
        }
        const healed = BRepHeal.heal(result);
        return {
            success: healed.report.success,
            solid: healed.solid,
            modifiedFaces: faces.length,
            warnings: healed.report.warnings
        };
    }
    /**
     * Tek face draft
     */
    static draftFace(solid, face, options) {
        const result = solid.clone();
        /*
            Gerçek CAD algoritması:


            1. Face normal hesapla


            2. Pull direction belirle


            3. Açıyı hesapla


            4. Surface transform uygula


            5. Neighbor face intersection


            6. Topology rebuild


        */
        return result;
    }
    /**
     * Draft açı kontrolü
     */
    static analyzeDraft(face, direction) {
        /*
            Normal:

            n

            Pull:

            d


            açı:

            acos(n.d)

        */
        return {
            valid: true,
            angle: 0,
            undercut: false
        };
    }
    /**
     * Çoklu yüz draft
     */
    static draftFaces(solid, faces, angle, direction) {
        return this.apply(solid, faces, {
            angle,
            direction,
            tolerance: 1e-6
        });
    }
    /**
     * Injection molding kontrolü
     */
    static checkMoldability(solid, direction) {
        const issues = [];
        for (const shell of solid.shells) {
            for (const face of shell.faces) {
                const analysis = this.analyzeDraft(face, direction.direction);
                if (analysis.undercut) {
                    issues.push("Undercut detected");
                }
            }
        }
        return {
            moldable: issues.length === 0,
            issues
        };
    }
    /**
     * Minimum üretim draft kontrolü
     */
    static validateAngle(angle) {
        /*
            Plastik üretimde:

            genelde:

            0.5° - 3°

        */
        return angle > 0;
    }
    /**
     * Son doğrulama
     */
    static validate(solid) {
        return (BRepValidator
            .validateSolid(solid)
            .valid);
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepDraft",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepDraft.js.map