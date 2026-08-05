import { Vector } from "../core/Vector";
export class SparseVector {
    size;
    indices = [];
    values = [];
    constructor(size) {
        this.size = size;
    }
    static fromDense(vector) {
        const sparse = new SparseVector(vector.size);
        for (let i = 0; i < vector.size; i++) {
            const value = vector.get(i);
            if (value !== 0) {
                sparse.indices.push(i);
                sparse.values.push(value);
            }
        }
        return sparse;
    }
    get(index) {
        const position = this.indices.indexOf(index);
        if (position === -1) {
            return 0;
        }
        return this.values[position];
    }
    set(index, value) {
        const position = this.indices.indexOf(index);
        if (position === -1) {
            if (value !== 0) {
                this.indices.push(index);
                this.values.push(value);
            }
            return;
        }
        if (value === 0) {
            this.indices.splice(position, 1);
            this.values.splice(position, 1);
            return;
        }
        this.values[position] = value;
    }
    dot(other) {
        let sum = 0;
        for (let i = 0; i < this.indices.length; i++) {
            const index = this.indices[i];
            sum +=
                this.values[i] *
                    other.get(index);
        }
        return sum;
    }
    norm() {
        let sum = 0;
        for (const value of this.values) {
            sum += value * value;
        }
        return Math.sqrt(sum);
    }
    nonZeroCount() {
        return this.values.length;
    }
    density() {
        return this.values.length /
            this.size;
    }
    toDense() {
        const dense = Vector.zeros(this.size);
        for (let i = 0; i < this.indices.length; i++) {
            dense.set(this.indices[i], this.values[i]);
        }
        return dense;
    }
    serialize() {
        return {
            size: this.size,
            indices: this.indices,
            values: this.values
        };
    }
    info() {
        return {
            engine: "SparseVector",
            size: this.size,
            nonZeros: this.nonZeroCount(),
            density: this.density()
        };
    }
}
//# sourceMappingURL=SparseVector.js.map