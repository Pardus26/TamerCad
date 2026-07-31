import {
    SSRBuffer
} from "./SSRBuffer";

import {
    SSRHistoryBuffer
} from "./SSRHistoryBuffer";

import {
    ReflectionProbeBuffer
} from "./ReflectionProbeBuffer";

import {
    EnvironmentMap
} from "./EnvironmentMap";



export interface SSRCompositeOptions {


    fresnelPower?: number;


    reflectionStrength?: number;


    roughnessBlend?: number;


    metallicBoost?: number;


    enabled?: boolean;

}



export enum SSRCompositeMode {


    SSROnly = "SSROnly",


    ProbeOnly = "ProbeOnly",


    Hybrid = "Hybrid"

}



export class SSRComposite {



    public enabled = true;



    /**
     * Fresnel exponent
     */
    public fresnelPower = 5.0;



    /**
     * Genel reflection kuvveti
     */
    public reflectionStrength = 1.0;



    /**
     * Roughness etkisi
     */
    public roughnessBlend = 1.0;



    /**
     * Metal reflection güçlendirme
     */
    public metallicBoost = 1.2;



    public mode:

        SSRCompositeMode =

        SSRCompositeMode.Hybrid;



    private ssr:

        SSRBuffer | null = null;



    private history:

        SSRHistoryBuffer | null = null;



    private probe:

        ReflectionProbeBuffer | null = null;



    private environment:

        EnvironmentMap | null = null;



    constructor(

        options:

            SSRCompositeOptions = {}

    ) {


        if (

            options.fresnelPower !== undefined

        ) {


            this.fresnelPower =

                options.fresnelPower;

        }



        if (

            options.reflectionStrength !== undefined

        ) {


            this.reflectionStrength =

                options.reflectionStrength;

        }



        if (

            options.roughnessBlend !== undefined

        ) {


            this.roughnessBlend =

                options.roughnessBlend;

        }



        if (

            options.metallicBoost !== undefined

        ) {


            this.metallicBoost =

                options.metallicBoost;

        }



        if (

            options.enabled !== undefined

        ) {


            this.enabled =

                options.enabled;

        }

    }





    setSSRBuffer(

        buffer:

            SSRBuffer

    ):void {


        this.ssr =

            buffer;

    }





    setHistoryBuffer(

        buffer:

            SSRHistoryBuffer

    ):void {


        this.history =

            buffer;

    }





    setReflectionProbe(

        buffer:

            ReflectionProbeBuffer

    ):void {


        this.probe =

            buffer;

    }





    setEnvironmentMap(

        environment:

            EnvironmentMap

    ):void {


        this.environment =

            environment;

    }





    fresnel(

        viewDotNormal:number

    ):number {


        return Math.pow(

            1 -

            Math.max(

                0,

                viewDotNormal

            ),

            this.fresnelPower

        );

    }





    calculateReflectionWeight(

        material:any,

        viewAngle:number

    ):number {


        let weight =

            this.reflectionStrength;



        weight *=

            this.fresnel(

                viewAngle

            );



        weight *=

            (

                1 -

                material.roughness *

                this.roughnessBlend

            );



        if (

            material.metallic >

            0.5

        ) {


            weight *=

                this.metallicBoost;

        }



        return weight;

    }





    composite(

        ssrColor:any,

        probeColor:any,

        material:any,

        viewAngle:number

    ):any {


        if (

            !this.enabled

        ) {


            return ssrColor;

        }



        const weight =

            this.calculateReflectionWeight(

                material,

                viewAngle

            );



        switch(

            this.mode

        ) {



            case SSRCompositeMode.SSROnly:


                return {


                    color:

                        ssrColor,


                    weight

                };





            case SSRCompositeMode.ProbeOnly:


                return {


                    color:

                        probeColor,


                    weight

                };





            default:


                return {


                    color:


                        {


                            ssr:

                                ssrColor,


                            probe:

                                probeColor

                        },


                    weight

                };

        }

    }





    reset():

    void {


        this.ssr =

            null;


        this.history =

            null;


        this.probe =

            null;


        this.environment =

            null;

    }





    debugInfo(){


        return {


            type:

                "SSRComposite",


            mode:

                this.mode,


            fresnelPower:

                this.fresnelPower,


            reflectionStrength:

                this.reflectionStrength,


            metallicBoost:

                this.metallicBoost

        };

    }

}