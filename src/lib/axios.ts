import { env } from '@/env'
import { useGlobalAxiosErrorStore } from '@/store/global-axios-error-store'
import axios from 'axios'

export const api = (accessToken: string | null = null) => {
  const api = axios.create({
    baseURL: env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  api.interceptors.request.use(
    (request) => request,
    (error) => {
      const setError = useGlobalAxiosErrorStore((state) => state.setError)
      setError(error)
      return Promise.reject(error)
    },
  )

  return api
}
