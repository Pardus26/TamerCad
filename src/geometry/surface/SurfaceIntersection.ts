import { Surface }
from "./Surface";


import { Point }
from "../core/Point";


import { Vector3 }
from "../core/Vector3";


import { Curve }
from "../curve/Curve";


import { LineCurve }
from "../curve/LineCurve";



export class SurfaceIntersection {



    constructor(

        public surfaceA:Surface,

        public surfaceB:Surface,

        public tolerance:number = 1e-6

    ){}



    intersect():

    Curve[] {


        const curves:Curve[]=[];



        const samples =

        this.sampleSearch();



        for(

            const p of samples

        ){



            const curve =

            this.traceCurve(

                p

            );



            if(curve){

                curves.push(

                    curve

                );

            }

        }



        return curves;

    }







    private sampleSearch():

    Point[] {



        const result:Point[]=[];



        const steps = 20;



        for(

            let i=0;

            i<steps;

            i++

        ){



            for(

                let j=0;

                j<steps;

                j++

            ){



                const u =

                i /

                steps;



                const v =

                j /

                steps;



                const p1 =

                this.surfaceA.evaluate(

                    u,

                    v

                );



                const p2 =

                this.surfaceB.evaluate(

                    u,

                    v

                );



                const distance =

                p1.distanceTo(

                    p2

                );



                if(

                    distance <

                    this.tolerance

                ){

                    result.push(

                        p1

                    );

                }

            }

        }



        return result;

    }







    private traceCurve(

        start:Point

    ):

    Curve | null {



        const direction =

        this.computeTangent(

            start

        );



        if(

            direction.length()

            <

            this.tolerance

        ){

            return null;

        }



        const end =

        start.addVector(

            direction.multiply(

                100

            )

        );



        return new LineCurve(

            start,

            end

        );

    }







    private computeTangent(

        point:Point

    ):

    Vector3 {



        const normalA =

        this.surfaceA

        .normalAtPoint(

            point

        );



        const normalB =

        this.surfaceB

        .normalAtPoint(

            point

        );



        return normalA

        .cross(

            normalB

        )

        .normalize();

    }



}