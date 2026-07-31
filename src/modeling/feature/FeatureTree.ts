import { Feature }
from "./Feature";


import { Solid }
from "../../topology/core/Solid";



export class FeatureTree {



    private features:

    Feature[] = [];



    private activeFeature:

    Feature | null = null;





    constructor(

        public name:string =

        "Model"

    ){}





    addFeature(

        feature:Feature

    ):

    void {



        const previous =

        this.getLastFeature();



        if(

            previous

        ){



            previous.addChild(

                feature

            );

        }



        this.features.push(

            feature

        );



        this.activeFeature =

        feature;

    }







    removeFeature(

        id:string

    ):

    void {



        const index =

        this.features.findIndex(

            f =>

            f.id === id

        );



        if(

            index >= 0

        ){



            this.features.splice(

                index,

                1

            );

        }

    }







    getFeature(

        id:string

    ):

    Feature | undefined {



        return this.features.find(

            f =>

            f.id === id

        );

    }







    getLastFeature():

    Feature | null {



        if(

            this.features.length === 0

        ){

            return null;

        }



        return this.features[

            this.features.length-1

        ];

    }







    setActiveFeature(

        id:string

    ):

    void {



        const feature =

        this.getFeature(

            id

        );



        if(

            feature

        ){

            this.activeFeature =

            feature;

        }

    }







    getActiveFeature():

    Feature | null {



        return this.activeFeature;

    }







    rebuild():

    Solid | null {



        let result:

        Solid | null = null;



        for(

            const feature of

            this.features

        ){



            result =

            feature.getResult();



        }



        return result;

    }







    rollback(

        id:string

    ):

    Solid | null {



        const index =

        this.features.findIndex(

            f =>

            f.id === id

        );



        if(

            index < 0

        ){

            return null;

        }



        let result:

        Solid | null = null;



        for(

            let i=0;

            i<=index;

            i++

        ){



            result =

            this.features[i]

            .getResult();

        }



        return result;

    }







    traverse(

        callback:

        (

            feature:Feature

        )=>void

    ):

    void {



        for(

            const feature of

            this.features

        ){



            callback(

                feature

            );

        }

    }







    clear():

    void {



        this.features = [];

        this.activeFeature =

        null;

    }







    get count():

    number {



        return this.features.length;

    }



}