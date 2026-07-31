import {
    SSRBuffer
} from "./SSRBuffer";

import {
    SSRMask
} from "./SSRMask";

import {
    GBuffer
} from "./GBuffer";

import {
    DepthPrepass
} from "./DepthPrepass";



export interface SSRTraceOptions {


    maxSteps?: number;


    binarySearchSteps?: number;


    thickness?: number;


    maxDistance?: number;


    enabled?: boolean;

}



export enum SSRTraceMode {


    Linear = "Linear",


    BinaryRefined = "BinaryRefined",


    HiZ = "HiZ"

}



export interface SSRRay {


    origin: {


        x:number,

        y:number,

        z:number

    };


    direction: {


        x:number,

        y:number,

        z:number

    };

}



export interface SSRHit {


    hit:boolean;


    uv?: {


        x:number,

        y:number

    };


    distance?:number;


    confidence?:number;

}



export class SSRTrace {



    public enabled = true;



    /**
     * Maksimum ray marching adımı
     */
    public maxSteps = 64;



    /**
     * Binary refinement iterasyonu
     */
    public binarySearchSteps = 5;



    /**
     * Surface thickness toleransı
     */
    public thickness = 0.05;



    /**
     * Reflection ray maksimum mesafesi
     */
    public maxDistance = 100;



    public mode:

        SSRTraceMode =

        SSRTraceMode.BinaryRefined;



    private gBuffer:

        GBuffer | null = null;



    private depth:

        DepthPrepass | null = null;



    private mask:

        SSRMask | null = null;



    private output:

        SSRBuffer | null = null;



    constructor(

        options:

            SSRTraceOptions = {}

    ) {


        if (

            options.maxSteps !== undefined

        ) {


            this.maxSteps =

                options.maxSteps;

        }



        if (

            options.binarySearchSteps !== undefined

        ) {


            this.binarySearchSteps =

                options.binarySearchSteps;

        }



        if (

            options.thickness !== undefined

        ) {


            this.thickness =

                options.thickness;

        }



        if (

            options.maxDistance !== undefined

        ) {


            this.maxDistance =

                options.maxDistance;

        }



        if (

            options.enabled !== undefined

        ) {


            this.enabled =

                options.enabled;

        }

    }





    setGBuffer(

        buffer:

            GBuffer

    ):void {


        this.gBuffer =

            buffer;

    }





    setDepthBuffer(

        buffer:

            DepthPrepass

    ):void {


        this.depth =

            buffer;

    }





    setMask(

        mask:

            SSRMask

    ):void {


        this.mask =

            mask;

    }





    setOutput(

        output:

            SSRBuffer

    ):void {


        this.output =

            output;

    }





    trace(

        ray:

            SSRRay

    ):

    SSRHit {


        if (

            !this.enabled

        ) {


            return {


                hit:false,

                confidence:0

            };

        }



        /**
         * GPU shader tarafında:
         *
         * 1. Ray ilerletme
         * 2. Depth karşılaştırma
         * 3. Thickness testi
         * 4. Binary refinement
         */



        return {


            hit:true,


            uv:{


                x:0.5,


                y:0.5


            },


            distance:10,


            confidence:1.0

        };

    }





    linearMarch(

        ray:

            SSRRay

    ):

    SSRHit {


        let distance =

            0;



        for (

            let i = 0;

            i < this.maxSteps;

            i++

        ) {


            distance +=

                this.maxDistance /

                this.maxSteps;



            if (

                distance >

                this.maxDistance

            ) {

                break;

            }

        }



        return {


            hit:false

        };

    }





    refineHit(

        start:number,

        end:number

    ):

    number {


        let result =

            start;



        for (

            let i = 0;

            i < this.binarySearchSteps;

            i++

        ) {


            result =

                (

                    start +

                    end

                )

                *

                0.5;

        }



        return result;

    }





    execute():

    any {


        if (

            !this.output

        ) {


            return null;

        }



        return {


            type:

                "SSRTraceResult",


            mode:

                this.mode,


            steps:

                this.maxSteps

        };

    }





    reset():

    void {


        this.gBuffer =

            null;


        this.depth =

            null;


        this.mask =

            null;


        this.output =

            null;

    }





    debugInfo(){


        return {


            type:

                "SSRTrace",


            mode:

                this.mode,


            maxSteps:

                this.maxSteps,


            thickness:

                this.thickness,


            maxDistance:

                this.maxDistance

        };

    }

}