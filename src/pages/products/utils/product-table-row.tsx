import { TableRow, TableCell } from '@/components/ui/table'
import { useTenantStore } from '@/store/tenant'
import { priceFormatter } from '@/utils/formatter'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ProductsRowProps {
  product: {
    tenantId: number
    id: number
    name: string
    description: string
    price: number
    createdAt: string
  }
}

export function ProductTableRow({ product }: ProductsRowProps) {
  const tenantUuid = useTenantStore((state) => state.tenantUuid)

  return (
    <TableRow>
      <TableCell>
        <Link to={`/${product.id}?${tenantUuid}`}>
          <Search className="h-4 w-4" />
        </Link>
      </TableCell>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>{priceFormatter.format(product.price)}</TableCell>
    </TableRow>
  )
}
