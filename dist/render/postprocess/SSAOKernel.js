export class SSAOKernel {
    samples = [];
    constructor(sampleCount = 64) {
        this.generate(sampleCount);
    }
    generate(sampleCount) {
        this.samples.length = 0;
        for (let i = 0; i < sampleCount; i++) {
            let x = Math.random() * 2 - 1;
            let y = Math.random() * 2 - 1;
            let z = Math.random();
            let length = Math.sqrt(x * x +
                y * y +
                z * z);
            if (length > 0.00001) {
                x /= length;
                y /= length;
                z /= length;
            }
            const scale = i / sampleCount;
            const lerp = this.lerp(0.1, 1.0, scale * scale);
            this.samples.push({
                x: x * lerp,
                y: y * lerp,
                z: z * lerp
            });
        }
    }
    getSamples() {
        return this.samples;
    }
    getFlatArray() {
        const data = new Float32Array(this.samples.length * 3);
        let ptr = 0;
        for (const sample of this.samples) {
            data[ptr++] = sample.x;
            data[ptr++] = sample.y;
            data[ptr++] = sample.z;
        }
        return data;
    }
    lerp(a, b, t) {
        return a + (b - a) * t;
    }
    debugInfo() {
        return {
            sampleCount: this.samples.length
        };
    }
}
//# sourceMappingURL=SSAOKernel.js.map