#version 300 es

precision highp float;

in vec2 vUV;

layout(location = 0) out float FragAO;

/*
----------------------------------------
GBuffer
----------------------------------------
*/

uniform sampler2D uDepth;

uniform sampler2D uNormal;

uniform sampler2D uNoise;

/*
----------------------------------------
Kernel
----------------------------------------
*/

uniform vec3 uKernel[64];

/*
----------------------------------------
Camera
----------------------------------------
*/

uniform mat4 uProjection;

uniform mat4 uInverseProjection;

uniform vec2 uNoiseScale;

uniform float uRadius;

uniform float uBias;

uniform float uPower;

/*
========================================
Depth Reconstruction
========================================
*/

vec3 reconstructViewPosition(

    vec2 uv,

    float depth

)

{

    vec4 clip = vec4(

        uv * 2.0 - 1.0,

        depth * 2.0 - 1.0,

        1.0

    );

    vec4 view =

        uInverseProjection * clip;

    return view.xyz / view.w;

}

/*
========================================
Normal Fetch
========================================
*/

vec3 fetchNormal(

    vec2 uv

)

{

    vec3 n =

        texture(

            uNormal,

            uv

        ).xyz;

    return normalize(

        n * 2.0 - 1.0

    );

}

/*
========================================
Depth Fetch
========================================
*/

float fetchDepth(

    vec2 uv

)

{

    return texture(

        uDepth,

        uv

    ).r;

}

/*
========================================
Noise Fetch
========================================
*/

vec3 fetchNoise(

    vec2 uv

)

{

    return normalize(

        texture(

            uNoise,

            uv * uNoiseScale

        ).xyz * 2.0 - 1.0

    );

}

/*
========================================
Main
========================================
*/

void main()

{

    float depth =

        fetchDepth(vUV);

    vec3 normal =

        fetchNormal(vUV);

    vec3 position =

        reconstructViewPosition(

            vUV,

            depth

        );

    vec3 randomVector =

        fetchNoise(vUV);

    /*
        Occlusion

        sonraki bölümde
        hesaplanacak
    */

    FragAO = 1.0;

}