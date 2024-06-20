import { api } from '@/lib/axios'
import { Product } from '@/store/products'

interface GetProductsParams {
  tenantUuid: string
  accessToken: string | null
  pageIndex: number
}

interface GetProductsResponse {
  products: Product[]
  totalItems: number
}

export async function getProducts({
  tenantUuid,
  accessToken = null,
  pageIndex,
}: GetProductsParams): Promise<GetProductsResponse> {
  const { data, headers } = await api(accessToken).get('/products', {
    params: {
      tenantUuid,
      page: pageIndex,
      limit: 10,
    },
  })

  const totalItems = headers['x-total-count']

  return {
    products: data,
    totalItems: Number(totalItems),
  }
}
