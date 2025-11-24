# Foxhole Artillery Calculator Overlay

An always-on-top overlay application for Foxhole that provides real-time artillery calculations with click-based targeting on interactive hex maps.

## Overview

This Electron-based overlay application detects when Foxhole is running and provides a toggleable artillery calculator overlay. Click on the map to set artillery and target positions, and get instant distance and azimuth calculations.

## Key Features

- **Auto-Detection**: Automatically detects when Foxhole.exe is running
- **Global Hotkey**: Press F10 to toggle overlay (only active when Foxhole is running)
- **Click-Based Targeting**: Click directly on hex maps to set positions
- **Accurate Calculations**: Precise distance (meters) and azimuth (degrees) using correct Foxhole hex geometry (2.14 m/px)
- **Interactive Maps**: All Foxhole hex maps included (1024x888 resolution)
- **Click Boundary Validation**: Prevents clicks outside map image bounds
- **Always-On-Top**: Overlay stays visible over the game with auto-refocus
- **Non-Intrusive**: Non-resizable, non-fullscreen window design
- **Animated UI**: Smooth button ripples, marker animations, and fade effects
- **Persistent Settings**: Remembers selected sector and window position
- **System Tray Integration**: Runs silently in background
- **Safe & Secure**: No memory reading, DLL injection, or game modification

## Installation

### Option 1: Download Installer (Recommended)

1. Download `Foxhole Overlay Setup 1.0.0.exe` from releases
2. Run the installer (click "More info" → "Run anyway" if Windows warns)
3. Launch "Foxhole Overlay" from Start Menu or Desktop

### Option 2: Build from Source

```bash
cd foxhole-overlay
npm install
npm run build
npm start

# Or build installer
npm run dist
```

## Usage

### Quick Start

1. Launch the Foxhole Overlay application (runs in system tray)
2. Start Foxhole from Steam
3. Wait ~2 seconds for auto-detection
4. Press **F10** to show overlay
5. Select a sector from dropdown
6. Click on map to set artillery position (blue marker)
7. Click on map to set target position (red marker)
8. View distance and azimuth calculations instantly

### Hotkeys

- **F10**: Toggle overlay visibility
- **ESC**: Close overlay
- **Ctrl+W**: Close overlay
- **1**: Switch to artillery mode
- **2**: Switch to target mode
- **C**: Clear markers

## Safety Guarantee

This application is **100% safe** and does **NOT**:
- Read or write game memory
- Inject DLLs or hooks
- Hook graphics APIs (DirectX/Vulkan)
- Simulate keyboard/mouse input
- Violate any anti-cheat policies

It **ONLY**:
- Monitors process list for "Foxhole.exe"
- Registers global hotkeys
- Displays an overlay window
- Performs mathematical calculations

## Technical Details

### Calculation Accuracy

- Foxhole hex maps: 1024x888 pixels
- Hex dimensions: 1097m sides
- Conversion ratio: 2194/1024 = 2.14 meters per pixel
- Azimuth: Calculated using atan2(dx, -dy) for true north orientation

### Architecture

- **Electron**: Cross-platform desktop app framework
- **TypeScript**: Type-safe codebase
- **Process Detection**: ps-list for monitoring Foxhole.exe
- **Global Hotkeys**: Electron globalShortcut API
- **Persistent Storage**: electron-store for config

### Project Structure

```
foxhole-artillary-calc/
├── foxhole-overlay/          # Main application
│   ├── src/
│   │   ├── main.ts           # Electron main process
│   │   ├── overlay.ts        # Calculator logic
│   │   ├── overlay.html      # UI markup and styles
│   │   ├── preload.ts        # IPC bridge
│   │   ├── foxholeWatcher.ts # Process detection
│   │   └── configStore.ts    # Settings persistence
│   ├── foxhole-tiles/        # All hex map images (1024x888)
│   ├── assets/               # Icons and images
│   └── release/              # Built installers
└── README.md                 # This file
```

## Development

### Prerequisites

- Node.js 18+
- npm 9+
- Windows 10/11 (64-bit)

### Build Commands

```bash
npm run build    # Compile TypeScript
npm start        # Run in development mode
npm run dist     # Build production installer
```

### Configuration

Settings stored in: `%APPDATA%/foxhole-overlay/config.json`

Configurable options:
- Hotkey (default: F10)
- Last selected sector
- Window position and size
- Start with Windows preference

## Troubleshooting

### Overlay doesn't appear
- Verify Foxhole.exe is running in Task Manager
- Check system tray icon and manually show overlay
- Restart the overlay application

### Hotkey doesn't work
- Ensure no other application is using F10
- Verify Foxhole is actually running
- Check that overlay service is running in tray

### Window stuck at fullscreen size
- Fixed: Auto-detects and resets windows >90% of display size
- Default size: 75% of display (centered)

### Can't click on map
- Fixed: Click validation ensures clicks are within image bounds
- Only valid clicks inside hex map are registered

## Contributing

Contributions welcome! Please ensure code follows safety constraints:
- No process memory access
- No DLL injection
- No graphics API hooks
- No input simulation

## License

MIT License - Free and open source

## Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Include: Windows version, error messages, reproduction steps

## Credits

- Foxhole hex map images from official game assets
- Built with Electron and TypeScript
- Generated with Claude Code

## Disclaimer

This overlay is an external application that displays information on top of your game window. It does not modify or interact with Foxhole in any way. Use at your own discretion.
