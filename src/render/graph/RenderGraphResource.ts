// src/render/graph/RenderGraphResource.ts


export enum RenderGraphResourceType {


    Texture = "Texture",


    Buffer = "Buffer",


    Depth = "Depth",


    RenderTarget = "RenderTarget",


    Storage = "Storage"



}







export interface RenderGraphResourceDescriptor {


    width?:number;


    height?:number;


    format?:string;


    mipLevels?:number;


    size?:number;


    usage?:string[];


}









export class RenderGraphResource {





    public readonly name:string;



    public readonly type:

        RenderGraphResourceType;





    public readonly descriptor:

        RenderGraphResourceDescriptor;







    private producer:

        string | null = null;





    private readonly consumers:

        string[] = [];









    constructor(

        name:string,

        type:

            RenderGraphResourceType,

        descriptor:

            RenderGraphResourceDescriptor = {}

    ){


        this.name = name;


        this.type = type;


        this.descriptor = descriptor;


    }









    // ==================================================
    // Producer
    // ==================================================


    public setProducer(

        passName:string

    ):void {



        this.producer = passName;


    }









    public getProducer():

    string | null {


        return this.producer;


    }









    // ==================================================
    // Consumers
    // ==================================================


    public addConsumer(

        passName:string

    ):void {



        if(

            !this.consumers.includes(passName)

        ){


            this.consumers.push(

                passName

            );


        }


    }









    public getConsumers():

    readonly string[] {


        return this.consumers;


    }









    // ==================================================
    // Lifetime helpers
    // ==================================================


    public isProduced():boolean {


        return this.producer !== null;


    }







    public isConsumed():boolean {


        return this.consumers.length > 0;


    }









    // ==================================================
    // Reset
    // ==================================================


    public clearUsage():void {



        this.producer = null;


        this.consumers.length = 0;


    }









    // ==================================================
    // Debug
    // ==================================================


    public debugInfo(){



        return {


            name:

                this.name,



            type:

                this.type,



            descriptor:

                this.descriptor,



            producer:

                this.producer,



            consumers:

                [

                    ...this.consumers

                ]


        };


    }



}