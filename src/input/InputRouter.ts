// src/input/InputRouter.ts

import {
    PointerEvent,
    PointerAction
} from "./PointerEvent";


export enum InputMode {


    /**
     * Normal model görüntüleme
     */
    View = "view",


    /**
     * Sketch çizimi
     */
    Sketch = "sketch",


    /**
     * Obje seçimi
     */
    Selection = "selection",


    /**
     * Feature düzenleme
     */
    FeatureEdit = "feature-edit",


    /**
     * Assembly hareketi
     */
    Assembly = "assembly"
}




export interface InputHandler {


    onPointerDown?(
        event: PointerEvent
    ): void;


    onPointerMove?(
        event: PointerEvent
    ): void;


    onPointerUp?(
        event: PointerEvent
    ): void;

}





export class InputRouter {


    private mode:
        InputMode = InputMode.View;



    private handlers:
        Map<InputMode, InputHandler>
        =
        new Map();





    public setMode(
        mode: InputMode
    ):void{


        this.mode = mode;
    }





    public getMode():InputMode{


        return this.mode;
    }





    public register(
        mode:InputMode,
        handler:InputHandler
    ):void{


        this.handlers.set(
            mode,
            handler
        );
    }





    public remove(
        mode:InputMode
    ):void{


        this.handlers.delete(
            mode
        );
    }





    public route(
        event:PointerEvent
    ):void{


        const handler =
            this.handlers.get(
                this.mode
            );


        if(!handler){

            return;
        }




        switch(event.action){


            case PointerAction.Down:


                handler.onPointerDown?.(
                    event
                );

                break;




            case PointerAction.Move:


                handler.onPointerMove?.(
                    event
                );

                break;




            case PointerAction.Up:


                handler.onPointerUp?.(
                    event
                );

                break;
        }
    }

}