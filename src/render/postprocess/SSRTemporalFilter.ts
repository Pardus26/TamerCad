import {
    SSRHistoryBuffer
} from "./SSRHistoryBuffer";

import {
    SSRResolve
} from "./SSRResolve";



export interface SSRTemporalFilterOptions {


    feedback?: number;


    varianceClamp?: number;


    spatialRadius?: number;


    enabled?: boolean;

}



export enum SSRTemporalFilterMode {


    TemporalOnly = "TemporalOnly",


    TemporalSpatial = "TemporalSpatial",


    VarianceGuided = "VarianceGuided"

}



export class SSRTemporalFilter {



    public enabled = true;



    /**
     * History katkısı
     */
    public feedback = 0.92;



    /**
     * Variance clamp değeri
     */
    public varianceClamp = 0.25;



    /**
     * Spatial neighborhood aralığı
     */
    public spatialRadius = 1;



    public mode:

        SSRTemporalFilterMode =

        SSRTemporalFilterMode.VarianceGuided;



    private history:

        SSRHistoryBuffer | null = null;



    private resolve:

        SSRResolve | null = null;



    private frameIndex = 0;



    constructor(

        options:

            SSRTemporalFilterOptions = {}

    ) {


        if (

            options.feedback !== undefined

        ) {

            this.feedback =

                options.feedback;

        }



        if (

            options.varianceClamp !== undefined

        ) {

            this.varianceClamp =

                options.varianceClamp;

        }



        if (

            options.spatialRadius !== undefined

        ) {

            this.spatialRadius =

                options.spatialRadius;

        }



        if (

            options.enabled !== undefined

        ) {

            this.enabled =

                options.enabled;

        }

    }





    setHistoryBuffer(

        buffer:

            SSRHistoryBuffer

    ):void {


        this.history =

            buffer;

    }





    setResolve(

        resolve:

            SSRResolve

    ):void {


        this.resolve =

            resolve;

    }





    filter(

        current:any,

        history:any,

        variance:number

    ):any {


        if (

            !this.enabled

        ) {


            return current;

        }



        let weight =

            this.feedback;



        /**
         * Variance yükselirse
         * eski history azaltılır
         */


        if (

            variance >

            this.varianceClamp

        ) {


            weight *=

                0.5;

        }



        return {


            type:

                "FilteredSSR",


            current,


            history,


            historyWeight:

                weight

        };

    }





    spatialFilter(

        samples:any[]

    ):any {


        /**
         * 3x3 / 5x5 kernel
         *
         * GPU tarafında uygulanır
         */


        return samples[0];

    }





    estimateVariance(

        values:number[]

    ):number {


        if (

            values.length === 0

        ) {


            return 0;

        }



        const mean =

            values.reduce(

                (

                    a,

                    b

                ) =>

                    a + b,

                0

            )

            /

            values.length;



        return values.reduce(

            (

                sum,

                value

            ) =>

                sum +

                Math.pow(

                    value - mean,

                    2

                ),

            0

        )

        /

        values.length;

    }





    update():

    void {


        this.frameIndex++;

    }





    reset():

    void {


        this.frameIndex =

            0;


        this.history =

            null;


        this.resolve =

            null;

    }





    debugInfo(){


        return {


            type:

                "SSRTemporalFilter",


            mode:

                this.mode,


            feedback:

                this.feedback,


            varianceClamp:

                this.varianceClamp,


            frame:

                this.frameIndex

        };

    }

}