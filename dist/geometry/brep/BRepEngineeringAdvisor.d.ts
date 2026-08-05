export type AdvisorDomain = "CAD" | "CAE" | "CAM" | "DFM" | "OPTIMIZATION";
export interface AdvisorRequest {
    topic: string;
    data: any;
}
export interface Advice {
    domain: AdvisorDomain;
    recommendation: string;
    reason: string;
    confidence: number;
}
export interface DesignReview {
    score: number;
    problems: string[];
    improvements: string[];
}
export declare class BRepEngineeringAdvisor {
    domain: AdvisorDomain;
    advices: Advice[];
    reviews: DesignReview[];
    memory: string[];
    constructor();
    /**
     * Danışman alanı
     */
    setDomain(domain: AdvisorDomain): void;
    /**
     * Tasarım inceleme
     */
    reviewDesign(design: any): DesignReview;
    /**
     * Optimizasyon tavsiyesi
     */
    adviseOptimization(design: any): Advice;
    /**
     * CAD tavsiyesi
     */
    adviseCAD(operation: string): Advice;
    /**
     * CAE tavsiyesi
     */
    adviseSimulation(result: any): Advice;
    /**
     * Üretim danışmanı
     */
    adviseManufacturing(process: string): Advice;
    /**
     * Risk analizi
     */
    analyzeRisk(design: any): {
        risk: number;
        level: string;
        recommendation: string;
    };
    /**
     * Genel mühendis tavsiyesi
     */
    advise(request: AdvisorRequest): Advice;
    /**
     * Mühendis iletişimi
     */
    explain(advice: Advice): {
        message: string;
        confidence: number;
    };
    /**
     * Öğrenme hafızası
     */
    learn(experience: string): void;
    /**
     * Durum
     */
    status(): {
        domain: AdvisorDomain;
        advices: number;
        reviews: number;
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
        domain: AdvisorDomain;
        status: string;
    };
}
