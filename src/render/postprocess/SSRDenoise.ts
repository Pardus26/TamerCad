import {
    SSRBuffer
} from "./SSRBuffer";

import {
    SSRHistoryBuffer
} from "./SSRHistoryBuffer";

import {
    NormalPrepass
} from "./NormalPrepass";

import {
    DepthPrepass
} from "./DepthPrepass";



export interface SSRDenoiseOptions {


    radius?: number;


    iterations?: number;


    normalThreshold?: number;


    depthThreshold?: number;


    enabled?: boolean;

}



export enum SSRDenoiseMode {


    Gaussian = "Gaussian",


    Bilateral = "Bilateral",


    EdgeAware = "EdgeAware"

}



export class SSRDenoise {



    public enabled = true;



    /**
     * Kernel yarıçapı
     */
    public radius = 2;



    /**
     * Filter tekrar sayısı
     */
    public iterations = 2;



    /**
     * Normal fark toleransı
     */
    public normalThreshold = 0.15;



    /**
     * Depth fark toleransı
     */
    public depthThreshold = 0.01;



    public mode:

        SSRDenoiseMode =

        SSRDenoiseMode.EdgeAware;



    private ssrBuffer:

        SSRBuffer | null = null;



    private history:

        SSRHistoryBuffer | null = null;



    private normal:

        NormalPrepass | null = null;



    private depth:

        DepthPrepass | null = null;



    constructor(

        options:

            SSRDenoiseOptions = {}

    ) {


        if (

            options.radius !== undefined

        ) {


            this.radius =

                options.radius;

        }



        if (

            options.iterations !== undefined

        ) {


            this.iterations =

                options.iterations;

        }



        if (

            options.normalThreshold !== undefined

        ) {


            this.normalThreshold =

                options.normalThreshold;

        }



        if (

            options.depthThreshold !== undefined

        ) {


            this.depthThreshold =

                options.depthThreshold;

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


        this.ssrBuffer =

            buffer;

    }





    setHistoryBuffer(

        buffer:

            SSRHistoryBuffer

    ):void {


        this.history =

            buffer;

    }





    setNormalBuffer(

        buffer:

            NormalPrepass

    ):void {


        this.normal =

            buffer;

    }





    setDepthBuffer(

        buffer:

            DepthPrepass

    ):void {


        this.depth =

            buffer;

    }





    private bilateralWeight(

        normalDiff:number,

        depthDiff:number

    ):number {


        if (

            Math.abs(

                normalDiff

            )

            >

            this.normalThreshold

        ) {


            return 0;

        }



        if (

            Math.abs(

                depthDiff

            )

            >

            this.depthThreshold

        ) {


            return 0;

        }



        return 1.0;

    }





    denoise(

        reflection:any

    ):any {


        if (

            !this.enabled

        ) {


            return reflection;

        }



        return {


            type:

                "DenoisedSSR",


            radius:

                this.radius,


            iterations:

                this.iterations,


            mode:

                this.mode,


            input:

                reflection

        };

    }





    execute():

    any {


        if (

            !this.ssrBuffer

        ) {


            return null;

        }



        return this.denoise(

            this.ssrBuffer.getReflectionTexture()

        );

    }





    reset():

    void {


        this.ssrBuffer =

            null;


        this.history =

            null;


        this.normal =

            null;


        this.depth =

            null;

    }





    debugInfo(){


        return {


            type:

                "SSRDenoise",


            mode:

                this.mode,


            radius:

                this.radius,


            iterations:

                this.iterations,


            normalThreshold:

                this.normalThreshold,


            depthThreshold:

                this.depthThreshold

        };

    }

}