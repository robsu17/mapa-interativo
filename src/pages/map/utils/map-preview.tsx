import { MapContainer, TileLayer, Circle } from 'react-leaflet'

import MarkerClusterGroup from 'react-leaflet-cluster'

import 'leaflet/dist/leaflet.css'

import coordinates from '../data/coordinates'

import { useState } from 'react'
import { LatLng, Map } from 'leaflet'
import { CoordinateCorners, getPoints } from '@/api/get-points'
import { useAuthStore } from '@/store/auth'
import { useQuery } from '@tanstack/react-query'

export function MapPreview() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const [map, setMap] = useState<Map | null>(null)

  const [center, setCenter] = useState<LatLng>(
    new LatLng(-10.9197697, -37.0599079),
  )

  const [coordinatesCorners, setCoordinatesCorners] =
    useState<CoordinateCorners>(coordinates)

  map?.on('dragend', function onDragEnd() {
    const coordinates = {
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

    console.log(coordinates)
    setCoordinatesCorners(coordinates)
    setCenter(map.getCenter())
  })

  const { data: points } = useQuery({
    queryKey: ['points', accessToken, coordinatesCorners, 'geojson'],
    queryFn: () => getPoints({ accessToken, coordinates: coordinatesCorners }),
    enabled: isAuthenticated,
  })

  return (
    <div>
      <MapContainer
        ref={(map) => setMap(map)}
        center={center}
        zoom={13}
        className="flex h-[700px] w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
          maxZoom={19}
        />

        <MarkerClusterGroup chunkedLoading>
          {points &&
            points.map((point, index) => {
              const [longitude, latitude] = point.geometry.coordinates
              return (
                <Circle
                  key={index}
                  pathOptions={{ color: point.properties['marker-color'] }}
                  center={[latitude, longitude]}
                  radius={200}
                />
              )
            })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}
