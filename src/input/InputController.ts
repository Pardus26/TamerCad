// src/input/InputController.ts

import {
    InputSystem
} from "./InputSystem";


import {
    InputRouter,
    InputMode
} from "./InputRouter";


import {
    GestureRecognizer,
    GestureEvent,
    GestureType
} from "./GestureRecognizer";


import {
    PointerEvent,
    PointerType
} from "./PointerEvent";



export class InputController {


    private readonly router:
        InputRouter;



    private readonly gestures:
        GestureRecognizer;



    private initialized =
        false;



    constructor(
        router: InputRouter
    ){

        this.router =
            router;


        this.gestures =
            new GestureRecognizer();

    }





    public initialize():void{


        if(this.initialized)
            return;



        InputSystem.initialize();



        InputSystem.subscribe(
            event =>
                this.handlePointer(event)
        );



        this.gestures.subscribe(
            event =>
                this.handleGesture(event)
        );



        this.initialized = true;


        console.info(
            "[InputController] Initialized"
        );
    }






    private handlePointer(
        event:PointerEvent
    ):void{


        this.gestures.process(
            0,
            event
        );


        this.router.route(
            event
        );
    }








    private handleGesture(
        event:GestureEvent
    ):void{


        switch(event.type){



            case GestureType.Pinch:


                this.router.routeGesture(
                    event
                );

                break;




            case GestureType.Rotate:


                this.router.routeGesture(
                    event
                );

                break;




            case GestureType.Pan:


                this.router.routeGesture(
                    event
                );

                break;



            case GestureType.DoubleTap:


                this.router.routeGesture(
                    event
                );

                break;



        }

    }








    public setMode(
        mode:InputMode
    ):void{


        this.router.setMode(
            mode
        );
    }








    public pointerDown(
        x:number,
        y:number,
        pressure:number = 1,
        type:PointerType =
            PointerType.Stylus
    ):void{


        InputSystem.pointerDown(
            x,
            y,
            pressure,
            type
        );
    }







    public pointerMove(
        x:number,
        y:number,
        pressure:number = 1,
        type:PointerType =
            PointerType.Stylus
    ):void{


        InputSystem.pointerMove(
            x,
            y,
            pressure,
            type
        );
    }







    public pointerUp(
        x:number,
        y:number,
        type:PointerType =
            PointerType.Stylus
    ):void{


        InputSystem.pointerUp(
            x,
            y,
            type
        );
    }








    public shutdown():void{


        InputSystem.clear();


        this.initialized =
            false;


        console.info(
            "[InputController] Shutdown"
        );
    }

}