import { Matrix } from "../core/Matrix";
import { Vector } from "../core/Vector";
export class QRSolver {
    solve(system) {
        const Q = this.computeQ(system.A);
        const R = this.computeR(system.A);
        const y = this.multiplyTranspose(Q, system.b);
        return this.backSubstitution(R, y);
    }
    computeQ(A) {
        /*
            Placeholder

            Future

            Householder

            Gram-Schmidt

            Modified GS

        */
        return Matrix.identity(A.rows);
    }
    computeR(A) {
        /*
            Placeholder

        */
        return A.clone();
    }
    multiplyTranspose(Q, b) {
        const result = Vector.zeros(Q.cols);
        for (let i = 0; i < Q.cols; i++) {
            let sum = 0;
            for (let j = 0; j < Q.rows; j++) {
                sum +=
                    Q.get(j, i) *
                        b.get(j);
            }
            result.set(i, sum);
        }
        return result;
    }
    backSubstitution(R, y) {
        const n = R.rows;
        const x = Vector.zeros(n);
        for (let i = n - 1; i >= 0; i--) {
            let value = y.get(i);
            for (let j = i + 1; j < n; j++) {
                value -=
                    R.get(i, j) *
                        x.get(j);
            }
            value /= R.get(i, i);
            x.set(i, value);
        }
        return x;
    }
    residual(system, x) {
        return system.residual(x);
    }
    info() {
        return {
            engine: "QRSolver"
        };
    }
}
//# sourceMappingURL=QRSolver.js.map