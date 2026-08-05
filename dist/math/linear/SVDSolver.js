import { Matrix } from "../core/Matrix";
import { Vector } from "../core/Vector";
export class SVDSolver {
    tolerance = 1e-10;
    solve(system) {
        const { U, S, V } = this.factorize(system.A);
        const pinv = this.computePseudoInverse(U, S, V);
        return this.multiply(pinv, system.b);
    }
    factorize(A) {
        /*
            Placeholder

            Future

            Golub-Reinsch

            Jacobi SVD

            Divide & Conquer

        */
        return {
            U: Matrix.identity(A.rows),
            S: Vector.zeros(Math.min(A.rows, A.cols)),
            V: Matrix.identity(A.cols)
        };
    }
    computePseudoInverse(U, S, V) {
        /*
            Placeholder

            Future

            V Σ⁻¹ Uᵀ

        */
        return Matrix.identity(V.rows);
    }
    multiply(A, b) {
        const x = Vector.zeros(A.rows);
        for (let i = 0; i < A.rows; i++) {
            let value = 0;
            for (let j = 0; j < A.cols; j++) {
                value +=
                    A.get(i, j) *
                        b.get(j);
            }
            x.set(i, value);
        }
        return x;
    }
    rank(S) {
        let r = 0;
        for (let i = 0; i < S.size; i++) {
            if (Math.abs(S.get(i)) >
                this.tolerance) {
                r++;
            }
        }
        return r;
    }
    conditionNumber(S) {
        let max = 0;
        let min = Number.MAX_VALUE;
        for (let i = 0; i < S.size; i++) {
            const s = Math.abs(S.get(i));
            if (s > max)
                max = s;
            if (s > this.tolerance &&
                s < min) {
                min = s;
            }
        }
        return max / min;
    }
    residual(system, x) {
        return system.residual(x);
    }
    info() {
        return {
            engine: "SVDSolver",
            tolerance: this.tolerance
        };
    }
}
//# sourceMappingURL=SVDSolver.js.map