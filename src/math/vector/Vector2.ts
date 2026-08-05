export class Vector2 {


    public x:number;


    public y:number;





    constructor(

        x:number = 0,

        y:number = 0

    ){


        this.x = x;


        this.y = y;


    }







    // =====================================================
    // Set
    // =====================================================


    set(

        x:number,

        y:number

    ):

    this {


        this.x = x;


        this.y = y;


        return this;


    }









    // =====================================================
    // Clone
    // =====================================================


    clone():

    Vector2 {


        return new Vector2(

            this.x,

            this.y

        );


    }









    // =====================================================
    // Addition
    // =====================================================


    add(

        vector:Vector2

    ):

    Vector2 {


        this.x += vector.x;


        this.y += vector.y;


        return this;


    }









    // =====================================================
    // Subtraction
    // =====================================================


    subtract(

        vector:Vector2

    ):

    Vector2 {


        this.x -= vector.x;


        this.y -= vector.y;


        return this;


    }









    // =====================================================
    // Scalar Multiply
    // =====================================================


    multiplyScalar(

        value:number

    ):

    Vector2 {


        this.x *= value;


        this.y *= value;


        return this;


    }









    // =====================================================
    // Dot Product
    // =====================================================


    dot(

        vector:Vector2

    ):

    number {


        return (

            this.x *

            vector.x

        )

        +

        (

            this.y *

            vector.y

        );


    }









    // =====================================================
    // Length
    // =====================================================


    length():

    number {


        return Math.sqrt(

            this.x*this.x +

            this.y*this.y

        );


    }









    // =====================================================
    // Distance
    // =====================================================


    distanceTo(

        vector:Vector2

    ):

    number {


        const dx =

            this.x -

            vector.x;



        const dy =

            this.y -

            vector.y;




        return Math.sqrt(

            dx*dx +

            dy*dy

        );


    }
    // =====================================================
    // Normalize
    // =====================================================


    normalize():

    Vector2 {


        const length =

            this.length();





        if (

            length === 0

        ) {


            return this;


        }







        this.x /= length;


        this.y /= length;



        return this;


    }









    // =====================================================
    // Normalized Copy
    // =====================================================


    normalized():

    Vector2 {


        return this.clone()

            .normalize();


    }









    // =====================================================
    // Angle
    // =====================================================


    angle():

    number {


        return Math.atan2(

            this.y,

            this.x

        );


    }









    // =====================================================
    // Angle In Degrees
    // =====================================================


    angleDegrees():

    number {


        return (

            this.angle()

            *

            180

            /

            Math.PI

        );


    }









    // =====================================================
    // Rotate
    // =====================================================


    rotate(

        radians:number

    ):

    Vector2 {


        const cos =

            Math.cos(

                radians

            );



        const sin =

            Math.sin(

                radians

            );





        const nx =

            this.x *

            cos

            -

            this.y *

            sin;





        const ny =

            this.x *

            sin

            +

            this.y *

            cos;






        this.x = nx;


        this.y = ny;



        return this;


    }









    // =====================================================
    // Perpendicular
    // =====================================================


    perpendicular():

    Vector2 {


        return new Vector2(

            -this.y,

            this.x

        );


    }









    // =====================================================
    // Equals
    // =====================================================


    equals(

        vector:Vector2,

        tolerance:number = 0.000001

    ):

    boolean {


        return (


            Math.abs(

                this.x -

                vector.x

            )

            <

            tolerance


            &&


            Math.abs(

                this.y -

                vector.y

            )

            <

            tolerance


        );


    }









    // =====================================================
    // Static Helpers
    // =====================================================


    static zero():

    Vector2 {


        return new Vector2(

            0,

            0

        );


    }







    static fromArray(

        values:number[]

    ):

    Vector2 {


        return new Vector2(

            values[0] ?? 0,

            values[1] ?? 0

        );


    }
    // =====================================================
    // Linear Interpolation
    // =====================================================


    lerp(

        target:Vector2,

        amount:number

    ):

    Vector2 {


        this.x +=

            (

                target.x -

                this.x

            )

            *

            amount;



        this.y +=

            (

                target.y -

                this.y

            )

            *

            amount;



        return this;


    }









    // =====================================================
    // Clamp Length
    // =====================================================


    clampLength(

        min:number,

        max:number

    ):

    Vector2 {


        const current =

            this.length();





        if (

            current === 0

        ) {

            return this;

        }







        let length = current;





        if (

            length < min

        ) {


            length = min;


        }






        if (

            length > max

        ) {


            length = max;


        }







        return this

            .normalize()

            .multiplyScalar(

                length

            );


    }









    // =====================================================
    // Distance Squared
    // =====================================================


    distanceSquared(

        vector:Vector2

    ):

    number {


        const dx =

            this.x -

            vector.x;



        const dy =

            this.y -

            vector.y;





        return (

            dx * dx

        )

        +

        (

            dy * dy

        );


    }









    // =====================================================
    // Min / Max
    // =====================================================


    min(

        vector:Vector2

    ):

    Vector2 {


        return new Vector2(

            Math.min(

                this.x,

                vector.x

            ),


            Math.min(

                this.y,

                vector.y

            )

        );


    }









    max(

        vector:Vector2

    ):

    Vector2 {


        return new Vector2(

            Math.max(

                this.x,

                vector.x

            ),


            Math.max(

                this.y,

                vector.y

            )

        );


    }









    // =====================================================
    // Negate
    // =====================================================


    negate():

    Vector2 {


        this.x =

            -this.x;



        this.y =

            -this.y;



        return this;


    }









    // =====================================================
    // Serialization
    // =====================================================


    serialize(){


        return {


            x:

                this.x,


            y:

                this.y


        };


    }









    // =====================================================
    // Array Conversion
    // =====================================================


    toArray():

    number[] {


        return [

            this.x,

            this.y

        ];


    }









    // =====================================================
    // Debug
    // =====================================================


    debugInfo(){


        return {


            x:

                this.x,


            y:

                this.y,


            length:

                this.length(),


            angle:

                this.angleDegrees()


        };


    }



}