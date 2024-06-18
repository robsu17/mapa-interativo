import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table'
import { ProductTableRow } from './product-table-row'

interface ProductsProps {
  products: {
    tenantId: number
    id: number
    name: string
    description: string
    price: number
    createdAt: string
  }[]
}

export function ProductTable({ products }: ProductsProps) {
  return (
    <Table className="h-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">ID</TableHead>
          <TableHead className="w-[150px]">Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead className="w-[150px]">Preço</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => {
          return <ProductTableRow key={product.id} product={product} />
        })}
      </TableBody>
    </Table>
  )
}
