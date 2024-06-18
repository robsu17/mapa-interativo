import { newProduct } from '@/api/new-product'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTenantStore } from '@/store/tenant'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const newProductSchema = z.object({
  name: z.string().min(1, 'Nome do produto é obrigatório'),
  description: z.string().min(1, 'Descrição do produto é obrigatório'),
  price: z.coerce.number().nonnegative('Preço não pode ser menor do que 0'),
})

type NewProduct = z.infer<typeof newProductSchema>

export function NewProduct() {
  const tenantUuid = useTenantStore((state) => state.tenantUuid)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProduct>({
    resolver: zodResolver(newProductSchema),
  })

  const { mutateAsync: newProductFn } = useMutation({
    mutationFn: newProduct,
  })

  async function handleNewProduct(data: NewProduct) {
    try {
      await newProductFn({
        name: data.name,
        description: data.description,
        price: data.price,
        tenantUuid,
      })

      toast.success('Produto adicionado com sucesso.')
    } catch (error) {
      toast.error('Erro ao adicionar o produto.')
    }
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
          <Input
            id="name"
            type="text"
            placeholder="Descrição do produto"
            className="mt-1"
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
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </DialogContent>
  )
}
