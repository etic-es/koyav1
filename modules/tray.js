import * as UI from 'Koya/UserInterface';
import { Colors } from '../style.js';

export class Tray {
    constructor(window, parent) {
        this.window = window;
        this.parent = parent;

        this.element = UI.createElement(this.window, {
            renderable: {
                type: 'box',
                colour: Colors.background,
            },
            layout: {
                type: 'row',
                gap: 10
            },
            item: {
                padding: { l: 9, r: 9 }
            }
        });

        UI.attach(this.window, this.parent, this.element);

        // Koya might have a native tray integration, but it's not in the snippets.
        // Leaving as a placeholder box.
    }
}
