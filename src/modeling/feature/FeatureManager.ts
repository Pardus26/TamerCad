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

        feature:Feature

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

            this.activeFeature &&

            this.activeFeature.id === id

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



        const features =

        this.tree.getOrdered();





        for(

            const feature of

            features

        ){



            feature.evaluate();

        }

    }









    update():

    void {



        this.rebuild();

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









    getFeatures():

    Feature[] {



        return this.tree

        .getOrdered();

    }









    getFeatureCount():

    number {



        return this.tree

        .getOrdered()

        .length;

    }









    clear():

    void {



        this.tree.clear();



        this.activeFeature =

        null;

    }







}