// src/input/GestureRecognizer.ts

import {
    PointerEvent,
    PointerType,
    PointerAction
} from "./PointerEvent";



export enum GestureType {

    None = "none",

    Tap = "tap",

    DoubleTap = "double-tap",

    LongPress = "long-press",

    Pan = "pan",

    Pinch = "pinch",

    Rotate = "rotate",

    StylusDraw = "stylus-draw"
}



export interface GestureEvent {


    type: GestureType;


    centerX: number;


    centerY: number;


    deltaX: number;


    deltaY: number;


    scale: number;


    rotation: number;


    source: PointerType;


    original: PointerEvent;

}





export type GestureListener =
    (
        event: GestureEvent
    ) => void;





export class GestureRecognizer {


    private listeners:
        GestureListener[] = [];



    private activePointers:
        Map<number, PointerEvent>
        =
        new Map();



    private lastTapTime =
        0;



    private startX = 0;

    private startY = 0;



    private lastDistance = 0;



    private lastAngle = 0;





    public subscribe(
        listener: GestureListener
    ):void{


        this.listeners.push(
            listener
        );
    }






    private emit(
        event:GestureEvent
    ):void{


        for(
            const listener
            of this.listeners
        ){

            listener(event);
        }
    }






    public process(
        pointerId:number,
        event:PointerEvent
    ):void{


        if(
            event.action === PointerAction.Down
        ){

            this.pointerDown(
                pointerId,
                event
            );

        }




        else if(
            event.action === PointerAction.Move
        ){

            this.pointerMove(
                pointerId,
                event
            );

        }




        else if(
            event.action === PointerAction.Up
        ){

            this.pointerUp(
                pointerId,
                event
            );

        }

    }







    private pointerDown(
        id:number,
        event:PointerEvent
    ):void{


        this.activePointers.set(
            id,
            event
        );


        this.startX =
            event.position.x;


        this.startY =
            event.position.y;




        if(
            this.activePointers.size === 2
        ){

            this.initializeMultiTouch();
        }
    }








    private pointerMove(
        id:number,
        event:PointerEvent
    ):void{


        this.activePointers.set(
            id,
            event
        );




        if(
            event.type === PointerType.Stylus
        ){

            this.emit({

                type:
                    GestureType.StylusDraw,


                centerX:
                    event.position.x,


                centerY:
                    event.position.y,


                deltaX:0,

                deltaY:0,


                scale:1,


                rotation:0,


                source:
                    event.type,


                original:
                    event
            });


            return;
        }





        if(
            this.activePointers.size === 1
        ){


            const dx =
                event.position.x -
                this.startX;


            const dy =
                event.position.y -
                this.startY;



            this.emit({

                type:
                    GestureType.Pan,


                centerX:
                    event.position.x,


                centerY:
                    event.position.y,


                deltaX:dx,


                deltaY:dy,


                scale:1,


                rotation:0,


                source:
                    event.type,


                original:
                    event
            });

        }






        if(
            this.activePointers.size === 2
        ){

            this.processMultiTouch(
                event
            );
        }

    }








    private pointerUp(
        id:number,
        event:PointerEvent
    ):void{


        this.activePointers.delete(
            id
        );


        const now =
            performance.now();



        if(
            now - this.lastTapTime < 300
        ){

            this.emit({

                type:
                    GestureType.DoubleTap,


                centerX:
                    event.position.x,


                centerY:
                    event.position.y,


                deltaX:0,

                deltaY:0,


                scale:1,


                rotation:0,


                source:
                    event.type,


                original:
                    event
            });

        }


        else {


            this.emit({

                type:
                    GestureType.Tap,


                centerX:
                    event.position.x,


                centerY:
                    event.position.y,


                deltaX:0,

                deltaY:0,


                scale:1,


                rotation:0,


                source:
                    event.type,


                original:
                    event
            });

        }


        this.lastTapTime =
            now;
    }







    private initializeMultiTouch():void{


        const points =
            Array.from(
                this.activePointers.values()
            );


        const a =
            points[0].position;


        const b =
            points[1].position;



        this.lastDistance =
            Math.hypot(
                b.x - a.x,
                b.y - a.y
            );



        this.lastAngle =
            Math.atan2(
                b.y - a.y,
                b.x - a.x
            );
    }








    private processMultiTouch(
        event:PointerEvent
    ):void{


        const points =
            Array.from(
                this.activePointers.values()
            );



        if(points.length !== 2)
            return;



        const a =
            points[0].position;


        const b =
            points[1].position;




        const distance =
            Math.hypot(
                b.x-a.x,
                b.y-a.y
            );



        const angle =
            Math.atan2(
                b.y-a.y,
                b.x-a.x
            );



        this.emit({

            type:
                GestureType.Pinch,


            centerX:
                (a.x+b.x)/2,


            centerY:
                (a.y+b.y)/2,


            deltaX:0,


            deltaY:0,


            scale:
                distance /
                this.lastDistance,


            rotation:
                angle -
                this.lastAngle,


            source:
                event.type,


            original:
                event
        });



        this.lastDistance =
            distance;


        this.lastAngle =
            angle;
    }

}