package com.tamercad.core.constraints



/**
 * Makes two points share same location.
 */
class CoincidentConstraint(

    override val id:String,

    private val a:MutablePoint,

    private val b:MutablePoint

):Constraint {



    override fun solve(){


        b.x = a.x

        b.y = a.y


    }


}