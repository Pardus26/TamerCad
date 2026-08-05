import { TabletStylusInput } from "../../input/TabletStylusInput";
import { RenderCamera } from "../../render/RenderCamera";
import { RenderScene } from "../../render/RenderScene";
export declare class CADInteractionController {
    private readonly stylus;
    constructor(stylus: TabletStylusInput);
    update(scene: RenderScene, camera: RenderCamera): void;
    private processPointer;
}
