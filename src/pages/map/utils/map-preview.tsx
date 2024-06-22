import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import MarkerClusterGroup from 'react-leaflet-cluster'

import 'leaflet/dist/leaflet.css'

import coordinates from '../data/coordinates'

import { useState } from 'react'
import { LatLng, Map } from 'leaflet'
import { CoordinateCorners, getPoints } from '@/api/get-points'
import { useAuthStore } from '@/store/auth'
import { useQuery } from '@tanstack/react-query'
import { getCornersCoordinates } from '../data/get-corners-coordinates'
import { Address, getAddressByLatLng } from '@/api/get-address-by-lat-lng'
import Loading from '@/components/loading'

export function MapPreview() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const [map, setMap] = useState<Map | null>(null)
  const [markerAddres, setMarkerAddres] = useState<Address | null>(null)
  const [isLoadingAddress, setIsLoadingAddress] = useState(false)

  const [center, setCenter] = useState<LatLng>(
    new LatLng(-10.9197697, -37.0599079),
  )

  const [coordinatesCorners, setCoordinatesCorners] =
    useState<CoordinateCorners>(coordinates)

  map?.on('dragend', function onDragEnd() {
    const coordinates = getCornersCoordinates(map)
    setCoordinatesCorners(coordinates)
    setCenter(map.getCenter())
  })

  map?.on('zoom', function onDragEnd() {
    const coordinates = getCornersCoordinates(map)
    setCoordinatesCorners(coordinates)
    setCenter(map.getCenter())
  })

  const { data: points } = useQuery({
    queryKey: ['points', accessToken, coordinatesCorners, 'geojson'],
    queryFn: () => getPoints({ accessToken, coordinates: coordinatesCorners }),
    enabled: isAuthenticated,
    staleTime: Infinity,
  })

  async function handleGetAddresByLatLng(lat: number, lng: number) {
    setIsLoadingAddress(true)
    const { city, road, state, suburb, cityDistrict, uf, postcode } =
      await getAddressByLatLng({
        latitude: lat,
        longitude: lng,
      })
    setIsLoadingAddress(false)
    setMarkerAddres({
      city,
      road,
      state,
      suburb,
      cityDistrict,
      uf,
      postcode,
    })
  }

  return (
    <div>
      <MapContainer
        ref={(map) => setMap(map)}
        center={center}
        zoom={12}
        className="z-0 flex h-[80vh] w-full rounded border border-border shadow-md"
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
                <Marker
                  key={index}
                  position={[latitude, longitude]}
                  eventHandlers={{
                    click: async () =>
                      await handleGetAddresByLatLng(latitude, longitude),
                  }}
                >
                  <Popup>
                    {isLoadingAddress ? (
                      <Loading />
                    ) : (
                      <div className="space-y-2">
                        <h1 className="text-center text-xl text-foreground">
                          {`${markerAddres?.road}, ${markerAddres?.postcode}`}
                        </h1>
                        <div className="flex justify-center gap-1 text-muted-foreground">
                          <h1 className="text-center">
                            {markerAddres?.suburb}
                          </h1>
                          <span>-</span>
                          <h1 className="text-center">
                            {markerAddres?.city || markerAddres?.cityDistrict}
                          </h1>
                          <span>-</span>
                          <h1 className="text-center">{markerAddres?.uf}</h1>
                        </div>
                      </div>
                    )}
                  </Popup>
                </Marker>
              )
            })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}
