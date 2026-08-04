import { RenderContext } from "../RenderContext";


export enum RenderResourceType {

    Texture = "Texture",

    Buffer = "Buffer",

    RenderTarget = "RenderTarget",

    DepthBuffer = "DepthBuffer"

}



export interface RenderResourceDescriptor {


    name:string;


    type:RenderResourceType;


    width?:number;


    height?:number;


    format?:string;


    usage?:string;


    samples?:number;


}



export interface RenderResource {


    id:number;


    name:string;


    type:RenderResourceType;


    descriptor:RenderResourceDescriptor;


    handle:any;


    created:boolean;


}



export class RenderResourceManager {


    private resources:

        Map<number,RenderResource>

        = new Map();



    private nameLookup:

        Map<string,number>

        = new Map();



    private nextId = 1;



    private initialized = false;



    // ------------------------------------------------
    // Lifecycle
    // ------------------------------------------------


    initialize(

        context:RenderContext

    ):void{


        if(this.initialized){

            return;

        }


        this.initialized = true;

    }



    dispose(

        context:RenderContext

    ):void{


        for(

            const resource of

            this.resources.values()

        ){

            this.destroyResource(

                context,

                resource

            );

        }



        this.resources.clear();

        this.nameLookup.clear();


        this.initialized = false;

    }



    // ------------------------------------------------
    // Create
    // ------------------------------------------------


    create(

        context:RenderContext,

        descriptor:RenderResourceDescriptor

    ):RenderResource{


        const existing =

            this.getByName(

                descriptor.name

            );


        if(existing){

            return existing;

        }



        const resource:RenderResource = {


            id:

                this.nextId++,


            name:

                descriptor.name,


            type:

                descriptor.type,


            descriptor,


            handle:

                this.createBackendResource(

                    context,

                    descriptor

                ),


            created:true

        };



        this.resources.set(

            resource.id,

            resource

        );



        this.nameLookup.set(

            resource.name,

            resource.id

        );



        return resource;

    }



    // ------------------------------------------------
    // Lookup
    // ------------------------------------------------


    get(

        id:number

    ):

    RenderResource | null {


        return (

            this.resources.get(id)

            ??

            null

        );

    }



    getByName(

        name:string

    ):

    RenderResource | null {


        const id =

            this.nameLookup.get(

                name

            );


        if(id===undefined){

            return null;

        }


        return this.get(id);

    }



    has(

        name:string

    ):boolean{


        return this.nameLookup.has(

            name

        );

    }



    // ------------------------------------------------
    // Destroy
    // ------------------------------------------------


    destroy(

        context:RenderContext,

        id:number

    ):void{


        const resource =

            this.resources.get(

                id

            );


        if(!resource){

            return;

        }



        this.destroyResource(

            context,

            resource

        );



        this.resources.delete(

            id

        );


        this.nameLookup.delete(

            resource.name

        );

    }




    private destroyResource(

        context:RenderContext,

        resource:RenderResource

    ):void{


        if(

            !resource.created

        ){

            return;

        }



        /*
        
        Backend destroy:

        WebGL:

        deleteTexture()
        deleteBuffer()


        WebGPU:

        texture.destroy()


        Vulkan:

        vkDestroyImage()


        */


        resource.handle = null;

        resource.created = false;

    }



    // ------------------------------------------------
    // Backend
    // ------------------------------------------------


    private createBackendResource(

        context:RenderContext,

        descriptor:RenderResourceDescriptor

    ):any{


        const backend =

            context.getBackend();



        switch(

            backend

        ){

            case "WebGL":

                return this.createWebGLResource(

                    context,

                    descriptor

                );


            case "WebGPU":

                return this.createWebGPUResource(

                    context,

                    descriptor

                );


            default:

                return {

                    placeholder:true,

                    descriptor

                };

        }

    }




    private createWebGLResource(

        context:RenderContext,

        descriptor:RenderResourceDescriptor

    ):any{


        const gl =

            context.getNativeContext();



        if(!gl){

            return null;

        }



        switch(

            descriptor.type

        ){

            case RenderResourceType.Texture:


                return gl.createTexture?.();



            case RenderResourceType.Buffer:


                return gl.createBuffer?.();



            default:

                return {};

        }

    }




    private createWebGPUResource(

        context:RenderContext,

        descriptor:RenderResourceDescriptor

    ):any{


        /*
        
        GPUDevice:

        device.createTexture()

        device.createBuffer()


        */


        return {

            backend:

                "WebGPU",

            descriptor

        };

    }



    // ------------------------------------------------
    // Access
    // ------------------------------------------------


    getHandle(

        name:string

    ):any{


        const resource =

            this.getByName(

                name

            );


        return resource?.handle ?? null;

    }



    getAll():

    readonly RenderResource[] {


        return Array.from(

            this.resources.values()

        );

    }



    // ------------------------------------------------
    // Debug
    // ------------------------------------------------


    debugInfo(){


        return {


            count:

                this.resources.size,


            resources:

                Array.from(

                    this.resources.values()

                )

                .map(

                    r => ({

                        id:r.id,

                        name:r.name,

                        type:r.type,

                        created:r.created

                    })

                )

        };

    }


}