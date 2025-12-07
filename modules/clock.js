import * as UI from 'Koya/UserInterface';
import { Colors, Fonts, Icons } from '../style.js';

export class Clock {
    constructor(window, parent) {
        this.window = window;
        this.parent = parent;
        this.showDate = false;

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
                UI.setTextString(this.window, this.text, this.getText(true)); // Show date on hover
            },
            onMouseExit: () => {
                UI.updateElement(this.window, this.container, {
                    renderable: { colour: Colors.background }
                });
                UI.setTextString(this.window, this.text, this.getText(false));
            },
            onMouseClick: () => {
                this.showDate = !this.showDate;
                UI.setTextString(this.window, this.text, this.getText(this.showDate));
            }
        });

        this.text = UI.createElement(this.window, {
            renderable: {
                type: 'text',
                string: `${Icons.clock} 12:00`,
                font: Fonts.main,
                size: Fonts.size,
                colour: Colors.foreground,
            },
            contentAlign: 'center',
        });

        UI.attach(this.window, this.container, this.text);
        UI.attach(this.window, this.parent, this.container);

        setInterval(() => {
            UI.setTextString(this.window, this.text, this.getText(this.showDate));
        }, 1000);
    }

    getText(showDate) {
        const now = new Date();
        if (showDate) {
            return `${Icons.calendar} ${now.toLocaleDateString()}`;
        }
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${Icons.clock} ${time}`;
    }
}
