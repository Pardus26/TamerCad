import { Sketch } from "./Sketch";
import { SketchPlane } from "./SketchPlane";
import { SketchSolver } from "./SketchSolver";
import { SketchProfile } from "./SketchProfile";
import { SketchEntity } from "./SketchEntity";
export interface SketchManagerResult {
    success: boolean;
    message?: string;
}
export declare class SketchManager {
    private sketches;
    private activeSketch;
    private validator;
    constructor();
    createSketch(id: string, plane: SketchPlane): Sketch;
    deleteSketch(id: string): boolean;
    getSketch(id: string): Sketch | null;
    getActiveSketch(): Sketch | null;
    activateSketch(id: string): boolean;
    renameSketch(id: string, name: string): boolean;
    solve(sketch?: Sketch): SketchSolver;
    validate(sketch?: Sketch): import("./SketchValidator").ValidationIssue[];
    createProfile(entities: SketchEntity[]): SketchProfile;
    findEntity(entityId: string): SketchEntity | null;
    update(): void;
    listSketches(): Sketch[];
}
