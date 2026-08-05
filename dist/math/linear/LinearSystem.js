export class LinearSystem {
    A;
    b;
    constructor(A, b) {
        if (A.rows !== b.size) {
            throw new Error("Linear system dimension mismatch");
        }
        this.A = A;
        this.b = b;
    }
    dimension() {
        return this.A.rows;
    }
    clone() {
        return new LinearSystem(this.A.clone(), this.b.clone());
    }
    residual(x) {
        if (x.size !== this.A.cols) {
            throw new Error("Solution vector dimension mismatch");
        }
        let sum = 0;
        for (let i = 0; i < this.A.rows; i++) {
            let value = 0;
            for (let j = 0; j < this.A.cols; j++) {
                value +=
                    this.A.get(i, j) *
                        x.get(j);
            }
            const r = value - this.b.get(i);
            sum += r * r;
        }
        return Math.sqrt(sum);
    }
    validate() {
        return this.A.rows === this.b.size;
    }
    serialize() {
        return {
            matrix: this.A.serialize(),
            vector: this.b.serialize()
        };
    }
    info() {
        return {
            engine: "LinearSystem",
            rows: this.A.rows,
            cols: this.A.cols
        };
    }
}
//# sourceMappingURL=LinearSystem.js.map