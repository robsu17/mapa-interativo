import { newProduct } from '@/api/new-product'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore } from '@/store/auth'
import { Product } from '@/store/products'
import { useTenantStore } from '@/store/tenant'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { redirect, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const newProductSchema = z.object({
  name: z.string().min(1, 'Nome do produto é obrigatório'),
  description: z.string().min(1, 'Descrição do produto é obrigatório'),
  price: z.coerce.number().nonnegative('Preço não pode ser menor do que 0'),
})

type NewProduct = z.infer<typeof newProductSchema>

export function NewProduct() {
  const [searchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const queryClient = useQueryClient()

  const tenantUuid = useTenantStore((state) => state.tenantUuid)
  const accessToken = useAuthStore((state) => state.accessToken)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewProduct>({
    resolver: zodResolver(newProductSchema),
  })

  const { mutateAsync: newProductFn, isPending } = useMutation({
    mutationFn: newProduct,
    onSuccess(data) {
      const cached = queryClient.getQueryData<{
        totalItems: number
        products: Product[]
      }>(['products', tenantUuid, accessToken, pageIndex])

      if (cached && cached.products.length < 10) {
        queryClient.setQueryData<{
          totalItems: number
          products: Product[]
        }>(['products', tenantUuid, accessToken, pageIndex], {
          totalItems: cached.totalItems + 1,
          products: [...cached.products, data],
        })
      }

      toast.success('Produto adicionado com sucesso.')
    },
    onError() {
      toast.error('Erro ao adicionar o produto.')
    },
  })

  async function handleNewProduct(data: NewProduct) {
    if (!isAuthenticated) {
      toast.error('Você não está autenticado.')
      return
    }

    await newProductFn({
      name: data.name,
      description: data.description,
      price: data.price,
      tenantUuid,
      accessToken,
    })

    reset({
      name: '',
      description: '',
      price: 0,
    })
  }

  return (
    <DialogContent>
      <DialogHeader>Criar um produto</DialogHeader>
      <form onSubmit={handleSubmit(handleNewProduct)} className="space-y-4">
        <div>
          <Label className="text-rose-500" htmlFor="name">
            {errors.name && errors.name.message}
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Nome do produto"
            className="mt-1"
            {...register('name')}
          />
        </div>
        <div>
          <Label className="text-rose-500" htmlFor="description">
            {errors.description && errors.description.message}
          </Label>
          <Textarea
            id="name"
            placeholder="Descrição do produto"
            className="mt-1 h-24"
            {...register('description')}
          />
        </div>
        <div>
          <Label className="text-rose-500" htmlFor="price">
            {errors.price && errors.price.message}
          </Label>
          <Input
            id="name"
            type="number"
            placeholder="Preço"
            className="mt-1"
            {...register('price')}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <DialogClose asChild>
            <Button variant={'destructive'}>Cancelar</Button>
          </DialogClose>
          <Button disabled={isPending} type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}
