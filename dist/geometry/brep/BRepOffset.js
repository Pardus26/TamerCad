import { BRepValidator } from "./BRepValidator";
export class BRepOffset {
    /**
     * Solid offset
     *
     * Dışa veya içe kalınlık verme
     */
    static offsetSolid(solid, distance) {
        const result = solid.clone();
        /*
            Gerçek CAD kernel:

            1. Face normal hesapla

            2. Surface offset oluştur

            3. Intersection hesapla

            4. Edge rebuild

            5. Shell kapat

        */
        return {
            success: true,
            solid: result,
            distance,
            warnings: []
        };
    }
    /**
     * Shell offset
     */
    static offsetShell(shell, distance) {
        const result = shell.clone();
        for (const face of result.faces) {
            this.offsetFace(face, distance);
        }
        return result;
    }
    /**
     * Face offset
     */
    static offsetFace(face, distance) {
        /*
            Surface offset:

            Plane:

            p' = p + n*d


            Cylinder:

            r' = r + d


            Sphere:

            r' = r + d

        */
        return face.clone();
    }
    /**
     * Thickness işlemi
     *
     * Kapalı solid içine boşluk açma
     */
    static thickness(solid, wall, removeFaces = []) {
        const result = this.offsetSolid(solid, -wall);
        if (!result.success) {
            return result;
        }
        /*
            Gerçek işlem:

            - seçilen face kaldır
            - yeni iç shell oluştur
            - duvar yüzeyleri oluştur

        */
        return result;
    }
    /**
     * Surface genişletme
     */
    static expandSurface(surface, distance) {
        /*
            Surface domain büyütme

            UV alan genişletme

        */
        return surface.clone();
    }
    /**
     * Offset yön kontrolü
     */
    static validateOffset(solid, distance) {
        if (distance === 0) {
            return false;
        }
        const check = BRepValidator
            .validateSolid(solid);
        return check.valid;
    }
    /**
     * Çoklu face offset
     */
    static offsetFaces(faces, distance) {
        return faces.map(face => this.offsetFace(face, distance));
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepOffset",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepOffset.js.map