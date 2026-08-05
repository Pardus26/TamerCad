export class TransformGizmo {
    target = null;
    attach(body) {
        this.target = body;
    }
    move(delta) {
        if (!this.target)
            return;
        this.target.transform.position.add(delta);
    }
    rotate(axis, angle) {
        if (!this.target)
            return;
        this.target.transform.rotate(axis, angle);
    }
    detach() {
        this.target = null;
    }
}
//# sourceMappingURL=TransformGizmo.js.map