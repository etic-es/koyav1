import * as Compositor from 'Koya/Compositor';
import * as UI from 'Koya/UserInterface';
import * as Hypr from 'Module/hypr';
import { Colors, Fonts, Icons } from './style.js';
import { Workspaces } from './modules/workspaces.js';
import { Cpu } from './modules/cpu.js';
import { Memory } from './modules/memory.js';
import { Disk } from './modules/disk.js';
import { Battery } from './modules/battery.js';
import { Clock } from './modules/clock.js';
import { Network } from './modules/network.js';
import { Audio } from './modules/audio.js';
import { Bluetooth } from './modules/bluetooth.js';
import { Backlight } from './modules/backlight.js';
import { Tray } from './modules/tray.js';

globalThis.bar = null;

export default function main() {
    try {
        Hypr.connect();
    } catch (e) {
        console.error("Hypr connect failed", e);
    }
    globalThis.bar = new Bar();
}

class Bar {
    constructor() {
        this.win = Compositor.createWindow({
            namespace: 'koya-bar',
            role: 'bar',
            edge: 'top',
            thickness: 22, // Strict 22px
            anchor: ['top', 'left', 'right'], // Full width
            exclusive: true,
            layer: 'top',
            margin: [0, 0, 0, 0],
            keyboardInteractivity: 'none',
            acceptPointerEvents: true
        });

        // Root Element
        const root = UI.createElement(this.win, {
            id: 'root',
            renderable: {
                type: 'box',
                colour: Colors.background,
            },
            contentAlign: 'fill',
            layout: {
                type: 'row',
                justifyContent: 'space-between',
                alignItems: 'center', // Automatic vertical alignment
                padding: { t: 0, b: 0, l: 10, r: 10 } // Strict padding
            },
            item: {
                size: { y: 22 } // Strict height
            },
            child: []
        });
        UI.attachRoot(this.win, root);

        // --- Left Modules ---
        const leftContainer = UI.createElement(this.win, {
            id: 'left_modules',
            layout: {
                type: 'row',
                justifyContent: 'start', // Start to Center
                alignItems: 'center',
                gap: 10,
                padding: { t: 0, b: 0 }
            },
            item: {
                grow: 0,
                shrink: 1,
                basis: 'auto', // Fit content width
                size: { y: 22 }
            }
        });
        UI.attach(this.win, root, leftContainer);

        this.cpu = new Cpu(this.win, leftContainer);
        this.memory = new Memory(this.win, leftContainer);
        this.diskHome = new Disk(this.win, leftContainer, '/home', '󱢇');
        this.diskRoot = new Disk(this.win, leftContainer, '/', '');
        this.battery = new Battery(this.win, leftContainer);

        // --- Center Modules ---
        const centerWrapper = UI.createElement(this.win, {
            id: 'center_wrapper',
            layout: {
                type: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            },
            item: {
                grow: 1,
                shrink: 1,
                basis: '0%',
                size: { y: 22 }
            }
        });
        UI.attach(this.win, root, centerWrapper);

        const centerContainer = UI.createElement(this.win, {
            id: 'center_modules',
            layout: {
                type: 'row',
                justifyContent: 'center', // Centered
                alignItems: 'center', // Automatic vertical alignment
                padding: { t: 0, b: 0 }
            },
            item: {
                grow: 0,
                shrink: 0,
                basis: 'auto', // Size to content
                size: { x: 'auto', y: 22 }
            },
            child: []
        });
        UI.attach(this.win, centerWrapper, centerContainer);

        this.workspaces = new Workspaces(this.win, centerContainer);

        // --- Right Modules ---
        const rightContainer = UI.createElement(this.win, {
            id: 'right_modules',
            layout: {
                type: 'row',
                justifyContent: 'end', // End to Center
                alignItems: 'center', // Automatic vertical alignment
                gap: 10,
                padding: { t: 0, b: 0 }
            },
            item: {
                grow: 0,
                shrink: 1,
                basis: 'auto', // Fit content width
                size: { y: 22 }
            }
        });
        UI.attach(this.win, root, rightContainer);

        this.tray = new Tray(this.win, rightContainer);
        this.audio = new Audio(this.win, rightContainer);
        this.bluetooth = new Bluetooth(this.win, rightContainer);
        this.backlight = new Backlight(this.win, rightContainer);
        this.networkWifi = new Network(this.win, rightContainer, 'wlan0', true);
        this.clock = new Clock(this.win, rightContainer);
    }
}
