import { Surface } from "../../geometry/surface/Surface";
import { Wire } from "./Wire";
import { Edge } from "./Edge";
import { HalfEdge } from "./HalfEdge";
export declare class Face {
    surface: Surface | null;
    outerWire: Wire;
    innerWires: Wire[];
    reversed: boolean;
    constructor(surface: Surface | null, outerWire: Wire);
    addInnerWire(wire: Wire): void;
    removeInnerWire(wire: Wire): boolean;
    getOuterWire(): Wire;
    getInnerWires(): Wire[];
    getWires(): Wire[];
    getEdges(): Edge[];
    getHalfEdges(): HalfEdge[];
    normalAt(u: number, v: number): any;
    area(): number;
    reverse(): Face;
    containsEdge(edge: Edge): boolean;
    clone(): Face;
    isValid(): boolean;
}
