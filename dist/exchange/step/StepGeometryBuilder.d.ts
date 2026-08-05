import { BRepModel } from "../../topology/brep/BRepModel";
import { StepEntity } from "./StepEntity";
export declare class StepGeometryBuilder {
    private readonly model;
    private points;
    constructor(model?: BRepModel);
    build(entities: StepEntity[]): BRepModel;
    private dispatch;
    private buildPoint;
    private buildDirection;
    private buildVector;
    private buildLine;
    private buildCircle;
    private buildPlane;
}
