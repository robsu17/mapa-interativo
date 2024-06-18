import { TableRow, TableCell } from '@/components/ui/table'
import { priceFormatter } from '@/utils/formatter'

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
  return (
    <TableRow>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>{priceFormatter.format(product.price)}</TableCell>
    </TableRow>
  )
}
