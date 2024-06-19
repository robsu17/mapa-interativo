import { getProductInfo } from '@/api/get-product-info'
import Loading from '@/components/loading'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuthStore } from '@/store/auth'
import { dateFromatter, priceFormatter } from '@/utils/formatter'
import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom'

export function Details() {
  const [searchParams] = useSearchParams()
  const params = useParams()

  const productId = params.id ?? ''
  const tenantUuid = searchParams.get('tenantUuid') ?? ''
  const accessToken = useAuthStore((state) => state.accessToken)

  const { data: productDetails } = useQuery({
    queryKey: ['product-info'],
    queryFn: () => getProductInfo({ productId, tenantUuid, accessToken }),
  })

  return (
    <div>
      <Card>
        {productDetails?.id !== Number(productId) ? (
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <Loading />
              Carregando detalhes do produto
            </CardTitle>
          </CardHeader>
        ) : (
          <>
            <CardHeader>
              <CardTitle>{productDetails.name}</CardTitle>
              <CardDescription>{productDetails.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-light text-muted-foreground">
                id: <span className="text-primary">{productDetails.id}</span>
              </p>
              <p className="text-lg font-light text-muted-foreground">
                Preço:{' '}
                <span className="text-primary">
                  {priceFormatter.format(productDetails.price)}
                </span>
              </p>
              <p className="text-lg font-light text-muted-foreground">
                Criado em:{' '}
                <span className="text-primary">
                  {dateFromatter.format(new Date(productDetails.createdAt))}
                </span>
              </p>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  )
}
