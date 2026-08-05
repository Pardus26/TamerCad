export class Vector3 {
    x;
    y;
    z;
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
    add(v) {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    subtract(v) {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    multiply(s) {
        return new Vector3(this.x * s, this.y * s, this.z * s);
    }
    dot(v) {
        return (this.x * v.x +
            this.y * v.y +
            this.z * v.z);
    }
    cross(v) {
        return new Vector3(this.y * v.z -
            this.z * v.y, this.z * v.x -
            this.x * v.z, this.x * v.y -
            this.y * v.x);
    }
    length() {
        return Math.sqrt(this.x * this.x +
            this.y * this.y +
            this.z * this.z);
    }
    normalize() {
        const l = this.length();
        if (l === 0)
            return new Vector3();
        return new Vector3(this.x / l, this.y / l, this.z / l);
    }
    distance(v) {
        return this
            .subtract(v)
            .length();
    }
}
//# sourceMappingURL=Vector3.js.map