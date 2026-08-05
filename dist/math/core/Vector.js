export class Vector {
    values;
    size;
    constructor(values) {
        this.values = [...values];
        this.size = values.length;
    }
    static zeros(size) {
        return new Vector(new Array(size).fill(0));
    }
    get(index) {
        return this.values[index];
    }
    set(index, value) {
        this.values[index] = value;
    }
    clone() {
        return new Vector(this.values);
    }
    add(other) {
        this.assertSameSize(other);
        const result = this.clone();
        for (let i = 0; i < this.size; i++) {
            result.set(i, this.get(i) + other.get(i));
        }
        return result;
    }
    subtract(other) {
        this.assertSameSize(other);
        const result = this.clone();
        for (let i = 0; i < this.size; i++) {
            result.set(i, this.get(i) - other.get(i));
        }
        return result;
    }
    scale(value) {
        const result = this.clone();
        for (let i = 0; i < this.size; i++) {
            result.set(i, result.get(i) * value);
        }
        return result;
    }
    dot(other) {
        this.assertSameSize(other);
        let sum = 0;
        for (let i = 0; i < this.size; i++) {
            sum +=
                this.get(i) * other.get(i);
        }
        return sum;
    }
    norm() {
        return Math.sqrt(this.dot(this));
    }
    normalize() {
        const n = this.norm();
        if (n === 0) {
            return this.clone();
        }
        return this.scale(1 / n);
    }
    max() {
        return Math.max(...this.values);
    }
    min() {
        return Math.min(...this.values);
    }
    toArray() {
        return [...this.values];
    }
    serialize() {
        return {
            size: this.size,
            values: this.toArray()
        };
    }
    assertSameSize(other) {
        if (this.size !== other.size) {
            throw new Error("Vector size mismatch");
        }
    }
    info() {
        return {
            size: this.size
        };
    }
}
//# sourceMappingURL=Vector.js.map