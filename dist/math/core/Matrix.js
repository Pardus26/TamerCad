export class Matrix {
    values;
    rows;
    cols;
    constructor(values) {
        if (values.length === 0) {
            throw new Error("Matrix cannot be empty");
        }
        const cols = values[0].length;
        for (const row of values) {
            if (row.length !== cols) {
                throw new Error("Invalid matrix shape");
            }
        }
        this.values = values.map(r => [...r]);
        this.rows = values.length;
        this.cols = cols;
    }
    static zeros(rows, cols) {
        return new Matrix(Array.from({ length: rows }, () => new Array(cols).fill(0)));
    }
    static identity(size) {
        const m = Matrix.zeros(size, size);
        for (let i = 0; i < size; i++) {
            m.values[i][i] = 1;
        }
        return m;
    }
    get(row, col) {
        return this.values[row][col];
    }
    set(row, col, value) {
        this.values[row][col] = value;
    }
    clone() {
        return new Matrix(this.values);
    }
    transpose() {
        const result = Matrix.zeros(this.cols, this.rows);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.set(j, i, this.get(i, j));
            }
        }
        return result;
    }
    add(other) {
        this.assertSameShape(other);
        const result = this.clone();
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.set(i, j, this.get(i, j) + other.get(i, j));
            }
        }
        return result;
    }
    subtract(other) {
        this.assertSameShape(other);
        const result = this.clone();
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.set(i, j, this.get(i, j) - other.get(i, j));
            }
        }
        return result;
    }
    multiply(other) {
        if (this.cols !== other.rows) {
            throw new Error("Invalid matrix multiplication");
        }
        const result = Matrix.zeros(this.rows, other.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < other.cols; j++) {
                let sum = 0;
                for (let k = 0; k < this.cols; k++) {
                    sum +=
                        this.get(i, k) *
                            other.get(k, j);
                }
                result.set(i, j, sum);
            }
        }
        return result;
    }
    scale(value) {
        const result = this.clone();
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.set(i, j, result.get(i, j) * value);
            }
        }
        return result;
    }
    trace() {
        if (this.rows !== this.cols) {
            throw new Error("Trace requires square matrix");
        }
        let t = 0;
        for (let i = 0; i < this.rows; i++) {
            t += this.get(i, i);
        }
        return t;
    }
    toArray() {
        return this.values.map(r => [...r]);
    }
    serialize() {
        return {
            rows: this.rows,
            cols: this.cols,
            values: this.toArray()
        };
    }
    assertSameShape(other) {
        if (this.rows !== other.rows ||
            this.cols !== other.cols) {
            throw new Error("Matrix size mismatch");
        }
    }
    info() {
        return {
            rows: this.rows,
            cols: this.cols
        };
    }
}
//# sourceMappingURL=Matrix.js.map