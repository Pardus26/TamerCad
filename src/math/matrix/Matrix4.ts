import { Vector3 } from "../vector/Vector3";

export class Matrix4 {

    public readonly elements: Float64Array;

    constructor(elements?: ArrayLike<number>) {

        if (elements) {

            if (elements.length !== 16) {

                throw new Error(
                    "Matrix4 requires exactly 16 values."
                );

            }

            this.elements = new Float64Array(elements);

        } else {

            this.elements = new Float64Array([

                1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                0,0,0,1

            ]);

        }

    }

    public static identity(): Matrix4 {

        return new Matrix4();

    }

    public clone(): Matrix4 {

        return new Matrix4(this.elements);

    }

    public copy(matrix: Matrix4): Matrix4 {

        this.elements.set(matrix.elements);

        return this;

    }

    public equals(
        matrix: Matrix4,
        epsilon = 1e-10
    ): boolean {

        for (let i = 0; i < 16; i++) {

            if (
                Math.abs(
                    this.elements[i] -
                    matrix.elements[i]
                ) > epsilon
            ) {

                return false;

            }

        }

        return true;

    }

    public setIdentity(): Matrix4 {

        this.elements.set([

            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1

        ]);

        return this;

    }

    public transpose(): Matrix4 {

        const m = this.elements;

        return new Matrix4([

            m[0],m[4],m[8],m[12],
            m[1],m[5],m[9],m[13],
            m[2],m[6],m[10],m[14],
            m[3],m[7],m[11],m[15]

        ]);

    }

    public determinant(): number {

        const m = this.elements;

        return (
            m[0] *
            (
                m[5] *
                (
                    m[10] * m[15] -
                    m[11] * m[14]
                )
                -
                m[6] *
                (
                    m[9] * m[15] -
                    m[11] * m[13]
                )
                +
                m[7] *
                (
                    m[9] * m[14] -
                    m[10] * m[13]
                )
            )
            -
            m[1] *
            (
                m[4] *
                (
                    m[10] * m[15] -
                    m[11] * m[14]
                )
                -
                m[6] *
                (
                    m[8] * m[15] -
                    m[11] * m[12]
                )
                +
                m[7] *
                (
                    m[8] * m[14] -
                    m[10] * m[12]
                )
            )
            +
            m[2] *
            (
                m[4] *
                (
                    m[9] * m[15] -
                    m[11] * m[13]
                )
                -
                m[5] *
                (
                    m[8] * m[15] -
                    m[11] * m[12]
                )
                +
                m[7] *
                (
                    m[8] * m[13] -
                    m[9] * m[12]
                )
            )
            -
            m[3] *
            (
                m[4] *
                (
                    m[9] * m[14] -
                    m[10] * m[13]
                )
                -
                m[5] *
                (
                    m[8] * m[14] -
                    m[10] * m[12]
                )
                +
                m[6] *
                (
                    m[8] * m[13] -
                    m[9] * m[12]
                )
            )
        );

    }
    public multiply(
        matrix: Matrix4
    ): Matrix4 {

        const a = this.elements;
        const b = matrix.elements;

        const r = new Float64Array(16);

        for (let row = 0; row < 4; row++) {

            for (let col = 0; col < 4; col++) {

                let sum = 0;

                for (let k = 0; k < 4; k++) {

                    sum +=
                        a[row * 4 + k] *
                        b[k * 4 + col];

                }

                r[row * 4 + col] = sum;

            }

        }

        return new Matrix4(r);

    }


    public transformPoint(
        point: Vector3
    ): Vector3 {

        const m = this.elements;

        const x = point.x;
        const y = point.y;
        const z = point.z;

        const w =
            m[12] * x +
            m[13] * y +
            m[14] * z +
            m[15];

        return new Vector3(

            (
                m[0] * x +
                m[1] * y +
                m[2] * z +
                m[3]
            ) / w,


            (
                m[4] * x +
                m[5] * y +
                m[6] * z +
                m[7]
            ) / w,


            (
                m[8] * x +
                m[9] * y +
                m[10] * z +
                m[11]
            ) / w

        );

    }


    public transformVector(
        vector: Vector3
    ): Vector3 {

        const m = this.elements;

        return new Vector3(

            m[0] * vector.x +
            m[1] * vector.y +
            m[2] * vector.z,


            m[4] * vector.x +
            m[5] * vector.y +
            m[6] * vector.z,


            m[8] * vector.x +
            m[9] * vector.y +
            m[10] * vector.z

        );

    }


    public transformDirection(
        direction: Vector3
    ): Vector3 {

        return this
            .transformVector(direction)
            .normalize();

    }


    // ----------------------------------------------------
    // Static Transform Builders
    // ----------------------------------------------------


    public static translation(
        x:number,
        y:number,
        z:number
    ):Matrix4 {

        return new Matrix4([

            1,0,0,x,
            0,1,0,y,
            0,0,1,z,
            0,0,0,1

        ]);

    }


    public static scale(
        x:number,
        y:number,
        z:number
    ):Matrix4 {

        return new Matrix4([

            x,0,0,0,
            0,y,0,0,
            0,0,z,0,
            0,0,0,1

        ]);

    }


    public static rotationX(
        angle:number
    ):Matrix4 {

        const c = Math.cos(angle);
        const s = Math.sin(angle);

        return new Matrix4([

            1,0,0,0,
            0,c,-s,0,
            0,s,c,0,
            0,0,0,1

        ]);

    }


    public static rotationY(
        angle:number
    ):Matrix4 {

        const c = Math.cos(angle);
        const s = Math.sin(angle);

        return new Matrix4([

            c,0,s,0,
            0,1,0,0,
            -s,0,c,0,
            0,0,0,1

        ]);

    }


    public static rotationZ(
        angle:number
    ):Matrix4 {

        const c = Math.cos(angle);
        const s = Math.sin(angle);

        return new Matrix4([

            c,-s,0,0,
            s,c,0,0,
            0,0,1,0,
            0,0,0,1

        ]);

    }


    public static rotationAxis(
        axis:Vector3,
        angle:number
    ):Matrix4 {

        const a = axis.normalize();

        const x = a.x;
        const y = a.y;
        const z = a.z;

        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const t = 1 - c;

        return new Matrix4([

            t*x*x+c,
            t*x*y-s*z,
            t*x*z+s*y,
            0,

            t*x*y+s*z,
            t*y*y+c,
            t*y*z-s*x,
            0,

            t*x*z-s*y,
            t*y*z+s*x,
            t*z*z+c,
            0,

            0,
            0,
            0,
            1

        ]);

    }
    public static rotationAxis(

        axis: Vector3,

        angle: number

    ): Matrix4 {

        const a = axis.normalize();

        const x = a.x;
        const y = a.y;
        const z = a.z;

        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const t = 1 - c;

        return new Matrix4([

            t * x * x + c,
            t * x * y - s * z,
            t * x * z + s * y,
            0,

            t * x * y + s * z,
            t * y * y + c,
            t * y * z - s * x,
            0,

            t * x * z - s * y,
            t * y * z + s * x,
            t * z * z + c,
            0,

            0,
            0,
            0,
            1

        ]);

    }


    public static compose(

        translation: Vector3,

        rotation: Matrix4,

        scale: Vector3

    ): Matrix4 {

        return Matrix4.translation(

            translation.x,

            translation.y,

            translation.z

        )
        .multiply(rotation)
        .multiply(

            Matrix4.scale(

                scale.x,

                scale.y,

                scale.z

            )

        );

    }


    public decompose() {

        const e = this.elements;

        return {

            translation: new Vector3(

                e[3],

                e[7],

                e[11]

            ),

            scale: new Vector3(

                Math.hypot(

                    e[0],

                    e[4],

                    e[8]

                ),

                Math.hypot(

                    e[1],

                    e[5],

                    e[9]

                ),

                Math.hypot(

                    e[2],

                    e[6],

                    e[10]

                )

            )

        };

    }


    // ----------------------------------------------------
    // LookAt
    // ----------------------------------------------------

    public static lookAt(

        eye: Vector3,

        target: Vector3,

        up: Vector3

    ): Matrix4 {

        const z =

            eye

            .subtract(target)

            .normalize();


        const x =

            up

            .cross(z)

            .normalize();


        const y =

            z

            .cross(x);


        return new Matrix4([

            x.x,
            x.y,
            x.z,
            -x.dot(eye),

            y.x,
            y.y,
            y.z,
            -y.dot(eye),

            z.x,
            z.y,
            z.z,
            -z.dot(eye),

            0,
            0,
            0,
            1

        ]);

    }


    // ----------------------------------------------------
    // Projection Matrices
    // ----------------------------------------------------

    public static perspective(

        fov: number,

        aspect: number,

        near: number,

        far: number

    ): Matrix4 {

        const f =

            1 /

            Math.tan(

                fov * 0.5

            );


        return new Matrix4([

            f / aspect,
            0,
            0,
            0,

            0,
            f,
            0,
            0,

            0,
            0,
            (far + near) / (near - far),
            (2 * far * near) / (near - far),

            0,
            0,
            -1,
            0

        ]);

    }


    public static orthographic(

        left: number,

        right: number,

        bottom: number,

        top: number,

        near: number,

        far: number

    ): Matrix4 {

        return new Matrix4([

            2 / (right - left),
            0,
            0,
            -(right + left) / (right - left),

            0,
            2 / (top - bottom),
            0,
            -(top + bottom) / (top - bottom),

            0,
            0,
            -2 / (far - near),
            -(far + near) / (far - near),

            0,
            0,
            0,
            1

        ]);

    }
    public static frustum(

        left: number,

        right: number,

        bottom: number,

        top: number,

        near: number,

        far: number

    ): Matrix4 {

        return new Matrix4([

            (2 * near) / (right - left),
            0,
            (right + left) / (right - left),
            0,

            0,
            (2 * near) / (top - bottom),
            (top + bottom) / (top - bottom),
            0,

            0,
            0,
            -(far + near) / (far - near),
            -(2 * far * near) / (far - near),

            0,
            0,
            -1,
            0

        ]);

    }


    public transformNormal(

        normal: Vector3

    ): Vector3 {

        return this

            .inverse()

            .transpose()

            .transformDirection(normal)

            .normalize();

    }


    public toFloat32Array(): Float32Array {

        return new Float32Array(

            this.elements

        );

    }


    public inverse(): Matrix4 {

        const m = this.elements;

        const inv = new Array<number>(16);


        inv[0] =
            m[5] * m[10] * m[15] -
            m[5] * m[11] * m[14] -
            m[9] * m[6] * m[15] +
            m[9] * m[7] * m[14] +
            m[13] * m[6] * m[11] -
            m[13] * m[7] * m[10];


        inv[4] =
            -m[4] * m[10] * m[15] +
            m[4] * m[11] * m[14] +
            m[8] * m[6] * m[15] -
            m[8] * m[7] * m[14] -
            m[12] * m[6] * m[11] +
            m[12] * m[7] * m[10];


        inv[8] =
            m[4] * m[9] * m[15] -
            m[4] * m[11] * m[13] -
            m[8] * m[5] * m[15] +
            m[8] * m[7] * m[13] +
            m[12] * m[5] * m[11] -
            m[12] * m[7] * m[9];


        inv[12] =
            -m[4] * m[9] * m[14] +
            m[4] * m[10] * m[13] +
            m[8] * m[5] * m[14] -
            m[8] * m[6] * m[13] -
            m[12] * m[5] * m[10] +
            m[12] * m[6] * m[9];


        inv[1] =
            -m[1] * m[10] * m[15] +
            m[1] * m[11] * m[14] +
            m[9] * m[2] * m[15] -
            m[9] * m[3] * m[14] -
            m[13] * m[2] * m[11] +
            m[13] * m[3] * m[10];


        inv[5] =
            m[0] * m[10] * m[15] -
            m[0] * m[11] * m[14] -
            m[8] * m[2] * m[15] +
            m[8] * m[3] * m[14] +
            m[12] * m[2] * m[11] -
            m[12] * m[3] * m[10];


        inv[9] =
            -m[0] * m[9] * m[15] +
            m[0] * m[11] * m[13] +
            m[8] * m[1] * m[15] -
            m[8] * m[3] * m[13] -
            m[12] * m[1] * m[11] +
            m[12] * m[3] * m[9];


        inv[13] =
            m[0] * m[9] * m[14] -
            m[0] * m[10] * m[13] -
            m[8] * m[1] * m[14] +
            m[8] * m[2] * m[13] +
            m[12] * m[1] * m[10] -
            m[12] * m[2] * m[9];


        inv[2] =
            m[1] * m[6] * m[15] -
            m[1] * m[7] * m[14] -
            m[5] * m[2] * m[15] +
            m[5] * m[3] * m[14] +
            m[13] * m[2] * m[7] -
            m[13] * m[3] * m[6];


        inv[6] =
            -m[0] * m[6] * m[15] +
            m[0] * m[7] * m[14] +
            m[4] * m[2] * m[15] -
            m[4] * m[3] * m[14] -
            m[12] * m[2] * m[7] +
            m[12] * m[3] * m[6];


        inv[10] =
            m[0] * m[5] * m[15] -
            m[0] * m[7] * m[13] -
            m[4] * m[1] * m[15] +
            m[4] * m[3] * m[13] +
            m[12] * m[1] * m[7] -
            m[12] * m[3] * m[5];


        inv[14] =
            -m[0] * m[5] * m[14] +
            m[0] * m[6] * m[13] +
            m[4] * m[1] * m[14] -
            m[4] * m[2] * m[13] -
            m[12] * m[1] * m[6] +
            m[12] * m[2] * m[5];


        inv[3] =
            -m[1] * m[6] * m[11] +
            m[1] * m[7] * m[10] +
            m[5] * m[2] * m[11] -
            m[5] * m[3] * m[10] -
            m[9] * m[2] * m[7] +
            m[9] * m[3] * m[6];


        inv[7] =
            m[0] * m[6] * m[11] -
            m[0] * m[7] * m[10] -
            m[4] * m[2] * m[11] +
            m[4] * m[3] * m[10] +
            m[8] * m[2] * m[7] -
            m[8] * m[3] * m[6];


        inv[11] =
            -m[0] * m[5] * m[11] +
            m[0] * m[7] * m[9] +
            m[4] * m[1] * m[11] -
            m[4] * m[3] * m[9] -
            m[8] * m[1] * m[7] +
            m[8] * m[3] * m[5];


        inv[15] =
            m[0] * m[5] * m[10] -
            m[0] * m[6] * m[9] -
            m[4] * m[1] * m[10] +
            m[4] * m[2] * m[9] +
            m[8] * m[1] * m[6] -
            m[8] * m[2] * m[5];


        let det =

            m[0] * inv[0] +
            m[1] * inv[4] +
            m[2] * inv[8] +
            m[3] * inv[12];


        if (det === 0) {

            return Matrix4.identity();

        }


        det = 1 / det;


        for (let i = 0; i < 16; i++) {

            inv[i] *= det;

        }


        return new Matrix4(inv);

    }


    public invertRigidBody(): Matrix4 {

        const m = this.elements;

        const r = new Matrix4();

        const e = r.elements;


        e[0] = m[0];
        e[1] = m[4];
        e[2] = m[8];


        e[4] = m[1];
        e[5] = m[5];
        e[6] = m[9];


        e[8] = m[2];
        e[9] = m[6];
        e[10] = m[10];


        e[3] = -(

            e[0] * m[3] +
            e[1] * m[7] +
            e[2] * m[11]

        );


        e[7] = -(

            e[4] * m[3] +
            e[5] * m[7] +
            e[6] * m[11]

        );


        e[11] = -(

            e[8] * m[3] +
            e[9] * m[7] +
            e[10] * m[11]

        );


        return r;

    }


    public transformPoints(

        points: Vector3[]

    ): Vector3[] {

        return points.map(

            p => this.transformPoint(p)

        );

    }


    public transformVectors(

        vectors: Vector3[]

    ): Vector3[] {

        return vectors.map(

            v => this.transformVector(v)

        );

    }


    public isIdentity(

        epsilon = 1e-10

    ): boolean {

        return this.equals(

            Matrix4.identity(),

            epsilon

        );

    }


    public toArray(): number[] {

        return Array.from(

            this.elements

        );

    }


    public static fromArray(

        array: number[]

    ): Matrix4 {

        return new Matrix4(array);

    }

}