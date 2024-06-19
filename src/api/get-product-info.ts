import { api } from '@/lib/axios'

interface ProductParams {
  tenantUuid: string
  productId: string
  accessToken: string | null
}

interface ProductResponse {
  tenantId: number
  id: number
  name: string
  description: string
  price: number
  createdAt: string
}

export async function getProductInfo({
  productId,
  tenantUuid,
  accessToken,
}: ProductParams) {
  const response = await api(accessToken).get<ProductResponse>(
    `/products/${productId}?tenantUuid=${tenantUuid}`,
  )
  return response.data
}
