/**
 * Foxhole Process Watcher
 *
 * IMPORTANT SAFETY CONSTRAINTS:
 * - This module ONLY checks if "Foxhole.exe" appears in the process list
 * - It does NOT attempt to open, read, or write to the Foxhole process
 * - It does NOT inject DLLs or hooks
 * - It does NOT interact with the game in any way
 */

import psList from 'ps-list';

const POLL_INTERVAL_MS = 2000; // Check every 2 seconds

// Process names to check for
// Foxhole's actual executable is "War-Win64-Shipping.exe"
const PROCESS_NAMES_TO_CHECK = [
  'war-win64-shipping.exe',  // Actual Foxhole game executable
  'foxhole.exe',             // Fallback in case it's renamed
  'foxhole',                 // Generic fallback
];

let pollInterval: NodeJS.Timeout | null = null;
let lastRunning = false;
let firstCheck = true;

type WatcherCallback = () => void;

/**
 * Check if Foxhole is currently running by scanning the process list
 * SAFE: Only reads process names, does not interact with the process
 */
async function isFoxholeRunning(): Promise<boolean> {
  try {
    const processes = await psList();

    // On first check, log some info for debugging
    if (firstCheck) {
      console.log(`Checking ${processes.length} processes for Foxhole...`);
      firstCheck = false;

      // Log if we find anything with "foxhole" in the name
      const foxholeLike = processes.filter(p =>
        p.name.toLowerCase().includes('foxhole')
      );
      if (foxholeLike.length > 0) {
        console.log('Found Foxhole-like processes:', foxholeLike.map(p => p.name));
      }
    }

    // Check for Foxhole (case-insensitive, flexible matching)
    const found = processes.some(proc => {
      const procName = proc.name.toLowerCase();

      // Check against known process names
      for (const name of PROCESS_NAMES_TO_CHECK) {
        if (procName === name.toLowerCase() || procName.includes(name.toLowerCase())) {
          return true;
        }
      }

      // Fallback: any process containing "foxhole"
      return procName.includes('foxhole');
    });

    return found;
  } catch (error) {
    console.error('Error checking process list:', error);
    return false;
  }
}

/**
 * Start watching for Foxhole process
 * @param onStart - Called when Foxhole starts
 * @param onStop - Called when Foxhole stops
 */
export function startFoxholeWatcher(
  onStart: WatcherCallback,
  onStop: WatcherCallback
): void {
  if (pollInterval) {
    console.warn('Foxhole watcher already running');
    return;
  }

  console.log('Starting Foxhole watcher...');

  // Immediate first check
  isFoxholeRunning().then(running => {
    lastRunning = running;
    if (running) {
      console.log('Foxhole detected on startup');
      onStart();
    }
  });

  // Poll periodically
  pollInterval = setInterval(async () => {
    const running = await isFoxholeRunning();

    // State changed from not running to running
    if (running && !lastRunning) {
      console.log('Foxhole started');
      onStart();
    }
    // State changed from running to not running
    else if (!running && lastRunning) {
      console.log('Foxhole stopped');
      onStop();
    }

    lastRunning = running;
  }, POLL_INTERVAL_MS);
}

/**
 * Stop watching for Foxhole process
 */
export function stopFoxholeWatcher(): void {
  if (pollInterval) {
    console.log('Stopping Foxhole watcher...');
    clearInterval(pollInterval);
    pollInterval = null;
    lastRunning = false;
  }
}

/**
 * Get current Foxhole running state
 */
export async function getFoxholeRunningState(): Promise<boolean> {
  return await isFoxholeRunning();
}
