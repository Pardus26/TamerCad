import { Curve }
from "../../geometry/curve/Curve";


import { Point }
from "../../geometry/core/Point";


import { Vector3 }
from "../../geometry/core/Vector3";


import { Wire }
from "../../topology/core/Wire";


import { Vertex }
from "../../topology/core/Vertex";


import { Edge }
from "../../topology/core/Edge";


import { Face }
from "../../topology/core/Face";


import { Solid }
from "../../topology/core/Solid";


import { BRepBuilder }
from "../../topology/brep/BRepBuilder";





export interface SweepOptions {


    sections?:number;


    makeSolid?:boolean;


    scale?:number;


}







export class Sweep {



    constructor(


        public profile:Wire,


        public path:Curve,


        public options:

        SweepOptions = {}

    ){}





    build():

    Solid {



        const builder =

        new BRepBuilder();





        const sections =

        this.options.sections ??

        32;





        const profileSections:

        Wire[] = [];





        for(

            let i = 0;

            i <= sections;

            i++

        ){



            const t =

            i /

            sections;





            const position =

            this.path.evaluate(

                t

            );





            const tangent =

            this.normalize(

                this.path.tangent(

                    t

                )

            );





            profileSections.push(

                this.placeProfile(

                    this.profile,

                    position,

                    tangent,

                    this.getScale(

                        t

                    )

                )

            );

        }







        const faces =

        this.createFaces(

            profileSections

        );





        const shell =

        builder.createShell(

            faces

        );





        return builder.createSolid(

            shell

        );

    }









    private getScale(

        t:number

    ):

    number {



        if(

            this.options.scale === undefined

        ){

            return 1;

        }



        return (

            1 +

            (

                this.options.scale -

                1

            )

            *

            t

        );

    }









    private placeProfile(


        profile:Wire,


        position:Point,


        tangent:Vector3,


        scale:number


    ):

    Wire {



        const result =

        new Wire();





        const normal =

        this.createNormal(

            tangent

        );





        for(

            const edge of

            profile.getEdges()

        ){



            const start =

            this.transformPoint(

                edge.start.position,

                position,

                normal,

                tangent,

                scale

            );





            const end =

            this.transformPoint(

                edge.end.position,

                position,

                normal,

                tangent,

                scale

            );





            result.addEdge(

                new Edge(

                    new Vertex(start),

                    new Vertex(end)

                )

            );

        }





        return result;

    }









    private transformPoint(

        point:Point,


        origin:Point,


        normal:Vector3,


        tangent:Vector3,


        scale:number


    ):

    Point {



        const x =

        point.x *

        scale;



        const y =

        point.y *

        scale;



        const z =

        point.z *

        scale;





        return new Point(


            origin.x +

            normal.x * x +

            tangent.x * z,


            origin.y +

            normal.y * x +

            tangent.y * z,


            origin.z +

            normal.z * y +

            tangent.z * y


        );

    }









    private createFaces(

        sections:Wire[]

    ):

    Face[] {



        const faces:

        Face[] = [];





        for(

            let i = 0;

            i < sections.length - 1;

            i++

        ){



            const current =

            sections[i];



            const next =

            sections[i + 1];





            const currentEdges =

            current.getEdges();



            const nextEdges =

            next.getEdges();





            const count =

            Math.min(

                currentEdges.length,

                nextEdges.length

            );





            for(

                let j = 0;

                j < count;

                j++

            ){



                const a =

                currentEdges[j];



                const b =

                nextEdges[j];





                const wire =

                new Wire();





                wire.addEdge(

                    a

                );





                wire.addEdge(

                    new Edge(

                        a.end,

                        b.end

                    )

                );





                wire.addEdge(

                    b

                );





                wire.addEdge(

                    new Edge(

                        b.start,

                        a.start

                    )

                );





                faces.push(

                    new Face(

                        null as any,

                        wire

                    )

                );

            }

        }





        return faces;

    }









    private createNormal(

        tangent:Vector3

    ):

    Vector3 {



        let normal =

        new Vector3(

            0,

            0,

            1

        );





        if(

            Math.abs(

                tangent.z

            ) > 0.9

        ){



            normal =

            new Vector3(

                1,

                0,

                0

            );

        }





        return this.normalize(

            new Vector3(


                tangent.y *

                normal.z -

                tangent.z *

                normal.y,


                tangent.z *

                normal.x -

                tangent.x *

                normal.z,


                tangent.x *

                normal.y -

                tangent.y *

                normal.x


            )

        );

    }









    private normalize(

        vector:Vector3

    ):

    Vector3 {



        const length =

        Math.sqrt(

            vector.x *

            vector.x +

            vector.y *

            vector.y +

            vector.z *

            vector.z

        );





        if(

            length === 0

        ){

            throw new Error(

                "Zero vector"

            );

        }





        return new Vector3(


            vector.x / length,


            vector.y / length,


            vector.z / length


        );

    }



}