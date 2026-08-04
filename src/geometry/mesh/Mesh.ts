import { MeshVertex } from "./MeshVertex";
import { MeshTriangle } from "./MeshTriangle";


export interface MeshBoundingBox {

    min:{
        x:number;
        y:number;
        z:number;
    };

    max:{
        x:number;
        y:number;
        z:number;
    };

}



export interface MeshBoundingSphere {

    center:{
        x:number;
        y:number;
        z:number;
    };

    radius:number;

}





export class Mesh {


    private readonly vertices:

        MeshVertex[] = [];



    private readonly triangles:

        MeshTriangle[] = [];



    private normals:

        number[][] = [];



    private uvs:

        number[][] = [];





    constructor(

        public name:string="Mesh"

    ){}





    // ------------------------------------------------
    // Vertex
    // ------------------------------------------------



    public addVertex(

        vertex:MeshVertex

    ):number{


        this.vertices.push(vertex);


        return (

            this.vertices.length-1

        );


    }






    public getVertex(

        index:number

    ):MeshVertex{


        return this.vertices[index];


    }






    public getVertices():

    readonly MeshVertex[]{


        return this.vertices;


    }






    // ------------------------------------------------
    // Triangle
    // ------------------------------------------------



    public addTriangle(

        triangle:MeshTriangle

    ):void{


        this.triangles.push(

            triangle

        );


    }






    public getTriangle(

        index:number

    ):MeshTriangle{


        return this.triangles[index];


    }






    public getTriangles():

    readonly MeshTriangle[]{


        return this.triangles;


    }






    public vertexCount():

    number{


        return this.vertices.length;


    }






    public triangleCount():

    number{


        return this.triangles.length;


    }






    // ------------------------------------------------
    // Geometry
    // ------------------------------------------------



    public computeSurfaceArea():

    number{


        let area=0;



        for(

            const triangle of this.triangles

        ){


            area +=

                triangle.computeArea(

                    this.vertices

                );


        }


        return area;


    }






    public computeVolume():

    number{


        let volume=0;



        for(

            const triangle of this.triangles

        ){


            const a =

                this.vertices[

                    triangle.a

                ].position;



            const b =

                this.vertices[

                    triangle.b

                ].position;



            const c =

                this.vertices[

                    triangle.c

                ].position;



            volume +=

                (

                    a.x *

                    (

                        b.y*c.z -

                        b.z*c.y

                    )

                    -

                    a.y *

                    (

                        b.x*c.z -

                        b.z*c.x

                    )

                    +

                    a.z *

                    (

                        b.x*c.y -

                        b.y*c.x

                    )

                );


        }



        return Math.abs(

            volume / 6

        );


    }







    public getBoundingBox():

    MeshBoundingBox | null{


        if(

            this.vertices.length===0

        ){

            return null;

        }




        let minX=Infinity;

        let minY=Infinity;

        let minZ=Infinity;



        let maxX=-Infinity;

        let maxY=-Infinity;

        let maxZ=-Infinity;





        for(

            const v of this.vertices

        ){


            minX=Math.min(

                minX,

                v.position.x

            );


            minY=Math.min(

                minY,

                v.position.y

            );


            minZ=Math.min(

                minZ,

                v.position.z

            );



            maxX=Math.max(

                maxX,

                v.position.x

            );


            maxY=Math.max(

                maxY,

                v.position.y

            );


            maxZ=Math.max(

                maxZ,

                v.position.z

            );


        }



        return {


            min:{

                x:minX,

                y:minY,

                z:minZ

            },


            max:{

                x:maxX,

                y:maxY,

                z:maxZ

            }


        };


    }







    public getBoundingSphere():

    MeshBoundingSphere | null{


        const box=

            this.getBoundingBox();



        if(!box)

            return null;



        const center={


            x:(box.min.x+box.max.x)/2,

            y:(box.min.y+box.max.y)/2,

            z:(box.min.z+box.max.z)/2


        };



        let radius=0;



        for(

            const v of this.vertices

        ){


            const dx=

                v.position.x-center.x;


            const dy=

                v.position.y-center.y;


            const dz=

                v.position.z-center.z;



            radius=Math.max(

                radius,

                Math.sqrt(

                    dx*dx+

                    dy*dy+

                    dz*dz

                )

            );


        }



        return {


            center,


            radius


        };


    }






    public validate():

    boolean{


        for(

            const t of this.triangles

        ){


            if(

                t.a<0 ||

                t.b<0 ||

                t.c<0

            )

                return false;



            if(

                t.a>=this.vertices.length ||

                t.b>=this.vertices.length ||

                t.c>=this.vertices.length

            )

                return false;


        }


        return true;


    }







    public clear():

    void{


        this.vertices.length=0;

        this.triangles.length=0;

        this.normals.length=0;

        this.uvs.length=0;


    }







    public isEmpty():

    boolean{


        return (

            this.vertices.length===0 ||

            this.triangles.length===0

        );


    }







    public clone():

    Mesh{


        const mesh=

            new Mesh(

                this.name

            );



        for(

            const v of this.vertices

        ){


            mesh.addVertex(

                v.clone()

            );


        }




        for(

            const t of this.triangles

        ){


            mesh.addTriangle(

                t.clone()

            );


        }



        mesh.normals =

            this.normals.map(

                n=>[...n]

            );



        mesh.uvs =

            this.uvs.map(

                uv=>[...uv]

            );



        return mesh;


    }







    public toJSON(){


        return {


            name:this.name,


            vertices:

                this.vertices.map(

                    v=>v.toJSON()

                ),



            triangles:

                this.triangles.map(

                    t=>t.toJSON()

                ),



            normals:this.normals,


            uvs:this.uvs


        };


    }







    public static fromJSON(

        data:any

    ):

    Mesh{


        const mesh=

            new Mesh(

                data.name

            );



        for(

            const v of data.vertices ?? []

        ){


            mesh.addVertex(

                MeshVertex.fromJSON(v)

            );


        }



        for(

            const t of data.triangles ?? []

        ){


            mesh.addTriangle(

                MeshTriangle.fromJSON(t)

            );


        }



        mesh.normals=

            data.normals ?? [];



        mesh.uvs=

            data.uvs ?? [];



        return mesh;


    }




}