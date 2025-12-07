# Koya Configuration

This configuration recreates a Waybar-style layout using Koya. It wires up Hyprland actions, basic hover/click interactions, and a strict 22px-tall top bar.

## Structure

- **index.js**: Entry point that builds the window, root layout, and attaches all modules.
- **style.js**: Shared palette, font, and icon definitions.
- **modules/**: Individual widgets (CPU, memory, disks, battery, workspaces, etc.).

## Installation

1. Ensure Koya is installed (version 0.1.0+).
2. Place this folder in your Koya config directory (for example `~/.config/koya`).
3. The default font uses the system-available **Noto Sans** to avoid load errors. If you want a patched Nerd Font, set `Fonts.main` in `style.js` to an absolute path (e.g., `/home/you/.local/share/fonts/YourFont.ttf`).
4. Launch Koya with:
   ```bash
   koya -i ~/.config/koya/index.js
   ```

## Notes

- The bar is anchored to the top edge, spans the full width, and keeps a fixed 22px height.
- Left and right modules size to their content so they never overflow; the workspace strip is centered inside a flexible wrapper to stay visually centered regardless of side content width.
- Hover states are baked into every module and click handlers dispatch common Hyprland commands (e.g., `btop`, `pavucontrol`, `blueman-manager`, `nmtui`).
- Workspaces mirror the live Hyprland list; if none are reported a placeholder chip is shown so the center strip still holds space.
