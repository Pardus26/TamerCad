import { EngineBridge } from "./app/EngineBridge";
console.log("TamerCAD Kernel Boot");
EngineBridge.initialize();
function frame(time) {
    EngineBridge.update(time);
    EngineBridge.render();
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
//# sourceMappingURL=index.js.map