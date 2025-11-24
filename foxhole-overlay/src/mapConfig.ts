// Map configuration - maps display names to actual file names
export interface MapInfo {
  id: string;
  displayName: string;
  fileName: string;
}

export const MAP_CONFIG: MapInfo[] = [
  { id: 'acrithia', displayName: 'Acrithia', fileName: 'MapAcrithiaHex.png' },
  { id: 'allods_bight', displayName: "Allod's Bight", fileName: 'MapAllodsBightHex.png' },
  { id: 'ash_fields', displayName: 'Ash Fields', fileName: 'MapAshFieldsHex.png' },
  { id: 'basin_sionnach', displayName: 'Basin Sionnach', fileName: 'MapBasinSionnachHex.png' },
  { id: 'callahans_passage', displayName: "Callahan's Passage", fileName: 'MapCallahansPassageHex.png' },
  { id: 'callums_cape', displayName: "Callum's Cape", fileName: 'MapCallumsCapeHex.png' },
  { id: 'clahstra', displayName: 'Clahstra', fileName: 'MapClahstraHexMap.png' },
  { id: 'clanshead_valley', displayName: 'Clanshead Valley', fileName: 'MapClansheadValleyHex.png' },
  { id: 'deadlands', displayName: 'Deadlands', fileName: 'MapDeadlandsHex.png' },
  { id: 'drowned_vale', displayName: 'Drowned Vale', fileName: 'MapDrownedValeHex.png' },
  { id: 'endless_shore', displayName: 'Endless Shore', fileName: 'MapEndlessShoreHex.png' },
  { id: 'farranac_coast', displayName: 'Farranac Coast', fileName: 'MapFarranacCoastHex.png' },
  { id: 'fishermans_row', displayName: "Fisherman's Row", fileName: 'MapFishermansRowHex.png' },
  { id: 'godcrofts', displayName: 'Godcrofts', fileName: 'MapGodcroftsHex.png' },
  { id: 'great_march', displayName: 'Great March', fileName: 'MapGreatMarchHex.png' },
  { id: 'heartlands', displayName: 'Heartlands', fileName: 'MapHeartlandsHex.png' },
  { id: 'howl_county', displayName: 'Howl County', fileName: 'MapHowlCountyHex.png' },
  { id: 'kalokai', displayName: 'Kalokai', fileName: 'MapKalokaiHex.png' },
  { id: 'kings_cage', displayName: "King's Cage", fileName: 'MapKingsCageHex.png' },
  { id: 'linn_of_mercy', displayName: 'Linn of Mercy', fileName: 'MapLinnMercyHex.png' },
  { id: 'loch_mor', displayName: 'Loch Mor', fileName: 'MapLochMorHex.png' },
  { id: 'marban_hollow', displayName: 'Marban Hollow', fileName: 'MapMarbanHollow.png' },
  { id: 'mooring_county', displayName: 'Mooring County', fileName: 'MapMooringCountyHex.png' },
  { id: 'morgens_crossing', displayName: "Morgen's Crossing", fileName: 'MapMorgensCrossingHex.png' },
  { id: 'nevish_line', displayName: 'Nevish Line', fileName: 'MapNevishLineHex.png' },
  { id: 'oarbreaker', displayName: 'Oarbreaker', fileName: 'MapOarbreakerHex.png' },
  { id: 'origin', displayName: 'Origin', fileName: 'MapOriginHex.png' },
  { id: 'reaching_trail', displayName: 'Reaching Trail', fileName: 'MapReachingTrailHex.png' },
  { id: 'reavers_pass', displayName: "Reaver's Pass", fileName: 'MapReaversPassHex.png' },
  { id: 'red_river', displayName: 'Red River', fileName: 'MapRedRiverHex.png' },
  { id: 'sableport', displayName: 'Sableport', fileName: 'MapSableportHex.png' },
  { id: 'shackled_chasm', displayName: 'Shackled Chasm', fileName: 'MapShackledChasmHex.png' },
  { id: 'speaking_woods', displayName: 'Speaking Woods', fileName: 'MapSpeakingWoodsHex.png' },
  { id: 'stema_landing', displayName: 'Stema Landing', fileName: 'MapStemaLandingHex.png' },
  { id: 'stonecradle', displayName: 'Stonecradle', fileName: 'MapStonecradleHex.png' },
  { id: 'tempest_island', displayName: 'Tempest Island', fileName: 'MapTempestIslandHex.png' },
  { id: 'terminus', displayName: 'Terminus', fileName: 'MapTerminusHex.png' },
  { id: 'the_fingers', displayName: 'The Fingers', fileName: 'MapTheFingersHex.png' },
  { id: 'umbral_wildwood', displayName: 'Umbral Wildwood', fileName: 'MapUmbralWildwoodHex.png' },
  { id: 'viper_pit', displayName: 'Viper Pit', fileName: 'MapViperPitHex.png' },
  { id: 'weathered_expanse', displayName: 'Weathered Expanse', fileName: 'MapWeatheredExpanseHex.png' },
  { id: 'westgate', displayName: 'Westgate', fileName: 'MapWestgateHex.png' },
];

// Helper function to get file name by map ID
export function getMapFileName(mapId: string): string | null {
  const map = MAP_CONFIG.find(m => m.id === mapId);
  return map ? map.fileName : null;
}

// Helper function to get map info by ID
export function getMapInfo(mapId: string): MapInfo | null {
  return MAP_CONFIG.find(m => m.id === mapId) || null;
}
