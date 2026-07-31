import {
    SSRBuffer
} from "./SSRBuffer";

import {
    SSRHistoryBuffer
} from "./SSRHistoryBuffer";

import {
    ReactiveMask
} from "./ReactiveMask";



export interface SSRResolveOptions {


    historyWeight?: number;


    confidenceThreshold?: number;


    roughnessFade?: number;


    enabled?: boolean;

}



export enum SSRResolveMode {


    CurrentOnly = "CurrentOnly",


    Temporal = "Temporal",


    Adaptive = "Adaptive"

}



export class SSRResolve {



    public enabled = true;



    /**
     * Önceki reflection katkısı
     */
    public historyWeight = 0.9;



    /**
     * Minimum SSR güven seviyesi
     */
    public confidenceThreshold = 0.2;



    /**
     * Roughness reflection azaltma
     */
    public roughnessFade = 1.0;



    public mode:

        SSRResolveMode =

        SSRResolveMode.Adaptive;



    private ssrBuffer:

        SSRBuffer | null = null;



    private historyBuffer:

        SSRHistoryBuffer | null = null;



    private reactiveMask:

        ReactiveMask | null = null;



    constructor(

        options:

            SSRResolveOptions = {}

    ) {


        if (

            options.historyWeight !== undefined

        ) {

            this.historyWeight =

                options.historyWeight;

        }



        if (

            options.confidenceThreshold !== undefined

        ) {

            this.confidenceThreshold =

                options.confidenceThreshold;

        }



        if (

            options.roughnessFade !== undefined

        ) {

            this.roughnessFade =

                options.roughnessFade;

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


        this.historyBuffer =

            buffer;

    }





    setReactiveMask(

        mask:

            ReactiveMask

    ):void {


        this.reactiveMask =

            mask;

    }





    setMode(

        mode:

            SSRResolveMode

    ):void {


        this.mode =

            mode;

    }





    resolve(

        current:any,

        history:any,

        confidence:number,

        roughness:number

    ):any {


        if (

            !this.enabled

        ) {


            return current;

        }



        let weight =

            this.historyWeight;



        if (

            confidence <

            this.confidenceThreshold

        ) {


            weight = 0;

        }



        weight *=

            (1 -

                roughness *

                this.roughnessFade);



        return {


            current,


            history,


            historyWeight:

                weight,


            result:

                "TemporalSSR"

        };

    }





    rejectHistory(

        reactiveValue:number

    ):boolean {


        return (

            reactiveValue >

            0.5

        );

    }





    reset():

    void {


        this.ssrBuffer =

            null;


        this.historyBuffer =

            null;


        this.reactiveMask =

            null;

    }





    debugInfo(){


        return {


            type:

                "SSRResolve",


            mode:

                this.mode,


            historyWeight:

                this.historyWeight,


            confidenceThreshold:

                this.confidenceThreshold,


            roughnessFade:

                this.roughnessFade

        };

    }

}