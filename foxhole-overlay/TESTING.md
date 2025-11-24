# Testing Checklist

This document outlines the manual testing scenarios to verify the Foxhole Overlay application works correctly.

## Safety Verification ✅

Before any functional testing, verify the codebase contains NO:
- [ ] `OpenProcess`, `ReadProcessMemory`, `WriteProcessMemory` calls
- [ ] DLL injection code (`LoadLibrary`, `CreateRemoteThread`, etc.)
- [ ] DirectX/Vulkan/OpenGL hook code
- [ ] Keyboard/mouse input simulation (`SendInput`, `keybd_event`, etc.)

**Expected**: Clean codebase - only uses `ps-list` to read process names.

## Scenario 1: App Startup (No Game Running)

### Steps
1. Launch the Foxhole Overlay application
2. Look for the tray icon in the system tray

### Expected Behavior
- [ ] App starts successfully
- [ ] Tray icon appears in system tray (or empty icon if no icon.png provided)
- [ ] Tooltip shows "Foxhole Overlay"
- [ ] No overlay window appears
- [ ] Pressing F10 does nothing (game not running)

### Console Output (if running in dev mode)
```
Foxhole Overlay starting...
Foxhole Overlay ready. Waiting for Foxhole.exe...
Starting Foxhole watcher...
```

---

## Scenario 2: Foxhole Game Starts

### Steps
1. With the overlay app running, launch Foxhole from Steam
2. Wait ~2 seconds

### Expected Behavior
- [ ] Within 2 seconds, console shows "Foxhole detected" or "Foxhole started"
- [ ] Tray menu updates (if applicable)
- [ ] F10 hotkey is now active
- [ ] Pressing F10 shows the overlay window

### Console Output
```
Foxhole started
Hotkey F10 registered successfully
```

---

## Scenario 3: Overlay Window Behavior

### Steps
1. With Foxhole running, press F10
2. Observe the overlay window
3. Try the following:
   - Move the window
   - Resize the window
   - Select a sector from the dropdown
   - Enter a calculator URL
   - Click "Open Calc"

### Expected Behavior
- [ ] Overlay appears on top of Foxhole window
- [ ] Overlay has transparent dark background
- [ ] Title bar shows "Foxhole Artillery Calculator"
- [ ] Window is movable by dragging the title bar
- [ ] Window is resizable from edges/corners
- [ ] Sector dropdown lists all Foxhole sectors
- [ ] Calc URL input accepts text
- [ ] "Open Calc" button loads the URL in the iframe
- [ ] Iframe displays the calculator website (if no X-Frame-Options blocking)

---

## Scenario 4: Iframe Embedding Success

### Steps
1. Enter a calculator URL that allows iframe embedding (e.g., `https://foxholestats.com/`)
2. Select a sector (e.g., "Deadlands")
3. Click "Open Calc"

### Expected Behavior
- [ ] Loading overlay appears briefly
- [ ] Iframe loads the calculator with `?sector=Deadlands` parameter in URL
- [ ] Calculator is interactive within the iframe
- [ ] No errors in console

---

## Scenario 5: Iframe Embedding Blocked (X-Frame-Options)

### Steps
1. Enter a URL that blocks iframe embedding (e.g., `https://google.com`)
2. Click "Open Calc"

### Expected Behavior
- [ ] Iframe fails to load
- [ ] Error event fires
- [ ] Alert dialog appears: "Failed to load calculator in overlay... Would you like to open it in your default browser instead?"
- [ ] If user clicks "OK", URL opens in default browser
- [ ] If user clicks "Cancel", dialog closes

---

## Scenario 6: Toggle Overlay (F10)

### Steps
1. With overlay visible, press F10
2. Press F10 again
3. Press F10 a third time

### Expected Behavior
- [ ] First press: Overlay hides
- [ ] Second press: Overlay shows and focuses
- [ ] Third press: Overlay hides again
- [ ] Window position is remembered between toggles

---

## Scenario 7: Close Overlay Methods

### Steps
Test each method to close the overlay:
1. Click the X button in the title bar
2. Show overlay, press ESC
3. Show overlay, press Ctrl+W

### Expected Behavior
- [ ] All three methods close the overlay
- [ ] Overlay can be reopened with F10
- [ ] Last sector and URL are remembered

---

## Scenario 8: Foxhole Game Closes

### Steps
1. With overlay visible and Foxhole running, exit Foxhole
2. Wait ~2 seconds

### Expected Behavior
- [ ] Within 2 seconds, console shows "Foxhole stopped"
- [ ] Overlay window closes automatically
- [ ] F10 hotkey is disabled
- [ ] Pressing F10 does nothing
- [ ] App remains in system tray

### Console Output
```
Foxhole stopped
Hotkey F10 unregistered
Overlay window closed
```

---

## Scenario 9: System Tray Menu

### Steps
1. Right-click the tray icon
2. Test each menu item:
   - "Show Overlay"
   - "Hide Overlay"
   - "Start with Windows" (toggle)
   - "Quit"

### Expected Behavior
- [ ] "Show Overlay" creates and shows the overlay window
- [ ] "Hide Overlay" hides the overlay (if visible)
- [ ] "Start with Windows" shows a checkmark when enabled
- [ ] Toggling "Start with Windows" works (check registry or startup folder)
- [ ] "Quit" exits the application completely

---

## Scenario 10: Persistent Settings

### Steps
1. Select a sector (e.g., "Heartlands")
2. Enter a calculator URL
3. Click "Open Calc"
4. Close the overlay
5. Press F10 to reopen

### Expected Behavior
- [ ] Sector dropdown shows "Heartlands" (last selection)
- [ ] Calculator URL input shows the saved URL
- [ ] Iframe is empty (not auto-loaded)
- [ ] Clicking "Open Calc" loads the calculator with saved settings

---

## Scenario 11: Window Position Persistence

### Steps
1. Open overlay
2. Move it to a specific position
3. Resize it to a specific size
4. Close overlay
5. Reopen overlay

### Expected Behavior
- [ ] Overlay reopens at the same position
- [ ] Overlay reopens with the same size
- [ ] Position is saved even after app restart

---

## Scenario 12: Multi-Monitor Support

### Steps (if you have multiple monitors)
1. Move overlay to a secondary monitor
2. Toggle it with F10
3. Move Foxhole to different monitor

### Expected Behavior
- [ ] Overlay works on any monitor
- [ ] Always-on-top works across all monitors
- [ ] Overlay appears on the same monitor where it was last positioned

---

## Scenario 13: Fullscreen & Borderless Window

### Steps
1. Run Foxhole in fullscreen mode
2. Press F10
3. Exit fullscreen, run in borderless windowed mode
4. Press F10

### Expected Behavior
- [ ] Overlay appears on top in fullscreen mode
- [ ] Overlay appears on top in borderless windowed mode
- [ ] No flickering or Z-order issues
- [ ] Can interact with overlay in both modes

---

## Scenario 14: Start with Windows

### Steps
1. Enable "Start with Windows" from tray menu
2. Restart your computer (or log out and log back in)
3. Check system tray after login

### Expected Behavior
- [ ] Foxhole Overlay starts automatically on login
- [ ] Tray icon appears
- [ ] No visible windows (only tray icon)
- [ ] Ready to detect Foxhole

---

## Scenario 15: Developer Mode (Unpackaged)

### Steps
1. Run `npm start` from command line
2. Check for DevTools

### Expected Behavior
- [ ] App runs successfully
- [ ] DevTools automatically open for the overlay window
- [ ] Console shows all log messages
- [ ] No errors in DevTools console

---

## Scenario 16: Production Build

### Steps
1. Run `npm run dist`
2. Wait for build to complete
3. Check `release/` folder
4. Install the generated `.exe` file
5. Run the installed application

### Expected Behavior
- [ ] Build completes without errors
- [ ] Installer `.exe` is created in `release/` folder
- [ ] Installer runs successfully
- [ ] Application is installed to Program Files
- [ ] Desktop shortcut is created (if selected)
- [ ] Start menu shortcut is created
- [ ] Installed app runs correctly

---

## Codebase Safety Audit

### Manual Code Review

Search the entire codebase for dangerous patterns:

```bash
# Search for memory access
grep -r "OpenProcess" src/
grep -r "ReadProcessMemory" src/
grep -r "WriteProcessMemory" src/

# Search for DLL injection
grep -r "LoadLibrary" src/
grep -r "CreateRemoteThread" src/
grep -r "VirtualAllocEx" src/

# Search for input simulation
grep -r "SendInput" src/
grep -r "keybd_event" src/
grep -r "mouse_event" src/

# Search for graphics hooks
grep -r "SetWindowsHookEx" src/
grep -r "D3D" src/
grep -r "Vulkan" src/
grep -r "OpenGL" src/
```

### Expected Results
- [ ] **ALL** searches return **NO MATCHES**
- [ ] Only `ps-list` is used for process detection
- [ ] Only `globalShortcut` is used for hotkeys
- [ ] Only standard Electron BrowserWindow APIs are used

---

## Performance Tests

### Memory Usage
1. Open Task Manager
2. Launch Foxhole Overlay
3. Monitor memory usage

### Expected Behavior
- [ ] Memory usage < 200 MB (typical for Electron apps)
- [ ] No memory leaks over time

### CPU Usage
1. Monitor CPU usage with overlay running
2. Monitor CPU usage with overlay visible
3. Monitor CPU usage while toggling overlay

### Expected Behavior
- [ ] CPU usage < 5% when idle
- [ ] CPU usage < 10% when active
- [ ] No sustained high CPU usage

---

## Edge Cases

### Rapid Toggle
1. Press F10 repeatedly (10+ times quickly)

**Expected**: Overlay toggles smoothly, no crashes

### Multiple Instances
1. Try to launch the app twice

**Expected**: Second instance either starts independently or prevents duplicate (depending on implementation)

### Kill Process
1. With overlay visible, kill Foxhole.exe from Task Manager
2. Wait ~2 seconds

**Expected**: Overlay detects game closure and disables hotkey

---

## Final Checklist

- [ ] All scenarios pass
- [ ] No dangerous code patterns found
- [ ] Memory usage acceptable
- [ ] CPU usage acceptable
- [ ] Installer builds successfully
- [ ] Application can be uninstalled cleanly

---

## Known Limitations

Document any known issues or limitations:
- Some websites block iframe embedding (X-Frame-Options)
- Hotkey conflicts with other applications possible
- May not work with DirectX overlays from other apps

---

## Reporting Issues

If any test fails, document:
1. Scenario number
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Console output (if applicable)
6. Screenshots (if applicable)
