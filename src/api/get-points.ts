import { api } from '@/lib/axios'
import qs from 'qs'

export interface Coordinate {
  lat: string
  lng: string
}

export interface CoordinateCorners {
  ul: { lat: string; lng: string }
  bl: { lat: string; lng: string }
  ur: { lat: string; lng: string }
  br: { lat: string; lng: string }
}

interface GetPointsParams {
  coordinates: CoordinateCorners
  accessToken: string | null
  responseType?: 'geojson' | 'json'
}

interface GetPointsResponse {
  type: string
  properties: {
    'marker-color': string
    'marker-size': string
    'marker-symbol': string
  }
  geometry: {
    coordinates: [number, number]
    type: string
  }
}

function formatCoordinates(coordinate: Coordinate) {
  return `${coordinate.lat},${coordinate.lng}`
}

export async function getPoints({
  accessToken = null,
  coordinates,
  responseType = 'geojson',
}: GetPointsParams): Promise<GetPointsResponse[]> {
  const response = await api(accessToken).get(`/points`, {
    params: {
      ul: formatCoordinates(coordinates.ul),
      bl: formatCoordinates(coordinates.bl),
      ur: formatCoordinates(coordinates.ur),
      br: formatCoordinates(coordinates.br),
      responseType,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'brackets' })
    },
  })
  return response.data
}
