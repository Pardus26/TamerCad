import {
    FrameBuffer,
    FrameBufferAttachment
} from "./FrameBuffer";



export interface SSRBufferOptions {


    width?: number;


    height?: number;


    colorFormat?: string;


    depthFormat?: string;

}



export enum SSRBufferAttachment {


    Reflection = "reflection",


    HitData = "hitData",


    Blur = "blur"

}



export class SSRBuffer extends FrameBuffer {



    /**
     * Reflection sonucu
     */
    private reflectionTexture:

        any = null;



    constructor(

        options:

            SSRBufferOptions = {}

    ) {


        super({

            width:

                options.width,


            height:

                options.height,


            attachments:

                SSRBuffer.createAttachments(

                    options

                )

        });

    }





    static createAttachments(

        options:

            SSRBufferOptions

    ):

    FrameBufferAttachment[] {


        return [


            {


                name:

                    SSRBufferAttachment.Reflection,


                type:

                    "Texture2D",


                format:

                    options.colorFormat ??

                    "RGBA16F",


                texture:

                    null

            },


            {


                name:

                    SSRBufferAttachment.HitData,


                type:

                    "Texture2D",


                format:

                    "RGBA16F",


                texture:

                    null

            },


            {


                name:

                    SSRBufferAttachment.Blur,


                type:

                    "Texture2D",


                format:

                    "RGBA16F",


                texture:

                    null

            }


        ];

    }





    getReflectionTexture():

    any {


        return this.getTexture(

            SSRBufferAttachment.Reflection

        );

    }





    getHitDataTexture():

    any {


        return this.getTexture(

            SSRBufferAttachment.HitData

        );

    }





    getBlurTexture():

    any {


        return this.getTexture(

            SSRBufferAttachment.Blur

        );

    }





    setReflectionTexture(

        texture:any

    ):void {


        this.reflectionTexture =

            texture;

    }





    getStoredReflection():

    any {


        return this.reflectionTexture;

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



        this.reflectionTexture =

            null;

    }





    resize(

        width:number,

        height:number

    ):void {


        super.resize(

            width,

            height

        );

    }





    debugInfo(){


        return {


            type:

                "SSRBuffer",


            size:{

                width:

                    this.width,


                height:

                    this.height

            },


            attachments:

                this.getAttachments()

                .map(

                    a => a.name

                )

        };

    }

}