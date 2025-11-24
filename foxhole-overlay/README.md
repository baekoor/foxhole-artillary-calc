# Foxhole Overlay

An always-on-top overlay application for Foxhole that displays an artillery calculator when the game is running.

## Safety Guarantee

This application is **100% safe** and does **NOT**:
- ❌ Read or write Foxhole's process memory
- ❌ Inject DLLs or hooks into Foxhole
- ❌ Hook DirectX, Vulkan, or any graphics API
- ❌ Simulate mouse/keyboard input into the game
- ❌ Violate any anti-cheat policies

It **ONLY**:
- ✅ Monitors the process list for "Foxhole.exe"
- ✅ Registers a global hotkey (F10) when Foxhole is running
- ✅ Displays a transparent overlay window on top of the game
- ✅ Embeds a web-based artillery calculator in an iframe

## Features

- **Auto-Detection**: Automatically detects when Foxhole is running
- **Global Hotkey**: Press F10 to toggle the overlay (only works when Foxhole is running)
- **Persistent Settings**: Remembers your last selected sector and window position
- **System Tray**: Runs in the system tray for easy access
- **Start with Windows**: Optional setting to launch at system startup
- **Customizable**: Choose your preferred artillery calculator website

## Installation

### Option 1: From Release (Recommended)

1. Download the latest `Foxhole-Overlay-Setup-X.X.X.exe` from the Releases page
2. Run the installer
3. Follow the installation wizard
4. Launch "Foxhole Overlay" from the Start Menu or Desktop shortcut

### Option 2: Build from Source

```bash
# Clone the repository
git clone <repository-url>
cd foxhole-overlay

# Install dependencies
npm install

# Build the TypeScript code
npm run build

# Run the application
npm start

# Or build a distributable installer
npm run dist
```

## Usage

### First Time Setup

1. **Launch the app**: The overlay will start in the system tray (look for the icon near your clock)
2. **Add a tray icon** (optional): Place a `icon.png` file in the `assets/` folder for a custom tray icon
3. **Configure calculator URL**:
   - Right-click the tray icon → "Show Overlay"
   - Enter your preferred calculator URL (e.g., `https://foxholestats.com/`)
   - Select a sector from the dropdown
   - Click "Open Calc"

### During Gameplay

1. **Start Foxhole**: Launch Foxhole from Steam
2. **Wait for detection**: Within 2 seconds, the overlay will detect the game and enable the hotkey
3. **Press F10**: Toggle the overlay on/off
4. **Use the calculator**:
   - Change sectors as needed
   - The overlay stays on top of the game
   - Press F10 or ESC to hide it

### System Tray Menu

Right-click the tray icon to access:
- **Show Overlay**: Opens the overlay window
- **Hide Overlay**: Hides the overlay window
- **Start with Windows**: Toggle auto-start at login
- **Quit**: Exit the application

## Hotkeys

- **F10**: Toggle overlay visibility (when Foxhole is running)
- **ESC**: Close overlay
- **Ctrl+W**: Close overlay
- **Alt+F4**: Close overlay

## Configuration

Settings are stored in:
- Windows: `%APPDATA%/foxhole-overlay/config.json`

You can configure:
- Hotkey (default: F10)
- Last selected sector
- Calculator URL
- Window position and size
- Start with Windows preference

## Troubleshooting

### The overlay doesn't appear

- Make sure Foxhole is running (check Task Manager for `Foxhole.exe`)
- The app only enables the F10 hotkey when Foxhole is detected
- Check the system tray - you can manually show the overlay from there

### The calculator website won't load in the iframe

Some websites block embedding (X-Frame-Options header). If this happens:
- The overlay will offer to open the URL in your default browser
- Try a different calculator website that allows iframe embedding

### The hotkey doesn't work

- Ensure no other application is using F10
- Make sure Foxhole is running
- Try restarting the overlay application

### The app doesn't start with Windows

- Go to system tray → right-click → "Start with Windows"
- On some systems, you may need to grant admin permissions

## Development

### Project Structure

```
foxhole-overlay/
├── src/
│   ├── main.ts              # Main process (Electron)
│   ├── preload.ts           # Preload script (IPC bridge)
│   ├── overlay.html         # Overlay UI
│   ├── overlay.ts           # Overlay renderer logic
│   ├── foxholeWatcher.ts    # Process detection module
│   └── configStore.ts       # Configuration management
├── assets/
│   └── icon.png             # Tray icon (add your own)
├── dist/                    # Compiled TypeScript output
├── release/                 # Built installers
├── package.json
├── tsconfig.json
└── README.md
```

### Available Scripts

```bash
npm run build    # Compile TypeScript
npm start        # Build and run the app
npm run dist     # Build installer for distribution
npm run clean    # Clean build artifacts
```

### Adding Custom Calculator Sites

Edit [src/overlay.ts](src/overlay.ts) and change `DEFAULT_CALC_URL`:

```typescript
const DEFAULT_CALC_URL = 'https://your-calculator-site.com';
```

Then rebuild with `npm run build`.

## Technical Details

### Process Detection

The app uses `ps-list` to scan running processes every 2 seconds. When it finds a process named `Foxhole.exe`, it:
1. Enables the global hotkey
2. Allows the overlay to be shown
3. Updates the tray menu

When Foxhole closes, it:
1. Disables the global hotkey
2. Closes the overlay window
3. Updates the tray menu

### Security

- Uses Electron's `contextIsolation` for security
- No `nodeIntegration` in renderer processes
- Preload script provides a limited IPC bridge
- Only monitors process names - never opens or interacts with the Foxhole process

## License

MIT

## Contributing

Contributions are welcome! Please ensure all code follows the safety constraints:
- No process memory access
- No DLL injection
- No graphics API hooks
- No input simulation

## Support

For issues, questions, or feature requests, please open an issue on GitHub.

## Disclaimer

This overlay is an external application that displays information on top of your game window. It does not modify or interact with Foxhole in any way. Use at your own discretion.
