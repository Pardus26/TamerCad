import { SSRComposite } from "./SSRComposite";

export interface SSRBRDFOptions {
    fresnelBase?: number;
    energyCompensation?: boolean;
    minRoughness?: number;
}

export interface BRDFInput {
    viewDotNormal: number;
    lightDotNormal: number;
    halfDotNormal: number;
    viewDotHalf: number;
    roughness: number;
    metallic: number;
    baseReflectivity?: number;
}

export interface BRDFResult {
    D: number;
    F: number;
    G: number;
    specular: number;
    reflectionWeight: number;
}

export class SSRBRDF {

    public fresnelBase = 0.04;

    public energyCompensation = true;

    public minRoughness = 0.045;

    private composite: SSRComposite | null = null;

    constructor(options: SSRBRDFOptions = {}) {

        if (options.fresnelBase !== undefined) {
            this.fresnelBase = options.fresnelBase;
        }

        if (options.energyCompensation !== undefined) {
            this.energyCompensation = options.energyCompensation;
        }

        if (options.minRoughness !== undefined) {
            this.minRoughness = options.minRoughness;
        }
    }

    setComposite(composite: SSRComposite): void {
        this.composite = composite;
    }

    /**
     * GGX Normal Distribution Function
     */
    distributionGGX(
        nDotH: number,
        roughness: number
    ): number {

        const a = Math.max(
            roughness,
            this.minRoughness
        );

        const a2 = a * a;

        const denom =
            Math.PI *
            Math.pow(
                nDotH * nDotH *
                (a2 - 1) + 1,
                2
            );

        return a2 / Math.max(
            denom,
            1e-6
        );
    }

    /**
     * Fresnel Schlick
     */
    fresnelSchlick(
        cosTheta: number,
        f0: number
    ): number {

        return (
            f0 +
            (1 - f0) *
            Math.pow(
                1 - cosTheta,
                5
            )
        );
    }

    /**
     * Smith GGX Geometry
     */
    geometrySmith(
        nDotV: number,
        nDotL: number,
        roughness: number
    ): number {

        const k =
            Math.pow(
                roughness + 1,
                2
            ) / 8;

        const gv =
            nDotV /
            (
                nDotV *
                (1 - k) +
                k
            );

        const gl =
            nDotL /
            (
                nDotL *
                (1 - k) +
                k
            );

        return gv * gl;
    }

    evaluate(
        input: BRDFInput
    ): BRDFResult {

        const f0 =
            input.baseReflectivity ??
            (
                this.fresnelBase +
                input.metallic *
                (
                    1 -
                    this.fresnelBase
                )
            );

        const D =
            this.distributionGGX(
                input.halfDotNormal,
                input.roughness
            );

        const F =
            this.fresnelSchlick(
                input.viewDotHalf,
                f0
            );

        const G =
            this.geometrySmith(
                input.viewDotNormal,
                input.lightDotNormal,
                input.roughness
            );

        const specular =
            (D * F * G)
            /
            Math.max(
                4 *
                input.viewDotNormal *
                input.lightDotNormal,
                1e-6
            );

        let reflectionWeight =
            specular;

        if (this.energyCompensation) {

            reflectionWeight *=
                (
                    1 -
                    input.roughness *
                    0.5
                );

        }

        return {

            D,

            F,

            G,

            specular,

            reflectionWeight

        };
    }

    debugInfo() {

        return {

            type: "SSRBRDF",

            fresnelBase: this.fresnelBase,

            energyCompensation:
                this.energyCompensation,

            minRoughness:
                this.minRoughness

        };

    }

}