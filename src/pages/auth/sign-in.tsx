import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'

import { z } from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'sonner'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth'
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/api/sign-in'

const loginFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Senha precisa ter no mínimo 8 caracteres'),
})

type LoginForm = z.infer<typeof loginFormSchema>

export function SignIn() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
  })

  const login = useAuthStore((state) => state.login)

  const { mutateAsync: signInFn, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess({ accessToken }) {
      login(accessToken)
      navigate('/', { replace: true })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response && axiosError.response.status === 401) {
          toast.error('Credênciais inválidas.')
        } else {
          toast.error(
            'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
          )
        }
      }
    },
  })

  async function handleLogin(data: LoginForm) {
    await signInFn({ email: data.email, password: data.password })
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Helmet title="Login" />
      <div className="w-[350px]">
        <h1 className="mb-10 text-center text-3xl font-semibold text-foreground">
          Login
        </h1>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div className="space-y-2">
            <div>
              <Label htmlFor="email" className="flex justify-between">
                Seu e-mail
                {errors.email && (
                  <span className="text-rose-500">{errors.email.message}</span>
                )}
              </Label>
            </div>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              {...register('email')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex justify-between">
              Sua senha
              {errors.password && (
                <span className="text-rose-500">{errors.password.message}</span>
              )}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              {...register('password')}
            />
          </div>

          <Button disabled={isPending} className="w-full" type="submit">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}
