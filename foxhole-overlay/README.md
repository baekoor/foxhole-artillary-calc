# Foxhole Artillery Calculator Overlay

An always-on-top overlay for Foxhole with click-based artillery calculations on interactive hex maps.

## Quick Start

1. **Download** `Foxhole Overlay Setup 1.0.0.exe` from releases
2. **Run installer** (click "More info" → "Run anyway" if Windows warns)
3. **Launch** from Start Menu - app runs in system tray
4. **Start Foxhole** - overlay auto-detects within 2 seconds
5. **Press F10** to toggle overlay
6. **Click map** to set artillery (blue) and target (red) positions
7. **View** distance and azimuth calculations instantly

## Features

- **Auto-Detection**: Monitors for Foxhole.exe process
- **Click-Based**: Set positions by clicking directly on hex maps
- **Accurate Calculations**: 2.14 m/px conversion (1097m hex sides)
- **All Maps Included**: 40+ Foxhole hex maps (1024x888)
- **Click Validation**: Prevents clicks outside map bounds
- **Always-On-Top**: Stays visible with auto-refocus
- **Persistent Settings**: Remembers sector and window position
- **System Tray**: Runs silently in background

## Hotkeys

| Key | Action |
|-----|--------|
| **F10** | Toggle overlay |
| **ESC / Ctrl+W** | Close overlay |
| **1 / 2** | Switch artillery/target mode |
| **C** | Clear markers |

## Safety Guarantee

This overlay **DOES NOT**:
- Read or write game memory
- Inject DLLs or hooks
- Hook graphics APIs
- Simulate input
- Violate anti-cheat policies

It **ONLY**:
- Monitors process names
- Registers global hotkeys
- Displays an overlay window
- Performs calculations

## Building from Source

```bash
npm install
npm run build
npm start

# Build installer
npm run dist
```

## Configuration

Settings: `%APPDATA%\foxhole-overlay\config.json`

- Hotkey (default: F10)
- Last selected sector
- Window position and size

## Troubleshooting

**Overlay doesn't appear**
- Verify Foxhole.exe in Task Manager
- Manually show from tray menu

**Hotkey doesn't work**
- Ensure F10 isn't used by another app
- Verify Foxhole is running

**Window stuck at fullscreen**
- Fixed: Auto-resets windows >90% of display

## Technical Details

**Architecture**
- Electron + TypeScript
- Process detection: ps-list
- Global hotkeys: Electron API
- Storage: electron-store

**Calculations**
- Maps: 1024x888 pixels
- Hex: 1097m sides → 2194/1024 = 2.14 m/px
- Azimuth: atan2(dx, -dy) for true north

**Project Structure**
```
src/
├── main.ts              # Electron main process
├── overlay.ts           # Calculator logic
├── overlay.html         # UI and styles
├── preload.ts           # IPC bridge
├── foxholeWatcher.ts    # Process detection
└── configStore.ts       # Settings

foxhole-tiles/           # All hex maps
assets/                  # Icons
release/                 # Built installers
```

## License

MIT - Free and open source

## Support

Open an issue on GitHub with:
- Windows version
- Error messages
- Steps to reproduce
