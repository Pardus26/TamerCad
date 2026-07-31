/*
 * ============================================================
 * Project : TamerCAD
 * Module  : Android Application
 * File    : app/build.gradle.kts
 * Version : 0.1.0-alpha
 *
 * Copyright (c) 2026 Pardus26
 * ============================================================
 */

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {

    namespace = "com.tamercad"

    compileSdk = 37

    defaultConfig {

        applicationId = "com.tamercad"

        minSdk = 29

        targetSdk = 37

        versionCode = 1

        versionName = "0.1.0-alpha"

        testInstrumentationRunner =
            "androidx.test.runner.AndroidJUnitRunner"

        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildFeatures {

        compose = true

        buildConfig = true
    }

    buildTypes {

        debug {

            applicationIdSuffix = ".debug"

            versionNameSuffix = "-debug"

            isDebuggable = true
        }

        release {

            isMinifyEnabled = true

            isShrinkResources = true

            proguardFiles(

                getDefaultProguardFile(
                    "proguard-android-optimize.txt"
                ),

                "proguard-rules.pro"
            )
        }
    }

    compileOptions {

        sourceCompatibility = JavaVersion.VERSION_21

        targetCompatibility = JavaVersion.VERSION_21
    }

    kotlinOptions {

        jvmTarget = "21"

        freeCompilerArgs += listOf(

            "-Xjvm-default=all"
        )
    }

    packaging {

        resources {

            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {

    implementation(platform(libs.androidx.compose.bom))

    androidTestImplementation(
        platform(libs.androidx.compose.bom)
    )

    implementation(libs.androidx.core.ktx)

    implementation(libs.androidx.activity.compose)

    implementation(libs.androidx.lifecycle.runtime)

    implementation(libs.androidx.navigation.compose)

    implementation(libs.kotlinx.coroutines)

    implementation(libs.androidx.material3)