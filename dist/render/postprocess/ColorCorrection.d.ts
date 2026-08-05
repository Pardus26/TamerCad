import { PostProcess } from "./PostProcess";
import { RenderContext } from "../RenderContext";
export interface ColorCorrectionOptions {
    enabled?: boolean;
    brightness?: number;
    contrast?: number;
    saturation?: number;
    exposure?: number;
    temperature?: number;
}
export declare class ColorCorrection extends PostProcess {
    /**
     * Parlaklık
     *
     * 0 = değişmez
     * negatif = karanlık
     * pozitif = aydınlık
     */
    brightness: number;
    /**
     * Kontrast seviyesi
     */
    contrast: number;
    /**
     * Renk doygunluğu
     */
    saturation: number;
    /**
     * Renk exposure
     */
    exposure: number;
    /**
     * Kelvin sıcaklık kaydırması
     *
     * negatif = soğuk
     * pozitif = sıcak
     */
    temperature: number;
    constructor(options?: ColorCorrectionOptions);
    process(context: RenderContext): void;
}
