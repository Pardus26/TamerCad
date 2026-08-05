// src/input/PointerEvent.ts
export var PointerType;
(function (PointerType) {
    /**
     * Android / Tablet kalemi
     */
    PointerType["Stylus"] = "stylus";
    /**
     * Parmak dokunuşu
     */
    PointerType["Touch"] = "touch";
    /**
     * Mouse / trackpad
     */
    PointerType["Mouse"] = "mouse";
})(PointerType || (PointerType = {}));
export var PointerAction;
(function (PointerAction) {
    PointerAction["Down"] = "down";
    PointerAction["Move"] = "move";
    PointerAction["Up"] = "up";
    PointerAction["Cancel"] = "cancel";
})(PointerAction || (PointerAction = {}));
export function createPointerEvent(action, type, x, y, pressure = 1) {
    return {
        action,
        type,
        position: {
            x,
            y
        },
        pressure,
        timestamp: performance.now()
    };
}
//# sourceMappingURL=PointerEvent.js.map