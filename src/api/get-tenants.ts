import { api } from '@/lib/axios'

interface GetTenantsResponse {
  id: number
  uuid: string
  displayName: string
}

export async function getTenants() {
  const response = await api.get<GetTenantsResponse[]>('/tenants')
  return response.data
}
