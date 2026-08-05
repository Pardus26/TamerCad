export class BRepMaterial {
    materials;
    constructor() {
        this.materials = [];
    }
    /**
     * Material oluşturma
     */
    create(material) {
        this.materials.push(material);
        return material;
    }
    /**
     * Material bulma
     */
    get(id) {
        return this.materials.find(m => m.id === id);
    }
    /**
     * Yoğunluktan kütle hesabı
     */
    calculateMass(volume, material) {
        return volume *
            material.physical.density;
    }
    /**
     * Elastik deformasyon hesabı
     */
    elasticDeformation(force, length, area, material) {
        const stress = force / area;
        const strain = stress /
            material.elastic.youngModulus;
        return {
            stress,
            strain,
            displacement: strain * length
        };
    }
    /**
     * Plastik deformasyon kontrolü
     */
    plasticCheck(stress, material) {
        return {
            plastic: stress >
                material.plastic.yieldStrength,
            safety: stress <
                material.plastic.ultimateStrength
        };
    }
    /**
     * Termal genişleme
     */
    thermalExpansion(length, deltaTemperature, material) {
        return length *
            material.thermal.expansion *
            deltaTemperature;
    }
    /**
     * Sürtünme hesabı
     */
    frictionForce(normal, material) {
        return normal *
            material.surface.friction;
    }
    /**
     * Malzeme kopyalama
     */
    clone(material) {
        return JSON.parse(JSON.stringify(material));
    }
    /**
     * Veritabanı bilgisi
     */
    database() {
        return [
            ...this.materials
        ];
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepMaterial",
            materials: this.materials.length,
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepMaterial.js.map