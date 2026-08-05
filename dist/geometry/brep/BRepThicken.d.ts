import { Surface3 } from "../surface/Surface3";
import { BRepSolid } from "./BRepSolid";
import { BRepShell } from "./BRepShell";
import { BRepFace } from "./BRepFace";
export interface ThickenOptions {
    distance: number;
    inward: boolean;
    closeBoundaries: boolean;
    tolerance: number;
}
export interface ThickenResult {
    success: boolean;
    solid: BRepSolid | null;
    thickness: number;
    warnings: string[];
}
export declare class BRepThicken {
    /**
     * Ana surface-to-solid işlemi
     */
    static thicken(surface: Surface3, options: ThickenOptions): ThickenResult;
    /**
     * Surface offset oluşturma
     */
    static offsetSurface(surface: Surface3, distance: number, inward: boolean): Surface3;
    /**
     * Shell oluşturma
     */
    static createShell(surface: Surface3, options: ThickenOptions): BRepShell;
    /**
     * Boundary duvarları
     */
    static createSideWalls(surface: Surface3, offset: Surface3): BRepFace[];
    /**
     * Açıklıkları kapatma
     */
    static closeBoundaries(shell: BRepShell): BRepShell;
    /**
     * Shell → Solid dönüşümü
     */
    static shellToSolid(shell: BRepShell): BRepSolid;
    /**
     * Sheet metal kalınlığı
     */
    static sheetThickness(surface: Surface3, thickness: number): ThickenResult;
    /**
     * Katı kontrolü
     */
    static validate(solid: BRepSolid): boolean;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
