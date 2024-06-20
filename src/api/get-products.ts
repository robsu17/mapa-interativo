import { api } from '@/lib/axios'
import { Product } from '@/store/products'

interface GetProductsParams {
  tenantUuid: string
  accessToken: string | null
}

interface GetProductsResponse {
  products: Product[]
  totalItems: number
}

export async function getProducts({
  tenantUuid,
  accessToken = null,
}: GetProductsParams): Promise<GetProductsResponse> {
  const { data, headers } = await api(accessToken).get('/products', {
    params: {
      tenantUuid,
    },
  })

  const totalItems = headers['X-Total-Count']

  return {
    products: data,
    totalItems,
  }
}
