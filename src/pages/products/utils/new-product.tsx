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
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { InputNumberFormat } from '@react-input/number-format'
import { useState } from 'react'

const newProductSchema = z.object({
  name: z.string().min(1, 'Nome do produto é obrigatório'),
  description: z.string().min(1, 'Descrição do produto é obrigatório'),
  price: z.coerce
    .number()
    .nonnegative('O preço não pode ser menor que zero')
    .min(1, 'Preço não pode ser vazio'),
})

type NewProduct = z.infer<typeof newProductSchema>

export function NewProduct() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const queryClient = useQueryClient()

  const tenantUuid = useTenantStore((state) => state.tenantUuid)
  const accessToken = useAuthStore((state) => state.accessToken)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const [valueFormatted, setValueFormatted] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
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
      } else {
        setSearchParams((state) => {
          state.set('page', (pageIndex + 2).toString())
          return state
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

    const priceInCents = Math.ceil(data.price * 100)

    await newProductFn({
      name: data.name,
      description: data.description,
      price: priceInCents,
      tenantUuid,
      accessToken,
    })

    reset({
      name: '',
      description: '',
      price: 0,
    })

    setValueFormatted('')
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
            autoComplete="off"
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
          <InputNumberFormat
            name="price"
            className="mt-1 w-full rounded-md border border-border p-2"
            autoComplete="off"
            placeholder="R$ 1,00"
            locales="pt-BR"
            value={valueFormatted}
            onChange={(e) => setValueFormatted(e.target.value)}
            onNumberFormat={(e) => setValue('price', e.detail.number)}
            format="currency"
            currency="BRL"
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
