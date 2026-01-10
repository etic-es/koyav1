import * as UI from 'Koya/UserInterface';
import * as Hypr from 'Module/hypr';
import { Colors, Fonts } from '../style.js';

export function createCustomModule(window, parent, config = {}) {
    const container = UI.createElement(window, {
        renderable: {
            type: 'box',
            colour: Colors.background,
        },
        layout: {
            type: 'row',
            alignItems: 'center'
        },
        item: {
            padding: { l: 9, r: 9 },
            size: { y: 22 }
        },
        onMouseClick: () => {
            if (config.onClick) {
                Hypr.dispatch(config.onClick);
            }
        }
    });

    const text = UI.createElement(window, {
        renderable: {
            type: 'text',
            string: config.text || '…',
            font: Fonts.main,
            size: Fonts.size,
            colour: Colors.foreground,
        },
        contentAlign: 'center'
    });

    UI.attach(window, container, text);
    UI.attach(window, parent, container);

    // Example placeholder for periodic updates if an exec command is provided.
    if (config.interval && config.exec) {
        setInterval(() => {
            Hypr.dispatch(config.exec);
        }, config.interval);
    }

    return container;
}
