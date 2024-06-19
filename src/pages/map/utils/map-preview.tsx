import { MapContainer, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

export function MapPreview() {
  return (
    <div>
      <MapContainer
        center={[-23.5433201, -46.6447719]}
        zoom={11}
        className="flex h-[600px] w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
          maxZoom={19}
        />
      </MapContainer>
    </div>
  )
}
