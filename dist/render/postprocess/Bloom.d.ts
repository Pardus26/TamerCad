import { PostProcess, PostProcessType } from "./PostProcess";
import { RenderContext } from "../RenderContext";
export declare enum ToneMappingOperator {
    None = "None",
    Reinhard = "Reinhard",
    ACES = "ACES",
    Filmic = "Filmic",
    Uncharted2 = "Uncharted2"
}
export interface ToneMappingOptions {
    enabled?: boolean;
    operator?: ToneMappingOperator;
    exposure?: number;
    gamma?: number;
}
export declare class ToneMapping extends PostProcess {
    /**
     * HDR exposure değeri
     */
    exposure: number;
    /**
     * Gamma correction
     */
    gamma: number;
    operator: ToneMappingOperator;
    constructor(options?: ToneMappingOptions);
    process(context: RenderContext): any;
    setExposure(value: number): void;
    setGamma(value: number): void;
    setOperator(operator: ToneMappingOperator): void;
    private getOperatorValue;
    getSettings(): {
        operator: ToneMappingOperator;
        exposure: number;
        gamma: number;
        enabled: boolean;
    };
    toJSON(): {
        operator: ToneMappingOperator;
        exposure: number;
        gamma: number;
        enabled: boolean;
        intensity: number;
        type: PostProcessType;
    };
    static fromJSON(data: any): ToneMapping;
}
