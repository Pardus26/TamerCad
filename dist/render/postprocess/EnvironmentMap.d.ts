export interface EnvironmentMapOptions {
    format?: string;
    intensity?: number;
    rotation?: number;
    exposure?: number;
}
export declare enum EnvironmentMapType {
    Cube = "Cube",
    Equirectangular = "Equirectangular",
    HDR = "HDR"
}
export declare class EnvironmentMap {
    type: EnvironmentMapType;
    /**
     * HDR texture
     */
    private texture;
    /**
     * IBL diffuse irradiance
     */
    private irradiance;
    /**
     * Prefiltered specular map
     */
    private prefiltered;
    /**
     * Ortam ışık yoğunluğu
     */
    intensity: number;
    /**
     * Environment rotation
     */
    rotation: number;
    /**
     * HDR exposure
     */
    exposure: number;
    format: string;
    constructor(options?: EnvironmentMapOptions);
    load(source: any, type?: EnvironmentMapType): void;
    generateCubeMap(): void;
    generateIrradiance(): void;
    generatePrefiltered(): void;
    getTexture(): any;
    getIrradiance(): any;
    getPrefiltered(): any;
    setIntensity(value: number): void;
    setRotation(value: number): void;
    setExposure(value: number): void;
    bind(shader: any): void;
    dispose(): void;
    toJSON(): {
        type: EnvironmentMapType;
        format: string;
        intensity: number;
        rotation: number;
        exposure: number;
    };
}
