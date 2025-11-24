# Foxhole Overlay - User Guide

**Always-on-top artillery calculator for Foxhole**

---

## 📥 Installation (One-Time Setup)

1. Download `Foxhole Overlay Setup 1.0.0.exe`
2. Run the installer (click "More info" → "Run anyway" if Windows warns you)
3. Install to default location or choose your own
4. Launch "Foxhole Overlay" from Start Menu or Desktop

---

## ⚙️ First-Time Setup (2 Minutes)

### Step 1: Find the Tray Icon
- After launching, look for the overlay icon in your **system tray** (bottom-right, near the clock)
- The app runs silently in the background

### Step 2: Enable Auto-Start (Recommended)
- **Right-click** the tray icon
- Click **"Start with Windows"**
- ✅ Now the overlay launches automatically when Windows boots!

### Step 3: Configure Your Calculator
- Right-click tray icon → **"Show Overlay"**
- Enter your calculator URL: `https://foxholestats.com/` (or your favorite)
- Select a sector (e.g., "Deadlands")
- Click **"Open Calc"**

---

## 🎮 Using with Foxhole

### Quick Start
1. Launch **Foxhole** from Steam
2. Wait ~2 seconds (overlay detects the game)
3. Press **F10** to show the calculator
4. Press **F10** again to hide it

### How It Works
- The overlay **automatically detects** when Foxhole is running
- The **F10 hotkey** only works when Foxhole is active
- The overlay appears **on top** of the game window
- Your settings are **saved** between sessions

---

## ⌨️ Hotkeys

| Key | Action |
|-----|--------|
| **F10** | Toggle overlay (only when Foxhole is running) |
| **ESC** | Close overlay |
| **Ctrl+W** | Close overlay |

---

## 🔧 Tray Menu

**Right-click the tray icon** to access:

- **Show Overlay** - Opens the overlay window
- **Hide Overlay** - Hides the overlay window
- **Start with Windows** ✅ - Auto-launch at boot (recommended!)
- **Quit** - Exit the application

---

## 💡 Tips & Tricks

### Recommended Setup
1. ✅ Enable "Start with Windows"
2. ✅ Let it run 24/7 in the tray
3. ✅ Just press F10 whenever you need it in-game

### Multi-Monitor Support
- The overlay works on any monitor
- It remembers the position where you last placed it

### Calculator Not Loading?
- Some websites block iframe embedding
- Try a different calculator URL
- Use "Open in browser" option when prompted

---

## ❓ Common Questions

**Q: Does this violate anti-cheat?**
A: No! The overlay is 100% external. It only displays a website on top of your game. It does NOT:
- Read game memory
- Inject into the game
- Simulate input
- Hook graphics

**Q: Why is the installer 93 MB?**
A: It includes the Electron runtime (like a mini Chrome browser) to display the overlay.

**Q: Does it use a lot of resources?**
A: No. ~100-200 MB RAM, minimal CPU usage.

**Q: Can I use my own calculator?**
A: Yes! Just enter any URL in the "Calc URL" field.

**Q: What if F10 doesn't work?**
A: Make sure Foxhole is running. The hotkey is ONLY enabled when Foxhole.exe is detected.

**Q: Can I change the hotkey?**
A: Currently F10 is hardcoded, but you can modify `src/configStore.ts` and rebuild.

---

## 🔒 Safety & Privacy

This overlay is **completely safe** and transparent:

✅ **Only monitors** process names (to detect Foxhole)
✅ **Only uses** standard Windows hotkeys
✅ **Only displays** a web page on top of the game

❌ **Never touches** game files
❌ **Never reads** game memory
❌ **Never injects** anything

The entire source code is available for inspection.

---

## 🐛 Troubleshooting

### Windows SmartScreen Warning
- Normal for unsigned apps (signing costs $300/year)
- Click "More info" → "Run anyway"

### Overlay Not Appearing
- Check Task Manager for `Foxhole.exe`
- Try manually showing from tray menu
- Restart the overlay app

### Hotkey Conflicts
- If another app uses F10, there may be conflicts
- Close other overlay apps (Discord overlay, etc.)

### Calculator Website Blocked
- Some sites use X-Frame-Options to prevent embedding
- Try: `https://foxholestats.com/`
- Or use "Open in browser" when prompted

---

## 📁 File Locations

**Installation**:
- `C:\Program Files\Foxhole Overlay\`

**Settings**:
- `%APPDATA%\foxhole-overlay\config.json`

**Logs** (if issues):
- Check Windows Event Viewer

---

## 🗑️ Uninstalling

1. Windows Settings → "Add or Remove Programs"
2. Find "Foxhole Overlay"
3. Click "Uninstall"

---

## 📞 Support

**Issues or Questions?**
- Open an issue on GitHub
- Include: Windows version, error messages, steps to reproduce

**Want to Contribute?**
- Source code available on GitHub
- PRs welcome!

---

## 📜 License

MIT License - Free and open source

---

**Enjoy your artillery calculations!** 🎯
