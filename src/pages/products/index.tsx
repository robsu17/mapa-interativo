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
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const tenantUuid = useTenantStore((state) => state.tenantUuid)
  const accessToken = useAuthStore((state) => state.accessToken)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const { data, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', tenantUuid, accessToken, pageIndex],
    queryFn: () => getProducts({ tenantUuid, accessToken, pageIndex }),
    enabled: !!tenantUuid && isAuthenticated,
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set('page', (pageIndex + 1).toString())
      return prev
    })
  }

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
          {data && (
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={pageIndex}
              totalCount={data?.totalItems || 0}
              perPage={10}
            />
          )}
        </div>
      </div>
    </>
  )
}
