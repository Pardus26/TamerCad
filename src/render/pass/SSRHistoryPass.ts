
import {
    SSRBuffer
} from "../postprocess/SSRBuffer";


import {
    SSRHistoryBuffer
} from "../postprocess/SSRHistoryBuffer";


import {
    FrameBuffer
} from "../postprocess/FrameBuffer";





export interface SSRHistoryPassOptions {


    feedback?:number;


    confidenceThreshold?:number;


    enabled?:boolean;


}





export enum SSRHistoryPassMode {


    Replace =

        "Replace",



    Accumulate =

        "Accumulate",



    Adaptive =

        "Adaptive"


}





export interface SSRHistorySample {


    reflection:any;


    confidence:number;


    hitDistance:number;


}





export class SSRHistoryPass {



    public enabled = true;



    /**
     * Temporal feedback
     */
    public feedback = 0.92;



    /**
     * Minimum confidence
     */
    public confidenceThreshold = 0.2;




    public mode:

        SSRHistoryPassMode =

        SSRHistoryPassMode.Adaptive;





    private ssrBuffer:

        SSRBuffer | null = null;





    private historyBuffer:

        SSRHistoryBuffer | null = null;





    private output:

        FrameBuffer | null = null;





    private frameIndex = 0;





    constructor(

        options:

            SSRHistoryPassOptions = {}

    ){



        if (

            options.feedback !== undefined

        ){



            this.feedback =

                options.feedback;


        }





        if (

            options.confidenceThreshold !== undefined

        ){



            this.confidenceThreshold =

                options.confidenceThreshold;


        }





        if (

            options.enabled !== undefined

        ){



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





    setOutput(

        output:

            FrameBuffer

    ):void {



        this.output =

            output;


    }

/*
========================================
Feedback Calculation
========================================
*/

    private calculateFeedback(

        confidence:number

    ):number {



        if (

            confidence <

            this.confidenceThreshold

        ){



            return 0;


        }





        return Math.max(

            0,

            Math.min(

                1,

                this.feedback *

                confidence

            )

        );


    }





/*
========================================
Reflection Blend
========================================
*/

    private blendReflection(

        current:any,

        history:any,

        weight:number

    ):any {



        if (

            weight <= 0 ||

            !history

        ){



            return current;


        }





        return {


            type:

                "TemporalBlend",



            current,



            history,



            weight



        };


    }





/*
========================================
Adaptive History Accumulation
========================================
*/

    accumulate(

        sample:

            SSRHistorySample

    ):any {



        if (

            !this.enabled

        ){



            return sample.reflection;


        }





        if (

            !this.historyBuffer

        ){



            return sample.reflection;


        }





        const previous =

            this.historyBuffer

                .getPreviousHistory();





        let historyWeight =

            this.calculateFeedback(

                sample.confidence

            );





        if (

            this.mode ===

            SSRHistoryPassMode.Replace

        ){



            historyWeight = 0;


        }





        if (

            this.mode ===

            SSRHistoryPassMode.Accumulate

        ){



            historyWeight =

                this.feedback;


        }





        const result =

            this.blendReflection(

                sample.reflection,

                previous.reflection,

                historyWeight

            );





        this.historyBuffer

            .storeCurrent({


                reflection:

                    result,



                confidence:

                    sample.confidence,



                hitDistance:

                    sample.hitDistance


            });





        return result;


    }





/*
========================================
Write History
========================================
*/

    writeHistory(

        reflection:any,

        confidence:number,

        distance:number

    ):void {



        if (

            !this.historyBuffer

        ){



            return;


        }





        this.historyBuffer

            .storeCurrent({


                reflection,



                confidence,



                hitDistance:

                    distance



            });


    }





/*
========================================
Read Previous History
========================================
*/

    getPreviousReflection():

    any {



        if (

            !this.historyBuffer

        ){



            return null;


        }





        return this.historyBuffer

            .getPreviousHistory()

            .reflection;


    }





    hasHistory():

    boolean {



        if (

            !this.historyBuffer

        ){



            return false;


        }





        return this.historyBuffer

            .hasPrevious();


    }

/*
========================================
Depth Rejection
========================================
*/

    private rejectDepth(

        currentDepth:number,

        historyDepth:number,

        threshold:number = 0.01

    ):boolean {



        return (

            Math.abs(

                currentDepth -

                historyDepth

            )

            >

            threshold

        );


    }





/*
========================================
Normal Rejection
========================================
*/

    private rejectNormal(

        currentNormal:any,

        historyNormal:any,

        threshold:number = 0.15

    ):boolean {



        if (

            !currentNormal ||

            !historyNormal

        ){



            return true;


        }





        const dot =

            currentNormal.x *

            historyNormal.x

            +

            currentNormal.y *

            historyNormal.y

            +

            currentNormal.z *

            historyNormal.z;





        return (

            dot <

            1 -

            threshold

        );


    }





/*
========================================
Motion Rejection
========================================
*/

    private rejectMotion(

        motion:any,

        threshold:number = 0.5

    ):boolean {



        if (

            !motion

        ){



            return true;


        }





        const length =

            Math.sqrt(

                motion.x *

                motion.x

                +

                motion.y *

                motion.y

            );





        return (

            length >

            threshold

        );


    }





/*
========================================
History Validation
========================================
*/

    validateHistory(

        currentDepth?:number,

        historyDepth?:number,

        currentNormal?:any,

        historyNormal?:any,

        motion?:any

    ):boolean {



        if (

            !this.historyBuffer

        ){



            return false;


        }





        if (

            !this.historyBuffer

                .hasPrevious()

        ){



            return false;


        }





        if (

            currentDepth !== undefined &&

            historyDepth !== undefined

        ){



            if (

                this.rejectDepth(

                    currentDepth,

                    historyDepth

                )

            ){



                return false;


            }


        }





        if (

            currentNormal &&

            historyNormal

        ){



            if (

                this.rejectNormal(

                    currentNormal,

                    historyNormal

                )

            ){



                return false;


            }


        }





        if (

            motion

        ){



            if (

                this.rejectMotion(

                    motion

                )

            ){



                return false;


            }


        }





        return true;


    }





/*
========================================
Temporal Resolve
========================================
*/

    resolveTemporal(

        sample:

            SSRHistorySample,

        validation:boolean

    ):any {



        if (

            !validation

        ){



            this.historyBuffer

                ?.invalidateHistory();





            return sample.reflection;


        }





        return this.accumulate(

            sample

        );


    }





/*
========================================
Adaptive Confidence
========================================
*/

    calculateConfidence(

        sample:

            SSRHistorySample

    ):number {



        let confidence =

            sample.confidence;





        if (

            sample.hitDistance >

            50

        ){



            confidence *= 0.5;


        }





        return Math.max(

            0,

            Math.min(

                1,

                confidence

            )

        );


    }

/*
========================================
Frame Begin
========================================
*/

    begin():

    void {



        if (

            !this.enabled

        ){



            return;


        }





        this.historyBuffer

            ?.beginFrame();


    }





/*
========================================
Frame End
========================================
*/

    end():

    void {



        if (

            !this.enabled

        ){



            return;


        }





        this.historyBuffer

            ?.endFrame();



        this.frameIndex++;


    }





/*
========================================
Execute Render Pass
========================================
*/

    execute(

        sample:

            SSRHistorySample,

        validation:boolean = true

    ):any {



        if (

            !this.enabled

        ){



            return sample.reflection;


        }





        const confidence =

            this.calculateConfidence(

                sample

            );





        const result =

            this.resolveTemporal(

                {


                    reflection:

                        sample.reflection,



                    confidence,



                    hitDistance:

                        sample.hitDistance


                },

                validation

            );





        this.writeHistory(

            result,

            confidence,

            sample.hitDistance

        );





        return {


            type:

                "SSRHistoryResult",



            reflection:

                result,



            confidence,



            frame:

                this.frameIndex


        };


    }





/*
========================================
RenderGraph Execute
========================================
*/

    render():

    any {



        if (

            !this.ssrBuffer

        ){



            return null;


        }





        const sample:

            SSRHistorySample = {


                reflection:

                    this.ssrBuffer

                        .getReflectionTexture(),



                confidence:

                    this.ssrBuffer

                        .getConfidenceTexture(),



                hitDistance:

                    this.ssrBuffer

                        .getHitDistanceTexture()


            };





        return this.execute(

            sample

        );


    }





/*
========================================
Resize
========================================
*/

    resize(

        width:number,

        height:number

    ):void {



        this.output

            ?.resize(

                width,

                height

            );





        this.historyBuffer

            ?.resize(

                width,

                height

            );


    }





/*
========================================
Clear
========================================
*/

    clear():

    void {



        this.ssrBuffer =

            null;



        this.output =

            null;



        this.historyBuffer

            ?.clear();



    }





/*
========================================
Frame Index
========================================
*/

    getFrameIndex():

    number {



        return this.frameIndex;


    }

/*
========================================
Reset
========================================
*/

    reset():

    void {



        this.frameIndex =

            0;



        this.historyBuffer

            ?.reset();



    }





/*
========================================
Release
========================================
*/

    release():

    void {



        this.clear();



        this.historyBuffer

            ?.release();



    }





/*
========================================
Enable Control
========================================
*/

    setEnabled(

        enabled:boolean

    ):void {



        this.enabled =

            enabled;


    }





    isEnabled():

    boolean {



        return this.enabled;


    }





/*
========================================
Configuration
========================================
*/

    setFeedback(

        value:number

    ):void {



        this.feedback =

            Math.max(

                0,

                Math.min(

                    1,

                    value

                )

            );


    }





    setConfidenceThreshold(

        value:number

    ):void {



        this.confidenceThreshold =

            value;


    }





/*
========================================
Statistics
========================================
*/

    getStats()

    {


        return {


            type:

                "SSRHistoryPass",



            enabled:

                this.enabled,



            mode:

                this.mode,



            feedback:

                this.feedback,



            confidenceThreshold:

                this.confidenceThreshold,



            frame:

                this.frameIndex,



            hasHistory:

                this.hasHistory()



        };


    }





/*
========================================
Debug Info
========================================
*/

    debugInfo()

    {


        return {


            type:

                "SSRHistoryPass",



            mode:

                this.mode,



            enabled:

                this.enabled,



            feedback:

                this.feedback,



            confidenceThreshold:

                this.confidenceThreshold,



            frameIndex:

                this.frameIndex,



            history:

                this.historyBuffer

                    ?.debugInfo()



        };


    }


}