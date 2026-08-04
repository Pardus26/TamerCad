// src/render/Camera.ts

import { Vector3 } from "../math/vector/Vector3";

export class Camera {

    private target = new Vector3(0, 0, 0);

    private position = new Vector3(0, 0, 5);

    private up = new Vector3(0, 1, 0);

    private yaw = 0;

    private pitch = 0;

    private distance = 5;

    private width = 1;

    private height = 1;

    private readonly minDistance = 0.2;

    private readonly maxDistance = 1000;

    constructor() {

        this.updatePosition();
    }

    public setViewport(
        width: number,
        height: number
    ): void {

        this.width = Math.max(width, 1);

        this.height = Math.max(height, 1);
    }

    public orbit(
        dx: number,
        dy: number
    ): void {

        const rotationSpeed = 0.005;

        this.yaw += dx * rotationSpeed;

        this.pitch += dy * rotationSpeed;

        const limit = Math.PI * 0.49;

        if (this.pitch > limit) this.pitch = limit;

        if (this.pitch < -limit) this.pitch = -limit;

        this.updatePosition();
    }

    public pan(
        dx: number,
        dy: number
    ): void {

        const panSpeed = this.distance * 0.001;

        this.target.x -= dx * panSpeed;

        this.target.y += dy * panSpeed;

        this.updatePosition();
    }

    public zoom(
        amount: number
    ): void {

        const zoomSpeed = 0.1;

        this.distance *= (1.0 - amount * zoomSpeed);

        if (this.distance < this.minDistance)
            this.distance = this.minDistance;

        if (this.distance > this.maxDistance)
            this.distance = this.maxDistance;

        this.updatePosition();
    }

    private updatePosition(): void {

        const cp = Math.cos(this.pitch);

        const sp = Math.sin(this.pitch);

        const cy = Math.cos(this.yaw);

        const sy = Math.sin(this.yaw);

        this.position.x =
            this.target.x +
            this.distance * cp * sy;

        this.position.y =
            this.target.y +
            this.distance * sp;

        this.position.z =
            this.target.z +
            this.distance * cp * cy;
    }

    public getPosition(): Vector3 {

        return this.position;
    }

    public getTarget(): Vector3 {

        return this.target;
    }

    public getUp(): Vector3 {

        return this.up;
    }

    public getAspectRatio(): number {

        return this.width / this.height;
    }

    public reset(): void {

        this.target.set(0, 0, 0);

        this.distance = 5;

        this.pitch = 0;

        this.yaw = 0;

        this.updatePosition();
    }

}