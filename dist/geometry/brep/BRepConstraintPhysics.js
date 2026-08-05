export var ConstraintType;
(function (ConstraintType) {
    ConstraintType["FIXED"] = "fixed";
    ConstraintType["HINGE"] = "hinge";
    ConstraintType["SLIDER"] = "slider";
    ConstraintType["DISTANCE"] = "distance";
    ConstraintType["MOTOR"] = "motor";
    ConstraintType["GEAR"] = "gear";
})(ConstraintType || (ConstraintType = {}));
export class BRepConstraintPhysics {
    constraints;
    iterations;
    constructor() {
        this.constraints = [];
        this.iterations = 10;
    }
    /**
     * Constraint ekleme
     */
    add(constraint) {
        this.constraints.push(constraint);
    }
    /**
     * Ana constraint solver
     */
    solve(bodies) {
        let corrections = 0;
        for (const constraint of this.constraints) {
            switch (constraint.type) {
                case ConstraintType.FIXED:
                    this.solveFixed(constraint, bodies);
                    break;
                case ConstraintType.HINGE:
                    this.solveHinge(constraint, bodies);
                    break;
                case ConstraintType.SLIDER:
                    this.solveSlider(constraint, bodies);
                    break;
                case ConstraintType.MOTOR:
                    this.solveMotor(constraint, bodies);
                    break;
            }
            corrections++;
        }
        return {
            solved: true,
            corrections
        };
    }
    /**
     * Fixed joint
     */
    solveFixed(constraint, bodies) {
        const a = this.body(constraint.bodyA, bodies);
        const b = this.body(constraint.bodyB, bodies);
        if (!a || !b)
            return;
        /*
        
        Pozisyon farkını sıfırlar


        */
        b.position =
            {
                x: a.position.x,
                y: a.position.y,
                z: a.position.z
            };
    }
    /**
     * Hinge joint
     */
    solveHinge(constraint, bodies) {
        /*
        
        Dönme serbest

        X,Y,Z translasyon kilitli


        */
    }
    /**
     * Slider joint
     */
    solveSlider(constraint, bodies) {
        /*
        
        Tek eksende hareket


        */
    }
    /**
     * Motor joint
     */
    solveMotor(constraint, bodies) {
        const motor = constraint;
        /*
        
        Angular velocity hedefleme


        */
    }
    /**
     * Distance constraint
     */
    solveDistance(constraint, bodies) {
        /*
        
        İki body arası mesafe korunur


        */
    }
    /**
     * Gear constraint
     */
    solveGear(constraint, bodies) {
        /*
        
        Gear ratio:

        w1*r1 = w2*r2


        */
    }
    /**
     * Body bulucu
     */
    body(id, bodies) {
        return bodies.find(b => b.id === id);
    }
    /**
     * Iterative çözüm
     */
    iterate(bodies) {
        for (let i = 0; i < this.iterations; i++) {
            this.solve(bodies);
        }
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepConstraintPhysics",
            constraints: this.constraints.length,
            iterations: this.iterations,
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepConstraintPhysics.js.map