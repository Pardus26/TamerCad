```typescript
import { Vector3 } from "../vector/Vector3";

/**
 * Android tablet ve dokunmatik/kalem etkileşimli CAD motoru (TamerCad) için 
 * optimize edilmiş 4x4 Matris sınıfı.
 * 
 * Bellek çöp toplayıcısını (Garbage Collector) yormamak adına hem immutable (yeni nesne dönen) 
 * hem de in-place (mevcut nesneyi değiştiren / hedef nesneye yazan) metotlar içerir.
 */
export class Matrix4 {
    public readonly elements: Float64Array;

    constructor(elements?: ArrayLike<number>) {
        if (elements) {
            if (elements.length !== 16) {
                throw new Error("Matrix4 requires exactly 16 values.");
            }
            this.elements = new Float64Array(elements);
        } else {
            this.elements = new Float64Array([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]);
        }
    }

    public static identity(): Matrix4 {
        return new Matrix4();
    }

    public setIdentity(): Matrix4 {
        const e = this.elements;
        e[0] = 1; e[1] = 0; e[2] = 0; e[3] = 0;
        e[4] = 0; e[5] = 1; e[6] = 0; e[7] = 0;
        e[8] = 0; e[9] = 0; e[10] = 1; e[11] = 0;
        e[12] = 0; e[13] = 0; e[14] = 0; e[15] = 1;
        return this;
    }

    public clone(): Matrix4 {
        return new Matrix4(this.elements);
    }

    public copy(matrix: Matrix4): Matrix4 {
        this.elements.set(matrix.elements);
        return this;
    }

    public equals(matrix: Matrix4, epsilon = 1e-10): boolean {
        const a = this.elements;
        const b = matrix.elements;
        for (let i = 0; i < 16; i++) {
            if (Math.abs(a[i] - b[i]) > epsilon) {
                return false;
            }
        }
        return true;
    }

    public isIdentity(epsilon = 1e-10): boolean {
        return this.equals(Matrix4.identity(), epsilon);
    }

    // ----------------------------------------------------
    // Temel Temel Matris İşlemleri (In-Place / Optimized)
    // ----------------------------------------------------

    public transpose(): Matrix4 {
        const m = this.elements;
        return new Matrix4([
            m[0], m[4], m[8], m[12],
            m[1], m[5], m[9], m[13],
            m[2], m[6], m[10], m[14],
            m[3], m[7], m[11], m[15]
        ]);
    }

    public transposeSelf(): Matrix4 {
        const m = this.elements;
        let tmp: number;

        tmp = m[1]; m[1] = m[4]; m[4] = tmp;
        tmp = m[2]; m[2] = m[8]; m[8] = tmp;
        tmp = m[3]; m[3] = m[12]; m[12] = tmp;

        tmp = m[6]; m[6] = m[9]; m[9] = tmp;
        tmp = m[7]; m[7] = m[13]; m[13] = tmp;

        tmp = m[11]; m[11] = m[14]; m[14] = tmp;

        return this;
    }

    public multiply(matrix: Matrix4): Matrix4 {
        return new Matrix4().multiplyMatrices(this, matrix);
    }

    public premultiply(matrix: Matrix4): Matrix4 {
        return new Matrix4().multiplyMatrices(matrix, this);
    }

    public multiplySelf(matrix: Matrix4): Matrix4 {
        return this.multiplyMatrices(this, matrix);
    }

    public multiplyMatrices(a: Matrix4, b: Matrix4): Matrix4 {
        const ae = a.elements;
        const be = b.elements;
        const te = this.elements;

        const a11 = ae[0], a12 = ae[1], a13 = ae[2], a14 = ae[3];
        const a21 = ae[4], a22 = ae[5], a23 = ae[6], a24 = ae[7];
        const a31 = ae[8], a32 = ae[9], a33 = ae[10], a34 = ae[11];
        const a41 = ae[12], a42 = ae[13], a43 = ae[14], a44 = ae[15];

        const b11 = be[0], b12 = be[1], b13 = be[2], b14 = be[3];
        const b21 = be[4], b22 = be[5], b23 = be[6], b24 = be[7];
        const b31 = be[8], b32 = be[9], b33 = be[10], b34 = be[11];
        const b41 = be[12], b42 = be[13], b43 = be[14], b44 = be[15];

        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        te[1] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        te[2] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        te[3] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

        te[4] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        te[6] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        te[7] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

        te[8] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        te[9] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        te[11] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

        te[12] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        te[13] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        te[14] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

        return this;
    }

    public multiplyScalar(s: number): Matrix4 {
        const e = this.elements;
        for (let i = 0; i < 16; i++) {
            e[i] *= s;
        }
        return this;
    }

    public determinant(): number {
        const m = this.elements;
        return (
            m[0] * (m[5] * (m[10] * m[15] - m[11] * m[14]) - m[6] * (m[9] * m[15] - m[11] * m[13]) + m[7] * (m[9] * m[14] - m[10] * m[13])) -
            m[1] * (m[4] * (m[10] * m[15] - m[11] * m[14]) - m[6] * (m[8] * m[15] - m[11] * m[12]) + m[7] * (m[8] * m[14] - m[10] * m[12])) +
            m[2] * (m[4] * (m[9] * m[15] - m[11] * m[13]) - m[5] * (m[8] * m[15] - m[11] * m[12]) + m[7] * (m[8] * m[13] - m[9] * m[12])) -
            m[3] * (m[4] * (m[9] * m[14] - m[10] * m[13]) - m[5] * (m[8] * m[14] - m[10] * m[12]) + m[6] * (m[8] * m[13] - m[9] * m[12]))
        );
    }

    public inverse(): Matrix4 | null {
        const result = new Matrix4();
        if (result.invertOther(this)) {
            return result;
        }
        return null;
    }

    public invertSelf(): boolean {
        return this.invertOther(this);
    }

    public invertOther(matrix: Matrix4): boolean {
        const m = matrix.elements;
        const inv = this.elements;

        inv[0] = m[5] * m[10] * m[15] - m[5] * m[11] * m[14] - m[9] * m[6] * m[15] + m[9] * m[7] * m[14] + m[13] * m[6] * m[11] - m[13] * m[7] * m[10];
        inv[4] = -m[4] * m[10] * m[15] + m[4] * m[11] * m[14] + m[8] * m[6] * m[15] - m[8] * m[7] * m[14] - m[12] * m[6] * m[11] + m[12] * m[7] * m[10];
        inv[8] = m[4] * m[9] * m[15] - m[4] * m[11] * m[13] - m[8] * m[5] * m[15] + m[8] * m[7] * m[13] + m[12] * m[5] * m[11] - m[12] * m[7] * m[9];
        inv[12] = -m[4] * m[9] * m[14] + m[4] * m[10] * m[13] + m[8] * m[5] * m[14] - m[8] * m[6] * m[13] - m[12] * m[5] * m[10] + m[12] * m[6] * m[9];

        inv[1] = -m[1] * m[10] * m[15] + m[1] * m[11] * m[14] + m[9] * m[2] * m[15] - m[9] * m[3] * m[14] - m[13] * m[2] * m[11] + m[13] * m[3] * m[10];
        inv[5] = m[0] * m[10] * m[15] - m[0] * m[11] * m[14] - m[8] * m[2] * m[15] + m[8] * m[3] * m[14] + m[12] * m[2] * m[11] - m[12] * m[3] * m[10];
        inv[9] = -m[0] * m[9] * m[15] + m[0] * m[11] * m[13] + m[8] * m[1] * m[15] - m[8] * m[3] * m[13] - m[12] * m[1] * m[11] + m[12] * m[3] * m[9];
        inv[13] = m[0] * m[9] * m[14] - m[0] * m[10] * m[13] - m[8] * m[1] * m[14] + m[8] * m[2] * m[13] + m[12] * m[1] * m[10] - m[12] * m[2] * m[9];

        inv[2] = m[1] * m[6] * m[15] - m[1] * m[7] * m[14] - m[5] * m[2] * m[15] + m[5] * m[3] * m[14] + m[13] * m[2] * m[7] - m[13] * m[3] * m[6];
        inv[6] = -m[0] * m[6] * m[15] + m[0] * m[7] * m[14] + m[4] * m[2] * m[15] - m[4] * m[3] * m[14] - m[12] * m[2] * m[7] + m[12] * m[3] * m[6];
        inv[10] = m[0] * m[5] * m[15] - m[0] * m[7] * m[13] - m[4] * m[1] * m[15] + m[4] * m[3] * m[13] + m[12] * m[1] * m[7] - m[12] * m[3] * m[5];
        inv[14] = -m[0] * m[5] * m[14] + m[0] * m[6] * m[13] + m[4] * m[1] * m[14] - m[4] * m[2] * m[13] - m[12] * m[1] * m[6] + m[12] * m[2] * m[5];

        inv[3] = -m[1] * m[6] * m[11] + m[1] * m[7] * m[10] + m[5] * m[2] * m[11] - m[5] * m[3] * m[10] - m[9] * m[2] * m[7] + m[9] * m[3] * m[6];
        inv[7] = m[0] * m[6] * m[11] - m[0] * m[7] * m[10] - m[4] * m[2] * m[11] + m[4] * m[3] * m[10] + m[8] * m[2] * m[7] - m[8] * m[3] * m[6];
        inv[11] = -m[0] * m[5] * m[11] + m[0] * m[7] * m[9] + m[4] * m[1] * m[11] - m[4] * m[3] * m[9] - m[8] * m[1] * m[7] + m[8] * m[3] * m[5];
        inv[15] = m[0] * m[5] * m[10] - m[0] * m[6] * m[9] - m[4] * m[1] * m[10] + m[4] * m[2] * m[9] + m[8] * m[1] * m[6] - m[8] * m[2] * m[5];

        const det = m[0] * inv[0] + m[1] * inv[4] + m[2] * inv[8] + m[3] * inv[12];

        if (det === 0) {
            this.setIdentity();
            return false;
        }

        const invDet = 1.0 / det;
        for (let i = 0; i < 16; i++) {
            inv[i] *= invDet;
        }

        return true;
    }

    public invertRigidBody(): Matrix4 {
        const m = this.elements;
        const r = new Matrix4();
        const e = r.elements;

        e[0] = m[0]; e[1] = m[4]; e[2] = m[8];
        e[4] = m[1]; e[5] = m[5]; e[6] = m[9];
        e[8] = m[2]; e[9] = m[6]; e[10] = m[10];

        e[3] = -(e[0] * m[3] + e[1] * m[7] + e[2] * m[11]);
        e[7] = -(e[4] * m[3] + e[5] * m[7] + e[6] * m[11]);
        e[11] = -(e[8] * m[3] + e[9] * m[7] + e[10] * m[11]);

        return r;
    }

    // ----------------------------------------------------
    // Vektör & Nokta Dönüşüm İşlemleri
    // ----------------------------------------------------

    public transformPoint(point: Vector3, target?: Vector3): Vector3 {
        const m = this.elements;
        const x = point.x, y = point.y, z = point.z;

        const w = m[12] * x + m[13] * y + m[14] * z + m[15];
        const invW = w !== 0 ? 1 / w : 1;

        const rx = (m[0] * x + m[1] * y + m[2] * z + m[3]) * invW;
        const ry = (m[4] * x + m[5] * y + m[6] * z + m[7]) * invW;
        const rz = (m[8] * x + m[9] * y + m[10] * z + m[11]) * invW;

        if (target) {
            return target.set(rx, ry, rz);
        }
        return new Vector3(rx, ry, rz);
    }

    public transformVector(vector: Vector3, target?: Vector3): Vector3 {
        const m = this.elements;
        const x = vector.x, y = vector.y, z = vector.z;

        const rx = m[0] * x + m[1] * y + m[2] * z;
        const ry = m[4] * x + m[5] * y + m[6] * z;
        const rz = m[8] * x + m[9] * y + m[10] * z;

        if (target) {
            return target.set(rx, ry, rz);
        }
        return new Vector3(rx, ry, rz);
    }

    public transformDirection(direction: Vector3, target?: Vector3): Vector3 {
        const result = this.transformVector(direction, target);
        return result.normalize();
    }

    public transformNormal(normal: Vector3, target?: Vector3): Vector3 {
        const invMat = this.inverse();
        if (!invMat) {
            return target ? target.copy(normal) : normal.clone();
        }
        return invMat.transposeSelf().transformDirection(normal, target);
    }

    public transformPoints(points: Vector3[]): Vector3[] {
        return points.map(p => this.transformPoint(p));
    }

    public transformVectors(vectors: Vector3[]): Vector3[] {
        return vectors.map(v => this.transformVector(v));
    }

    // ----------------------------------------------------
    // CAD Transform Oluşturucular (Static Helpers)
    // ----------------------------------------------------

    public static translation(x: number, y: number, z: number): Matrix4 {
        return new Matrix4([
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1
        ]);
    }

    public static scale(x: number, y: number, z: number): Matrix4 {
        return new Matrix4([
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        ]);
    }

    public static rotationX(angle: number): Matrix4 {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Matrix4([
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        ]);
    }

    public static rotationY(angle: number): Matrix4 {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Matrix4([
            c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        ]);
    }

    public static rotationZ(angle: number): Matrix4 {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Matrix4([
            c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }

    public static rotationAxis(axis: Vector3, angle: number): Matrix4 {
        const a = axis.normalize();
        const x = a.x, y = a.y, z = a.z;
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const t = 1 - c;

        return new Matrix4([
            t * x * x + c,     t * x * y - s * z, t * x * z + s * y, 0,
            t * x * y + s * z, t * y * y + c,     t * y * z - s * x, 0,
            t * x * z - s * y, t * y * z + s * x, t * z * z + c,     0,
            0,                 0,                 0,                 1
        ]);
    }

    /** CAD Çizim Düzlemleri (Workplane) için taban eksenlerinden matris oluşturma */
    public static makeBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): Matrix4 {
        return new Matrix4([
            xAxis.x, yAxis.x, zAxis.x, 0,
            xAxis.y, yAxis.y, zAxis.y, 0,
            xAxis.z, yAxis.z, zAxis.z, 0,
            0,       0,       0,       1
        ]);
    }

    public static compose(translation: Vector3, rotation: Matrix4, scale: Vector3): Matrix4 {
        return Matrix4.translation(translation.x, translation.y, translation.z)
            .multiply(rotation)
            .multiply(Matrix4.scale(scale.x, scale.y, scale.z));
    }

    /**
     * Matrisi Translation, Scale ve Rotation (Matrix4) bileşenlerine ayırır.
     * CAD Gizmo bileşenleri ve nesne nitelik paneli için tam fonksiyoneldir.
     */
    public decompose(): { translation: Vector3; rotation: Matrix4; scale: Vector3 } {
        const e = this.elements;

        const translation = new Vector3(e[3], e[7], e[11]);

        const sx = Math.hypot(e[0], e[4], e[8]);
        const sy = Math.hypot(e[1], e[5], e[9]);
        const sz = Math.hypot(e[2], e[6], e[10]);

        const scale = new Vector3(sx, sy, sz);

        // Rotation Matrix Extraction (Ölçek etkisinden arındırılmış 3x3 rotasyon)
        const invSx = sx !== 0 ? 1 / sx : 1;
        const invSy = sy !== 0 ? 1 / sy : 1;
        const invSz = sz !== 0 ? 1 / sz : 1;

        const rotation = new Matrix4([
            e[0] * invSx, e[1] * invSy, e[2] * invSz, 0,
            e[4] * invSx, e[5] * invSy, e[6] * invSz, 0,
            e[8] * invSx, e[9] * invSy, e[10] * invSz, 0,
            0,            0,            0,            1
        ]);

        return { translation, rotation, scale };
    }

    public getMaxScaleOnAxis(): number {
        const e = this.elements;
        const scaleXSq = e[0] * e[0] + e[4] * e[4] + e[8] * e[8];
        const scaleYSq = e[1] * e[1] + e[5] * e[5] + e[9] * e[9];
        const scaleZSq = e[2] * e[2] + e[6] * e[6] + e[10] * e[10];
        return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
    }

    // ----------------------------------------------------
    // Kamera ve Projeksiyon Matrisleri
    // ----------------------------------------------------

    public static lookAt(eye: Vector3, target: Vector3, up: Vector3): Matrix4 {
        const z = eye.subtract(target).normalize();
        const x = up.cross(z).normalize();
        const y = z.cross(x);

        return new Matrix4([
            x.x, x.y, x.z, -x.dot(eye),
            y.x, y.y, y.z, -y.dot(eye),
            z.x, z.y, z.z, -z.dot(eye),
            0,   0,   0,   1
        ]);
    }

    public static perspective(fov: number, aspect: number, near: number, far: number): Matrix4 {
        const f = 1 / Math.tan(fov * 0.5);
        const nf = 1 / (near - far);

        return new Matrix4([
            f / aspect, 0, 0,                     0,
            0,          f, 0,                     0,
            0,          0, (far + near) * nf,     (2 * far * near) * nf,
            0,          0, -1,                    0
        ]);
    }

    public static orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4 {
        const lr = 1 / (left - right);
        const bt = 1 / (bottom - top);
        const nf = 1 / (near - far);

        return new Matrix4([
            -2 * lr, 0,       0,        (left + right) * lr,
            0,       -2 * bt, 0,        (top + bottom) * bt,
            0,       0,       2 * nf,   (far + near) * nf,
            0,       0,       0,        1
        ]);
    }

    public static frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4 {
        const rl = 1 / (right - left);
        const tb = 1 / (top - bottom);
        const fn = 1 / (near - far);

        return new Matrix4([
            (2 * near) * rl, 0,               (right + left) * rl, 0,
            0,               (2 * near) * tb, (top + bottom) * tb, 0,
            0,               0,               (far + near) * fn,   (2 * far * near) * fn,
            0,               0,               -1,                  0
        ]);
    }

    // ----------------------------------------------------
    // WebGL / WebGPU Uyum Dönüştürücüleri
    // ----------------------------------------------------

    public toFloat32Array(): Float32Array {
        return new Float32Array(this.elements);
    }

    /** WebGL / WebGPU varsayılan Column-Major formatına dönüştürülmüş Float32Array döner */
    public toColumnMajorFloat32Array(): Float32Array {
        const m = this.elements;
        return new Float32Array([
            m[0], m[4], m[8],  m[12],
            m[1], m[5], m[9],  m[13],
            m[2], m[6], m[10], m[14],
            m[3], m[7], m[11], m[15]
        ]);
    }

    public toArray(): number[] {
        return Array.from(this.elements);
    }

    public static fromArray(array: number[]): Matrix4 {
        return new Matrix4(array);
    }
}

