/**
 * Foxhole Overlay - Main Process
 *
 * SAFETY GUARANTEE:
 * This application does NOT:
 * - Read or write Foxhole's process memory
 * - Inject DLLs or hooks into Foxhole
 * - Hook DirectX, Vulkan, or any graphics API
 * - Simulate mouse/keyboard input into the game
 *
 * It ONLY:
 * - Monitors process list for "Foxhole.exe"
 * - Registers global hotkeys
 * - Displays an always-on-top overlay window
 * - Embeds a web-based artillery calculator
 */

import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  nativeImage,
  shell,
  Tray,
  Menu,
  screen,
} from 'electron';
import path from 'path';
import {
  startFoxholeWatcher,
  stopFoxholeWatcher,
} from './foxholeWatcher';
import {
  getHotkey,
  getSector,
  setSector,
  getLastWindowBounds,
  setLastWindowBounds,
} from './configStore';

// ============================================================================
// Global State
// ============================================================================

// Test mode: Set to true to enable overlay without Foxhole running
const TEST_MODE = process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath); // Automatically enable in dev mode

let overlayWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let currentHotkey: string = 'F10';
let isFoxholeRunning: boolean = false;

// ============================================================================
// Overlay Window Manager
// ============================================================================

/**
 * Create the overlay window
 * SAFE: This is a standard Electron window, no process interaction
 */
function createOverlayWindow(): BrowserWindow | null {
  if (overlayWindow) {
    console.log('Overlay window already exists');
    return overlayWindow;
  }

  console.log('Creating overlay window...');

  // Get saved bounds or use 75% of display size
  let savedBounds = getLastWindowBounds();

  // Get primary display dimensions
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: displayWidth, height: displayHeight } = primaryDisplay.workAreaSize;

  console.log(`Display size: ${displayWidth}x${displayHeight}`);

  // Use 75% of display size
  const width = Math.floor(displayWidth * 0.75);
  const height = Math.floor(displayHeight * 0.75);

  console.log(`Window size: ${width}x${height}`);

  // Center the window
  const x = Math.floor((displayWidth - width) / 2);
  const y = Math.floor((displayHeight - height) / 2);

  const defaultBounds = {
    width,
    height,
    x,
    y,
  };

  // Validate saved bounds - reject if dimensions are too large (likely fullscreen)
  if (savedBounds) {
    // Check if saved bounds are > 90% of display (likely fullscreen or maximized)
    const isLikelyFullscreen =
      savedBounds.width > (displayWidth * 0.9) ||
      savedBounds.height > (displayHeight * 0.9);

    if (isLikelyFullscreen) {
      console.log(`Saved bounds (${savedBounds.width}x${savedBounds.height}) appear to be fullscreen, resetting to default`);
      savedBounds = null;
      setLastWindowBounds(defaultBounds); // Clear bad state
    }
  }

  const bounds = savedBounds || defaultBounds;

  overlayWindow = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    movable: true,
    focusable: true,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false, // Allow loading local map images from foxhole-tiles directory
    },
  });

  // Ensure window stays on top even when clicking game
  overlayWindow.setAlwaysOnTop(true, 'screen-saver', 1);

  // Prevent fullscreen
  overlayWindow.setFullScreenable(false);

  // Keep window focused when shown
  overlayWindow.on('show', () => {
    if (overlayWindow) {
      overlayWindow.focus();
      overlayWindow.setAlwaysOnTop(true, 'screen-saver', 1);

      // Force exit fullscreen if somehow entered
      if (overlayWindow.isFullScreen()) {
        overlayWindow.setFullScreen(false);
      }
    }
  });

  // Refocus when clicking on game accidentally
  overlayWindow.on('blur', () => {
    if (overlayWindow && overlayWindow.isVisible()) {
      // Small delay to prevent infinite focus loop
      setTimeout(() => {
        if (overlayWindow && overlayWindow.isVisible()) {
          overlayWindow.focus();
        }
      }, 100);
    }
  });

  // Prevent entering fullscreen
  overlayWindow.on('enter-full-screen', () => {
    if (overlayWindow) {
      overlayWindow.setFullScreen(false);
    }
  });

  // Clear cache before loading to ensure fresh files
  overlayWindow.webContents.session.clearCache().then(() => {
    overlayWindow!.loadFile(path.join(__dirname, 'overlay.html'));
  });

  // Save window position on move (resize disabled)
  overlayWindow.on('move', () => {
    if (overlayWindow && !overlayWindow.isFullScreen()) {
      const bounds = overlayWindow.getBounds();
      setLastWindowBounds(bounds);
    }
  });

  overlayWindow.on('closed', () => {
    console.log('Overlay window closed');
    overlayWindow = null;
  });

  // Open DevTools in development
  if (!app.isPackaged) {
    overlayWindow.webContents.openDevTools({ mode: 'detach' });
  }

  return overlayWindow;
}

/**
 * Toggle overlay visibility
 */
function toggleOverlay(): void {
  if (!overlayWindow) {
    const window = createOverlayWindow();
    if (window) {
      window.show();
      window.focus();
    }
  } else if (overlayWindow.isVisible()) {
    overlayWindow.hide();
  } else {
    overlayWindow.show();
    overlayWindow.focus();
  }
}

/**
 * Close overlay window
 */
function closeOverlay(): void {
  if (overlayWindow) {
    overlayWindow.close();
    overlayWindow = null;
  }
}

// ============================================================================
// Global Hotkey Manager
// ============================================================================

/**
 * Register global hotkey
 * SAFE: Standard Electron global shortcut, no game interaction
 */
function registerHotkey(): void {
  // Skip if already registered
  if (globalShortcut.isRegistered(currentHotkey)) {
    console.log(`Hotkey ${currentHotkey} already registered`);
    return;
  }

  try {
    const success = globalShortcut.register(currentHotkey, () => {
      console.log(`Hotkey ${currentHotkey} pressed`);
      toggleOverlay();
    });

    if (success) {
      console.log(`Hotkey ${currentHotkey} registered successfully`);
    } else {
      console.error(`Failed to register hotkey ${currentHotkey}`);
    }
  } catch (error) {
    console.error('Error registering hotkey:', error);
  }
}

/**
 * Unregister global hotkey
 */
function unregisterHotkey(): void {
  if (globalShortcut.isRegistered(currentHotkey)) {
    globalShortcut.unregister(currentHotkey);
    console.log(`Hotkey ${currentHotkey} unregistered`);
  }
}

// ============================================================================
// Foxhole Watcher Callbacks
// ============================================================================

function onFoxholeStart(): void {
  console.log('[OK] Foxhole detected - enabling hotkey');
  isFoxholeRunning = true;
  registerHotkey();
  updateTrayMenu(); // Update menu to show Foxhole is running
}

function onFoxholeStop(): void {
  console.log('[STOP] Foxhole stopped - disabling hotkey and closing overlay');
  isFoxholeRunning = false;
  unregisterHotkey();
  closeOverlay();
  updateTrayMenu(); // Update menu to show Foxhole is not running
}

// ============================================================================
// System Tray
// ============================================================================

function createTray(): void {
  // Create tray icon
  const iconPath = path.join(__dirname, '..', 'assets', 'icon.png');
  let trayIcon: Electron.NativeImage;

  try {
    trayIcon = nativeImage.createFromPath(iconPath);
    if (trayIcon.isEmpty()) {
      console.warn('Tray icon not found, using empty image');
      trayIcon = nativeImage.createEmpty();
    }
  } catch (error) {
    console.error('Error loading tray icon:', error);
    trayIcon = nativeImage.createEmpty();
  }

  tray = new Tray(trayIcon);
  tray.setToolTip('Foxhole Overlay');

  updateTrayMenu();
}

function updateTrayMenu(): void {
  if (!tray) return;

  const statusLabel = isFoxholeRunning
    ? `Foxhole Running (${currentHotkey} to toggle)`
    : 'Waiting for Foxhole...';

  const contextMenu = Menu.buildFromTemplate([
    {
      label: statusLabel,
      enabled: false,
    },
    { type: 'separator' },
    {
      label: 'Show Overlay',
      enabled: isFoxholeRunning || TEST_MODE,
      click: () => {
        createOverlayWindow();
        overlayWindow?.show();
        overlayWindow?.focus();
      },
    },
    {
      label: 'Hide Overlay',
      enabled: overlayWindow !== null && overlayWindow.isVisible(),
      click: () => {
        overlayWindow?.hide();
      },
    },
    { type: 'separator' },
    {
      label: 'Quit Service',
      click: () => {
        console.log('User requested quit - shutting down service');
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
}

// ============================================================================
// IPC Handlers
// ============================================================================

function setupIpcHandlers(): void {
  // Config handlers
  ipcMain.handle('config:getSector', () => {
    return getSector();
  });

  ipcMain.handle('config:setSector', (_event, sector: string) => {
    setSector(sector);
  });

  // Shell handlers
  ipcMain.handle('shell:openExternal', async (_event, url: string) => {
    await shell.openExternal(url);
  });

  // Window control
  ipcMain.on('window:close', () => {
    closeOverlay();
  });

  ipcMain.on('window:minimize', () => {
    overlayWindow?.minimize();
  });
}

// ============================================================================
// App Lifecycle
// ============================================================================

app.whenReady().then(() => {
  console.log('='.repeat(60));
  console.log('Foxhole Overlay Service Starting...');
  console.log('='.repeat(60));

  // Load hotkey from config
  currentHotkey = getHotkey();
  console.log(`Hotkey configured: ${currentHotkey}`);

  // Setup IPC
  setupIpcHandlers();

  // Create tray
  createTray();
  console.log('System tray icon created');

  // Start watching for Foxhole
  startFoxholeWatcher(onFoxholeStart, onFoxholeStop);
  console.log('Monitoring for Foxhole process...');

  // In test mode (dev), enable hotkey immediately for testing
  if (TEST_MODE) {
    console.log('TEST MODE: Hotkey enabled without Foxhole running');
    registerHotkey();
  }

  console.log('='.repeat(60));
  console.log('Service ready - waiting for Foxhole to start');
  console.log('Right-click the tray icon to quit the service');
  console.log('='.repeat(60));
});

app.on('window-all-closed', () => {
  // Prevent app from quitting when all windows are closed
  // We want to stay in the tray
  // Do nothing - don't quit on macOS or Windows
});

app.on('will-quit', () => {
  console.log('='.repeat(60));
  console.log('Foxhole Overlay Service shutting down...');

  // Cleanup
  globalShortcut.unregisterAll();
  console.log('   [OK] Unregistered hotkeys');

  stopFoxholeWatcher();
  console.log('   [OK] Stopped process watcher');

  console.log('Service stopped');
  console.log('='.repeat(60));
});

app.on('activate', () => {
  // On macOS, recreate window when dock icon is clicked
  if (BrowserWindow.getAllWindows().length === 0) {
    createOverlayWindow();
  }
});
