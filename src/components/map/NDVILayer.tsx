import L from 'leaflet';
import { Pasture } from '../../types';

export function createNDVILayer(pastures: Pasture[]): L.Polygon[] {
  // Returns highly vibrant, spectrally interpolated polygon layers for NDVI mapping
  return pastures.map((p) => {
    const ndvi = p.ndviScore;
    
    // Spectral color interpolation
    // NDVI 0.0 - 0.3: Deep Red
    // NDVI 0.3 - 0.5: Light Orange/Yellow
    // NDVI 0.5 - 0.7: Light Green
    // NDVI 0.7 - 1.0: Dark Emerald Green
    let color = '#EF4444'; // Red
    if (ndvi >= 0.75) color = '#065F46'; // Emerald
    else if (ndvi >= 0.60) color = '#10B981'; // Green
    else if (ndvi >= 0.40) color = '#F59E0B'; // Yellow-Orange

    const polygon = L.polygon(p.coordinates, {
      color: '#ffffff',
      weight: 1.5,
      fillColor: color,
      fillOpacity: 0.7,
    });

    polygon.bindTooltip(`<b>${p.name}</b><br/>NDVI: <b>${p.ndviScore}</b>`, { permanent: false });
    return polygon;
  });
}
export default createNDVILayer;
