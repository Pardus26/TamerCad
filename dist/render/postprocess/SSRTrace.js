import { Vector2 } from "../../math/Vector2";
import { Vector3 } from "../../math/Vector3";
export var SSRTraceMode;
(function (SSRTraceMode) {
    SSRTraceMode["Linear"] = "Linear";
    SSRTraceMode["BinaryRefined"] = "BinaryRefined";
    SSRTraceMode["HiZ"] = "HiZ";
})(SSRTraceMode || (SSRTraceMode = {}));
export class SSRTrace {
    enabled = true;
    maxSteps = 64;
    binarySearchSteps = 5;
    thickness = 0.05;
    maxDistance = 100;
    mode = SSRTraceMode.BinaryRefined;
    useHiZ = false;
    edgeFade = true;
    roughnessReject = true;
    gBuffer = null;
    depth = null;
    mask = null;
    output = null;
    shader = null;
    frame = null;
    frameIndex = 0;
    constructor(options = {}) {
        this.maxSteps =
            options.maxSteps ??
                this.maxSteps;
        this.binarySearchSteps =
            options.binarySearchSteps ??
                this.binarySearchSteps;
        this.thickness =
            options.thickness ??
                this.thickness;
        this.maxDistance =
            options.maxDistance ??
                this.maxDistance;
        this.enabled =
            options.enabled ??
                this.enabled;
        this.useHiZ =
            options.useHiZ ??
                this.useHiZ;
        this.edgeFade =
            options.edgeFade ??
                this.edgeFade;
        this.roughnessReject =
            options.roughnessReject ??
                this.roughnessReject;
    }
    setGBuffer(buffer) {
        this.gBuffer = buffer;
    }
    setDepthBuffer(buffer) {
        this.depth = buffer;
    }
    setMask(mask) {
        this.mask = mask;
    }
    setOutput(output) {
        this.output = output;
    }
    setShader(shader) {
        this.shader = shader;
    }
    setFrameData(frame) {
        this.frame = frame;
    }
    setFrameIndex(index) {
        this.frameIndex = index;
    }
    /*
    ========================================
    Reflection Vector
    ========================================
    */
    calculateReflection(viewDirection, normal) {
        const dot = viewDirection.x * normal.x +
            viewDirection.y * normal.y +
            viewDirection.z * normal.z;
        return new Vector3(viewDirection.x -
            2.0 * dot * normal.x, viewDirection.y -
            2.0 * dot * normal.y, viewDirection.z -
            2.0 * dot * normal.z);
    }
    /*
    ========================================
    Create SSR Ray
    ========================================
    */
    createRay(position, viewDirection, normal) {
        const reflection = this.calculateReflection(viewDirection, normal);
        return {
            origin: position.clone(),
            direction: reflection.normalize()
        };
    }
    /*
    ========================================
    View Space Position
    ========================================
    */
    projectToScreen(position) {
        if (!this.frame) {
            return null;
        }
        const clip = this.frame.projection.multiplyVector4(position.x, position.y, position.z, 1.0);
        if (clip.w <= 0) {
            return null;
        }
        const ndcX = clip.x / clip.w;
        const ndcY = clip.y / clip.w;
        return new Vector2(ndcX * 0.5 + 0.5, ndcY * 0.5 + 0.5);
    }
    /*
    ========================================
    Screen Bounds
    ========================================
    */
    isInsideScreen(uv) {
        return (uv.x >= 0 &&
            uv.x <= 1 &&
            uv.y >= 0 &&
            uv.y <= 1);
    }
    /*
    ========================================
    Ray Position
    ========================================
    */
    getRayPosition(ray, distance) {
        return new Vector3(ray.origin.x +
            ray.direction.x *
                distance, ray.origin.y +
            ray.direction.y *
                distance, ray.origin.z +
            ray.direction.z *
                distance);
    }
    /*
    ========================================
    Depth Sampling
    ========================================
    */
    sampleDepth(uv) {
        if (!this.depth) {
            return 1.0;
        }
        /*
            Gerçek uygulamada:

            depth texture read

            burada yapılır.
        */
        return 1.0;
    }
    /*
    ========================================
    Depth Hit Test
    ========================================
    */
    checkIntersection(rayPosition, uv) {
        const depth = this.sampleDepth(uv);
        if (depth >= 1.0) {
            return {
                hit: false
            };
        }
        /*
            View depth karşılaştırması

            gerçek GPU implementasyonunda

            depth reconstruction yapılır.
        */
        const rayDepth = Math.abs(rayPosition.z);
        const sceneDepth = depth;
        const difference = sceneDepth -
            rayDepth;
        if (difference >= 0 &&
            difference < this.thickness) {
            return {
                hit: true,
                uv,
                distance: rayDepth
            };
        }
        return {
            hit: false
        };
    }
    /*
    ========================================
    Linear Ray March
    ========================================
    */
    linearMarch(ray) {
        const stepSize = this.maxDistance /
            this.maxSteps;
        let previousDistance = 0;
        for (let i = 0; i < this.maxSteps; i++) {
            const distance = stepSize *
                float(i + 1);
            const position = this.getRayPosition(ray, distance);
            const uv = this.projectToScreen(position);
            if (!uv) {
                continue;
            }
            if (!this.isInsideScreen(uv)) {
                return {
                    hit: false,
                    confidence: 0
                };
            }
            const result = this.checkIntersection(position, uv);
            if (result.hit) {
                return {
                    ...result,
                    confidence: 0.7
                };
            }
            previousDistance =
                distance;
        }
        return {
            hit: false,
            confidence: 0
        };
    }
    /*
    ========================================
    Binary Refinement
    ========================================
    */
    refineHit(ray, startDistance, endDistance) {
        let low = startDistance;
        let high = endDistance;
        let bestUV = null;
        let bestDistance = high;
        for (let i = 0; i < this.binarySearchSteps; i++) {
            const mid = (low +
                high) *
                0.5;
            const position = this.getRayPosition(ray, mid);
            const uv = this.projectToScreen(position);
            if (!uv) {
                break;
            }
            const hit = this.checkIntersection(position, uv);
            if (hit.hit) {
                bestUV = uv;
                bestDistance = mid;
                high = mid;
            }
            else {
                low = mid;
            }
        }
        if (bestUV) {
            return {
                hit: true,
                uv: bestUV,
                distance: bestDistance,
                confidence: 0.9
            };
        }
        return {
            hit: false,
            confidence: 0
        };
    }
    /*
    ========================================
    Hi-Z Trace Placeholder
    ========================================
    */
    hizMarch(ray) {
        if (!this.useHiZ) {
            return {
                hit: false
            };
        }
        /*
            Gerçek Hi-Z:

            depth pyramid

            mip selection

            adaptive step

        */
        return this.linearMarch(ray);
    }
    /*
    ========================================
    Confidence Calculation
    ========================================
    */
    calculateConfidence(hit, ray) {
        if (!hit.hit) {
            return 0;
        }
        let confidence = 1.0;
        /*
        Distance fade
        */
        if (hit.distance) {
            confidence *=
                Math.max(0, 1 -
                    (hit.distance /
                        this.maxDistance));
        }
        /*
        Edge fade
        */
        if (this.edgeFade &&
            hit.uv) {
            const edge = Math.min(hit.uv.x, hit.uv.y, 1 - hit.uv.x, 1 - hit.uv.y);
            confidence *=
                Math.min(1, edge * 10);
        }
        return confidence;
    }
    /*
    ========================================
    Main Trace
    ========================================
    */
    trace(ray) {
        if (!this.enabled) {
            return {
                hit: false,
                confidence: 0
            };
        }
        let result;
        switch (this.mode) {
            case SSRTraceMode.HiZ:
                result =
                    this.hizMarch(ray);
                break;
            case SSRTraceMode.Linear:
                result =
                    this.linearMarch(ray);
                break;
            case SSRTraceMode.BinaryRefined:
            default:
                result =
                    this.linearMarch(ray);
                if (result.hit &&
                    result.distance) {
                    result =
                        this.refineHit(ray, result.distance - 1.0, result.distance);
                }
                break;
        }
        result.confidence =
            this.calculateConfidence(result, ray);
        return result;
    }
    /*
    ========================================
    GPU Execute
    ========================================
    */
    execute(context) {
        if (!this.enabled ||
            !this.shader) {
            return null;
        }
        this.shader.bind();
        this.shader.setUniform?.("uMaxSteps", this.maxSteps);
        this.shader.setUniform?.("uThickness", this.thickness);
        this.shader.setUniform?.("uMaxDistance", this.maxDistance);
        this.shader.setUniform?.("uFrameIndex", this.frameIndex);
        this.shader.setUniform?.("uUseHiZ", this.useHiZ);
        this.shader.setUniform?.("uEdgeFade", this.edgeFade);
        this.output?.bind();
        context.drawFullscreenQuad?.();
        this.output?.unbind();
        this.frameIndex++;
        return {
            type: "SSRTraceResult",
            frame: this.frameIndex
        };
    }
    /*
    ========================================
    Resize
    ========================================
    */
    resize(width, height) {
        this.output?.resize?.(width, height);
    }
    /*
    ========================================
    Reset
    ========================================
    */
    reset() {
        this.gBuffer = null;
        this.depth = null;
        this.mask = null;
        this.output = null;
        this.shader = null;
        this.frame = null;
        this.frameIndex = 0;
    }
    /*
    ========================================
    Debug
    ========================================
    */
    debugInfo() {
        return {
            type: "SSRTrace",
            enabled: this.enabled,
            mode: this.mode,
            maxSteps: this.maxSteps,
            binarySearchSteps: this.binarySearchSteps,
            thickness: this.thickness,
            maxDistance: this.maxDistance,
            useHiZ: this.useHiZ,
            edgeFade: this.edgeFade,
            roughnessReject: this.roughnessReject,
            frame: this.frameIndex
        };
    }
}
//# sourceMappingURL=SSRTrace.js.map