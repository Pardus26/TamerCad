import {TabletStylusInput} 
from "../../input/TabletStylusInput";


import {RenderCamera}
from "../../render/RenderCamera";


import {RenderScene}
from "../../render/RenderScene";



export class CADInteractionController {



    constructor(

        private readonly stylus:
            TabletStylusInput


    ){}





    update(

        scene:RenderScene,

        camera:RenderCamera


    ):void{



        const input =

            this.stylus.getState();




        if(!input.isDown)

            return;





        this.processPointer(

            input.x,

            input.y,

            scene,

            camera

        );


    }







    private processPointer(

        x:number,

        y:number,

        scene:RenderScene,

        camera:RenderCamera


    ):void{



        /*
            GPU picking

            ObjectID buffer okunacak


        */



        console.log(

            "CAD Pick",

            x,

            y

        );



    }




}