import * as UI from 'Koya/UserInterface';
import * as Hypr from 'Module/hypr';
import { Colors, Fonts, Icons } from '../style.js';

export class Audio {
    constructor(window, parent) {
        this.window = window;
        this.parent = parent;

        this.container = UI.createElement(this.window, {
            renderable: {
                type: 'box',
                colour: Colors.background,
            },
            layout: {
                type: 'row',
                alignItems: 'center',
            },
            item: {
                padding: { l: 5, r: 5 },
                size: { y: 22 } // Enforce height
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
                Hypr.dispatch('exec pavucontrol');
            }
        });

        this.text = UI.createElement(this.window, {
            renderable: {
                type: 'text',
                string: `${Icons.volume.default[2]} 50%`,
                font: Fonts.main,
                size: Fonts.size,
                colour: Colors.foreground,
            },
            contentAlign: 'center',
        });

        UI.attach(this.window, this.container, this.text);
        UI.attach(this.window, this.parent, this.container);

        // Mock update
        setInterval(() => {
            const vol = Math.floor(Math.random() * 100);
            UI.setTextString(this.window, this.text, `${Icons.volume.default[2]} ${vol}%`);
        }, 4000);
    }
}
