import { getProducts } from '@/api/get-products'
import { useTenantStore } from '@/store/tenant'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { ProductTable } from './utils/product-table'
import { Pagination } from './utils/pagination'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { NewProduct } from './utils/new-product'
import { useAuthStore } from '@/store/auth'

export function Products() {
  const tenantUuid = useTenantStore((state) => state.tenantUuid)
  const accessToken = useAuthStore((state) => state.accessToken)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const { data, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', tenantUuid, accessToken],
    queryFn: () => getProducts({ tenantUuid, accessToken }),
    enabled: !!tenantUuid && isAuthenticated,
  })

  return (
    <>
      <Helmet title="Produtos" />
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Produtos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={'outline'}
              disabled={!isAuthenticated}
              type="button"
              className="h-10 w-10 rounded-full p-0"
            >
              <CirclePlus />
            </Button>
          </DialogTrigger>

          <NewProduct />
        </Dialog>
      </div>

      <div className="mt-4 space-y-2.5">
        <div className="max-h-[600px] min-h-[500px] overflow-y-scroll rounded-md border">
          {isLoadingProducts ? (
            <div className="flex h-[500px] items-center justify-center">
              <Loading />
            </div>
          ) : (
            data?.products && <ProductTable products={data.products} />
          )}
        </div>

        <div>
          <Pagination pageIndex={0} totalCount={0} perPage={0} />
        </div>
      </div>
    </>
  )
}
