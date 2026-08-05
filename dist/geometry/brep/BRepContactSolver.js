export class BRepContactSolver {
    iterations;
    restitution;
    friction;
    constructor() {
        this.iterations = 10;
        this.restitution = 0.2;
        this.friction = 0.5;
    }
    /**
     * Contact çözüm ana fonksiyonu
     */
    solve(contacts, bodies) {
        let impulseCount = 0;
        let correctionCount = 0;
        for (const contact of contacts) {
            const a = bodies.find(b => b.id === contact.bodyA);
            const b = bodies.find(b => b.id === contact.bodyB);
            if (!a ||
                !b)
                continue;
            const impulse = this.solveNormalImpulse(a, b, contact);
            this.applyImpulse(a, b, impulse);
            impulseCount++;
            this.correctPenetration(a, b, contact);
            correctionCount++;
        }
        return {
            solved: true,
            impulses: impulseCount,
            corrections: correctionCount
        };
    }
    /**
     * Normal impulse hesabı
     */
    solveNormalImpulse(a, b, contact) {
        const relativeVelocity = {
            x: b.velocity.x -
                a.velocity.x,
            y: b.velocity.y -
                a.velocity.y,
            z: b.velocity.z -
                a.velocity.z
        };
        const velocityAlongNormal = relativeVelocity.x *
            contact.normal.x
            +
                relativeVelocity.y *
                    contact.normal.y
            +
                relativeVelocity.z *
                    contact.normal.z;
        if (velocityAlongNormal > 0) {
            return {
                x: 0,
                y: 0,
                z: 0
            };
        }
        const j = -(1 +
            this.restitution)
            *
                velocityAlongNormal;
        return {
            x: contact.normal.x *
                j,
            y: contact.normal.y *
                j,
            z: contact.normal.z *
                j
        };
    }
    /**
     * Impulse uygulama
     */
    applyImpulse(a, b, impulse) {
        if (!a.static) {
            a.velocity.x -=
                impulse.x /
                    a.mass;
            a.velocity.y -=
                impulse.y /
                    a.mass;
            a.velocity.z -=
                impulse.z /
                    a.mass;
        }
        if (!b.static) {
            b.velocity.x +=
                impulse.x /
                    b.mass;
            b.velocity.y +=
                impulse.y /
                    b.mass;
            b.velocity.z +=
                impulse.z /
                    b.mass;
        }
    }
    /**
     * Sürtünme çözümü
     */
    solveFriction(a, b, contact) {
        return {
            x: -this.friction *
                contact.normal.x,
            y: -this.friction *
                contact.normal.y,
            z: -this.friction *
                contact.normal.z
        };
    }
    /**
     * Penetration correction
     */
    correctPenetration(a, b, contact) {
        const correction = contact.penetration *
            0.8;
        if (!a.static) {
            a.position.x -=
                contact.normal.x *
                    correction;
            a.position.y -=
                contact.normal.y *
                    correction;
            a.position.z -=
                contact.normal.z *
                    correction;
        }
        if (!b.static) {
            b.position.x +=
                contact.normal.x *
                    correction;
            b.position.y +=
                contact.normal.y *
                    correction;
            b.position.z +=
                contact.normal.z *
                    correction;
        }
    }
    /**
     * Iterative solver
     */
    iterate(contacts, bodies) {
        for (let i = 0; i < this.iterations; i++) {
            this.solve(contacts, bodies);
        }
    }
    /**
     * Stabilization
     */
    stabilize(bodies) {
        for (const body of bodies) {
            body.velocity.x *= 0.999;
            body.velocity.y *= 0.999;
            body.velocity.z *= 0.999;
        }
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepContactSolver",
            iterations: this.iterations,
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepContactSolver.js.map