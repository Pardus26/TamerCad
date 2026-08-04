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



    private readonly camera:RenderCamera;



    private rectangle:ViewportRectangle = {


        x:0,

        y:0,

        width:800,

        height:600


    };




    private pixelRatio:number = 1.0;



    private enabled:boolean = true;






    constructor(

        camera:RenderCamera,

        width:number = 800,

        height:number = 600

    ){


        this.camera = camera;


        this.resize(

            width,

            height

        );


    }







    public resize(

        width:number,

        height:number

    ):void{


        this.rectangle.width = Math.max(

            1,

            width

        );


        this.rectangle.height = Math.max(

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







    public setPosition(

        x:number,

        y:number

    ):void{


        this.rectangle.x=x;

        this.rectangle.y=y;


    }







    public setPixelRatio(

        ratio:number

    ):void{


        this.pixelRatio=Math.max(

            0.1,

            ratio

        );



        this.resize(

            this.rectangle.width,

            this.rectangle.height

        );


    }







    public getPixelRatio():number{


        return this.pixelRatio;


    }






    public getWidth():number{


        return this.rectangle.width;


    }






    public getHeight():number{


        return this.rectangle.height;


    }






    public getAspectRatio():number{


        if(this.rectangle.height===0)

            return 1;



        return this.rectangle.width /

               this.rectangle.height;


    }







    public getRectangle():ViewportRectangle{


        return {

            ...this.rectangle

        };


    }








    public enable():void{


        this.enabled=true;


    }






    public disable():void{


        this.enabled=false;


    }






    public isEnabled():boolean{


        return this.enabled;


    }







    public apply(

        nativeContext:any

    ):void{


        if(!this.enabled)

            return;



        if(!nativeContext)

            return;



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





        if(nativeContext.viewport){


            nativeContext.viewport(

                x,

                y,

                width,

                height

            );


        }


    }








    public screenCenter(){


        return {


            x:this.rectangle.width*0.5,


            y:this.rectangle.height*0.5


        };


    }







    public contains(

        x:number,

        y:number

    ):boolean{


        return (

            x >= this.rectangle.x &&

            y >= this.rectangle.y &&

            x <= this.rectangle.x +

                this.rectangle.width &&

            y <= this.rectangle.y +

                this.rectangle.height

        );


    }







    public saveState():ViewportState{


        return {


            rectangle:this.getRectangle(),


            pixelRatio:this.pixelRatio,


            enabled:this.enabled


        };


    }







    public restoreState(

        state:ViewportState

    ):void{


        this.rectangle={

            ...state.rectangle

        };



        this.pixelRatio =

            state.pixelRatio ?? 1;



        this.enabled =

            state.enabled ?? true;



        this.resize(

            this.rectangle.width,

            this.rectangle.height

        );


    }







    public toJSON(){


        return this.saveState();


    }







    public static fromJSON(

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