import { Feature }
from "./Feature";


import { FeatureTree }
from "./FeatureTree";


import { Solid }
from "../../topology/core/Solid";



export class FeatureManager {



    constructor(

        public tree:

        FeatureTree

    ){}





    add(

        feature:Feature

    ):

    void {



        this.tree.addFeature(

            feature

        );

    }







    remove(

        id:string

    ):

    void {



        this.tree.removeFeature(

            id

        );

    }







    activate(

        id:string

    ):

    void {



        this.tree.setActiveFeature(

            id

        );

    }







    updateParameter(

        featureId:string,


        parameterName:string,


        value:any

    ):

    void {



        const feature =

        this.tree.getFeature(

            featureId

        );



        if(

            !feature

        ){

            throw new Error(

                "Feature not found"

            );

        }



        feature.setParameter(

            parameterName,

            value

        );

    }







    rebuild():

    Solid | null {



        return this.tree.rebuild();

    }







    rollback(

        featureId:string

    ):

    Solid | null {



        return this.tree.rollback(

            featureId

        );

    }







    suppress(

        featureId:string

    ):

    void {



        const feature =

        this.tree.getFeature(

            featureId

        );



        if(

            feature

        ){



            feature.suppressed =

            true;

        }

    }







    unsuppress(

        featureId:string

    ):

    void {



        const feature =

        this.tree.getFeature(

            featureId

        );



        if(

            feature

        ){



            feature.suppressed =

            false;

        }

    }







    moveFeature(

        featureId:string,


        newIndex:number

    ):

    void {



        const feature =

        this.tree.getFeature(

            featureId

        );



        if(

            !feature

        ){

            return;

        }



        this.tree.removeFeature(

            featureId

        );



        this.tree.insertFeature(

            feature,

            newIndex

        );

    }







    validate():

    boolean {



        let valid =

        true;



        this.tree.traverse(

            feature => {



                if(

                    !feature

                ){

                    valid = false;

                }

            }

        );



        return valid;

    }



}