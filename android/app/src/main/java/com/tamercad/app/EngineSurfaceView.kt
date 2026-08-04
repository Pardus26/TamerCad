package com.tamercad.app

import android.content.Context
import android.opengl.GLSurfaceView
import android.view.MotionEvent

class EngineSurfaceView(
    context: Context
) : GLSurfaceView(context) {

    private val renderer: TamerCADRenderer

    init {

        /*
            OpenGL ES 3.0
         */
        setEGLContextClientVersion(3)

        renderer = TamerCADRenderer()

        setRenderer(renderer)

        renderMode = RENDERMODE_CONTINUOUSLY

        preserveEGLContextOnPause = true
    }

    override fun onTouchEvent(
        event: MotionEvent
    ): Boolean {

        when (event.actionMasked) {

            MotionEvent.ACTION_DOWN -> {

                renderer.touchDown(
                    event.x,
                    event.y
                )
            }

            MotionEvent.ACTION_MOVE -> {

                renderer.touchMove(
                    event.x,
                    event.y
                )
            }

            MotionEvent.ACTION_UP -> {

                renderer.touchUp(
                    event.x,
                    event.y
                )
            }
        }

        return true
    }

    fun shutdown() {

        renderer.shutdown()

    }
}