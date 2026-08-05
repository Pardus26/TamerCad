import { BRepSolid } from "./BRepSolid";
import { Transform } from "../../math/transform/Transform";
export declare class BRepTransform {
    /**
     * Solid translate
     */
    static translate(solid: BRepSolid, x: number, y: number, z: number): BRepSolid;
    /**
     * Genel transform
     */
    static apply(solid: BRepSolid, transform: Transform): BRepSolid;
    /**
     * Face transform
     */
    private static transformFace;
    /**
     * Vertex transform
     */
    private static transformVertex;
    /**
     * Scale
     */
    static scale(solid: BRepSolid, factor: number): BRepSolid;
    /**
     * X ekseni mirror
     */
    static mirrorX(solid: BRepSolid): BRepSolid;
    /**
     * Y ekseni mirror
     */
    static mirrorY(solid: BRepSolid): BRepSolid;
    /**
     * Z ekseni mirror
     */
    static mirrorZ(solid: BRepSolid): BRepSolid;
    /**
     * Bounding transform bilgisi
     */
    static info(operation: string): {
        engine: string;
        operation: string;
        status: string;
    };
}
