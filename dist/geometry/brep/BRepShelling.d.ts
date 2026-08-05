import { BRepSolid } from "./BRepSolid";
import { BRepFace } from "./BRepFace";
export interface ShellingOptions {
    thickness: number;
    removeFaces: BRepFace[];
    inward: boolean;
    tolerance: number;
}
export interface ShellingResult {
    success: boolean;
    solid: BRepSolid | null;
    removedFaces: number;
    warnings: string[];
}
export declare class BRepShelling {
    /**
     * Ana shell operasyonu
     */
    static shell(solid: BRepSolid, options: ShellingOptions): ShellingResult;
    /**
     * Face kaldırma
     */
    static removeFaces(solid: BRepSolid, faces: BRepFace[]): BRepSolid;
    /**
     * İç shell oluşturma
     */
    static createInnerShell(solid: BRepSolid, thickness: number, inward: boolean): BRepSolid;
    /**
     * Duvar yüzeyi oluşturma
     */
    static createWallFaces(solid: BRepSolid, removedFaces: BRepFace[], thickness: number): BRepFace[];
    /**
     * Kalınlık kontrolü
     */
    static validateThickness(solid: BRepSolid, thickness: number): boolean;
    /**
     * Basit hollow
     */
    static hollow(solid: BRepSolid, thickness: number): ShellingResult;
    /**
     * Plastik parça shell
     */
    static plasticShell(solid: BRepSolid, openFace: BRepFace, wall: number): ShellingResult;
    /**
     * Son kontrol
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
