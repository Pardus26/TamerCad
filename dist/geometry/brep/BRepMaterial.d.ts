export interface MaterialPhysical {
    density: number;
    hardness: number;
    strength: number;
}
export interface ElasticProperties {
    youngModulus: number;
    poissonRatio: number;
    shearModulus: number;
}
export interface PlasticProperties {
    yieldStrength: number;
    ultimateStrength: number;
    elongation: number;
}
export interface ThermalProperties {
    conductivity: number;
    expansion: number;
    heatCapacity: number;
}
export interface SurfaceProperties {
    friction: number;
    roughness: number;
    coating: string;
}
export interface ManufacturingProperties {
    machinability: number;
    welding: boolean;
    casting: boolean;
}
export interface MaterialDefinition {
    id: string;
    name: string;
    category: string;
    physical: MaterialPhysical;
    elastic: ElasticProperties;
    plastic: PlasticProperties;
    thermal: ThermalProperties;
    surface: SurfaceProperties;
    manufacturing: ManufacturingProperties;
}
export declare class BRepMaterial {
    materials: MaterialDefinition[];
    constructor();
    /**
     * Material oluşturma
     */
    create(material: MaterialDefinition): MaterialDefinition;
    /**
     * Material bulma
     */
    get(id: string): MaterialDefinition | undefined;
    /**
     * Yoğunluktan kütle hesabı
     */
    calculateMass(volume: number, material: MaterialDefinition): number;
    /**
     * Elastik deformasyon hesabı
     */
    elasticDeformation(force: number, length: number, area: number, material: MaterialDefinition): {
        stress: number;
        strain: number;
        displacement: number;
    };
    /**
     * Plastik deformasyon kontrolü
     */
    plasticCheck(stress: number, material: MaterialDefinition): {
        plastic: boolean;
        safety: boolean;
    };
    /**
     * Termal genişleme
     */
    thermalExpansion(length: number, deltaTemperature: number, material: MaterialDefinition): number;
    /**
     * Sürtünme hesabı
     */
    frictionForce(normal: number, material: MaterialDefinition): number;
    /**
     * Malzeme kopyalama
     */
    clone(material: MaterialDefinition): any;
    /**
     * Veritabanı bilgisi
     */
    database(): MaterialDefinition[];
    /**
     * Debug
     */
    info(): {
        engine: string;
        materials: number;
        status: string;
    };
}
