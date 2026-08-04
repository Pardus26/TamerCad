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
    GestureEvent
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





    private activePointers:
        Map<number, PointerEvent>
        =
        new Map();









    constructor(
        router:InputRouter
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

            (
                id:number,
                event:PointerEvent
            )=>{


                this.handlePointer(
                    id,
                    event
                );


            }

        );







        this.gestures.subscribe(

            (
                event:GestureEvent
            )=>{


                this.handleGesture(
                    event
                );


            }

        );







        this.initialized =
            true;



        console.info(
            "[InputController] Initialized"
        );


    }









    private handlePointer(

        id:number,

        event:PointerEvent

    ):void{





        switch(
            event.action
        ){



            case "down":


                this.activePointers.set(

                    id,

                    event

                );


                break;





            case "move":


                this.activePointers.set(

                    id,

                    event

                );


                break;





            case "up":


                this.activePointers.delete(

                    id

                );


                break;


        }







        /*
         * Gesture motoruna gönder
         */
        this.gestures.process(

            id,

            event

        );







        /*
         * Aktif moda yönlendir
         */
        this.router.route(

            event

        );


    }









    private handleGesture(

        event:GestureEvent

    ):void{



        this.router.routeGesture(

            event

        );

    }









    public setMode(

        mode:InputMode

    ):void{


        this.router.setMode(

            mode

        );

    }









    public getMode():

        InputMode{


        return this.router.getMode();

    }









    // ------------------------------------------------
    // External Pointer API
    // Android Bridge için
    // ------------------------------------------------




    public pointerDown(

        id:number,

        x:number,

        y:number,

        pressure:number = 1,

        type:PointerType =
            PointerType.Stylus

    ):void{



        InputSystem.pointerDown(

            id,

            x,

            y,

            pressure,

            type

        );

    }









    public pointerMove(

        id:number,

        x:number,

        y:number,

        pressure:number = 1,

        type:PointerType =
            PointerType.Stylus

    ):void{



        InputSystem.pointerMove(

            id,

            x,

            y,

            pressure,

            type

        );

    }









    public pointerUp(

        id:number,

        x:number,

        y:number,

        type:PointerType =
            PointerType.Stylus

    ):void{



        InputSystem.pointerUp(

            id,

            x,

            y,

            type

        );

    }









    public getActivePointerCount():

        number{


        return this.activePointers.size;

    }









    public isStylusActive():

        boolean{


        for(
            const pointer
            of
            this.activePointers.values()
        ){


            if(
                pointer.type ===
                PointerType.Stylus
            )
                return true;

        }


        return false;

    }









    public shutdown():void{


        this.activePointers.clear();



        InputSystem.clear();



        this.initialized =
            false;



        console.info(
            "[InputController] Shutdown"
        );

    }



}