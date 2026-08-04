// src/input/handlers/SelectionInputHandler.ts


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









export class SelectionInputHandler {



    private selectedId:

        string | null = null;









    public handlePointer(

        event:PointerEvent

    ):void {



        /*
            Stylus çizim içindir.
            Seçim parmak ile yapılır.
        */


        if(

            event.type ===

            PointerType.Stylus

        ){

            return;

        }









        if(

            event.action !==

            PointerAction.Up

        ){

            return;

        }








        this.pick(

            event.position.x,

            event.position.y

        );


    }









    private pick(

        x:number,

        y:number

    ):void {



        const context =

            KernelBootstrap

            .context();








        const ray =

            context.camera.pickRay(

                x,

                y

            );









        /*
            İlk aşama:

            Scene selection API

            Sonraki aşama:

            BVH
            Octree
            Topology picker

        */





        const result =

            context.scene.pick(

                ray.origin,

                ray.direction

            );








        if(

            result

        ){


            this.selectedId =

                result.id;





            context.scene.select(

                result.id

            );



        }

        else{


            this.clear();


        }



    }









    public handleGesture(

        event:GestureEvent

    ):void {



        if(

            event.type ===

            GestureType.Tap

        ){


            this.pick(

                event.x,

                event.y

            );


        }



    }









    public getSelected():

        string | null{


        return this.selectedId;


    }









    public clear():void{


        this.selectedId =

            null;



        KernelBootstrap

            .context()

            .scene.clearSelection();



    }









    public dispose():void{


        this.selectedId =

            null;


    }



}