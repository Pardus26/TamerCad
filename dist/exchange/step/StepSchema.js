export class StepSchema {
    entities = new Map();
    constructor() {
        this.registerDefaults();
    }
    register(definition) {
        this.entities.set(definition.name.toUpperCase(), definition);
    }
    has(entityName) {
        return this.entities.has(entityName.toUpperCase());
    }
    get(entityName) {
        return this.entities.get(entityName.toUpperCase());
    }
    getAll() {
        return Array.from(this.entities.values());
    }
    registerDefaults() {
        // Geometry
        this.register({
            name: "CARTESIAN_POINT",
            supported: true,
            category: "geometry"
        });
        this.register({
            name: "DIRECTION",
            supported: true,
            category: "geometry"
        });
        this.register({
            name: "VECTOR",
            supported: true,
            category: "geometry"
        });
        this.register({
            name: "LINE",
            supported: true,
            category: "geometry"
        });
        this.register({
            name: "CIRCLE",
            supported: true,
            category: "geometry"
        });
        this.register({
            name: "PLANE",
            supported: true,
            category: "geometry"
        });
        this.register({
            name: "ELLIPSE",
            supported: false,
            category: "geometry"
        });
        this.register({
            name: "B_SPLINE_CURVE",
            supported: false,
            category: "geometry"
        });
        this.register({
            name: "BEZIER_CURVE",
            supported: false,
            category: "geometry"
        });
        // Topology
        this.register({
            name: "VERTEX_POINT",
            supported: true,
            category: "topology"
        });
        this.register({
            name: "EDGE_CURVE",
            supported: true,
            category: "topology"
        });
        this.register({
            name: "ORIENTED_EDGE",
            supported: true,
            category: "topology"
        });
        this.register({
            name: "EDGE_LOOP",
            supported: true,
            category: "topology"
        });
        this.register({
            name: "FACE_BOUND",
            supported: true,
            category: "topology"
        });
        this.register({
            name: "ADVANCED_FACE",
            supported: true,
            category: "topology"
        });
        this.register({
            name: "CLOSED_SHELL",
            supported: true,
            category: "topology"
        });
        this.register({
            name: "MANIFOLD_SOLID_BREP",
            supported: true,
            category: "topology"
        });
        // Product
        this.register({
            name: "PRODUCT",
            supported: false,
            category: "product"
        });
        this.register({
            name: "PRODUCT_DEFINITION",
            supported: false,
            category: "product"
        });
        // Assembly
        this.register({
            name: "NEXT_ASSEMBLY_USAGE_OCCURRENCE",
            supported: false,
            category: "assembly"
        });
    }
}
//# sourceMappingURL=StepSchema.js.map