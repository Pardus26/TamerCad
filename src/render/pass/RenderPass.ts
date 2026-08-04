export interface RenderResourceAccess {

    reads: string[];

    writes: string[];

}



export interface RenderPassOptions {

    name?: string;

    priority?: number;

    enabled?: boolean;

    clearColor?: boolean;

    clearDepth?: boolean;

}



export abstract class RenderPass {


    public readonly name:string;


    public priority:number = 0;


    public enabled:boolean = true;


    public clearColor:boolean = false;


    public clearDepth:boolean = false;



    constructor(
        options:RenderPassOptions={}
    ){

        this.name =
            options.name ??
            this.constructor.name;


        this.priority =
            options.priority ?? 0;


        this.enabled =
            options.enabled ?? true;


        this.clearColor =
            options.clearColor ?? false;


        this.clearDepth =
            options.clearDepth ?? false;

    }



    initialize(
        context:RenderContext
    ):void
    {

        this.onInitialize(context);

    }



    dispose(
        context:RenderContext
    ):void
    {

        this.onDispose(context);

    }





    render(
        context:RenderContext,
        scene:RenderScene,
        camera:RenderCamera
    ):void
    {

        if(!this.enabled)
            return;


        this.begin(context);


        this.execute(
            context,
            scene,
            camera
        );


        this.end(context);

    }






    reads():string[]
    {
        return [];
    }



    writes():string[]
    {
        return [];
    }






    protected begin(
        context:RenderContext
    ):void
    {

        if(
            this.clearColor ||
            this.clearDepth
        )
        {

            context.clear({

                color:this.clearColor,

                depth:this.clearDepth

            });

        }

    }




    protected end(
        context:RenderContext
    ):void
    {}



    protected onInitialize(
        context:RenderContext
    ):void
    {}



    protected onDispose(
        context:RenderContext
    ):void
    {}



    protected abstract execute(
        context:RenderContext,
        scene:RenderScene,
        camera:RenderCamera
    ):void;

}