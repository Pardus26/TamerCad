export enum RenderGraphResourceType {

    Texture = "Texture",

    Buffer = "Buffer",

    Attachment = "Attachment",

    Depth = "Depth"

}



export enum RenderGraphResourceState {

    Undefined = "Undefined",

    Read = "Read",

    Write = "Write",

    ReadWrite = "ReadWrite"

}



export interface RenderGraphResourceDescriptor {


    width?:number;


    height?:number;


    layers?:number;


    mipLevels?:number;


    format?:string;


    samples?:number;


    transient?:boolean;


    imported?:boolean;

}



export interface RenderGraphResourceUsage {


    reads:number;


    writes:number;

}



export class RenderGraphResource {


    public readonly name:string;


    public readonly type:
        RenderGraphResourceType;



    public readonly descriptor:
        RenderGraphResourceDescriptor;



    public state:
        RenderGraphResourceState =
            RenderGraphResourceState.Undefined;



    /**
     * Runtime GPU resource
     *
     * RenderResourceManager
     * tarafından atanır.
     */
    private handle:any = null;



    private producer:
        string | null = null;



    private consumers:
        string[] = [];



    private usage:
        RenderGraphResourceUsage = {

            reads:0,

            writes:0

        };



    constructor(

        name:string,

        type:RenderGraphResourceType,

        descriptor:
            RenderGraphResourceDescriptor = {}

    ){

        this.name =
            name;


        this.type =
            type;


        this.descriptor =
            descriptor;

    }



    // ------------------------------------------------
    // Runtime Handle
    // ------------------------------------------------


    setHandle(

        handle:any

    ):void{

        this.handle =
            handle;

    }



    getHandle():

    any{

        return this.handle;

    }



    // ------------------------------------------------
    // Producer / Consumer
    // ------------------------------------------------


    setProducer(

        passName:string

    ):void{


        this.producer =
            passName;


        this.usage.writes++;

        this.transition(

            RenderGraphResourceState.Write

        );

    }



    getProducer():

    string | null {

        return this.producer;

    }



    addConsumer(

        passName:string

    ):void{


        if(

            !this.consumers.includes(

                passName

            )

        ){

            this.consumers.push(

                passName

            );

        }


        this.usage.reads++;



        if(

            this.state ===

            RenderGraphResourceState.Write

        ){

            this.transition(

                RenderGraphResourceState.ReadWrite

            );

        }
        else{

            this.transition(

                RenderGraphResourceState.Read

            );

        }

    }



    getConsumers():

    readonly string[]{

        return this.consumers;

    }



    // ------------------------------------------------
    // State
    // ------------------------------------------------


    transition(

        next:
            RenderGraphResourceState

    ):void{


        this.state =
            next;

    }



    getState():

    RenderGraphResourceState {

        return this.state;

    }



    getUsage():

    RenderGraphResourceUsage {


        return {

            ...this.usage

        };

    }




    // ------------------------------------------------
    // Helpers
    // ------------------------------------------------


    isTransient():

    boolean{


        return (

            this.descriptor.transient

            ??

            false

        );

    }



    isImported():

    boolean{


        return (

            this.descriptor.imported

            ??

            false

        );

    }



    isAttachment():

    boolean{


        return (

            this.type ===

            RenderGraphResourceType.Attachment

        );

    }



    clearUsage():void{


        this.producer =
            null;


        this.consumers.length =
            0;



        this.usage = {

            reads:0,

            writes:0

        };



        this.state =
            RenderGraphResourceState.Undefined;

    }



    destroy():void{


        this.handle =
            null;


        this.clearUsage();

    }



    // ------------------------------------------------
    // Debug
    // ------------------------------------------------


    debugInfo(){


        return {


            name:
                this.name,


            type:
                this.type,


            state:
                this.state,


            producer:
                this.producer,


            consumers:
                [
                    ...this.consumers
                ],


            usage:
                this.usage,


            descriptor:
                {
                    ...this.descriptor
                },


            hasHandle:
                this.handle !== null

        };

    }


}