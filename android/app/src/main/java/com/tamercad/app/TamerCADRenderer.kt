package com.tamercad.app

import android.opengl.GLES30
import android.opengl.GLSurfaceView
import javax.microedition.khronos.egl.EGLConfig
import javax.microedition.khronos.opengles.GL10

class TamerCADRenderer : GLSurfaceView.Renderer {

    private var width = 0
    private var height = 0

    private var previousTime = System.nanoTime()

    override fun onSurfaceCreated(
        gl: GL10?,
        config: EGLConfig?
    ) {

        GLES30.glClearColor(
            0.12f,
            0.12f,
            0.14f,
            1.0f
        )

        GLES30.glEnable(
            GLES30.GL_DEPTH_TEST
        )

        GLES30.glEnable(
            GLES30.GL_CULL_FACE
        )

        initializeKernel()
    }

    override fun onSurfaceChanged(
        gl: GL10?,
        width: Int,
        height: Int
    ) {

        this.width = width
        this.height = height

        GLES30.glViewport(
            0,
            0,
            width,
            height
        )

        /*
            Future

            EngineBridge.viewport.resize()
        */
    }

    override fun onDrawFrame(
        gl: GL10?
    ) {

        val now = System.nanoTime()

        val deltaTime =
            (now - previousTime) / 1_000_000_000.0

        previousTime = now

        GLES30.glClear(

            GLES30.GL_COLOR_BUFFER_BIT or
                    GLES30.GL_DEPTH_BUFFER_BIT

        )

        update(deltaTime.toFloat())

        render()
    }

    /**
     * Kernel başlatma
     */
    private fun initializeKernel() {

        /*
            TODO

            EngineBridge.initialize()

            KernelBootstrap.initialize()
        */
    }

    /**
     * Frame güncelleme
     */
    private fun update(
        deltaTime: Float
    ) {

        /*
            TODO

            EngineBridge.update(deltaTime)
        */
    }

    /**
     * Çizim
     */
    private fun render() {

        /*
            TODO

            EngineBridge.render()
        */
    }

    /**
     * Dokunmatik
     */
    fun touchDown(
        x: Float,
        y: Float
    ) {

        /*
            Future

            Orbit Begin

            Selection Begin
        */
    }

    fun touchMove(
        x: Float,
        y: Float
    ) {

        /*
            Future

            Orbit

            Pan

            Zoom
        */
    }

    fun touchUp(
        x: Float,
        y: Float
    ) {

    }

    /**
     * Renderer kapatma
     */
    fun shutdown() {

        /*
            TODO

            EngineBridge.shutdown()
        */
    }
}