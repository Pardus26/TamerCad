// src/render/renderer/DeferredRenderer.ts
import { RenderGraphBuilder } from "../graph/RenderGraphBuilder";
import { RenderGraphCompiler } from "../graph/RenderGraphCompiler";
import { RenderGraphExecutor } from "../graph/RenderGraphExecutor";
import { RenderGraphResourceType } from "../graph/RenderGraphResource";
// =====================================================
// Deferred Renderer
// =====================================================
export class DeferredRenderer {
    context;
    graphBuilder;
    compiler;
    executor;
    passes = [];
    initialized = false;
    frame = 0;
    width = 1;
    height = 1;
    frameTime = 0;
    passCount = 0;
    resourceCount = 0;
    constructor(options) {
        this.context =
            options.context;
        this.graphBuilder =
            new RenderGraphBuilder();
        this.compiler =
            new RenderGraphCompiler();
        this.executor =
            new RenderGraphExecutor();
    }
    // =====================================================
    // Lifecycle
    // =====================================================
    initialize() {
        if (this.initialized)
            return;
        for (const pass of this.passes) {
            pass.initialize(this.context);
        }
        this.initialized = true;
    }
    dispose() {
        if (!this.initialized)
            return;
        for (const pass of this.passes) {
            pass.dispose(this.context);
        }
        this.passes.length = 0;
        this.graphBuilder.clear();
        this.initialized = false;
    }
    // =====================================================
    // Pass Management
    // =====================================================
    addPass(pass) {
        if (this.passes.includes(pass))
            return;
        this.passes.push(pass);
        this.sortPasses();
        if (this.initialized) {
            pass.initialize(this.context);
        }
    }
    removePass(pass) {
        const index = this.passes.indexOf(pass);
        if (index === -1)
            return;
        if (this.initialized) {
            pass.dispose(this.context);
        }
        this.passes.splice(index, 1);
    }
    clearPasses() {
        if (this.initialized) {
            for (const pass of this.passes) {
                pass.dispose(this.context);
            }
        }
        this.passes.length = 0;
    }
    sortPasses() {
        this.passes.sort((a, b) => a.priority -
            b.priority);
    }
    getPasses() {
        return this.passes;
    }
    // =====================================================
    // Resize
    // =====================================================
    resize(width, height) {
        this.width =
            Math.max(1, width);
        this.height =
            Math.max(1, height);
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    // =====================================================
    // Render Graph Resources
    // =====================================================
    registerResources() {
        const size = {
            width: this.width,
            height: this.height
        };
        // -------------------------------------------------
        // Depth Buffer
        // -------------------------------------------------
        this.graphBuilder.createResource("Depth", RenderGraphResourceType.Depth, {
            ...size,
            format: "Depth24Stencil8"
        });
        // -------------------------------------------------
        // Deferred GBuffer
        //
        // CAD / DCC pipeline:
        //
        // Position:
        //   World position
        //
        // Normal:
        //   Surface normal
        //
        // Albedo:
        //   Base material color
        //
        // Material:
        //   roughness
        //   metallic
        //   shader flags
        //
        // ObjectID:
        //   GPU picking
        //
        // -------------------------------------------------
        this.graphBuilder.createResource("GBuffer_Position", RenderGraphResourceType.Texture, {
            ...size,
            format: "RGBA16F"
        });
        this.graphBuilder.createResource("GBuffer_Normal", RenderGraphResourceType.Texture, {
            ...size,
            format: "RGBA16F"
        });
        this.graphBuilder.createResource("GBuffer_Albedo", RenderGraphResourceType.Texture, {
            ...size,
            format: "RGBA8"
        });
        this.graphBuilder.createResource("GBuffer_Material", RenderGraphResourceType.Texture, {
            ...size,
            format: "RGBA8"
        });
        // -------------------------------------------------
        // GPU Picking
        //
        // CAD selection:
        //
        // mouse ray yerine
        // Object ID buffer
        //
        // -------------------------------------------------
        this.graphBuilder.createResource("ObjectID", RenderGraphResourceType.Texture, {
            ...size,
            format: "R32UI"
        });
        // -------------------------------------------------
        // HDR Lighting Result
        //
        // Final deferred lighting output
        //
        // -------------------------------------------------
        this.graphBuilder.createResource("HDR_Lighting", RenderGraphResourceType.Texture, {
            ...size,
            format: "RGBA16F"
        });
        // -------------------------------------------------
        // SSAO
        //
        // Half resolution ambient occlusion
        //
        // -------------------------------------------------
        this.graphBuilder.createResource("SSAO", RenderGraphResourceType.Texture, {
            width: Math.max(1, this.width / 2),
            height: Math.max(1, this.height / 2),
            format: "R8"
        });
        // -------------------------------------------------
        // Screen Space Reflection
        //
        // Metal surfaces
        //
        // CNC polished parts
        //
        // -------------------------------------------------
        this.graphBuilder.createResource("SSR", RenderGraphResourceType.Texture, {
            ...size,
            format: "RGBA16F"
        });
        // -------------------------------------------------
        // Bloom Chain
        //
        // CAD highlight glow
        //
        // Multi mip texture
        //
        // -------------------------------------------------
        this.graphBuilder.createResource("Bloom", RenderGraphResourceType.Texture, {
            ...size,
            format: "RGBA16F",
            mipLevels: 5
        });
        // -------------------------------------------------
        // CAD Overlay
        //
        // Dimension lines
        // Sketch
        // Gizmo
        // Measurements
        //
        // -------------------------------------------------
        this.graphBuilder.createResource("Overlay", RenderGraphResourceType.Texture, {
            ...size,
            format: "RGBA8"
        });
    }
    // =====================================================
    // Render Graph Construction
    // =====================================================
    buildGraph(scene, camera) {
        this.graphBuilder.clear();
        this.registerResources();
        this.registerPasses(scene, camera);
    }
    // =====================================================
    // Pass Registration
    // =====================================================
    registerPasses(scene, camera) {
        const graphPasses = new Map();
        /*
            1)
    
            RenderPass -> RenderGraphPass
    
            dönüşümü
    
    
        */
        for (const pass of this.passes) {
            const graphPass = this.graphBuilder.createPass(pass.name);
            graphPass.setPriority(pass.priority);
            graphPass.setExecute((context) => {
                pass.render(context, scene, camera);
            });
            graphPasses.set(pass, graphPass);
            this.connectResources(graphPass, pass);
        }
        /*
            2)
    
            Explicit dependency
    
            bağlantıları
    
    
            Örnek:
    
            LightingPass
    
            GeometryPass çıktısını kullanır.
    
    
        */
        for (const pass of this.passes) {
            const current = graphPasses.get(pass);
            if (!current)
                continue;
            for (const dependency of pass.dependencies ?? []) {
                const dependencyPass = graphPasses.get(dependency);
                if (dependencyPass) {
                    current.dependsOn(dependencyPass);
                }
            }
        }
    }
    // =====================================================
    // Resource Dependencies
    // =====================================================
    connectResources(graphPass, pass) {
        /*
            READ resources
    
            örnek:
    
            LightingPass:
    
                GBuffer_Position
                GBuffer_Normal
                GBuffer_Albedo
    
    
        */
        for (const name of pass.reads()) {
            const resource = this.graphBuilder
                .getResource(name);
            if (!resource) {
                throw new Error(`RenderGraph resource "${name}" not found`);
            }
            this.graphBuilder.read(graphPass, resource);
        }
        /*
            WRITE resources
    
            örnek:
    
            GeometryPass:
    
                GBuffer_Position
                GBuffer_Normal
    
    
            LightingPass:
    
                HDR_Lighting
    
    
        */
        for (const name of pass.writes()) {
            const resource = this.graphBuilder
                .getResource(name);
            if (!resource) {
                throw new Error(`RenderGraph resource "${name}" not found`);
            }
            this.graphBuilder.write(graphPass, resource);
        }
    }
    // =====================================================
    // Compile
    // =====================================================
    compileGraph() {
        return this.compiler.compile(this.graphBuilder.getPasses(), this.graphBuilder.getResources());
    }
    // =====================================================
    // Execute
    // =====================================================
    executeGraph(result, scene, camera) {
        this.executor.execute(this.context, result, scene, camera);
    }
    // =====================================================
    // Frame Rendering
    // =====================================================
    render(scene, camera) {
        if (!this.initialized) {
            this.initialize();
        }
        const start = this.beginFrame();
        /*
            1)
    
            Build Render Graph
    
    
        */
        this.buildGraph(scene, camera);
        /*
            2)
    
            Compile
    
            Generates:
    
                execution order
    
                barriers
    
                resource lifetime
    
    
        */
        const compiled = this.compileGraph();
        this.passCount =
            compiled.executionOrder.length;
        this.resourceCount =
            compiled.lifetimes.length;
        /*
            3)
    
            Execute GPU pipeline
    
    
        */
        this.executeGraph(compiled, scene, camera);
        this.endFrame(start);
        this.frame++;
    }
    // =====================================================
    // Frame Timing
    // =====================================================
    beginFrame() {
        return performance.now();
    }
    endFrame(start) {
        this.frameTime =
            performance.now()
                -
                    start;
    }
    // =====================================================
    // Statistics
    // =====================================================
    getStatistics() {
        return {
            frame: this.frame,
            frameTime: this.frameTime,
            passCount: this.passCount,
            resourceCount: this.resourceCount
        };
    }
    getFrame() {
        return this.frame;
    }
    getFrameTime() {
        return this.frameTime;
    }
    // =====================================================
    // Debug
    // =====================================================
    dumpGraph() {
        console.group("Deferred Render Graph");
        console.log("Resources");
        console.table(this.graphBuilder
            .getResources()
            .map(resource => resource.debugInfo()));
        console.log("Passes");
        console.table(this.graphBuilder
            .getPasses()
            .map(pass => pass.debugInfo()));
        console.groupEnd();
    }
    debugInfo() {
        return {
            renderer: "DeferredRenderer",
            initialized: this.initialized,
            frame: this.frame,
            resolution: {
                width: this.width,
                height: this.height
            },
            passes: this.passes.map(pass => pass.name),
            statistics: this.getStatistics(),
            graph: this.graphBuilder.debugInfo()
        };
    }
    // =====================================================
    // Reload
    // =====================================================
    reload() {
        const wasInitialized = this.initialized;
        this.dispose();
        if (wasInitialized) {
            this.initialize();
        }
    }
    // =====================================================
    // Renderer State
    // =====================================================
    saveState() {
        return {
            initialized: this.initialized,
            frame: this.frame,
            width: this.width,
            height: this.height,
            passes: this.passes.map(pass => pass.name)
        };
    }
    restoreState(state) {
        this.frame =
            state.frame ?? 0;
        this.width =
            state.width ?? 1;
        this.height =
            state.height ?? 1;
    }
    // =====================================================
    // Backend Information
    // =====================================================
    getBackendInfo() {
        return {
            renderer: "DeferredRenderer",
            api: this.context.getBackend(),
            resolution: {
                width: this.width,
                height: this.height
            },
            frame: this.frame
        };
    }
    // =====================================================
    // Final Debug Print
    // =====================================================
    printDebug() {
        console.group("Renderer Debug");
        console.log(this.getBackendInfo());
        console.log(this.getStatistics());
        this.dumpGraph();
        console.groupEnd();
    }
}
//# sourceMappingURL=DeferredRenderer.js.map