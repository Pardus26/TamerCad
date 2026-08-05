export class BRepEngineeringKnowledge {
    knowledge;
    materials;
    manufacturingRules;
    learningMemory;
    constructor() {
        this.knowledge = [];
        this.materials = [];
        this.manufacturingRules = [];
        this.learningMemory = [];
        this.initializeDefaultKnowledge();
    }
    /**
     * Varsayılan mühendislik bilgileri
     */
    initializeDefaultKnowledge() {
        this.addMaterial({
            name: "Aluminum 7075",
            density: 2810,
            strength: 572,
            thermalLimit: 150
        });
        this.addRule({
            process: "CNC",
            rule: "Avoid unreachable internal corners",
            severity: "HIGH"
        });
        this.addKnowledge({
            id: "FAIL001",
            category: "FAILURE",
            title: "Fatigue Crack",
            description: "Stress concentration causes fatigue failure",
            tags: [
                "fatigue",
                "stress",
                "crack"
            ],
            importance: 10
        });
    }
    /**
     * Bilgi ekleme
     */
    addKnowledge(item) {
        this.knowledge.push(item);
    }
    /**
     * Malzeme ekleme
     */
    addMaterial(material) {
        this.materials.push(material);
    }
    /**
     * Üretim kuralı ekleme
     */
    addRule(rule) {
        this.manufacturingRules.push(rule);
    }
    /**
     * Bilgi arama
     */
    search(query) {
        return this.knowledge.filter(item => item.title
            .toLowerCase()
            .includes(query.keyword
            .toLowerCase())
            ||
                item.tags.some(tag => tag.includes(query.keyword)));
    }
    /**
     * Malzeme önerisi
     */
    recommendMaterial(requirement) {
        if (requirement.includes("lightweight")) {
            return this.materials.sort((a, b) => a.density - b.density)[0];
        }
        return this.materials[0];
    }
    /**
     * Üretim kontrolü
     */
    validateManufacturing(process) {
        return this.manufacturingRules.filter(rule => rule.process === process);
    }
    /**
     * Tasarım standardı sorgusu
     */
    getDesignRules(tag) {
        return this.knowledge.filter(item => item.category === "DESIGN_RULE"
            &&
                item.tags.includes(tag));
    }
    /**
     * Failure knowledge
     */
    analyzeFailure(failure) {
        return this.search({
            keyword: failure,
            category: "FAILURE"
        });
    }
    /**
     * Simulation tecrübesi
     */
    addSimulationExperience(result) {
        this.learningMemory.push(result);
    }
    /**
     * AI memory öğrenme
     */
    learn(information) {
        this.learningMemory.push(information);
    }
    /**
     * Knowledge statistics
     */
    statistics() {
        return {
            totalKnowledge: this.knowledge.length,
            materials: this.materials.length,
            rules: this.manufacturingRules.length,
            memories: this.learningMemory.length
        };
    }
    /**
     * Reset
     */
    reset() {
        this.knowledge = [];
        this.materials = [];
        this.manufacturingRules = [];
        this.learningMemory = [];
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepEngineeringKnowledge",
            knowledge: this.knowledge.length,
            materials: this.materials.length,
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepEngineeringKnowledge.js.map