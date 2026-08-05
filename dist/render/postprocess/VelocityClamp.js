export var VelocityClampMode;
(function (VelocityClampMode) {
    VelocityClampMode["Hard"] = "Hard";
    VelocityClampMode["Soft"] = "Soft";
    VelocityClampMode["Adaptive"] = "Adaptive";
})(VelocityClampMode || (VelocityClampMode = {}));
export class VelocityClamp {
    enabled = true;
    /**
     * Maksimum screen-space velocity
     */
    maxVelocity = 64.0;
    /**
     * Yumuşak geçiş
     */
    softClamp = true;
    mode = VelocityClampMode.Adaptive;
    source = null;
    depthTexture = null;
    constructor(options = {}) {
        if (options.maxVelocity !== undefined) {
            this.maxVelocity =
                options.maxVelocity;
        }
        if (options.softClamp !== undefined) {
            this.softClamp =
                options.softClamp;
        }
        if (options.enabled !== undefined) {
            this.enabled =
                options.enabled;
        }
    }
    setVelocitySource(buffer) {
        this.source =
            buffer;
    }
    setDepthTexture(texture) {
        this.depthTexture =
            texture;
    }
    setMode(mode) {
        this.mode =
            mode;
    }
    clamp(velocity) {
        const length = Math.sqrt(velocity.x *
            velocity.x +
            velocity.y *
                velocity.y);
        if (length <=
            this.maxVelocity) {
            return velocity;
        }
        const scale = this.maxVelocity /
            length;
        return {
            x: velocity.x *
                scale,
            y: velocity.y *
                scale
        };
    }
    softClampVelocity(velocity) {
        const length = Math.sqrt(velocity.x *
            velocity.x +
            velocity.y *
                velocity.y);
        const factor = Math.min(1, this.maxVelocity /
            Math.max(length, 0.0001));
        return {
            x: velocity.x *
                factor,
            y: velocity.y *
                factor
        };
    }
    execute() {
        if (!this.enabled ||
            !this.source) {
            return null;
        }
        /**
         * GPU:
         *
         * velocity normalization
         * outlier rejection
         * adaptive limiting
         */
        return {
            type: "ClampedVelocity",
            maxVelocity: this.maxVelocity,
            mode: this.mode
        };
    }
    reset() {
        this.source =
            null;
        this.depthTexture =
            null;
    }
    debugInfo() {
        return {
            type: "VelocityClamp",
            enabled: this.enabled,
            maxVelocity: this.maxVelocity,
            mode: this.mode
        };
    }
}
//# sourceMappingURL=VelocityClamp.js.map