// src/input/handlers/CameraInputHandler.ts


import {
    InputHandler
} from "../InputRouter";


import {
    GestureEvent,
    GestureType
} from "../GestureRecognizer";


import {
    PointerEvent
} from "../PointerEvent";



import {
    Camera
} from "../../render/Camera";







export class CameraInputHandler
    implements InputHandler {



    private camera:
        Camera;



    private lastX =
        0;



    private lastY =
        0;



    private dragging =
        false;







    constructor(
        camera: Camera
    ){

        this.camera =
            camera;

    }









    public onPointerDown(
        event: PointerEvent
    ): void {



        this.dragging =
            true;



        this.lastX =
            event.position.x;



        this.lastY =
            event.position.y;

    }









    public onPointerMove(
        event: PointerEvent
    ): void {



        if(!this.dragging)
            return;




        const dx =
            event.position.x -
            this.lastX;



        const dy =
            event.position.y -
            this.lastY;





        /*
         * Mouse / stylus orbit
         */
        this.camera.orbit(
            dx,
            dy
        );





        this.lastX =
            event.position.x;



        this.lastY =
            event.position.y;

    }









    public onPointerUp(
        event: PointerEvent
    ): void {



        this.dragging =
            false;

    }









    public onGesture(
        event: GestureEvent
    ): void {



        switch(
            event.type
        ){





            case GestureType.Pan:


                this.camera.pan(
                    event.deltaX,
                    event.deltaY
                );

                break;









            case GestureType.Pinch:


                this.camera.zoom(
                    event.scale
                );

                break;









            case GestureType.Rotate:


                this.camera.rotate?.(
                    event.rotation
                );

                break;







            case GestureType.DoubleTap:


                this.camera.reset?.();


                break;



        }

    }

}