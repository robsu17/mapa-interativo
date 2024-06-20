import { Map } from 'leaflet'

export function getCornersCoordinates(map: Map) {
  return {
    ul: {
      lat: String(map?.getBounds().getNorthEast().lat),
      lng: String(map?.getBounds().getNorthEast().lng),
    },
    bl: {
      lat: String(map?.getBounds().getSouthEast().lat),
      lng: String(map?.getBounds().getSouthEast().lng),
    },
    ur: {
      lat: String(map?.getBounds().getNorthWest().lat),
      lng: String(map?.getBounds().getNorthWest().lng),
    },
    br: {
      lat: String(map?.getBounds().getSouthWest().lat),
      lng: String(map?.getBounds().getSouthWest().lng),
    },
  }
}
