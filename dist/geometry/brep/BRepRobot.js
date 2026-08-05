import { BRepKinematics } from "./BRepKinematics";
import { BRepMotion } from "./BRepMotion";
export var RobotType;
(function (RobotType) {
    RobotType["CARTESIAN"] = "cartesian";
    RobotType["SCARA"] = "scara";
    RobotType["SIX_AXIS"] = "six_axis";
    RobotType["COLLABORATIVE"] = "collaborative";
})(RobotType || (RobotType = {}));
export class BRepRobot {
    name;
    type;
    assembly;
    kinematics;
    motion;
    joints;
    tcp;
    constructor(name, type, assembly) {
        this.name = name;
        this.type = type;
        this.assembly = assembly;
        this.kinematics =
            new BRepKinematics(assembly);
        this.motion =
            new BRepMotion(assembly);
        this.joints = [];
        this.tcp = {
            x: 0,
            y: 0,
            z: 0,
            rx: 0,
            ry: 0,
            rz: 0
        };
    }
    /**
     * Joint ekleme
     */
    addJoint(joint) {
        this.joints.push(joint);
    }
    /**
     * TCP ayarlama
     */
    setToolCenterPoint(tcp) {
        this.tcp = tcp;
    }
    /**
     * Robot pozisyon çözümü
     */
    moveTo(target) {
        const pose = this.kinematics.inverse({
            x: target.x,
            y: target.y,
            z: target.z
        });
        return {
            success: true,
            position: target,
            warnings: []
        };
    }
    /**
     * Forward robot hareketi
     */
    forward(joints) {
        return this.kinematics.forward(joints);
    }
    /**
     * Path çalıştırma
     */
    executePath(path) {
        for (const point of path) {
            this.moveTo({
                x: point.x,
                y: point.y,
                z: point.z,
                rx: 0,
                ry: 0,
                rz: 0
            });
        }
        return {
            executed: true,
            points: path.length
        };
    }
    /**
     * Work envelope
     */
    workspace() {
        return {
            radius: 1000,
            height: 800
        };
    }
    /**
     * Servo hareketi
     */
    servo(jointId, value) {
        const joint = this.joints.find(j => j.id === jointId);
        if (!joint)
            return false;
        joint.current =
            Math.max(joint.min, Math.min(joint.max, value));
        return true;
    }
    /**
     * Reset robot
     */
    reset() {
        for (const joint of this.joints) {
            joint.current = 0;
        }
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepRobot",
            name: this.name,
            type: this.type,
            joints: this.joints.length,
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepRobot.js.map