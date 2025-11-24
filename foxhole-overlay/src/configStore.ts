/**
 * Configuration Store
 * Manages persistent settings using electron-store
 */

import Store from 'electron-store';

interface ConfigSchema {
  hotkey: string;
  sector: string | null;
  startWithWindows: boolean;
  lastWindowBounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

let store: Store<ConfigSchema> | null = null;

function getStore(): Store<ConfigSchema> {
  if (!store) {
    store = new Store<ConfigSchema>({
      defaults: {
        hotkey: 'F10',
        sector: null,
        startWithWindows: false,
      },
    });
  }
  return store;
}

// Hotkey
export function getHotkey(): string {
  return (getStore() as any).get('hotkey', 'F10');
}

export function setHotkey(hotkey: string): void {
  (getStore() as any).set('hotkey', hotkey);
}

// Sector
export function getSector(): string | null {
  return (getStore() as any).get('sector', null);
}

export function setSector(sector: string | null): void {
  (getStore() as any).set('sector', sector);
}

// Start with Windows
export function getStartWithWindows(): boolean {
  return (getStore() as any).get('startWithWindows', false);
}

export function setStartWithWindows(enabled: boolean): void {
  (getStore() as any).set('startWithWindows', enabled);
}

// Window bounds
export function getLastWindowBounds() {
  return (getStore() as any).get('lastWindowBounds', undefined);
}

export function setLastWindowBounds(bounds: { x: number; y: number; width: number; height: number }): void {
  (getStore() as any).set('lastWindowBounds', bounds);
}
