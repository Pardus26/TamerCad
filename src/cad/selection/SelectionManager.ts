import {MeshBody}
from "../../geometry/mesh/MeshBody";



export class SelectionManager {



    private selected:

        MeshBody[] = [];






    select(

        body:MeshBody

    ):void{


        this.clear();


        this.selected.push(body);


        body.selected = true;


    }







    add(

        body:MeshBody

    ):void{


        if(

            !this.selected.includes(body)

        ){


            this.selected.push(body);


            body.selected=true;


        }


    }






    clear():void{


        for(const body of this.selected){


            body.selected=false;


        }


        this.selected.length=0;


    }







    getSelected():

        readonly MeshBody[]{


        return this.selected;


    }



}