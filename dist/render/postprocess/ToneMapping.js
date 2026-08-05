import { PostProcess, PostProcessType } from "./PostProcess";
export var ToneMappingOperator;
(function (ToneMappingOperator) {
    ToneMappingOperator["None"] = "None";
    ToneMappingOperator["Reinhard"] = "Reinhard";
    ToneMappingOperator["ACES"] = "ACES";
    ToneMappingOperator["Filmic"] = "Filmic";
    ToneMappingOperator["Uncharted2"] = "Uncharted2";
})(ToneMappingOperator || (ToneMappingOperator = {}));
export class ToneMapping extends PostProcess {
    /**
     * HDR exposure değeri
     */
    exposure = 1.0;
    /**
     * Gamma correction
     */
    gamma = 2.2;
    operator = ToneMappingOperator.ACES;
    constructor(options = {}) {
        super({
            type: PostProcessType.ToneMapping,
            enabled: options.enabled
        });
        if (options.operator) {
            this.operator =
                options.operator;
        }
        if (options.exposure !== undefined) {
            this.exposure =
                options.exposure;
        }
        if (options.gamma !== undefined) {
            this.gamma =
                options.gamma;
        }
    }
    process(context) {
        if (!this.enabled) {
            return this.inputTexture;
        }
        const shader = this.getShader();
        if (shader) {
            shader.setUniform("toneMappingExposure", this.exposure);
            shader.setUniform("toneMappingGamma", this.gamma);
            shader.setUniform("toneMappingOperator", this.getOperatorValue());
        }
        return super.process(context);
    }
    setExposure(value) {
        this.exposure =
            Math.max(0, value);
    }
    setGamma(value) {
        this.gamma =
            Math.max(0.1, value);
    }
    setOperator(operator) {
        this.operator =
            operator;
    }
    getOperatorValue() {
        switch (this.operator) {
            case ToneMappingOperator.Reinhard:
                return 1;
            case ToneMappingOperator.ACES:
                return 2;
            case ToneMappingOperator.Filmic:
                return 3;
            case ToneMappingOperator.Uncharted2:
                return 4;
            default:
                return 0;
        }
    }
    getSettings() {
        return {
            operator: this.operator,
            exposure: this.exposure,
            gamma: this.gamma,
            enabled: this.enabled
        };
    }
    toJSON() {
        return {
            ...super.toJSON(),
            operator: this.operator,
            exposure: this.exposure,
            gamma: this.gamma
        };
    }
    static fromJSON(data) {
        return new ToneMapping({
            enabled: data.enabled,
            operator: data.operator,
            exposure: data.exposure,
            gamma: data.gamma
        });
    }
}
//# sourceMappingURL=ToneMapping.js.map