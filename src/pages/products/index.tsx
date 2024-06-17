import { getProducts } from '@/api/get-products'
import { useTenantStore } from '@/store/tenant'
import { useQuery } from '@tanstack/react-query'

export function Products() {
  const tenantUuid = useTenantStore((state) => state.tenantUuid)

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', tenantUuid],
    queryFn: () => getProducts({ tenantUuid }),
  })

  return <>{isLoading ? <h1>Carregando...</h1> : <h1>{products[0].name}</h1>}</>
}
