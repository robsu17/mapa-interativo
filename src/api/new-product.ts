import { api } from '@/lib/axios'
import { Product } from '@/store/products'

interface NewProductBody {
  name: string
  description: string
  price: number
  tenantUuid: string
  accessToken: string | null
}

export async function newProduct({
  name,
  description,
  price,
  tenantUuid,
  accessToken,
}: NewProductBody) {
  const response = await api(accessToken).post<Product>(
    `/products?tenantUuid=${tenantUuid}`,
    {
      name,
      description,
      price,
    },
  )

  return response.data
}
