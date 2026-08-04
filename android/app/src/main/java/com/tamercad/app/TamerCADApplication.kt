package com.tamercad.app

import android.app.Application
import android.util.Log

class TamerCADApplication : Application() {

    companion object {

        lateinit var instance: TamerCADApplication
            private set

        private const val TAG = "TamerCAD"
    }

    override fun onCreate() {

        super.onCreate()

        instance = this

        initializeApplication()
    }

    private fun initializeApplication() {

        Log.i(
            TAG,
            "Starting TamerCAD..."
        )

        try {

            initializeKernel()

            initializePreferences()

            initializeWorkspace()

            initializePlugins()

            Log.i(
                TAG,
                "Kernel Ready."
            )

        } catch (ex: Exception) {

            Log.e(
                TAG,
                "Initialization Failed",
                ex
            )
        }
    }

    /**
     * CAD Kernel
     */
    private fun initializeKernel() {

        /*
            Future

            EngineBridge.initialize()

            KernelBootstrap.initialize()

            Geometry Kernel

            Renderer

            Document Manager

            Plugin Manager
        */
    }

    /**
     * Kullanıcı ayarları
     */
    private fun initializePreferences() {

        /*
            Future

            Units

            Theme

            Autosave

            Recent Files

            Language
        */
    }

    /**
     * Workspace
     */
    private fun initializeWorkspace() {

        /*
            Future

            Temporary Folder

            Cache

            Recovery Folder

            Documents
        */
    }

    /**
     * Plugin sistemi
     */
    private fun initializePlugins() {

        /*
            Future

            Plugin Loader

            Script Engine

            Native Modules
        */
    }

    override fun onTerminate() {

        shutdown()

        super.onTerminate()
    }

    private fun shutdown() {

        Log.i(
            TAG,
            "Shutdown..."
        )

        /*
            Future

            EngineBridge.shutdown()

            Save Preferences

            Close Documents

            Dispose Renderer
        */
    }
}