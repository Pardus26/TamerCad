import { Vector3 } from "../vector/Vector3";
export class Matrix4 {
    elements;
    constructor(elements) {
        if (elements) {
            if (elements.length !== 16) {
                throw new Error("Matrix4 requires exactly 16 values.");
            }
            this.elements = new Float64Array(elements);
        }
        else {
            this.elements = new Float64Array([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]);
        }
    }
    static identity() {
        return new Matrix4();
    }
    clone() {
        return new Matrix4(this.elements);
    }
    copy(matrix) {
        this.elements.set(matrix.elements);
        return this;
    }
    equals(matrix, epsilon = 1e-10) {
        for (let i = 0; i < 16; i++) {
            if (Math.abs(this.elements[i] -
                matrix.elements[i]) > epsilon) {
                return false;
            }
        }
        return true;
    }
    setIdentity() {
        this.elements.set([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
        return this;
    }
    transpose() {
        const m = this.elements;
        return new Matrix4([
            m[0], m[4], m[8], m[12],
            m[1], m[5], m[9], m[13],
            m[2], m[6], m[10], m[14],
            m[3], m[7], m[11], m[15]
        ]);
    }
    determinant() {
        const m = this.elements;
        return (m[0] *
            (m[5] *
                (m[10] * m[15] -
                    m[11] * m[14])
                -
                    m[6] *
                        (m[9] * m[15] -
                            m[11] * m[13])
                +
                    m[7] *
                        (m[9] * m[14] -
                            m[10] * m[13]))
            -
                m[1] *
                    (m[4] *
                        (m[10] * m[15] -
                            m[11] * m[14])
                        -
                            m[6] *
                                (m[8] * m[15] -
                                    m[11] * m[12])
                        +
                            m[7] *
                                (m[8] * m[14] -
                                    m[10] * m[12]))
            +
                m[2] *
                    (m[4] *
                        (m[9] * m[15] -
                            m[11] * m[13])
                        -
                            m[5] *
                                (m[8] * m[15] -
                                    m[11] * m[12])
                        +
                            m[7] *
                                (m[8] * m[13] -
                                    m[9] * m[12]))
            -
                m[3] *
                    (m[4] *
                        (m[9] * m[14] -
                            m[10] * m[13])
                        -
                            m[5] *
                                (m[8] * m[14] -
                                    m[10] * m[12])
                        +
                            m[6] *
                                (m[8] * m[13] -
                                    m[9] * m[12])));
    }
    multiply(matrix) {
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
    transformPoint(point) {
        const m = this.elements;
        const x = point.x;
        const y = point.y;
        const z = point.z;
        const w = m[12] * x +
            m[13] * y +
            m[14] * z +
            m[15];
        return new Vector3((m[0] * x +
            m[1] * y +
            m[2] * z +
            m[3]) / w, (m[4] * x +
            m[5] * y +
            m[6] * z +
            m[7]) / w, (m[8] * x +
            m[9] * y +
            m[10] * z +
            m[11]) / w);
    }
    transformVector(vector) {
        const m = this.elements;
        return new Vector3(m[0] * vector.x +
            m[1] * vector.y +
            m[2] * vector.z, m[4] * vector.x +
            m[5] * vector.y +
            m[6] * vector.z, m[8] * vector.x +
            m[9] * vector.y +
            m[10] * vector.z);
    }
    transformDirection(direction) {
        return this
            .transformVector(direction)
            .normalize();
    }
    // ----------------------------------------------------
    // Static Transform Builders
    // ----------------------------------------------------
    static translation(x, y, z) {
        return new Matrix4([
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1
        ]);
    }
    static scale(x, y, z) {
        return new Matrix4([
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        ]);
    }
    static rotationX(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Matrix4([
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        ]);
    }
    static rotationY(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Matrix4([
            c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        ]);
    }
    static rotationZ(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Matrix4([
            c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }
    static rotationAxis(axis, angle) {
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
    static rotationAxis(axis, angle) {
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
    static compose(translation, rotation, scale) {
        return Matrix4.translation(translation.x, translation.y, translation.z)
            .multiply(rotation)
            .multiply(Matrix4.scale(scale.x, scale.y, scale.z));
    }
    decompose() {
        const e = this.elements;
        return {
            translation: new Vector3(e[3], e[7], e[11]),
            scale: new Vector3(Math.hypot(e[0], e[4], e[8]), Math.hypot(e[1], e[5], e[9]), Math.hypot(e[2], e[6], e[10]))
        };
    }
    // ----------------------------------------------------
    // LookAt
    // ----------------------------------------------------
    static lookAt(eye, target, up) {
        const z = eye
            .subtract(target)
            .normalize();
        const x = up
            .cross(z)
            .normalize();
        const y = z
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
    static perspective(fov, aspect, near, far) {
        const f = 1 /
            Math.tan(fov * 0.5);
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
    static orthographic(left, right, bottom, top, near, far) {
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
    static frustum(left, right, bottom, top, near, far) {
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
    transformNormal(normal) {
        return this
            .inverse()
            .transpose()
            .transformDirection(normal)
            .normalize();
    }
    toFloat32Array() {
        return new Float32Array(this.elements);
    }
    inverse() {
        const m = this.elements;
        const inv = new Array(16);
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
        let det = m[0] * inv[0] +
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
    invertRigidBody() {
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
        e[3] = -(e[0] * m[3] +
            e[1] * m[7] +
            e[2] * m[11]);
        e[7] = -(e[4] * m[3] +
            e[5] * m[7] +
            e[6] * m[11]);
        e[11] = -(e[8] * m[3] +
            e[9] * m[7] +
            e[10] * m[11]);
        return r;
    }
    transformPoints(points) {
        return points.map(p => this.transformPoint(p));
    }
    transformVectors(vectors) {
        return vectors.map(v => this.transformVector(v));
    }
    isIdentity(epsilon = 1e-10) {
        return this.equals(Matrix4.identity(), epsilon);
    }
    toArray() {
        return Array.from(this.elements);
    }
    static fromArray(array) {
        return new Matrix4(array);
    }
}
//# sourceMappingURL=Matrix4.js.map