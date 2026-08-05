export var KinematicJointType;
(function (KinematicJointType) {
    KinematicJointType["REVOLUTE"] = "revolute";
    KinematicJointType["PRISMATIC"] = "prismatic";
    KinematicJointType["FIXED"] = "fixed";
})(KinematicJointType || (KinematicJointType = {}));
export class BRepKinematics {
    joints;
    assembly;
    constructor(assembly) {
        this.joints = [];
        this.assembly =
            assembly ?? null;
    }
    /**
     * Joint ekleme
     */
    addJoint(joint) {
        this.joints.push(joint);
    }
    /**
     * Forward Kinematics
     *
     * Joint açıları verilir
     * End pose hesaplanır
     */
    forward(angles) {
        let x = 0;
        let y = 0;
        let z = 0;
        for (let i = 0; i < this.joints.length; i++) {
            const joint = this.joints[i];
            const angle = angles[i] ?? 0;
            if (joint.type ===
                KinematicJointType.REVOLUTE) {
                x +=
                    Math.cos(angle)
                        *
                            joint.length;
                y +=
                    Math.sin(angle)
                        *
                            joint.length;
            }
            else if (joint.type ===
                KinematicJointType.PRISMATIC) {
                z +=
                    angle;
            }
        }
        return {
            success: true,
            pose: {
                position: {
                    x,
                    y,
                    z
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            },
            iterations: 1,
            warnings: []
        };
    }
    /**
     * Inverse Kinematics
     *
     * Hedef pozisyon
     */
    inverse(target) {
        const solution = [];
        for (const joint of this.joints) {
            solution.push(0);
        }
        /*
            Gerçek sistemde:

            Jacobian

            Gradient

            Newton-Raphson

            kullanılabilir.
        */
        return solution;
    }
    /**
     * Transform matrisi üretimi
     */
    createTransform(pose) {
        return {
            values: [
                [1, 0, 0, pose.position.x],
                [0, 1, 0, pose.position.y],
                [0, 0, 1, pose.position.z],
                [0, 0, 0, 1]
            ]
        };
    }
    /**
     * End effector pozisyonu
     */
    endEffector(angles) {
        return this.forward(angles).pose;
    }
    /**
     * Degree of freedom
     */
    degreesOfFreedom() {
        return this.joints.length;
    }
    /**
     * Robot kol zinciri
     */
    chain() {
        return this.joints.map(j => j.id);
    }
    /**
     * Collision-aware motion hazırlığı
     */
    prepareMotion() {
        return {
            ready: true,
            joints: this.joints.length
        };
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepKinematics",
            joints: this.joints.length,
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepKinematics.js.map