import { BRepSolid } from "./BRepSolid";
import { BRepValidator } from "./BRepValidator";
export var BooleanOperation;
(function (BooleanOperation) {
    BooleanOperation["UNION"] = "union";
    BooleanOperation["DIFFERENCE"] = "difference";
    BooleanOperation["INTERSECTION"] = "intersection";
})(BooleanOperation || (BooleanOperation = {}));
export class BRepBoolean {
    /**
     * Union operasyonu
     *
     * A + B
     */
    static union(a, b) {
        this.validateInput(a, b);
        const result = a.clone();
        /*
            Basit topology merge

            İleri aşamada:

            - face intersection
            - split
            - rebuild

            yapılacak.
        */
        for (const shell of b.shells) {
            result.addShell(shell.clone());
        }
        return result;
    }
    /**
     * Difference operasyonu
     *
     * A - B
     */
    static difference(a, b) {
        this.validateInput(a, b);
        const result = a.clone();
        /*
            Placeholder:

            Gerçek algoritma:

            1. Face intersection

            2. Split faces

            3. Remove inside faces

            4. Rebuild topology

        */
        return result;
    }
    /**
     * Intersection operasyonu
     *
     * A ∩ B
     */
    static intersection(a, b) {
        this.validateInput(a, b);
        const result = new BRepSolid();
        /*
            Placeholder:

            Gerçek işlem:

            - Surface intersection
            - Region classification
            - Shell reconstruction

        */
        return result;
    }
    /**
     * Genel boolean çağrısı
     */
    static execute(operation, a, b) {
        switch (operation) {
            case BooleanOperation.UNION:
                return this.union(a, b);
            case BooleanOperation.DIFFERENCE:
                return this.difference(a, b);
            case BooleanOperation.INTERSECTION:
                return this.intersection(a, b);
        }
    }
    /**
     * Input doğrulama
     */
    static validateInput(a, b) {
        const va = BRepValidator
            .validateSolid(a);
        const vb = BRepValidator
            .validateSolid(b);
        if (!va.valid) {
            throw new Error("First solid is invalid");
        }
        if (!vb.valid) {
            throw new Error("Second solid is invalid");
        }
    }
    /**
     * Boolean sonucu doğrulama
     */
    static validateResult(solid) {
        return (BRepValidator
            .validateSolid(solid)
            .valid);
    }
    /**
     * Debug bilgisi
     */
    static info(operation) {
        return {
            operation,
            engine: "BRepBoolean",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepBoolean.js.map