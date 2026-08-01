package com.tamercad.core.geometry


/**
 * 2D mathematical vector.
 */
data class Vector2(

    val x: Double,

    val y: Double

) {


    operator fun plus(

        other: Vector2

    ): Vector2 {


        return Vector2(

            x + other.x,

            y + other.y

        )

    }



    operator fun minus(

        other: Vector2

    ): Vector2 {


        return Vector2(

            x - other.x,

            y - other.y

        )

    }



    operator fun times(

        scalar: Double

    ): Vector2 {


        return Vector2(

            x * scalar,

            y * scalar

        )

    }



    fun length(): Double {


        return kotlin.math.sqrt(

            x * x +

            y * y

        )

    }



    fun normalized(): Vector2 {


        val length = length()



        if(length == 0.0){

            return Vector2(
                0.0,
                0.0
            )

        }



        return Vector2(

            x / length,

            y / length

        )

    }

}