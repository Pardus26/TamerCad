import { Solid }
from "../../topology/core/Solid";



export enum FeatureType {


    Primitive = "Primitive",


    Operation = "Operation",


    Modification = "Modification",


    Construction = "Construction"

}







export interface FeatureParameter {


    name:string;


    value:any;


}







export abstract class Feature {



    public children:

    Feature[] = [];



    public parents:

    Feature[] = [];



    protected result:

    Solid | null = null;





    constructor(

        public id:string,


        public name:string,


        public type:

        FeatureType,


        public parameters:

        FeatureParameter[] = []

    ){}





    abstract rebuild():

    Solid;







    getResult():

    Solid {



        if(

            !this.result

        ){



            this.result =

            this.rebuild();

        }



        return this.result;

    }







    setParameter(

        name:string,

        value:any

    ):



    void {



        const parameter =

        this.parameters.find(

            p =>

            p.name === name

        );



        if(

            parameter

        ){



            parameter.value =

            value;



            this.invalidate();

        }

    }







    getParameter(

        name:string

    ):

    any {



        return this.parameters

        .find(

            p =>

            p.name === name

        )

        ?.value;

    }







    addChild(

        feature:Feature

    ):

    void {



        this.children.push(

            feature

        );



        feature.parents.push(

            this

        );

    }







    invalidate():

    void {



        this.result =

        null;



        for(

            const child of

            this.children

        ){



            child.invalidate();

        }

    }



}