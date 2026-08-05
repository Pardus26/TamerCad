import { FeatureState } from "./BRepFeature";
export class BRepFeatureTree {
    root;
    nodes;
    constructor() {
        this.root =
            null;
        this.nodes =
            [];
    }
    /**
     * Root feature oluşturma
     */
    setRoot(feature) {
        this.root =
            feature;
        this.add(feature);
    }
    /**
     * Feature ekleme
     */
    add(feature) {
        const node = {
            feature,
            index: this.nodes.length,
            suppressed: false,
            children: []
        };
        this.nodes.push(node);
        return node;
    }
    /**
     * Parent-child bağlantısı
     */
    link(parent, child) {
        child.addParent(parent);
    }
    /**
     * Timeline sırası
     */
    timeline() {
        return this.nodes.map(node => node.feature);
    }
    /**
     * Feature bulma
     */
    find(id) {
        const node = this.nodes.find(n => n.feature.id === id);
        return node
            ?
                node.feature
            :
                null;
    }
    /**
     * Suppress feature
     */
    suppress(id) {
        const node = this.nodes.find(n => n.feature.id === id);
        if (node) {
            node.suppressed =
                true;
            node.feature.state =
                FeatureState.OUTDATED;
        }
    }
    /**
     * Unsuppress
     */
    unsuppress(id) {
        const node = this.nodes.find(n => n.feature.id === id);
        if (node) {
            node.suppressed =
                false;
        }
    }
    /**
     * Rollback
     *
     * Belirli feature sonrası dur
     */
    rollback(index) {
        for (let i = index + 1; i < this.nodes.length; i++) {
            this.nodes[i]
                .feature.state =
                FeatureState.OUTDATED;
        }
    }
    /**
     * Regeneration sırası
     */
    regenerate() {
        let regenerated = 0;
        const failed = [];
        for (const node of this.nodes) {
            if (node.suppressed) {
                continue;
            }
            const result = node.feature.execute();
            if (result.success) {
                regenerated++;
            }
            else {
                failed.push(node.feature.id);
            }
        }
        return {
            success: failed.length === 0,
            regenerated,
            failed
        };
    }
    /**
     * Dependency sıralaması
     */
    dependencyOrder() {
        return [
            ...this.nodes
        ].sort((a, b) => a.index - b.index);
    }
    /**
     * Tree görüntüsü
     */
    structure() {
        return this.nodes.map(node => ({
            id: node.feature.id,
            name: node.feature.name,
            type: node.feature.type,
            suppressed: node.suppressed
        }));
    }
    /**
     * Feature sayısı
     */
    count() {
        return this.nodes.length;
    }
    /**
     * Clone
     */
    clone() {
        const tree = new BRepFeatureTree();
        for (const node of this.nodes) {
            tree.add(node.feature.clone());
        }
        return tree;
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepFeatureTree",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepFeatureTree.js.map