import { Feature }
from "./Feature";


import { FeatureTree }
from "./FeatureTree";



export interface FeatureManagerResult {


    success:boolean;


    message?:string;


}







export class FeatureManager {



    public tree:

    FeatureTree;



    private activeFeature:

    Feature|null = null;







    constructor(){



        this.tree =

        new FeatureTree();

    }







    addFeature(

        feature:

        Feature

    ):

    FeatureManagerResult {



        try {



            this.tree.add(

                feature

            );



            this.activeFeature =

            feature;



            return {


                success:true

            };



        }

        catch(error){



            return {


                success:false,


                message:

                String(error)

            };

        }

    }







    removeFeature(

        id:string

    ):

    FeatureManagerResult {



        const feature =

        this.tree.find(

            id

        );



        if(

            !feature

        ){



            return {


                success:false,


                message:

                "Feature not found"

            };

        }



        this.tree.remove(

            id

        );



        if(

            this.activeFeature?.id === id

        ){

            this.activeFeature =

            null;

        }



        return {


            success:true

        };

    }







    activateFeature(

        id:string

    ):

    boolean {



        const feature =

        this.tree.find(

            id

        );



        if(

            !feature

        ){

            return false;

        }



        this.activeFeature =

        feature;



        return true;

    }







    getActiveFeature():

    Feature|null {



        return this.activeFeature;

    }







    rebuild():

    void {



        const ordered =

        this.tree.getOrdered();



        for(

            const feature of

            ordered

        ){



            feature.evaluate();

        }

    }







    rollback(

        featureId:string

    ):

    void {



        const feature =

        this.tree.find(

            featureId

        );



        if(

            !feature

        ){

            return;

        }



        this.tree.setEnd(

            feature

        );

    }







    update():

    void {



        this.rebuild();

    }







    getFeatures():

    Feature[] {



        return this.tree

        .getOrdered();

    }







    clear():

    void {



        this.tree.clear();


        this.activeFeature =

        null;

    }



}