package com.tamercad.core.rendering


/**
 * Rendering backend abstraction.
 */
interface Renderer {


    fun initialize()


    fun render()


    fun resize(

        width:Int,

        height:Int

    )


    fun release()


}