export class SelectionManager {
    selected = [];
    select(body) {
        this.clear();
        this.selected.push(body);
        body.selected = true;
    }
    add(body) {
        if (!this.selected.includes(body)) {
            this.selected.push(body);
            body.selected = true;
        }
    }
    clear() {
        for (const body of this.selected) {
            body.selected = false;
        }
        this.selected.length = 0;
    }
    getSelected() {
        return this.selected;
    }
}
//# sourceMappingURL=SelectionManager.js.map