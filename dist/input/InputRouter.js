// src/input/InputRouter.ts
import { PointerType } from "./PointerEvent";
import { GestureType } from "./GestureRecognizer";
import { CameraInputHandler } from "./handlers/CameraInputHandler";
import { SketchInputHandler } from "./handlers/SketchInputHandler";
import { SelectionInputHandler } from "./handlers/SelectionInputHandler";
export var InputMode;
(function (InputMode) {
    InputMode["Select"] = "select";
    InputMode["Sketch"] = "sketch";
    InputMode["Camera"] = "camera";
})(InputMode || (InputMode = {}));
export class InputRouter {
    mode = InputMode.Select;
    camera;
    sketch;
    selection;
    constructor() {
        this.camera =
            new CameraInputHandler();
        this.sketch =
            new SketchInputHandler();
        this.selection =
            new SelectionInputHandler();
    }
    setMode(mode) {
        this.mode =
            mode;
        console.info("[InputRouter] Mode:", mode);
    }
    getMode() {
        return this.mode;
    }
    route(event) {
        /*
            Öncelik:
            Stylus = CAD çizim
        */
        if (event.type ===
            PointerType.Stylus) {
            this.sketch.handlePointer(event);
            return;
        }
        switch (this.mode) {
            case InputMode.Camera:
                this.camera.handlePointer(event);
                break;
            case InputMode.Sketch:
                this.sketch.handlePointer(event);
                break;
            case InputMode.Select:
                this.selection.handlePointer(event);
                break;
        }
    }
    routeGesture(event) {
        switch (event.type) {
            case GestureType.Pan:
            case GestureType.Rotate:
            case GestureType.Zoom:
                this.camera.handleGesture(event);
                break;
            case GestureType.Tap:
                this.selection.handleGesture(event);
                break;
            case GestureType.Stroke:
                this.sketch.handleGesture(event);
                break;
        }
    }
    reset() {
        this.mode =
            InputMode.Select;
    }
    dispose() {
        this.camera.dispose();
        this.sketch.dispose();
        this.selection.dispose();
    }
}
//# sourceMappingURL=InputRouter.js.map