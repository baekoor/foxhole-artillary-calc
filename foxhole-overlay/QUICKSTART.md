# Quick Start Guide

Get up and running with Foxhole Overlay in 5 minutes!

## 1. Install Dependencies

```bash
cd foxhole-overlay
npm install
```

## 2. Add a Tray Icon (Optional)

Create or download a 256x256 PNG icon and save it as:
```
assets/icon.png
```

If you skip this step, the app will work but show an empty tray icon.

## 3. Build the Application

```bash
npm run build
```

This compiles TypeScript to JavaScript and copies files to `dist/`.

## 4. Run the Application

```bash
npm start
```

The app will:
- Start in the system tray (look near your clock)
- Begin watching for Foxhole.exe
- Wait for you to launch Foxhole

## 5. Test Without Foxhole (Optional)

To test the overlay without running Foxhole:

1. Right-click the tray icon
2. Click "Show Overlay"
3. The overlay window will appear
4. Configure your calculator URL and sector

**Note**: The F10 hotkey will only work when Foxhole is running!

## 6. Use with Foxhole

1. Launch Foxhole from Steam
2. Wait ~2 seconds for detection
3. Press **F10** to toggle the overlay
4. Select your sector and click "Open Calc"

## 7. Build an Installer (Optional)

To create a Windows installer:

```bash
npm run dist
```

The installer will be created in:
```
release/Foxhole-Overlay-Setup-1.0.0.exe
```

## Common Calculator URLs

Here are some popular Foxhole artillery calculators:

- **Foxhole Stats**: `https://foxholestats.com/`
- **Add your favorite calculator here**

## Troubleshooting

### App won't start
- Run `npm run build` first
- Check for errors in the console
- Make sure all dependencies installed: `npm install`

### Tray icon not showing
- Add `icon.png` to the `assets/` folder
- Icon should be 256x256 PNG format
- Restart the app

### F10 doesn't work
- Make sure Foxhole is running (check Task Manager)
- Try manually showing overlay from tray menu
- Check if another app is using F10

### Calculator won't load
- Some sites block iframe embedding
- Try a different calculator URL
- Use the "open in browser" option when prompted

## Development Mode

For development with hot reload:

```bash
# Terminal 1: Watch for TypeScript changes
npx tsc --watch

# Terminal 2: Run Electron
npm start
```

## Next Steps

- Read [README.md](README.md) for full documentation
- See [TESTING.md](TESTING.md) for testing scenarios
- Check out the code in `src/` to customize

## Need Help?

Open an issue on GitHub with:
- Your OS version
- Node.js version (`node --version`)
- Error messages
- Steps to reproduce
