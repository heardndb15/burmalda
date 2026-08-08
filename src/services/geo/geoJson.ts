import { Pasture } from '../../types';

export function pastureToGeoJSON(pasture: Pasture) {
  // GeoJSON coordinate order is [longitude, latitude]
  const geoJsonCoords = pasture.coordinates.map((coord) => [coord[1], coord[0]]);
  
  // Close the polygon loop if it's not closed
  if (
    geoJsonCoords.length > 0 &&
    (geoJsonCoords[0][0] !== geoJsonCoords[geoJsonCoords.length - 1][0] ||
      geoJsonCoords[0][1] !== geoJsonCoords[geoJsonCoords.length - 1][1])
  ) {
    geoJsonCoords.push([geoJsonCoords[0][0], geoJsonCoords[0][1]]);
  }

  return {
    type: 'Feature' as const,
    properties: {
      id: pasture.id,
      name: pasture.name,
      health: Math.round(pasture.ndviScore * 100),
      feedDays: pasture.feedDaysRemaining,
    },
    geometry: {
      type: 'Polygon' as const,
      coordinates: [geoJsonCoords],
    },
  };
}

export function pasturesToGeoJSONCollection(pastures: Pasture[]) {
  return {
    type: 'FeatureCollection' as const,
    features: pastures.map((p) => pastureToGeoJSON(p)),
  };
}
