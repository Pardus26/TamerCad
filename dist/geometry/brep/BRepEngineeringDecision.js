export class BRepEngineeringDecision {
    alternatives;
    decisions;
    history;
    constructor() {
        this.alternatives = [];
        this.decisions = [];
        this.history = [];
    }
    /**
     * Alternatif ekleme
     */
    addAlternative(alternative) {
        this.alternatives.push(alternative);
    }
    /**
     * Performans skoru
     */
    calculateScore(design) {
        const performance = design.performance *
            0.45;
        const manufacturing = design.manufacturability *
            0.25;
        const cost = (100 - design.cost)
            *
                0.15;
        const risk = (100 - design.risk)
            *
                0.15;
        return (performance +
            manufacturing +
            cost +
            risk);
    }
    /**
     * Alternatifleri sıralama
     */
    rankAlternatives() {
        const scores = this.alternatives.map(design => ({
            alternative: design.name,
            score: this.calculateScore(design),
            explanation: "Weighted engineering evaluation"
        }));
        this.history.push(...scores);
        return scores.sort((a, b) => b.score - a.score);
    }
    /**
     * Risk analizi
     */
    evaluateRisk(design) {
        if (design.risk > 80) {
            return {
                risk: design.risk,
                level: "CRITICAL",
                recommendation: "Redesign required"
            };
        }
        if (design.risk > 50) {
            return {
                risk: design.risk,
                level: "HIGH",
                recommendation: "Additional simulation required"
            };
        }
        return {
            risk: design.risk,
            level: "LOW",
            recommendation: "Acceptable"
        };
    }
    /**
     * En iyi mühendislik kararını seçme
     */
    selectBest() {
        const ranking = this.rankAlternatives();
        const best = ranking[0];
        if (!best)
            return null;
        const decision = {
            selected: best.alternative,
            reason: best.explanation,
            confidence: Math.min(best.score /
                100, 1),
            priority: "HIGH"
        };
        this.decisions.push(decision);
        return decision;
    }
    /**
     * Tasarım önerisi
     */
    recommend(design) {
        const risk = this.evaluateRisk(design);
        return {
            design: design.name,
            recommendation: risk.level === "LOW"
                ?
                    "Proceed"
                :
                    "Improve design",
            risk
        };
    }
    /**
     * İnsan onayı
     */
    approve(decision) {
        return {
            approved: true,
            decision: decision.selected,
            timestamp: Date.now()
        };
    }
    /**
     * Karar hafızası
     */
    remember(decision) {
        this.history.push({
            alternative: decision,
            score: 1,
            explanation: "Stored decision"
        });
    }
    /**
     * İstatistik
     */
    statistics() {
        return {
            alternatives: this.alternatives.length,
            decisions: this.decisions.length,
            history: this.history.length
        };
    }
    /**
     * Reset
     */
    reset() {
        this.alternatives = [];
        this.decisions = [];
        this.history = [];
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepEngineeringDecision",
            alternatives: this.alternatives.length,
            status: "DECISION READY"
        };
    }
}
//# sourceMappingURL=BRepEngineeringDecision.js.map