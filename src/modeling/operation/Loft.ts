import { Feature }
from "../feature/Feature";


import { Solid }
from "../../topology/core/Solid";


import { Edge }
from "../../topology/core/Edge";


import { Face }
from "../../topology/core/Face";







export interface FilletEdge {


    edge:Edge;


    radius:number;

}







export class Fillet

extends Feature {



    constructor(


        id:string,


        public inputSolid:

        Solid,


        public edges:

        FilletEdge[]



    ){



        super(id);

    }







    evaluate():

    void {



        this.result =

        this.createFillet();

    }







    createFillet():

    Solid {



        const result =

        this.cloneSolid(

            this.inputSolid

        );



        for(

            const filletEdge of

            this.edges

        ){



            this.applyEdgeFillet(

                result,

                filletEdge

            );

        }



        return result;

    }







    private applyEdgeFillet(

        solid:

        Solid,


        data:

        FilletEdge

    ):

    void {



        const edge =

        data.edge;



        const radius =

        data.radius;



        // Gerçek kernel:

        //

        // 1. Edge komşu yüzleri bul

        // 2. Offset yüzeyleri oluştur

        // 3. Blend surface üret

        // 4. Topolojiyi yeniden bağla

    }







    private cloneSolid(

        solid:

        Solid

    ):

    Solid {



        return solid.clone();

    }







    validateRadius(

        edge:

        Edge,


        radius:number

    ):

    boolean {



        if(

            radius <= 0

        ){

            return false;

        }



        // Gerçek kernel:

        // maksimum izin verilen radius

        // face distance ile hesaplanır.



        return true;

    }







    setRadius(

        edge:

        Edge,


        radius:number

    ):

    void {



        const item =

        this.edges.find(

            e =>

            e.edge === edge

        );



        if(item)

        {

            item.radius =

            radius;

        }

    }



}