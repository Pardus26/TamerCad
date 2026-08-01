package com.tamercad.core.geometry


/**
 * 3D CAD vector.
 */
data class Vector3(

    val x: Double,

    val y: Double,

    val z: Double

) {


    operator fun plus(

        other: Vector3

    ): Vector3 {


        return Vector3(

            x + other.x,

            y + other.y,

            z + other.z

        )

    }



    operator fun minus(

        other: Vector3

    ): Vector3 {


        return Vector3(

            x - other.x,

            y - other.y,

            z - other.z

        )

    }



    fun dot(

        other: Vector3

    ): Double {


        return (

            x * other.x +

            y * other.y +

            z * other.z

        )

    }



    fun length():Double {


        return kotlin.math.sqrt(

            x*x +

            y*y +

            z*z

        )

    }


}