import { SSRBuffer } from "./SSRBuffer";
import { SSRMask } from "./SSRMask";
import { GBuffer } from "./GBuffer";
import { DepthPrepass } from "./DepthPrepass";
import { Matrix4 } from "../../math/Matrix4";
import { Vector2 } from "../../math/Vector2";
import { Vector3 } from "../../math/Vector3";
import { ShaderProgram } from "../shader/ShaderProgram";
export interface SSRTraceOptions {
    maxSteps?: number;
    binarySearchSteps?: number;
    thickness?: number;
    maxDistance?: number;
    enabled?: boolean;
    useHiZ?: boolean;
    edgeFade?: boolean;
    roughnessReject?: boolean;
}
export declare enum SSRTraceMode {
    Linear = "Linear",
    BinaryRefined = "BinaryRefined",
    HiZ = "HiZ"
}
export interface SSRRay {
    origin: Vector3;
    direction: Vector3;
}
export interface SSRHit {
    hit: boolean;
    uv?: Vector2;
    distance?: number;
    confidence?: number;
    worldPosition?: Vector3;
}
export interface SSRFrameData {
    projection: Matrix4;
    inverseProjection: Matrix4;
    view: Matrix4;
    inverseView: Matrix4;
    cameraPosition: Vector3;
    resolution: Vector2;
}
export declare class SSRTrace {
    enabled: boolean;
    maxSteps: number;
    binarySearchSteps: number;
    thickness: number;
    maxDistance: number;
    mode: SSRTraceMode;
    useHiZ: boolean;
    edgeFade: boolean;
    roughnessReject: boolean;
    private gBuffer;
    private depth;
    private mask;
    private output;
    private shader;
    private frame;
    private frameIndex;
    constructor(options?: SSRTraceOptions);
    setGBuffer(buffer: GBuffer): void;
    setDepthBuffer(buffer: DepthPrepass): void;
    setMask(mask: SSRMask): void;
    setOutput(output: SSRBuffer): void;
    setShader(shader: ShaderProgram): void;
    setFrameData(frame: SSRFrameData): void;
    setFrameIndex(index: number): void;
    calculateReflection(viewDirection: Vector3, normal: Vector3): Vector3;
    createRay(position: Vector3, viewDirection: Vector3, normal: Vector3): SSRRay;
    projectToScreen(position: Vector3): Vector2 | null;
    isInsideScreen(uv: Vector2): boolean;
    getRayPosition(ray: SSRRay, distance: number): Vector3;
    sampleDepth(uv: Vector2): number;
    checkIntersection(rayPosition: Vector3, uv: Vector2): SSRHit;
    linearMarch(ray: SSRRay): SSRHit;
    refineHit(ray: SSRRay, startDistance: number, endDistance: number): SSRHit;
    hizMarch(ray: SSRRay): SSRHit;
    calculateConfidence(hit: SSRHit, ray: SSRRay): number;
    trace(ray: SSRRay): SSRHit;
    execute(context: any): any;
    resize(width: number, height: number): void;
    reset(): void;
    debugInfo(): {
        type: string;
        enabled: boolean;
        mode: SSRTraceMode;
        maxSteps: number;
        binarySearchSteps: number;
        thickness: number;
        maxDistance: number;
        useHiZ: boolean;
        edgeFade: boolean;
        roughnessReject: boolean;
        frame: number;
    };
}
