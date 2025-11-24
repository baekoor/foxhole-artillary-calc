# Installation Guide for Users

## Download & Install

1. **Download** the installer:
   - `Foxhole Overlay Setup 1.0.0.exe` (93 MB)

2. **Run the installer**:
   - Double-click the `.exe` file
   - Windows may show a "Windows protected your PC" warning (because the app isn't code-signed)
   - Click "More info" → "Run anyway"

3. **Choose install location**:
   - Default: `C:\Program Files\Foxhole Overlay\`
   - Or choose your own location

4. **Complete installation**:
   - Check "Create desktop shortcut" if you want one
   - Click "Install"

## First Launch

1. **Start the app**:
   - From Desktop shortcut, or
   - From Start Menu → "Foxhole Overlay"

2. **Look for the tray icon**:
   - The app minimizes to the system tray (near the clock)
   - Look for a small icon in the bottom-right corner

3. **Right-click the tray icon** to access:
   - Show Overlay
   - Hide Overlay
   - Start with Windows (recommended!)
   - Quit

## Setup for Foxhole

1. **Enable "Start with Windows"** (recommended):
   - Right-click tray icon → Check "Start with Windows"
   - This makes the overlay launch automatically when you boot Windows
   - You'll never have to manually start it again!

2. **Configure your calculator**:
   - Right-click tray icon → "Show Overlay"
   - Enter a calculator URL (e.g., `https://foxholestats.com/`)
   - Select a sector from the dropdown
   - Click "Open Calc"

## Using with Foxhole

### Normal Workflow

1. **Start Foxhole** from Steam
2. **Wait ~2 seconds** (the overlay detects the game automatically)
3. **Press F10** to show the overlay
4. **Use the calculator** while playing
5. **Press F10** to hide it when done

### The overlay will:
-  Automatically detect when Foxhole starts
-  Enable the F10 hotkey only when Foxhole is running
-  Appear on top of the game window
-  Remember your last sector and settings
-  Automatically disable when you exit Foxhole

## Tips

- **Keep the app running**: Let it run in the system tray 24/7. It uses minimal resources.
- **Enable auto-start**: Check "Start with Windows" so you never forget to launch it
- **Use F10 anytime**: While playing Foxhole, press F10 to quickly show/hide the calculator

## Uninstalling

1. Open "Add or Remove Programs" in Windows
2. Find "Foxhole Overlay"
3. Click "Uninstall"

## File Size

The installer is **93 MB** because it includes:
- Electron runtime (~80 MB)
- The overlay application
- All dependencies

Once installed, it takes about **200 MB** on disk.

## System Requirements

- **OS**: Windows 10/11 (64-bit)
- **RAM**: 4 GB minimum (the app uses ~100-200 MB)
- **Disk**: 200 MB free space
- **Internet**: Required to load calculator websites

## Troubleshooting

### Windows SmartScreen Warning

When you run the installer, Windows might show:
> "Windows protected your PC"

This is normal for unsigned applications. Click:
1. "More info"
2. "Run anyway"

This happens because the app isn't code-signed (requires a $300/year certificate).

### Hotkey Not Working

- Make sure Foxhole is actually running (check Task Manager)
- The F10 hotkey ONLY works when Foxhole.exe is detected
- Try manually showing the overlay from the tray menu first

### Calculator Won't Load

- Some websites block iframe embedding
- Try a different calculator URL
- Click "OK" when prompted to open in your browser instead

## Need Help?

Open an issue on GitHub with:
- Your Windows version
- Error messages (if any)
- Steps that aren't working
