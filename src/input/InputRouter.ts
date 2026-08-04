// src/input/InputRouter.ts


import {
    PointerEvent,
    PointerType
} from "./PointerEvent";


import {
    GestureEvent,
    GestureType
} from "./GestureRecognizer";


import {
    CameraInputHandler
} from "./handlers/CameraInputHandler";


import {
    SketchInputHandler
} from "./handlers/SketchInputHandler";


import {
    SelectionInputHandler
} from "./handlers/SelectionInputHandler";








export enum InputMode {


    Select = "select",


    Sketch = "sketch",


    Camera = "camera"



}









export class InputRouter {



    private mode:

        InputMode =

        InputMode.Select;







    private readonly camera:

        CameraInputHandler;





    private readonly sketch:

        SketchInputHandler;





    private readonly selection:

        SelectionInputHandler;









    constructor(){


        this.camera =

            new CameraInputHandler();



        this.sketch =

            new SketchInputHandler();



        this.selection =

            new SelectionInputHandler();


    }









    public setMode(

        mode:InputMode

    ):void{


        this.mode =

            mode;


        console.info(

            "[InputRouter] Mode:",

            mode

        );


    }









    public getMode():

        InputMode{


        return this.mode;


    }









    public route(

        event:PointerEvent

    ):void{



        /*
            Öncelik:
            Stylus = CAD çizim
        */


        if(

            event.type ===

            PointerType.Stylus

        ){


            this.sketch.handlePointer(

                event

            );


            return;

        }







        switch(

            this.mode

        ){



            case InputMode.Camera:



                this.camera.handlePointer(

                    event

                );


                break;







            case InputMode.Sketch:



                this.sketch.handlePointer(

                    event

                );


                break;







            case InputMode.Select:



                this.selection.handlePointer(

                    event

                );


                break;


        }



    }









    public routeGesture(

        event:GestureEvent

    ):void{



        switch(

            event.type

        ){



            case GestureType.Pan:



            case GestureType.Rotate:



            case GestureType.Zoom:



                this.camera.handleGesture(

                    event

                );


                break;





            case GestureType.Tap:



                this.selection.handleGesture(

                    event

                );


                break;




            case GestureType.Stroke:



                this.sketch.handleGesture(

                    event

                );


                break;


        }


    }









    public reset():void{


        this.mode =

            InputMode.Select;


    }









    public dispose():void{


        this.camera.dispose();


        this.sketch.dispose();


        this.selection.dispose();


    }



}