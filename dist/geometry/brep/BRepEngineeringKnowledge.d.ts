export type KnowledgeCategory = "MATERIAL" | "MANUFACTURING" | "DESIGN_RULE" | "FAILURE" | "SIMULATION";
export interface KnowledgeItem {
    id: string;
    category: KnowledgeCategory;
    title: string;
    description: string;
    tags: string[];
    importance: number;
}
export interface MaterialProperty {
    name: string;
    density: number;
    strength: number;
    thermalLimit: number;
}
export interface ManufacturingRule {
    process: string;
    rule: string;
    severity: "LOW" | "MEDIUM" | "HIGH";
}
export interface KnowledgeQuery {
    keyword: string;
    category?: KnowledgeCategory;
}
export declare class BRepEngineeringKnowledge {
    knowledge: KnowledgeItem[];
    materials: MaterialProperty[];
    manufacturingRules: ManufacturingRule[];
    learningMemory: string[];
    constructor();
    /**
     * Varsayılan mühendislik bilgileri
     */
    initializeDefaultKnowledge(): void;
    /**
     * Bilgi ekleme
     */
    addKnowledge(item: KnowledgeItem): void;
    /**
     * Malzeme ekleme
     */
    addMaterial(material: MaterialProperty): void;
    /**
     * Üretim kuralı ekleme
     */
    addRule(rule: ManufacturingRule): void;
    /**
     * Bilgi arama
     */
    search(query: KnowledgeQuery): KnowledgeItem[];
    /**
     * Malzeme önerisi
     */
    recommendMaterial(requirement: string): MaterialProperty;
    /**
     * Üretim kontrolü
     */
    validateManufacturing(process: string): ManufacturingRule[];
    /**
     * Tasarım standardı sorgusu
     */
    getDesignRules(tag: string): KnowledgeItem[];
    /**
     * Failure knowledge
     */
    analyzeFailure(failure: string): KnowledgeItem[];
    /**
     * Simulation tecrübesi
     */
    addSimulationExperience(result: string): void;
    /**
     * AI memory öğrenme
     */
    learn(information: string): void;
    /**
     * Knowledge statistics
     */
    statistics(): {
        totalKnowledge: number;
        materials: number;
        rules: number;
        memories: number;
    };
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        knowledge: number;
        materials: number;
        status: string;
    };
}
