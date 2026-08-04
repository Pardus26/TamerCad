import { Point3 } from "../primitives/Point3";


export class MeshVertex {


    /**
     * Vertex unique identifier
     */
    public readonly id:number;



    /**
     * Position
     */
    public position:Point3;



    /**
     * Optional normal index
     */
    public normalIndex:number | null = null;



    /**
     * Optional texture coordinate index
     */
    public uvIndex:number | null = null;



    /**
     * Optional vertex color
     */
    public color?:{

        r:number;

        g:number;

        b:number;

        a:number;

    };







    constructor(

        id:number,

        position:Point3

    ){

        this.id=id;

        this.position=

            position.clone();

    }








    /**
     * Position değiştirme
     */
    public setPosition(

        position:Point3

    ):void{


        this.position=

            position.clone();


    }







    /**
     * Vertex taşıma
     */
    public translate(

        x:number,

        y:number,

        z:number

    ):void{


        this.position.x += x;

        this.position.y += y;

        this.position.z += z;


    }







    /**
     * Clone
     */
    public clone():

    MeshVertex{


        const vertex=

            new MeshVertex(

                MeshVertex.generateId(),

                this.position

            );



        vertex.normalIndex=

            this.normalIndex;



        vertex.uvIndex=

            this.uvIndex;



        if(this.color){


            vertex.color={

                ...this.color

            };


        }



        return vertex;


    }







    /**
     * Geometrik eşitlik
     */
    public equals(

        other:MeshVertex,

        tolerance:number = 1e-9

    ):boolean{


        return (

            Math.abs(

                this.position.x -

                other.position.x

            )

            <= tolerance

            &&


            Math.abs(

                this.position.y -

                other.position.y

            )

            <= tolerance

            &&


            Math.abs(

                this.position.z -

                other.position.z

            )

            <= tolerance

        );


    }







    /**
     * Mesafe
     */
    public distanceTo(

        other:MeshVertex

    ):number{


        return this.position.distanceTo(

            other.position

        );


    }







    /**
     * JSON
     */
    public toJSON(){


        return {


            id:this.id,


            position:{


                x:this.position.x,


                y:this.position.y,


                z:this.position.z


            },


            normalIndex:

                this.normalIndex,


            uvIndex:

                this.uvIndex,


            color:

                this.color


        };


    }







    /**
     * JSON yükleme
     */
    public static fromJSON(

        data:any

    ):

    MeshVertex{


        const positionData =

            data.position ??

            data;




        const vertex=

            new MeshVertex(

                data.id ??

                MeshVertex.generateId(),

                new Point3(

                    positionData.x,

                    positionData.y,

                    positionData.z

                )

            );





        vertex.normalIndex=

            data.normalIndex ??

            null;



        vertex.uvIndex=

            data.uvIndex ??

            null;



        vertex.color=

            data.color;



        return vertex;


    }







    private static generateId():

    number{


        return (

            Date.now()

            +

            Math.floor(

                Math.random()*1000000

            )

        );


    }



}