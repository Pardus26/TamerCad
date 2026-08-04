package com.tamercad.app

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var engineSurfaceView: EngineSurfaceView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        initializeKernel()

        engineSurfaceView = EngineSurfaceView(this)

        setContentView(engineSurfaceView)
    }

    private fun initializeKernel() {

        /*
         JS/TS Geometry Kernel

              ↓

         EngineBridge.initialize()

         (Native Bridge üzerinden)

         TODO:
         React Native / JSI / V8 / QuickJS
         bağlantısı burada yapılacak.
        */

        try {

            // EngineBridge.initialize()

        } catch (e: Exception) {

            e.printStackTrace()

        }
    }

    override fun onResume() {
        super.onResume()

        engineSurfaceView.onResume()
    }

    override fun onPause() {

        engineSurfaceView.onPause()

        super.onPause()
    }

    override fun onDestroy() {

        engineSurfaceView.shutdown()

        super.onDestroy()
    }
}