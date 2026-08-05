import { BRepSolid } from "./BRepSolid";
import { BRepVertex } from "./BRepVertex";
import { BRepEdge } from "./BRepEdge";
import { BoxSolid3 } from "../solid/BoxSolid3";
import { CylinderSolid3 } from "../solid/CylinderSolid3";
import { SphereSolid3 } from "../solid/SphereSolid3";
import { LineCurve3 } from "../curve/LineCurve3";
export declare class BRepBuilder {
    /**
     * Box → BRepSolid
     */
    static fromBox(box: BoxSolid3): BRepSolid;
    /**
     * Cylinder → BRepSolid
     */
    static fromCylinder(cylinder: CylinderSolid3): BRepSolid;
    /**
     * Sphere → BRepSolid
     */
    static fromSphere(sphere: SphereSolid3): BRepSolid;
    /**
     * Generic Solid Factory
     */
    static build(solid: any): BRepSolid;
    /**
     * Vertex oluşturucu
     */
    static createVertex(point: any): BRepVertex;
    /**
     * Edge oluşturucu
     */
    static createEdge(start: BRepVertex, end: BRepVertex, curve: LineCurve3): BRepEdge;
    /**
     * Boş BRep solid
     */
    static empty(): BRepSolid;
}
