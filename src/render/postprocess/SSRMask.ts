import {
    FrameBuffer,
    FrameBufferAttachment
} from "./FrameBuffer";



export interface SSRMaskOptions {


    width?: number;


    height?: number;


    format?: string;


    roughnessThreshold?: number;


    metallicThreshold?: number;

}



export enum SSRMaskAttachment {


    Mask = "mask",


    Roughness = "roughness",


    MaterialClass = "materialClass"

}



export enum SSRMaterialClass {


    Opaque = 0,


    Metal = 1,


    Glass = 2,


    Coated = 3,


    Emissive = 4

}



export class SSRMask extends FrameBuffer {



    /**
     * SSR aktiflik eşiği
     */
    public roughnessThreshold = 0.75;



    /**
     * Metal kabul eşiği
     */
    public metallicThreshold = 0.5;



    public enabled = true;



    private rendered = false;



    constructor(

        options:

            SSRMaskOptions = {}

    ) {


        super({

            width:

                options.width,


            height:

                options.height,


            attachments:

                SSRMask.createAttachments(

                    options

                )

        });



        if (

            options.roughnessThreshold !== undefined

        ) {


            this.roughnessThreshold =

                options.roughnessThreshold;

        }



        if (

            options.metallicThreshold !== undefined

        ) {


            this.metallicThreshold =

                options.metallicThreshold;

        }

    }





    static createAttachments(

        options:

            SSRMaskOptions

    ):

    FrameBufferAttachment[] {


        return [


            {


                name:

                    SSRMaskAttachment.Mask,


                type:

                    "Texture2D",


                format:

                    options.format ??

                    "R8",


                texture:

                    null

            },


            {


                name:

                    SSRMaskAttachment.Roughness,


                type:

                    "Texture2D",


                format:

                    "R8",


                texture:

                    null

            },


            {


                name:

                    SSRMaskAttachment.MaterialClass,


                type:

                    "Texture2D",


                format:

                    "R8UI",


                texture:

                    null

            }


        ];

    }





    getMaskTexture():

    any {


        return this.getTexture(

            SSRMaskAttachment.Mask

        );

    }





    getRoughnessTexture():

    any {


        return this.getTexture(

            SSRMaskAttachment.Roughness

        );

    }





    getMaterialClassTexture():

    any {


        return this.getTexture(

            SSRMaskAttachment.MaterialClass

        );

    }





    begin():

    void {


        this.rendered = false;

    }





    end():

    void {


        this.rendered = true;

    }





    calculateSSRFactor(

        material:any

    ):number {


        if (

            material.emissive

        ) {


            return 0;

        }



        if (

            material.roughness >

            this.roughnessThreshold

        ) {


            return 0;

        }



        if (

            material.metallic >

            this.metallicThreshold

        ) {


            return 1;

        }



        if (

            material.transparent

        ) {


            return 0.8;

        }



        return 0.3;

    }





    classifyMaterial(

        material:any

    ):

    SSRMaterialClass {


        if (

            material.emissive

        ) {


            return SSRMaterialClass.Emissive;

        }



        if (

            material.transparent

        ) {


            return SSRMaterialClass.Glass;

        }



        if (

            material.metallic >

            this.metallicThreshold

        ) {


            return SSRMaterialClass.Metal;

        }



        return SSRMaterialClass.Opaque;

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



        this.rendered = false;

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

                "SSRMask",


            enabled:

                this.enabled,


            roughnessThreshold:

                this.roughnessThreshold,


            metallicThreshold:

                this.metallicThreshold,


            rendered:

                this.rendered

        };

    }

}