import { api } from '@/lib/axios'

interface GetTenantsResponse {
  id: number
  uuid: string
  displayName: string
}

export async function getTenants({
  accessToken,
}: {
  accessToken: string | null
}) {
  const response = await api(accessToken).get<GetTenantsResponse[]>('/tenants')
  return response.data
}
