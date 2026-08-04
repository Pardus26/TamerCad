// src/input/InputSystem.ts


import {
    PointerEvent,
    PointerType,
    PointerAction
} from "./PointerEvent";








export type PointerListener = (

    pointerId:number,

    event:PointerEvent

)=>void;









export class InputSystem {



    private static initialized =
        false;




    private static listeners:
        PointerListener[]
        =
        [];





    private static activePointers:
        Map<number,PointerEvent>
        =
        new Map();









    public static initialize():

        void {



        if(
            this.initialized
        )
            return;



        this.initialized =
            true;



        console.info(
            "[InputSystem] Initialized"
        );


    }









    public static subscribe(

        listener:PointerListener

    ):void{


        this.listeners.push(
            listener
        );


    }









    private static emit(

        id:number,

        event:PointerEvent

    ):void{


        for(
            const listener
            of
            this.listeners
        ){


            listener(
                id,
                event
            );


        }


    }









    public static pointerDown(

        id:number,

        x:number,

        y:number,

        pressure:number = 1,

        type:PointerType =
            PointerType.Stylus

    ):void{



        const event:PointerEvent = {


            action:
                PointerAction.Down,


            type,


            position:{


                x,

                y


            },


            pressure,


            timestamp:
                performance.now()


        };







        this.activePointers.set(

            id,

            event

        );






        this.emit(

            id,

            event

        );


    }









    public static pointerMove(

        id:number,

        x:number,

        y:number,

        pressure:number = 1,

        type:PointerType =
            PointerType.Stylus

    ):void{



        const event:PointerEvent = {


            action:
                PointerAction.Move,


            type,


            position:{


                x,

                y


            },


            pressure,


            timestamp:
                performance.now()


        };







        this.activePointers.set(

            id,

            event

        );






        this.emit(

            id,

            event

        );


    }









    public static pointerUp(

        id:number,

        x:number,

        y:number,

        type:PointerType =
            PointerType.Stylus

    ):void{



        const event:PointerEvent = {


            action:
                PointerAction.Up,


            type,


            position:{


                x,

                y


            },


            pressure:0,


            timestamp:
                performance.now()


        };







        this.activePointers.delete(

            id

        );







        this.emit(

            id,

            event

        );


    }









    public static getPointer(

        id:number

    ):

    PointerEvent | undefined {


        return this.activePointers.get(
            id
        );

    }









    public static getActivePointers():

        PointerEvent[] {


        return Array.from(

            this.activePointers.values()

        );


    }









    public static getPointerCount():

        number {


        return this.activePointers.size;


    }









    public static clear():

        void {



        this.activePointers.clear();


        this.listeners = [];



        this.initialized =
            false;


    }




}