import { Vector3 } from "../math/vector/Vector3";
import { Matrix4 } from "../math/matrix/Matrix4";
export var ProjectionType;
(function (ProjectionType) {
    ProjectionType[ProjectionType["Perspective"] = 0] = "Perspective";
    ProjectionType[ProjectionType["Orthographic"] = 1] = "Orthographic";
})(ProjectionType || (ProjectionType = {}));
export var StandardView;
(function (StandardView) {
    StandardView[StandardView["ISO"] = 0] = "ISO";
    StandardView[StandardView["TOP"] = 1] = "TOP";
    StandardView[StandardView["BOTTOM"] = 2] = "BOTTOM";
    StandardView[StandardView["FRONT"] = 3] = "FRONT";
    StandardView[StandardView["BACK"] = 4] = "BACK";
    StandardView[StandardView["LEFT"] = 5] = "LEFT";
    StandardView[StandardView["RIGHT"] = 6] = "RIGHT";
})(StandardView || (StandardView = {}));
export class RenderCamera {
    projection = ProjectionType.Perspective;
    position = new Vector3(0, 0, 10);
    target = new Vector3(0, 0, 0);
    up = new Vector3(0, 1, 0);
    width = 1;
    height = 1;
    fov = 45 *
        Math.PI /
        180;
    near = 0.01;
    far = 100000;
    orthoHeight = 10;
    distance = 10;
    yaw = 0;
    pitch = 0;
    constructor() {
        this.updateOrbitPosition();
    }
    setViewport(width, height) {
        this.width = Math.max(1, width);
        this.height = Math.max(1, height);
    }
    setAspectRatio(ratio) {
        this.width = ratio;
        this.height = 1;
    }
    getAspectRatio() {
        return this.width /
            this.height;
    }
    setPerspective(fov, near, far) {
        this.projection =
            ProjectionType.Perspective;
        this.fov =
            fov *
                Math.PI /
                180;
        this.near = near;
        this.far = far;
    }
    setOrthographic(height, near, far) {
        this.projection =
            ProjectionType.Orthographic;
        this.orthoHeight = height;
        this.near = near;
        this.far = far;
    }
    getProjection() {
        return this.projection;
    }
    lookAt(position, target, up = new Vector3(0, 1, 0)) {
        this.position =
            position.clone();
        this.target =
            target.clone();
        this.up =
            up.clone();
        this.distance =
            this.position
                .subtract(this.target)
                .length();
    }
    updateOrbitPosition() {
        const cp = Math.cos(this.pitch);
        const sp = Math.sin(this.pitch);
        const cy = Math.cos(this.yaw);
        const sy = Math.sin(this.yaw);
        this.position.x =
            this.target.x +
                this.distance *
                    cp *
                    sy;
        this.position.y =
            this.target.y +
                this.distance *
                    sp;
        this.position.z =
            this.target.z +
                this.distance *
                    cp *
                    cy;
    }
    getViewMatrix() {
        return Matrix4.lookAt(this.position, this.target, this.up);
    }
    getProjectionMatrix() {
        const aspect = this.getAspectRatio();
        if (this.projection ===
            ProjectionType.Perspective) {
            return Matrix4.perspective(this.fov, aspect, this.near, this.far);
        }
        const half = this.orthoHeight * 0.5;
        return Matrix4.orthographic(-half * aspect, half * aspect, -half, half, this.near, this.far);
    }
    worldToScreen(world) {
        const matrix = this.getProjectionMatrix()
            .multiply(this.getViewMatrix());
        const clip = matrix.transformPoint(world);
        return new Vector3((clip.x + 1) * 0.5 * this.width, (1 - clip.y) * 0.5 * this.height, clip.z);
    }
    screenToWorld(x, y, depth) {
        const nx = x /
            this.width *
            2 -
            1;
        const ny = 1 -
            y /
                this.height *
                2;
        const inv = this.getProjectionMatrix()
            .multiply(this.getViewMatrix())
            .inverse();
        return inv.transformPoint(new Vector3(nx, ny, depth));
    }
    pickRay(x, y) {
        const near = this.screenToWorld(x, y, -1);
        const far = this.screenToWorld(x, y, 1);
        return {
            origin: near,
            direction: far
                .subtract(near)
                .normalize()
        };
    }
    isoView() {
        this.yaw =
            Math.PI / 4;
        this.pitch =
            Math.PI / 6;
        this.distance = 10;
        this.updateOrbitPosition();
    }
    topView() {
        this.lookAt(new Vector3(0, this.distance, 0), new Vector3(), new Vector3(0, 0, -1));
    }
    frontView() {
        this.lookAt(new Vector3(0, 0, this.distance), new Vector3());
    }
    rightView() {
        this.lookAt(new Vector3(this.distance, 0, 0), new Vector3());
    }
    fitBounds(min, max) {
        const center = new Vector3((min.x + max.x) * 0.5, (min.y + max.y) * 0.5, (min.z + max.z) * 0.5);
        const size = new Vector3(max.x - min.x, max.y - min.y, max.z - min.z);
        const radius = Math.max(size.length() * 0.5, 0.01);
        this.target = center;
        this.distance =
            radius /
                Math.sin(this.fov * 0.5);
        this.updateOrbitPosition();
    }
    getPosition() {
        return this.position.clone();
    }
    getTarget() {
        return this.target.clone();
    }
    getForward() {
        return this.target
            .subtract(this.position)
            .normalize();
    }
    getRight() {
        return this.getForward()
            .cross(this.up)
            .normalize();
    }
    saveState() {
        return {
            position: this.position.clone(),
            target: this.target.clone(),
            up: this.up.clone(),
            distance: this.distance,
            yaw: this.yaw,
            pitch: this.pitch
        };
    }
    restoreState(state) {
        this.position =
            state.position.clone();
        this.target =
            state.target.clone();
        this.up =
            state.up.clone();
        this.distance =
            state.distance;
        this.yaw =
            state.yaw;
        this.pitch =
            state.pitch;
    }
    // --------------------------------------------------------
    // Interactive Camera Controls
    // Shapr3D Style Navigation
    // --------------------------------------------------------
    orbit(dx, dy) {
        const sensitivity = 0.005;
        this.yaw -= dx * sensitivity;
        this.pitch -= dy * sensitivity;
        const limit = Math.PI * 0.49;
        this.pitch =
            Math.max(-limit, Math.min(limit, this.pitch));
        this.updateOrbitPosition();
    }
    pan(dx, dy) {
        const sensitivity = this.distance * 0.001;
        const right = this.getRight();
        const up = this.up.clone();
        const move = right
            .multiplyScalar(-dx * sensitivity)
            .add(up.multiplyScalar(dy * sensitivity));
        this.target.add(move);
        this.position.add(move);
    }
    zoom(amount) {
        const sensitivity = 0.1;
        this.distance *=
            (1 - amount * sensitivity);
        this.distance =
            Math.max(0.01, Math.min(100000, this.distance));
        this.updateOrbitPosition();
    }
    rotate(angle) {
        this.yaw +=
            angle;
        this.updateOrbitPosition();
    }
    reset() {
        this.target.set(0, 0, 0);
        this.distance =
            10;
        this.yaw =
            0;
        this.pitch =
            0;
        this.up.set(0, 1, 0);
        this.updateOrbitPosition();
    }
    dispose() {
        this.position.set(0, 0, 0);
        this.target.set(0, 0, 0);
    }
}
//# sourceMappingURL=RenderCamera.js.map