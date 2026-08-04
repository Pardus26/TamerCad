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



    centerX:number;


    centerY:number;



    deltaX:number;


    deltaY:number;



    /**
     * Zoom oranı
     *
     * 1.0 = değişiklik yok
     * >1 zoom in
     * <1 zoom out
     */
    scale:number;



    /**
     * Radyan dönüş miktarı
     */
    rotation:number;



    source:PointerType;



    original:PointerEvent;

}








export type GestureListener =
    (
        event:GestureEvent
    )=>void;










export class GestureRecognizer {



    private listeners:
        GestureListener[] = [];



    private pointers:
        Map<number,PointerEvent>
        =
        new Map();




    private lastTap =
        0;



    private startX =
        0;



    private startY =
        0;



    private lastDistance =
        0;



    private lastRotation =
        0;









    public subscribe(
        listener:GestureListener
    ):void{


        this.listeners.push(
            listener
        );

    }









    private emit(
        event:GestureEvent
    ):void{


        for(
            const listener of this.listeners
        ){

            listener(event);

        }

    }









    public process(
        pointerId:number,
        event:PointerEvent
    ):void{


        switch(
            event.action
        ){


            case PointerAction.Down:


                this.pointerDown(
                    pointerId,
                    event
                );

                break;




            case PointerAction.Move:


                this.pointerMove(
                    pointerId,
                    event
                );

                break;




            case PointerAction.Up:


                this.pointerUp(
                    pointerId,
                    event
                );

                break;

        }

    }









    private pointerDown(
        id:number,
        event:PointerEvent
    ):void{


        this.pointers.set(
            id,
            event
        );



        this.startX =
            event.position.x;


        this.startY =
            event.position.y;




        if(
            this.pointers.size === 2
        ){

            this.initializeTwoFinger();

        }

    }









    private pointerMove(
        id:number,
        event:PointerEvent
    ):void{


        this.pointers.set(
            id,
            event
        );





        /*
         * Kalem çizimi
         */
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








        /*
         * Tek parmak hareketi
         */
        if(
            this.pointers.size === 1
        ){


            this.emit({

                type:
                    GestureType.Pan,


                centerX:
                    event.position.x,


                centerY:
                    event.position.y,


                deltaX:
                    event.position.x -
                    this.startX,


                deltaY:
                    event.position.y -
                    this.startY,


                scale:1,


                rotation:0,


                source:
                    event.type,


                original:
                    event

            });


        }








        /*
         * İki parmak hareketi
         */
        if(
            this.pointers.size === 2
        ){


            this.processTwoFinger(
                event
            );

        }

    }









    private pointerUp(
        id:number,
        event:PointerEvent
    ):void{


        this.pointers.delete(
            id
        );



        const now =
            performance.now();





        if(
            now-this.lastTap < 300
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


                original:event

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


                original:event

            });


        }



        this.lastTap =
            now;

    }









    private initializeTwoFinger():void{


        const pts =
            Array.from(
                this.pointers.values()
            );



        const a =
            pts[0].position;


        const b =
            pts[1].position;



        this.lastDistance =
            Math.hypot(
                b.x-a.x,
                b.y-a.y
            );



        this.lastRotation =
            Math.atan2(
                b.y-a.y,
                b.x-a.x
            );

    }









    private processTwoFinger(
        event:PointerEvent
    ):void{


        const pts =
            Array.from(
                this.pointers.values()
            );



        if(
            pts.length!==2
        )
            return;




        const a =
            pts[0].position;


        const b =
            pts[1].position;





        const centerX =
            (a.x+b.x)/2;



        const centerY =
            (a.y+b.y)/2;





        const distance =
            Math.hypot(
                b.x-a.x,
                b.y-a.y
            );





        const rotation =
            Math.atan2(
                b.y-a.y,
                b.x-a.x
            );






        const scale =
            distance /
            this.lastDistance;







        this.emit({

            type:
                GestureType.Pinch,


            centerX,


            centerY,


            deltaX:0,


            deltaY:0,


            scale,


            rotation:0,


            source:
                event.type,


            original:event

        });









        const rotationDelta =
            rotation -
            this.lastRotation;





        if(
            Math.abs(rotationDelta)
            >
            0.01
        ){


            this.emit({

                type:
                    GestureType.Rotate,


                centerX,


                centerY,


                deltaX:0,


                deltaY:0,


                scale:1,


                rotation:
                    rotationDelta,


                source:
                    event.type,


                original:event

            });

        }






        this.lastDistance =
            distance;



        this.lastRotation =
            rotation;


    }




}