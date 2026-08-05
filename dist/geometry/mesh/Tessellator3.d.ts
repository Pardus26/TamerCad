import { Solid3 } from "../solid/Solid3";
import { Surface3 } from "../surface/Surface3";
import { Mesh3 } from "./Mesh3";
export interface TessellationOptions {
    uSegments: number;
    vSegments: number;
}
export declare class Tessellator3 {
    options: TessellationOptions;
    constructor(options?: TessellationOptions);
    /**
     * Solid → Mesh dönüşümü
     */
    tessellateSolid(solid: Solid3): Mesh3;
    /**
     * Surface → Triangle Mesh
     */
    tessellateSurface(surface: Surface3, mesh: Mesh3): void;
    /**
     * Kalite artırma
     */
    refine(level: number): void;
    /**
     * Hızlı düşük çözünürlük mesh
     */
    static preview(solid: Solid3): Mesh3;
    /**
     * Yüksek kalite üretim mesh
     */
    static production(solid: Solid3): Mesh3;
    /**
     * STL için optimize edilmiş mesh
     */
    static stl(solid: Solid3): Mesh3;
}
