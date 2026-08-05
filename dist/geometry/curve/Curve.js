import { Direction } from "../core/Direction";
export class Curve {
    /**
     * Teğet yönü
     */
    tangent(t) {
        return new Direction(this.derivative(t));
    }
    /**
     * Parametre normalize
     *
     * 0-1 aralığı
     */
    normalizedParameter(t) {
        return (t -
            this.startParameter)
            /
                (this.endParameter -
                    this.startParameter);
    }
    /**
     * Başlangıç noktası
     */
    startPoint() {
        return this.evaluate(this.startParameter);
    }
    /**
     * Bitiş noktası
     */
    endPoint() {
        return this.evaluate(this.endParameter);
    }
    /**
     * Eğri kapalı mı?
     */
    isClosed(tolerance = 1e-6) {
        return (this.startPoint()
            .distanceTo(this.endPoint())
            <
                tolerance);
    }
}
//# sourceMappingURL=Curve.js.map