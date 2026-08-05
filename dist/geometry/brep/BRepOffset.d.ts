import { BRepSolid } from "./BRepSolid";
import { BRepShell } from "./BRepShell";
import { BRepFace } from "./BRepFace";
import { BRepSurface } from "../surface/Surface3";
export interface OffsetResult {
    success: boolean;
    solid: BRepSolid | null;
    distance: number;
    warnings: string[];
}
export declare class BRepOffset {
    /**
     * Solid offset
     *
     * Dışa veya içe kalınlık verme
     */
    static offsetSolid(solid: BRepSolid, distance: number): OffsetResult;
    /**
     * Shell offset
     */
    static offsetShell(shell: BRepShell, distance: number): BRepShell;
    /**
     * Face offset
     */
    static offsetFace(face: BRepFace, distance: number): BRepFace;
    /**
     * Thickness işlemi
     *
     * Kapalı solid içine boşluk açma
     */
    static thickness(solid: BRepSolid, wall: number, removeFaces?: BRepFace[]): OffsetResult;
    /**
     * Surface genişletme
     */
    static expandSurface(surface: BRepSurface, distance: number): BRepSurface;
    /**
     * Offset yön kontrolü
     */
    static validateOffset(solid: BRepSolid, distance: number): boolean;
    /**
     * Çoklu face offset
     */
    static offsetFaces(faces: BRepFace[], distance: number): BRepFace[];
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
