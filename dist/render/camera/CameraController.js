import { Vector3 } from "../../math/vector/Vector3";
import { StandardView } from "../RenderCamera";
export class CameraController {
    camera;
    orbitSpeed = 0.005;
    panSpeed = 1.0;
    zoomSpeed = 0.1;
    smoothSpeed = 0.1;
    pivot = new Vector3();
    constructor(camera, options = {}) {
        this.camera =
            camera;
        if (options.orbitSpeed !== undefined) {
            this.orbitSpeed =
                options.orbitSpeed;
        }
        if (options.panSpeed !== undefined) {
            this.panSpeed =
                options.panSpeed;
        }
        if (options.zoomSpeed !== undefined) {
            this.zoomSpeed =
                options.zoomSpeed;
        }
        if (options.smoothSpeed !== undefined) {
            this.smoothSpeed =
                options.smoothSpeed;
        }
    }
    // --------------------------------------------------
    // Orbit
    // --------------------------------------------------
    orbit(deltaX, deltaY) {
        const position = this.camera.getPosition();
        const target = this.camera.getTarget();
        const offset = position
            .subtract(target);
        let radius = offset.length();
        let yaw = Math.atan2(offset.x, offset.z);
        let pitch = Math.asin(offset.y /
            radius);
        yaw +=
            deltaX *
                this.orbitSpeed;
        pitch +=
            deltaY *
                this.orbitSpeed;
        const limit = Math.PI *
            0.49;
        pitch =
            Math.max(-limit, Math.min(limit, pitch));
        const cp = Math.cos(pitch);
        const sp = Math.sin(pitch);
        const cy = Math.cos(yaw);
        const sy = Math.sin(yaw);
        const newPosition = new Vector3(target.x +
            radius *
                cp *
                sy, target.y +
            radius *
                sp, target.z +
            radius *
                cp *
                cy);
        this.camera.lookAt(newPosition, target);
    }
    orbitAroundPoint(deltaX, deltaY, pivot) {
        this.camera.setPivot?.(pivot);
        const oldPosition = this.camera.getPosition();
        const offset = oldPosition
            .subtract(pivot);
        const radius = offset.length();
        let yaw = Math.atan2(offset.x, offset.z);
        let pitch = Math.asin(offset.y /
            radius);
        yaw +=
            deltaX *
                this.orbitSpeed;
        pitch +=
            deltaY *
                this.orbitSpeed;
        const limit = Math.PI *
            0.49;
        pitch =
            Math.max(-limit, Math.min(limit, pitch));
        const cp = Math.cos(pitch);
        const sp = Math.sin(pitch);
        const cy = Math.cos(yaw);
        const sy = Math.sin(yaw);
        const pos = new Vector3(pivot.x +
            radius *
                cp *
                sy, pivot.y +
            radius *
                sp, pivot.z +
            radius *
                cp *
                cy);
        this.camera.lookAt(pos, pivot);
    }
    // --------------------------------------------------
    // Pan
    // --------------------------------------------------
    pan(deltaX, deltaY) {
        const right = this.camera.getRight();
        const up = this.camera.getCameraUp?.()
            ??
                new Vector3(0, 1, 0);
        const distance = this.camera
            .getDistance();
        const speed = distance *
            0.001 *
            this.panSpeed;
        const movement = right
            .multiply(-deltaX *
            speed)
            .add(up.multiply(deltaY *
            speed));
        const target = this.camera
            .getTarget()
            .add(movement);
        const position = this.camera
            .getPosition()
            .add(movement);
        this.camera.lookAt(position, target);
    }
    // --------------------------------------------------
    // Zoom
    // --------------------------------------------------
    zoom(amount) {
        const distance = this.camera
            .getDistance();
        let next = distance *
            (1 -
                amount *
                    this.zoomSpeed);
        next =
            Math.max(0.1, Math.min(100000, next));
        const direction = this.camera
            .getForward()
            .multiply(-next);
        const target = this.camera
            .getTarget();
        this.camera.lookAt(target.add(direction), target);
    }
    // --------------------------------------------------
    // Dolly
    // --------------------------------------------------
    dolly(amount) {
        const direction = this.camera
            .getForward();
        const position = this.camera
            .getPosition()
            .add(direction.multiply(amount));
        this.camera.lookAt(position, this.camera.getTarget());
    }
    // --------------------------------------------------
    // Move parallel
    // --------------------------------------------------
    truck(amount) {
        const movement = this.camera
            .getRight()
            .multiply(amount);
        this.translate(movement);
    }
    pedestal(amount) {
        const movement = this.camera
            .getCameraUp()
            .multiply(amount);
        this.translate(movement);
    }
    translate(offset) {
        const position = this.camera
            .getPosition()
            .add(offset);
        const target = this.camera
            .getTarget()
            .add(offset);
        this.camera.lookAt(position, target);
    }
    // --------------------------------------------------
    // Selection rotation
    // --------------------------------------------------
    rotateAroundSelection(min, max, dx, dy) {
        const center = new Vector3((min.x + max.x) * 0.5, (min.y + max.y) * 0.5, (min.z + max.z) * 0.5);
        this.orbitAroundPoint(dx, dy, center);
    }
    // --------------------------------------------------
    // Smooth camera
    // --------------------------------------------------
    smoothMove(position, target) {
        const currentPosition = this.camera
            .getPosition();
        const currentTarget = this.camera
            .getTarget();
        const nextPosition = currentPosition.add(position
            .subtract(currentPosition)
            .multiply(this.smoothSpeed));
        const nextTarget = currentTarget.add(target
            .subtract(currentTarget)
            .multiply(this.smoothSpeed));
        this.camera.lookAt(nextPosition, nextTarget);
    }
    // --------------------------------------------------
    // Preset Views
    // --------------------------------------------------
    animateToView(view) {
        switch (view) {
            case StandardView.TOP:
                this.camera.topView();
                break;
            case StandardView.FRONT:
                this.camera.frontView();
                break;
            case StandardView.RIGHT:
                this.camera.rightView();
                break;
            case StandardView.LEFT:
                this.camera.leftView();
                break;
            case StandardView.ISO:
                this.camera.isoView();
                break;
            case StandardView.BACK:
                this.camera.backView();
                break;
            case StandardView.BOTTOM:
                this.camera.bottomView();
                break;
        }
    }
}
//# sourceMappingURL=CameraController.js.map