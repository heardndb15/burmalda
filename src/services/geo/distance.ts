// Haversine formula to compute distance between two coords in meters
export function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in meters
}

// Compute distance from a point to a polyline (list of coordinates)
export function getDistanceToPolyline(
  lat: number,
  lon: number,
  polyline: [number, number][]
): number {
  let minDistance = Infinity;
  for (const coord of polyline) {
    const d = getDistance(lat, lon, coord[0], coord[1]);
    if (d < minDistance) {
      minDistance = d;
    }
  }
  return Math.round(minDistance);
}
