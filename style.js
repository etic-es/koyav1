export const Colors = {
    background: "#C6C6C6",
    foreground: "#000000",
    urgent: "#eb4d4b",
    active: "#2a3c5c",
    white: "#FFFFFF",
    dim: "#999999",
    blue: "#2b56ff",
    green: "#26a65b",
    red: "#f53c3c",
    warning: "#ffa000",
    hover: "#b0b0b0",
};

export const Fonts = {
    // Use a widely available font to avoid load errors; override with an absolute
    // path if you have a custom patched font installed.
    main: "Noto Sans",
    size: 20,
};

export const Icons = {
    cpu: "",
    memory: "󰫆",
    disk: "󱢇", // or 
    battery: ["", "", "", "", ""],
    charging: "",
    plugged: "",
    wifi: "",
    ethernet: "",
    bluetooth: {
        on: "",
        connected: ""
    },
    volume: {
        headphone: "",
        hands_free: "",
        headset: "",
        phone: "",
        portable: "",
        car: "",
        default: ["", "", ""],
        muted: "婢"
    },
    clock: "",
    calendar: "",
    backlight: ["", "", "", "", "", "", "", "", ""],
    workspaces: {
        urgent: "󰥱",
        active: "󰥱",
        default: "󰥱"
    }
};
