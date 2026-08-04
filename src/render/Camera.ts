// src/render/Camera.ts

export enum ProjectionMode {
    PERSPECTIVE = "perspective",
    ORTHOGRAPHIC = "orthographic"
}

export interface Vector3 {

    x: number;
    y: number;
    z: number;
}

export class Camera {

    public position: Vector3;

    public target: Vector3;

    public up: Vector3;

    public projection: ProjectionMode;

    public fieldOfView: number;

    public nearPlane: number;

    public farPlane: number;

    public zoomFactor: number;

    constructor() {

        this.position = {
            x: 250,
            y: 250,
            z: 250
        };

        this.target = {
            x: 0,
            y: 0,
            z: 0
        };

        this.up = {
            x: 0,
            y: 0,
            z: 1
        };

        this.projection =
            ProjectionMode.PERSPECTIVE;

        this.fieldOfView = 45;

        this.nearPlane = 0.1;

        this.farPlane = 100000;

        this.zoomFactor = 1.0;
    }

    /**
     * Orbit
     */
    public orbit(
        deltaYaw: number,
        deltaPitch: number
    ): void {

        /*
            TODO

            Quaternion orbit

            Arcball rotation
        */
    }

    /**
     * Pan
     */
    public pan(
        dx: number,
        dy: number
    ): void {

        this.position.x += dx;
        this.position.y += dy;

        this.target.x += dx;
        this.target.y += dy;
    }

    /**
     * Zoom
     */
    public zoom(delta: number): void {

        this.zoomFactor += delta;

        if (this.zoomFactor < 0.01) {
            this.zoomFactor = 0.01;
        }
    }

    /**
     * Fit View
     */
    public fitToScene(
        radius: number
    ): void {

        this.position = {

            x: radius * 2,

            y: radius * 2,

            z: radius * 2

        };

        this.target = {

            x: 0,

            y: 0,

            z: 0

        };
    }

    /**
     * Ön görünüş
     */
    public front(): void {

        this.position = {

            x: 0,

            y: -500,

            z: 0

        };
    }

    /**
     * Üst görünüş
     */
    public top(): void {

        this.position = {

            x: 0,

            y: 0,

            z: 500

        };
    }

    /**
     * Sağ görünüş
     */
    public right(): void {

        this.position = {

            x: 500,

            y: 0,

            z: 0

        };
    }

    /**
     * İzometrik görünüş
     */
    public isometric(): void {

        this.position = {

            x: 300,

            y: 300,

            z: 300

        };
    }

    /**
     * Perspektif
     */
    public setPerspective(): void {

        this.projection =
            ProjectionMode.PERSPECTIVE;
    }

    /**
     * Ortografik
     */
    public setOrthographic(): void {

        this.projection =
            ProjectionMode.ORTHOGRAPHIC;
    }

    /**
     * View Matrix
     */
    public getViewMatrix(): number[] {

        /*
            TODO

            LookAt Matrix
        */

        return [];
    }

    /**
     * Projection Matrix
     */
    public getProjectionMatrix(
        aspectRatio: number
    ): number[] {

        /*
            TODO

            Perspective

            Orthographic
       