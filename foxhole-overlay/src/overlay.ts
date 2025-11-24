/**
 * Foxhole Artillery Calculator - Click-Based Interface
 * Click on the map to set artillery and target positions
 */

(function() {

// Type definitions from preload
interface ElectronAPI {
  getSector: () => Promise<string | null>;
  setSector: (sector: string) => Promise<void>;
  openExternal: (url: string) => Promise<void>;
  closeWindow: () => void;
  minimizeWindow: () => void;
}

const electronAPI: ElectronAPI = (window as any).electronAPI;

// Map configuration - inlined to avoid module dependency issues
const MAP_FILES: { [key: string]: string } = {
  'acrithia': 'MapAcrithiaHex.png',
  'allods_bight': 'MapAllodsBightHex.png',
  'ash_fields': 'MapAshFieldsHex.png',
  'basin_sionnach': 'MapBasinSionnachHex.png',
  'callahans_passage': 'MapCallahansPassageHex.png',
  'callums_cape': 'MapCallumsCapeHex.png',
  'clahstra': 'MapClahstraHexMap.png',
  'clanshead_valley': 'MapClansheadValleyHex.png',
  'deadlands': 'MapDeadlandsHex.png',
  'drowned_vale': 'MapDrownedValeHex.png',
  'endless_shore': 'MapEndlessShoreHex.png',
  'farranac_coast': 'MapFarranacCoastHex.png',
  'fishermans_row': 'MapFishermansRowHex.png',
  'godcrofts': 'MapGodcroftsHex.png',
  'great_march': 'MapGreatMarchHex.png',
  'heartlands': 'MapHeartlandsHex.png',
  'howl_county': 'MapHowlCountyHex.png',
  'kalokai': 'MapKalokaiHex.png',
  'kings_cage': 'MapKingsCageHex.png',
  'linn_of_mercy': 'MapLinnMercyHex.png',
  'loch_mor': 'MapLochMorHex.png',
  'marban_hollow': 'MapMarbanHollow.png',
  'mooring_county': 'MapMooringCountyHex.png',
  'morgens_crossing': 'MapMorgensCrossingHex.png',
  'nevish_line': 'MapNevishLineHex.png',
  'oarbreaker': 'MapOarbreakerHex.png',
  'origin': 'MapOriginHex.png',
  'reaching_trail': 'MapReachingTrailHex.png',
  'reavers_pass': 'MapReaversPassHex.png',
  'red_river': 'MapRedRiverHex.png',
  'sableport': 'MapSableportHex.png',
  'shackled_chasm': 'MapShackledChasmHex.png',
  'speaking_woods': 'MapSpeakingWoodsHex.png',
  'stema_landing': 'MapStemaLandingHex.png',
  'stonecradle': 'MapStonecradleHex.png',
  'tempest_island': 'MapTempestIslandHex.png',
  'terminus': 'MapTerminusHex.png',
  'the_fingers': 'MapTheFingersHex.png',
  'umbral_wildwood': 'MapUmbralWildwoodHex.png',
  'viper_pit': 'MapViperPitHex.png',
  'weathered_expanse': 'MapWeatheredExpanseHex.png',
  'westgate': 'MapWestgateHex.png',
};

function getMapFileName(mapId: string): string | null {
  return MAP_FILES[mapId] || null;
}

// DOM Elements
const mapSelect = document.getElementById('mapSelect') as HTMLSelectElement;
const artilleryModeBtn = document.getElementById('artilleryModeBtn') as HTMLButtonElement;
const targetModeBtn = document.getElementById('targetModeBtn') as HTMLButtonElement;
const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;
const closeBtn = document.getElementById('closeBtn') as HTMLButtonElement;
const minimizeBtn = document.getElementById('minimizeBtn') as HTMLButtonElement;

const mapImage = document.getElementById('mapImage') as HTMLImageElement;
const placeholderText = document.getElementById('placeholderText') as HTMLDivElement;
const mapContainer = document.getElementById('mapContainer') as HTMLDivElement;

const artilleryMarker = document.getElementById('artilleryMarker') as HTMLDivElement;
const targetMarker = document.getElementById('targetMarker') as HTMLDivElement;
const lineOverlay = document.getElementById('lineOverlay') as unknown as SVGElement;
const distanceLine = document.getElementById('distanceLine') as unknown as SVGLineElement;

const resultsPanel = document.getElementById('resultsPanel') as HTMLDivElement;
const distanceValue = document.getElementById('distanceValue') as HTMLSpanElement;
const azimuthValue = document.getElementById('azimuthValue') as HTMLSpanElement;
const instructions = document.getElementById('instructions') as HTMLDivElement;

// State
let currentMode: 'artillery' | 'target' = 'artillery';
let artilleryPosition: { x: number; y: number } | null = null;
let targetPosition: { x: number; y: number } | null = null;

// ============================================================================
// Map Loading
// ============================================================================

function loadMap(mapName: string) {
  console.log('[MAP] loadMap called with:', mapName);

  if (!mapName) {
    console.log('No map name provided, showing placeholder');
    mapImage.style.display = 'none';
    placeholderText.style.display = 'block';
    instructions.style.display = 'none';
    clearMarkers();
    return;
  }

  // Get the actual file name from the map configuration
  const fileName = getMapFileName(mapName);
  console.log('[FILE] File name from config:', fileName);

  if (!fileName) {
    console.error('[ERROR] Map not found in configuration:', mapName);
    placeholderText.innerHTML = `
      <strong>Map not found</strong><br><br>
      Map ID: ${mapName}<br><br>
      Please select a valid map
    `;
    placeholderText.style.display = 'block';
    mapImage.style.display = 'none';
    instructions.style.display = 'none';
    return;
  }

  // Use local file path - the path will be resolved relative to the HTML file
  const imageUrl = `../foxhole-tiles/${fileName}`;
  console.log('[LOAD] Loading map from:', imageUrl);
  console.log('[LOCATION] Current location:', window.location.href);

  // Clear previous image
  mapImage.src = '';
  mapImage.style.display = 'none';
  placeholderText.textContent = 'Loading map...';
  placeholderText.style.display = 'block';

  // Load new image
  mapImage.onload = () => {
    console.log('[OK] Map loaded successfully:', imageUrl);
    console.log('Image size:', mapImage.naturalWidth, 'x', mapImage.naturalHeight);
    mapImage.style.display = 'block';
    placeholderText.style.display = 'none';
    instructions.style.display = 'block';
  };

  mapImage.onerror = (err) => {
    console.error('[ERROR] Failed to load map:', imageUrl, err);
    placeholderText.innerHTML = `
      <strong>Failed to load map</strong><br><br>
      Path: ${imageUrl}<br><br>
      Check console for details
    `;
    placeholderText.style.display = 'block';
    mapImage.style.display = 'none';
    instructions.style.display = 'none';
  };

  mapImage.src = imageUrl;
  clearMarkers();
}

// ============================================================================
// Marker Management
// ============================================================================

function clearMarkers() {
  artilleryPosition = null;
  targetPosition = null;
  artilleryMarker.style.display = 'none';
  targetMarker.style.display = 'none';
  lineOverlay.style.display = 'none';
  resultsPanel.style.display = 'none';
}

function updateMarkers() {
  if (!artilleryPosition) {
    artilleryMarker.style.display = 'none';
  } else {
    artilleryMarker.style.left = `${artilleryPosition.x}px`;
    artilleryMarker.style.top = `${artilleryPosition.y}px`;
    artilleryMarker.style.display = 'block';
  }

  if (!targetPosition) {
    targetMarker.style.display = 'none';
  } else {
    targetMarker.style.left = `${targetPosition.x}px`;
    targetMarker.style.top = `${targetPosition.y}px`;
    targetMarker.style.display = 'block';
  }

  // If both positions set, calculate and show results
  if (artilleryPosition && targetPosition) {
    calculateAndDisplay();
  } else {
    lineOverlay.style.display = 'none';
    resultsPanel.style.display = 'none';
  }
}

// ============================================================================
// Calculations
// ============================================================================

function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

function calculateAzimuth(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  let degrees = Math.atan2(dx, -dy) * (180 / Math.PI);
  if (degrees < 0) degrees += 360;
  return degrees;
}

function calculateAndDisplay() {
  if (!artilleryPosition || !targetPosition) return;

  // Calculate on screen coordinates
  const pixelDistance = calculateDistance(
    artilleryPosition.x,
    artilleryPosition.y,
    targetPosition.x,
    targetPosition.y
  );

  // Convert pixel distance to meters
  // Foxhole hex maps (1024x888 px) represent hexagons with 1097m sides
  // Hex width: 2 × 1097m = 2194m, Height: 1097m × √3 ≈ 1900m
  // Scale: ~2194m / 1024px horizontal, ~1900m / 888px vertical
  // Average: ~2.14 meters per pixel
  const PIXELS_TO_METERS = 2194 / 1024;
  const mapRect = mapImage.getBoundingClientRect();
  const scale = mapImage.naturalWidth / mapRect.width;
  const distanceMeters = pixelDistance * scale * PIXELS_TO_METERS;

  const azimuth = calculateAzimuth(
    artilleryPosition.x,
    artilleryPosition.y,
    targetPosition.x,
    targetPosition.y
  );

  // Update display
  distanceValue.textContent = `${distanceMeters.toFixed(1)}m`;
  azimuthValue.textContent = `${azimuth.toFixed(1)}°`;
  resultsPanel.style.display = 'block';

  // Draw line
  distanceLine.setAttribute('x1', artilleryPosition.x.toString());
  distanceLine.setAttribute('y1', artilleryPosition.y.toString());
  distanceLine.setAttribute('x2', targetPosition.x.toString());
  distanceLine.setAttribute('y2', targetPosition.y.toString());
  lineOverlay.style.display = 'block';

  console.log(`Distance: ${distanceMeters.toFixed(1)}m, Azimuth: ${azimuth.toFixed(1)}°`);
}

// ============================================================================
// Mode Management
// ============================================================================

function setMode(mode: 'artillery' | 'target') {
  currentMode = mode;

  if (mode === 'artillery') {
    artilleryModeBtn.classList.add('active');
    targetModeBtn.classList.remove('active');
    mapContainer.style.cursor = 'crosshair';
  } else {
    artilleryModeBtn.classList.remove('active');
    targetModeBtn.classList.add('active');
    mapContainer.style.cursor = 'crosshair';
  }
}

// ============================================================================
// Map Click Handler
// ============================================================================

function handleMapClick(event: MouseEvent) {
  // Ignore if no map loaded
  if (mapImage.style.display === 'none') return;

  // Get map image bounds to validate click is within the actual image
  const imageRect = mapImage.getBoundingClientRect();
  const imageX = event.clientX - imageRect.left;
  const imageY = event.clientY - imageRect.top;

  // Check if click is outside image bounds
  if (imageX < 0 || imageX > imageRect.width || imageY < 0 || imageY > imageRect.height) {
    console.log('[CLICK] Click outside map bounds, ignoring');
    return;
  }

  // Get click position relative to map container (for marker placement)
  const rect = mapContainer.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  console.log(`[CLICK] Valid click at (${x}, ${y}) in mode: ${currentMode}`);

  if (currentMode === 'artillery') {
    artilleryPosition = { x, y };
    // Auto-switch to target mode after setting artillery
    setMode('target');
  } else {
    targetPosition = { x, y };
  }

  updateMarkers();
}

// ============================================================================
// Storage
// ============================================================================

async function loadSettings() {
  try {
    const savedMap = await electronAPI.getSector();
    if (savedMap) {
      mapSelect.value = savedMap;
      loadMap(savedMap);
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

async function saveMap(mapName: string) {
  try {
    await electronAPI.setSector(mapName);
  } catch (error) {
    console.error('Error saving map:', error);
  }
}

// ============================================================================
// Event Handlers
// ============================================================================

mapSelect.addEventListener('change', () => {
  const mapName = mapSelect.value;
  loadMap(mapName);
  saveMap(mapName);
});

artilleryModeBtn.addEventListener('click', () => {
  setMode('artillery');
});

targetModeBtn.addEventListener('click', () => {
  setMode('target');
});

clearBtn.addEventListener('click', () => {
  clearMarkers();
  setMode('artillery');
});

closeBtn.addEventListener('click', () => {
  electronAPI.closeWindow();
});

minimizeBtn.addEventListener('click', () => {
  electronAPI.minimizeWindow();
});

// Map click handler
mapContainer.addEventListener('click', handleMapClick);

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey && event.key === 'w') || event.key === 'Escape') {
    event.preventDefault();
    electronAPI.closeWindow();
  }

  // Number keys to switch modes
  if (event.key === '1') {
    setMode('artillery');
  } else if (event.key === '2') {
    setMode('target');
  }

  // C to clear
  if (event.key.toLowerCase() === 'c') {
    clearMarkers();
    setMode('artillery');
  }
});

// Recalculate on window resize
window.addEventListener('resize', () => {
  if (artilleryPosition && targetPosition) {
    updateMarkers();
  }
});

// ============================================================================
// Initialization
// ============================================================================

loadSettings();

console.log('Foxhole Artillery Calculator (Click Mode) initialized');
console.log('Click on the map to set positions!');

})();
