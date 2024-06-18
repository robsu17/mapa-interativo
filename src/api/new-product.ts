import { api } from '@/lib/axios'

interface NewProductBody {
  name: string
  description: string
  price: number
  tenantUuid: string
}

export async function newProduct({
  name,
  description,
  price,
  tenantUuid,
}: NewProductBody) {
  const response = await api.post(`/products?tenantUuid=${tenantUuid}`, {
    name,
    description,
    price,
  })

  return response.data
}
