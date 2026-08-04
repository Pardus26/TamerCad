import { RenderCamera } from "./RenderCamera";


export interface ViewportRectangle {

    x:number;

    y:number;

    width:number;

    height:number;

}


export interface ViewportState {

    rectangle:ViewportRectangle;

    pixelRatio:number;

    enabled:boolean;

}



export class RenderViewport {


    private readonly camera:
        RenderCamera;



    private rectangle:
        ViewportRectangle = {

            x:0,

            y:0,

            width:800,

            height:600

        };



    private pixelRatio =
        1.0;



    private enabled =
        true;



    constructor(

        camera:RenderCamera,

        width=800,

        height=600

    ){

        this.camera =
            camera;


        this.resize(

            width,

            height

        );

    }



    // --------------------------------------------
    // Size
    // --------------------------------------------


    resize(

        width:number,

        height:number

    ):void{


        this.rectangle.width =
            Math.max(

                1,

                width

            );


        this.rectangle.height =
            Math.max(

                1,

                height

            );



        this.camera.setViewport(

            this.rectangle.width *

            this.pixelRatio,


            this.rectangle.height *

            this.pixelRatio

        );

    }



    setPosition(

        x:number,

        y:number

    ):void{


        this.rectangle.x = x;

        this.rectangle.y = y;

    }



    setPixelRatio(

        ratio:number

    ):void{


        this.pixelRatio =
            Math.max(

                0.1,

                ratio

            );


        this.resize(

            this.rectangle.width,

            this.rectangle.height

        );

    }



    getPixelRatio():

    number {

        return this.pixelRatio;

    }



    getWidth():

    number {

        return this.rectangle.width;

    }



    getHeight():

    number {

        return this.rectangle.height;

    }



    getAspectRatio():

    number {

        return (

            this.rectangle.width /

            this.rectangle.height

        );

    }



    getRectangle():

    ViewportRectangle {

        return {

            ...this.rectangle

        };

    }



    // --------------------------------------------
    // Enable
    // --------------------------------------------


    enable():void{

        this.enabled = true;

    }



    disable():void{

        this.enabled = false;

    }



    isEnabled():

    boolean {

        return this.enabled;

    }



    // --------------------------------------------
    // GPU Apply
    // --------------------------------------------


    apply(

        nativeContext:any

    ):void{


        if(

            !this.enabled

        ){

            return;

        }



        if(

            !nativeContext

        ){

            return;

        }



        /*
        
        WebGL:

        gl.viewport(
            x,
            y,
            width,
            height
        )


        WebGPU:

        viewport state


        Vulkan:

        VkViewport


        */


        const x =
            this.rectangle.x *
            this.pixelRatio;


        const y =
            this.rectangle.y *
            this.pixelRatio;


        const width =
            this.rectangle.width *
            this.pixelRatio;


        const height =
            this.rectangle.height *
            this.pixelRatio;



        const gl =
            nativeContext;



        if(

            gl.viewport

        ){

            gl.viewport(

                x,

                y,

                width,

                height

            );

        }

    }




    // --------------------------------------------
    // Helpers
    // --------------------------------------------


    screenCenter(){

        return {

            x:
                this.rectangle.width *
                0.5,


            y:
                this.rectangle.height *
                0.5

        };

    }



    contains(

        x:number,

        y:number

    ):boolean{


        return (

            x >= this.rectangle.x &&

            y >= this.rectangle.y &&

            x <=
                this.rectangle.x +
                this.rectangle.width &&

            y <=
                this.rectangle.y +
                this.rectangle.height

        );

    }



    // --------------------------------------------
    // Serialization
    // --------------------------------------------


    saveState():

    ViewportState {


        return {

            rectangle:
                this.getRectangle(),


            pixelRatio:
                this.pixelRatio,


            enabled:
                this.enabled

        };

    }



    restoreState(

        state:ViewportState

    ):void{


        this.rectangle =
            {

                ...state.rectangle

            };


        this.pixelRatio =
            state.pixelRatio;


        this.enabled =
            state.enabled;



        this.resize(

            this.rectangle.width,

            this.rectangle.height

        );

    }



    toJSON(){

        return this.saveState();

    }



    static fromJSON(

        camera:RenderCamera,

        json:any

    ):RenderViewport{


        const viewport =
            new RenderViewport(

                camera,

                json.rectangle.width,

                json.rectangle.height

            );



        viewport.restoreState(

            json

        );



        return viewport;

    }



}