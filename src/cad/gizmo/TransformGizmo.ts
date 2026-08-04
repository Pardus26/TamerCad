import {Vector3}
from "../../math/Vector3";


import {MeshBody}
from "../../geometry/mesh/MeshBody";



export class TransformGizmo {



    private target:

        MeshBody|null=null;





    attach(

        body:MeshBody

    ):void{


        this.target=body;


    }






    move(

        delta:Vector3

    ):void{


        if(!this.target)

            return;



        this.target.transform.position.add(

            delta

        );


    }






    rotate(

        axis:Vector3,

        angle:number

    ):void{


        if(!this.target)

            return;



        this.target.transform.rotate(

            axis,

            angle

        );


    }





    detach():void{


        this.target=null;


    }



}