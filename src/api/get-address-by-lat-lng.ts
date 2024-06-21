import { api } from '@/lib/axios'

interface GetAddressByLatLngParams {
  latitude: number
  longitude: number
}

export interface Address {
  city?: string
  road?: string
  state?: string
  suburb?: string
  postcode?: string
  cityDistrict?: string
  uf?: string
}

export async function getAddressByLatLng({
  latitude,
  longitude,
}: GetAddressByLatLngParams): Promise<Address> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`

  const { data } = await api().get(url)

  const uf = data.address['ISO3166-2-lvl4'].split('BR-')[1]

  return {
    city: data.address.city,
    road: data.address.road,
    state: data.address.state,
    suburb: data.address.suburb,
    postcode: data.address.postcode,
    cityDistrict: data.address.city_district,
    uf,
  }
}
