import { Point3 } from "../point/Point3";
export class BRepMassProperties {
    /**
     * Tüm fiziksel özellikler
     */
    static calculate(solid, density = 1) {
        const volume = this.volume(solid);
        const area = this.surfaceArea(solid);
        const center = this.centerOfMass(solid);
        const mass = volume *
            density;
        const inertia = this.inertiaTensor(solid, center);
        return {
            volume,
            area,
            mass,
            density,
            centerOfMass: center,
            inertia
        };
    }
    /**
     * Hacim hesabı
     */
    static volume(solid) {
        return solid.volume();
    }
    /**
     * Yüzey alanı
     */
    static surfaceArea(solid) {
        return solid.surfaceArea();
    }
    /**
     * Kütle merkezi
     */
    static centerOfMass(solid) {
        const mesh = solid.tessellate();
        let x = 0;
        let y = 0;
        let z = 0;
        let count = 0;
        for (const vertex of mesh.vertices) {
            x += vertex.x;
            y += vertex.y;
            z += vertex.z;
            count++;
        }
        if (count === 0) {
            return new Point3(0, 0, 0);
        }
        return new Point3(x / count, y / count, z / count);
    }
    /**
     * Atalet tensörü
     */
    static inertiaTensor(solid, center) {
        const mesh = solid.tessellate();
        let Ixx = 0;
        let Iyy = 0;
        let Izz = 0;
        for (const vertex of mesh.vertices) {
            const dx = vertex.x -
                center.x;
            const dy = vertex.y -
                center.y;
            const dz = vertex.z -
                center.z;
            Ixx +=
                dy * dy +
                    dz * dz;
            Iyy +=
                dx * dx +
                    dz * dz;
            Izz +=
                dx * dx +
                    dy * dy;
        }
        return [
            [
                Ixx,
                0,
                0
            ],
            [
                0,
                Iyy,
                0
            ],
            [
                0,
                0,
                Izz
            ]
        ];
    }
    /**
     * Ağırlık hesabı
     */
    static weight(solid, density, gravity = 9.80665) {
        return (this.volume(solid)
            *
                density
            *
                gravity);
    }
    /**
     * Boş özellik objesi
     */
    static empty() {
        return {
            volume: 0,
            area: 0,
            mass: 0,
            density: 0,
            centerOfMass: new Point3(0, 0, 0),
            inertia: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]
        };
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepMassProperties",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepMassProperties.js.map