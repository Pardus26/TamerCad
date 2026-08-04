// src/input/handlers/CameraInputHandler.ts


import {
    PointerEvent,
    PointerAction,
    PointerType
} from "../PointerEvent";


import {
    GestureEvent,
    GestureType
} from "../GestureRecognizer";


import {
    KernelBootstrap
} from "../../app/KernelBootstrap";








export class CameraInputHandler {



    private active = false;



    private lastX = 0;



    private lastY = 0;



    private activePointers =

        new Map<number, {

            x:number;

            y:number;

        }>();









    public handlePointer(

        event:PointerEvent

    ):void {



        /*
            Kalem kamera kontrolü yapmaz.
            Shapr3D mantığı:
            kalem = modelleme
            parmak = kamera
        */


        if(

            event.type ===

            PointerType.Stylus

        ){

            return;

        }









        switch(

            event.action

        ){



            case PointerAction.Down:



                this.active = true;



                this.lastX =

                    event.position.x;



                this.lastY =

                    event.position.y;



                break;







            case PointerAction.Move:



                if(

                    !this.active

                )

                    return;



                const dx =

                    event.position.x -

                    this.lastX;





                const dy =

                    event.position.y -

                    this.lastY;





                const camera =

                    KernelBootstrap.context()

                    .camera;





                camera.orbit(

                    dx * 0.01,

                    dy * 0.01

                );





                this.lastX =

                    event.position.x;



                this.lastY =

                    event.position.y;



                break;









            case PointerAction.Up:



            case PointerAction.Cancel:



                this.active = false;


                break;



        }


    }









    public handleGesture(

        event:GestureEvent

    ):void {



        const camera =

            KernelBootstrap.context()

            .camera;









        switch(

            event.type

        ){



            case GestureType.Pan:



                camera.pan(

                    event.deltaX,

                    event.deltaY

                );


                break;







            case GestureType.Rotate:



                camera.orbit(

                    event.rotationX,

                    event.rotationY

                );


                break;







            case GestureType.Zoom:



                camera.zoom(

                    event.scaleDelta

                );


                break;


        }


    }









    public dispose():void{


        this.activePointers.clear();


        this.active = false;


    }



}