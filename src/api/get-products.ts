import { api } from '@/lib/axios'
import { Product } from '@/store/products'

interface GetProductsParams {
  tenantUuid: string
  accessToken: string | null
}

export async function getProducts({
  tenantUuid,
  accessToken = null,
}: GetProductsParams) {
  const response = await api(accessToken).get<Product[]>('/products', {
    params: {
      tenantUuid,
    },
  })

  return response.data
}
