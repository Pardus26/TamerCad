import {
    FrameBuffer,
    FrameBufferAttachment
} from "./FrameBuffer";



export interface SSRHistoryBufferOptions {


    width?: number;


    height?: number;


    format?: string;


    historyCount?: number;

}



export enum SSRHistoryAttachment {


    Reflection = "reflection",


    Confidence = "confidence",


    HitDistance = "hitDistance",


    History = "history"

}



export class SSRHistoryBuffer extends FrameBuffer {



    /**
     * Ping-pong reflection history
     */
    private historyIndex = 0;



    /**
     * Kaç frame reflection tutulacak
     */
    public historyCount = 2;



    public frameIndex = 0;



    private historyTextures:

        any[] = [];



    constructor(

        options:

            SSRHistoryBufferOptions = {}

    ) {


        super({

            width:

                options.width,


            height:

                options.height,


            attachments:

                SSRHistoryBuffer.createAttachments(

                    options

                )

        });



        if (

            options.historyCount !== undefined

        ) {


            this.historyCount =

                Math.max(

                    2,

                    options.historyCount

                );

        }

    }





    static createAttachments(

        options:

            SSRHistoryBufferOptions

    ):

    FrameBufferAttachment[] {


        return [


            {


                name:

                    SSRHistoryAttachment.Reflection,


                type:

                    "Texture2D",


                format:

                    options.format ??

                    "RGBA16F",


                texture:

                    null

            },


            {


                name:

                    SSRHistoryAttachment.Confidence,


                type:

                    "Texture2D",


                format:

                    "R16F",


                texture:

                    null

            },


            {


                name:

                    SSRHistoryAttachment.HitDistance,


                type:

                    "Texture2D",


                format:

                    "R16F",


                texture:

                    null

            },


            {


                name:

                    SSRHistoryAttachment.History,


                type:

                    "Texture2D",


                format:

                    "RGBA16F",


                texture:

                    null

            }


        ];

    }





    override initialize(

        context:any

    ):void {


        super.initialize(

            context

        );


        this.createHistory();

    }





    private createHistory():

    void {


        this.historyTextures = [];



        for (

            let i = 0;

            i < this.historyCount;

            i++

        ) {


            this.historyTextures.push({


                index:

                    i,


                texture:

                    null

            });

        }

    }





    getReflectionTexture():

    any {


        return this.getTexture(

            SSRHistoryAttachment.Reflection

        );

    }





    getConfidenceTexture():

    any {


        return this.getTexture(

            SSRHistoryAttachment.Confidence

        );

    }





    getHitDistanceTexture():

    any {


        return this.getTexture(

            SSRHistoryAttachment.HitDistance

        );

    }





    getCurrentHistory():

    any {


        return this.historyTextures[

            this.historyIndex

        ];

    }





    getPreviousHistory():

    any {


        return this.historyTextures[

            (

                this.historyIndex - 1 +

                this.historyCount

            )

            %

            this.historyCount

        ];

    }





    swap():

    void {


        this.historyIndex =

            (

                this.historyIndex + 1

            )

            %

            this.historyCount;



        this.frameIndex++;

    }





    reset():

    void {


        this.historyIndex = 0;


        this.frameIndex = 0;



        for (

            const history of

            this.historyTextures

        ) {


            history.texture =

                null;

        }

    }





    resize(

        width:number,

        height:number

    ):void {


        super.resize(

            width,

            height

        );


        this.reset();

    }





    clear():

    void {


        for (

            const attachment of

            this.getAttachments()

        ) {


            attachment.texture =

                null;

        }



        this.reset();

    }





    debugInfo(){


        return {


            type:

                "SSRHistoryBuffer",


            historyIndex:

                this.historyIndex,


            frameIndex:

                this.frameIndex,


            historyCount:

                this.historyCount,


            size:{

                width:

                    this.width,


                height:

                    this.height

            }

        };

    }

}