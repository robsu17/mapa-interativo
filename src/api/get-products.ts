import { api } from '@/lib/axios'

interface GetProductsParams {
  tenantUuid: string
}

export async function getProducts({ tenantUuid }: GetProductsParams) {
  const response = await api.get('/products', {
    params: {
      tenantUuid,
    },
  })

  return response.data
}
