package com.tamercad.core.geometry


/**
 * Infinite line geometry.
 */
data class Line(

    val start:Point,

    val end:Point

){


    fun direction():Vector3 {


        return end.position -

                start.position

    }


}