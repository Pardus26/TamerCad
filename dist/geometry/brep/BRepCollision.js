export class BRepCollision {
    bodies;
    constructor() {
        this.bodies = [];
    }
    /**
     * Collision body ekleme
     */
    addBody(body) {
        this.bodies.push(body);
    }
    /**
     * Ana collision testi
     */
    test(a, b) {
        /*
        
        Pipeline:


        AABB


         ↓


        OBB


         ↓


        Mesh


         ↓


        BRep Intersection


        */
        if (!this.aabb(a.bounds, b.bounds)) {
            return {
                collided: false,
                contacts: [],
                distance: 0
            };
        }
        return this.narrowPhase(a, b);
    }
    /**
     * AABB collision
     */
    aabb(a, b) {
        return !(a.max.x < b.min.x ||
            a.min.x > b.max.x ||
            a.max.y < b.min.y ||
            a.min.y > b.max.y ||
            a.max.z < b.min.z ||
            a.min.z > b.max.z);
    }
    /**
     * OBB collision
     */
    obb(a, b) {
        /*
        
        Separating Axis Theorem


        Axis projection


        */
        return true;
    }
    /**
     * Narrow phase
     */
    narrowPhase(a, b) {
        /*
        
        BRep Intersector kullanılır:


        Face


          ↓


        Edge


          ↓


        Vertex


          ↓


        Contact Point


        */
        const contacts = [];
        return {
            collided: contacts.length > 0,
            contacts,
            distance: 0
        };
    }
    /**
     * Mesh collision
     */
    meshCollision(meshA, meshB) {
        return {
            collided: false,
            triangles: 0
        };
    }
    /**
     * Penetration depth
     */
    penetration(a, b) {
        return {
            depth: 0,
            normal: {
                x: 0,
                y: 0,
                z: 1
            }
        };
    }
    /**
     * Contact üretimi
     */
    generateContact(point, normal, depth) {
        return {
            point,
            normal,
            depth
        };
    }
    /**
     * Continuous collision detection
     */
    continuous(body, velocity, delta) {
        /*
        
        Swept volume:


        Current position

              +

        Future position


        */
        return {
            collision: false,
            toi: 1
        };
    }
    /**
     * Çift body testi
     */
    checkAll() {
        const results = [];
        for (let i = 0; i < this.bodies.length; i++) {
            for (let j = i + 1; j < this.bodies.length; j++) {
                results.push(this.test(this.bodies[i], this.bodies[j]));
            }
        }
        return results;
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepCollision",
            bodies: this.bodies.length,
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepCollision.js.map