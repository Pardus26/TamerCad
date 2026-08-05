import { PostProcess, PostProcessType } from "./PostProcess";
export class ColorCorrection extends PostProcess {
    /**
     * Parlaklık
     *
     * 0 = değişmez
     * negatif = karanlık
     * pozitif = aydınlık
     */
    brightness = 0;
    /**
     * Kontrast seviyesi
     */
    contrast = 1;
    /**
     * Renk doygunluğu
     */
    saturation = 1;
    /**
     * Renk exposure
     */
    exposure = 1;
    /**
     * Kelvin sıcaklık kaydırması
     *
     * negatif = soğuk
     * pozitif = sıcak
     */
    temperature = 0;
    constructor(options = {}) {
        super({
            type: PostProcessType.None,
            enabled: options.enabled
        });
        if (options.brightness !== undefined) {
            this.brightness =
                options.brightness;
        }
        if (options.contrast !== undefined) {
            this.contrast =
                options.contrast;
        }
        if (options.saturation !== undefined) {
            this.saturation =
                options.saturation;
        }
        if (options.exposure !== undefined) {
            this.exposure =
                options.exposure;
        }
        if (options.temperature !== undefined) {
            this.temperature =
                options.temperature;
        }
    }
    process(context) {
        // Shader uniform güncellemesi
        // GPU pipeline entegrasyonu burada yapılacak.
    }
}
//# sourceMappingURL=ColorCorrection.js.map