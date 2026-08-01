package com.tamercad.core.feature


/**
 * Base interface for all parametric CAD features.
 *
 * Every modeling operation inside TamerCAD
 * must be represented as a Feature.
 */
interface Feature {


    /**
     * Unique feature identifier.
     */
    val id:String



    /**
     * User visible feature name.
     */
    var name:String



    /**
     * Feature enabled state.
     */
    var enabled:Boolean



    /**
     * Feature visibility.
     */
    var visible:Boolean



    /**
     * Rebuild feature geometry.
     */
    fun regenerate()



    /**
     * Returns generated geometry.
     */
    fun geometry():Any?



}