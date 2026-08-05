export class CADInteractionController {
    stylus;
    constructor(stylus) {
        this.stylus = stylus;
    }
    update(scene, camera) {
        const input = this.stylus.getState();
        if (!input.isDown)
            return;
        this.processPointer(input.x, input.y, scene, camera);
    }
    processPointer(x, y, scene, camera) {
        /*
            GPU picking

            ObjectID buffer okunacak


        */
        console.log("CAD Pick", x, y);
    }
}
//# sourceMappingURL=CADInteractionController.js.map