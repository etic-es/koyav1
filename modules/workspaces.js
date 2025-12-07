import * as UI from 'Koya/UserInterface';
import * as Hypr from 'Module/hypr';
import { Colors, Fonts, Icons } from '../style.js';

class WorkspaceCell {
    constructor(window, parent, workspace) {
        this.window = window;
        this.parent = parent;
        this.workspace = workspace; // { id, name }
        this.container = null;
        this.text = null;
        this.isActive = false;

        this.createUI();
    }

    getIcon() {
        const id = this.workspace.id.toString();
        if (this.isActive) return Icons.workspaces.active;
        return id;
    }

    createUI() {
        const icon = this.getIcon();
        const color = this.isActive ? Colors.active : Colors.foreground;

        this.container = UI.createElement(this.window, {
            id: `ws_container_${this.workspace.id}`,
            renderable: {
                type: 'box',
                colour: Colors.background,
            },
            layout: {
                type: 'row',
                alignItems: 'center', // Dynamic vertical alignment
            },
            item: {
                padding: { l: 5, r: 5 }, // No manual top/bottom padding
                order: this.workspace.id,
                size: { x: 'auto', y: 22 } // Enforce height, allow width
            },
            onMouseEnter: () => {
                UI.updateElement(this.window, this.container, {
                    renderable: { colour: Colors.hover }
                });
            },
            onMouseExit: () => {
                UI.updateElement(this.window, this.container, {
                    renderable: { colour: Colors.background }
                });
            },
            onMouseClick: () => {
                Hypr.dispatch(`workspace ${this.workspace.id}`);
                // Optimistic update
                this.update(true);
            }
        });

        this.text = UI.createElement(this.window, {
            id: `ws_text_${this.workspace.id}`,
            renderable: {
                type: 'text',
                string: icon,
                font: Fonts.main,
                size: Fonts.size,
                colour: color,
            },
            contentAlign: 'center',
            item: {
                size: { x: 'auto', y: 'auto' }
            }
        });

        UI.attach(this.window, this.container, this.text);
        UI.attach(this.window, this.parent, this.container);
    }

    update(isActive) {
        if (this.isActive === isActive) return;
        this.isActive = isActive;

        UI.destroyElement(this.window, this.container);
        this.createUI();
    }

    destroy() {
        UI.destroyElement(this.window, this.container);
    }
}

export class Workspaces {
    constructor(window, parent) {
        this.window = window;
        this.parent = parent;
        this.cells = new Map(); // id -> WorkspaceCell

        this.refresh();

        try {
            Hypr.on('workspace', () => this.refresh());
        } catch (e) {
            console.error("Hypr event error", e);
        }
    }

    async refresh() {
        try {
            const workspaceListJson = await Hypr.dispatch('j/workspaces');
            const workspaces = JSON.parse(workspaceListJson);
            const activeWorkspaceJson = await Hypr.dispatch('j/activeworkspace');
            const activeWorkspace = JSON.parse(activeWorkspaceJson);
            const activeId = activeWorkspace.id;

            const currentIds = new Set();
            workspaces
                .sort((a, b) => a.id - b.id)
                .forEach(ws => {
                    currentIds.add(ws.id);
                    if (!this.cells.has(ws.id)) {
                        this.cells.set(ws.id, new WorkspaceCell(this.window, this.parent, ws));
                    }
                    this.cells.get(ws.id).update(ws.id === activeId);
                });

            // Remove cells for workspaces that no longer exist
            for (const [id, cell] of Array.from(this.cells.entries())) {
                if (!currentIds.has(id)) {
                    cell.destroy();
                    this.cells.delete(id);
                }
            }
        } catch (e) {
            console.error("Failed to get active workspace", e);
        }
    }
}
