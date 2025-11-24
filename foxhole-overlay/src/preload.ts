/**
 * Preload Script
 * Secure bridge between main process and renderer
 */

import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods to renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // Config management
  getSector: () => ipcRenderer.invoke('config:getSector'),
  setSector: (sector: string) => ipcRenderer.invoke('config:setSector', sector),

  // External browser
  openExternal: (url: string) => ipcRenderer.invoke('shell:openExternal', url),

  // Window control
  closeWindow: () => ipcRenderer.send('window:close'),
  minimizeWindow: () => ipcRenderer.send('window:minimize'),
});

// Type definitions for the exposed API
export interface ElectronAPI {
  getSector: () => Promise<string | null>;
  setSector: (sector: string) => Promise<void>;
  openExternal: (url: string) => Promise<void>;
  closeWindow: () => void;
  minimizeWindow: () => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
