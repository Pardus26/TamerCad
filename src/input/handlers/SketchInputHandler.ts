// src/input/handlers/SketchInputHandler.ts


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


import {

    Point3

} from "../../geometry/point/Point3";









interface SketchStrokePoint {


    x:number;


    y:number;


    pressure:number;


    timestamp:number;


}









export class SketchInputHandler {



    private drawing = false;




    private stroke:

        SketchStrokePoint[] = [];









    public handlePointer(

        event:PointerEvent

    ):void {




        /*
            Sadece kalem çizim yapar
        */


        if(

            event.type !==

            PointerType.Stylus

        ){

            return;

        }








        switch(

            event.action

        ){




            case PointerAction.Down:



                this.startStroke(

                    event

                );


                break;







            case PointerAction.Move:



                this.addPoint(

                    event

                );


                break;







            case PointerAction.Up:



                this.finishStroke();


                break;







            case PointerAction.Cancel:



                this.cancelStroke();


                break;



        }



    }









    private startStroke(

        event:PointerEvent

    ):void {



        this.drawing = true;


        this.stroke = [];



        this.addPoint(

            event

        );



    }









    private addPoint(

        event:PointerEvent

    ):void {



        if(

            !this.drawing

        ){

            return;

        }








        this.stroke.push({


            x:

                event.position.x,



            y:

                event.position.y,



            pressure:

                event.pressure,



            timestamp:

                event.timestamp


        });


    }









    private finishStroke():void {



        if(

            this.stroke.length < 2

        ){


            this.cancelStroke();

            return;


        }







        this.createSketchEntity();



        this.stroke=[];


        this.drawing=false;


    }









    private cancelStroke():void {


        this.stroke=[];


        this.drawing=false;


    }









    private createSketchEntity():void {



        const camera =

            KernelBootstrap

            .context()

            .camera;







        const points =

            this.stroke.map(

                p => {



                    const world =

                        camera.screenToWorld(

                            p.x,

                            p.y,

                            0

                        );





                    return new Point3(

                        world.x,

                        world.y,

                        world.z

                    );



                }

            );









        /*
            Şimdilik geçici:

            Stroke -> Sketch Entity

            Daha sonra:

            LineEntity
            ArcEntity
            SplineEntity

            olarak ayrılacak.
        */





        const scene =

            KernelBootstrap

            .context()

            .scene;







        scene.addSketchStroke(

            points

        );



    }









    public handleGesture(

        event:GestureEvent

    ):void {



        if(

            event.type ===

            GestureType.Stroke

        ){


            // İleride:
            // kalem hareket komutları


        }


    }









    public isDrawing():boolean{


        return this.drawing;


    }









    public dispose():void {



        this.stroke=[];


        this.drawing=false;


    }



}