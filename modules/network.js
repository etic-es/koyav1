import * as UI from 'Koya/UserInterface';
import * as Hypr from 'Module/hypr';
import { Colors, Fonts, Icons } from '../style.js';

export class Network {
    constructor(window, parent, iface = 'wlan0', isWifi = true) {
        this.window = window;
        this.parent = parent;
        this.iface = iface;
        this.isWifi = isWifi;

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
                Hypr.dispatch('exec kitty nmtui');
            }
        });

        this.text = UI.createElement(this.window, {
            renderable: {
                type: 'text',
                string: `${this.getIcon()} Connected`,
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
            const states = ['Connected', 'Disconnected', 'Weak'];
            const state = states[Math.floor(Math.random() * states.length)];
            UI.setTextString(this.window, this.text, `${this.getIcon()} ${state}`);
        }, 5000);
    }

    getIcon() {
        return this.isWifi ? Icons.wifi : Icons.ethernet;
    }
}
