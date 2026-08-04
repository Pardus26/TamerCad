 // src/input/InputSystem.ts

import {
    PointerEvent,
    PointerType,
    PointerAction
} from "./PointerEvent";


export type PointerListener =
    (event: PointerEvent) => void;



export class InputSystem {


    private static initialized = false;


    private static listeners:
        PointerListener[] = [];



    public static initialize(): void {


        if (InputSystem.initialized) {

            return;
        }


        InputSystem.initialized = true;


        console.info(
            "[Input] System Initialized"
        );
    }




    public static subscribe(
        listener: PointerListener
    ): void {


        InputSystem.listeners.push(
            listener
        );
    }




    public static unsubscribe(
        listener: PointerListener
    ): void {


        InputSystem.listeners =
            InputSystem.listeners.filter(
                item =>
                    item !== listener
            );
    }





    private static dispatch(
        event: PointerEvent
    ): void {


        for (
            const listener
            of InputSystem.listeners
        ){

            listener(event);
        }
    }





    public static pointerDown(
        x:number,
        y:number,
        pressure:number = 1.0,
        type:PointerType =
            PointerType.Stylus
    ):void{


        const event =
            new PointerEvent({

                type,

                action:
                    PointerAction.Down,


                position:{
                    x,
                    y
                },


                pressure,


                timestamp:
                    performance.now()
            });


        InputSystem.dispatch(
            event
        );
    }






    public static pointerMove(
        x:number,
        y:number,
        pressure:number = 1.0,
        type:PointerType =
            PointerType.Stylus
    ):void{


        const event =
            new PointerEvent({

                type,

                action:
                    PointerAction.Move,


                position:{
                    x,
                    y
                },


                pressure,


                timestamp:
                    performance.now()
            });


        InputSystem.dispatch(
            event
        );
    }







    public static pointerUp(
        x:number,
        y:number,
        type:PointerType =
            PointerType.Stylus
    ):void{


        const event =
            new PointerEvent({

                type,

                action:
                    PointerAction.Up,


                position:{
                    x,
                    y
                },


                pressure:0,


                timestamp:
                    performance.now()
            });


        InputSystem.dispatch(
            event
        );
    }






    public static clear():void{


        InputSystem.listeners = [];


        InputSystem.initialized = false;
    }




    public static isInitialized():boolean{


        return InputSystem.initialized;
    }

}