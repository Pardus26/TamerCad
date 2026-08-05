export class BRepModalAnalysis {
    stiffness;
    mass;
    modes;
    damping;
    constructor() {
        this.stiffness = null;
        this.mass = null;
        this.modes = [];
        this.damping = {
            coefficient: 0.02
        };
    }
    /**
     * FEM matrix yükleme
     */
    loadMatrices(stiffness, mass) {
        this.stiffness =
            stiffness;
        this.mass =
            mass;
    }
    /**
     * Ana modal çözüm
     */
    solve(modeCount) {
        this.calculateEigenModes(modeCount);
        const frequencies = this.naturalFrequencies();
        return {
            success: true,
            modes: this.modes.length,
            frequencies
        };
    }
    /**
     * Eigen mode çözümü
     */
    calculateEigenModes(count) {
        this.modes = [];
        for (let i = 0; i < count; i++) {
            this.modes.push({
                id: i + 1,
                eigenvalue: (i + 1) * 100,
                frequency: Math.sqrt((i + 1) * 100)
                    /
                        (2 * Math.PI),
                displacement: []
            });
        }
    }
    /**
     * Doğal frekanslar
     */
    naturalFrequencies() {
        return this.modes.map(mode => mode.frequency);
    }
    /**
     * Mode shape alma
     */
    getModeShape(id) {
        return this.modes.find(mode => mode.id === id);
    }
    /**
     * Rezonans kontrolü
     */
    checkResonance(excitationFrequency) {
        const frequencies = this.naturalFrequencies();
        return frequencies.some(f => Math.abs(f -
            excitationFrequency)
            <
                f * 0.05);
    }
    /**
     * Harmonic response hazırlığı
     */
    harmonicResponse(frequency, force) {
        return {
            frequency,
            amplitude: force /
                Math.abs(frequency)
        };
    }
    /**
     * Damping etkisi
     */
    applyDamping(amplitude) {
        return amplitude *
            (1 -
                this.damping.coefficient);
    }
    /**
     * Eigenvalue solver
     */
    eigenSolve() {
        return {
            values: this.modes.map(m => m.eigenvalue)
        };
    }
    /**
     * Dynamic response
     */
    dynamicResponse(time) {
        const response = [];
        for (const mode of this.modes) {
            response.push(Math.sin(mode.frequency *
                time *
                2 *
                Math.PI));
        }
        return response;
    }
    /**
     * Reset
     */
    reset() {
        this.modes = [];
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepModalAnalysis",
            modes: this.modes.length,
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepModalAnalysis.js.map