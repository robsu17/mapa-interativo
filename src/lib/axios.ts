import { env } from '@/env'
import { useAuthStore } from '@/store/auth'
import axios from 'axios'

export const api = (accessToken: string | null = null) => {
  const api = axios.create({
    baseURL: env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  api.interceptors.request.use(
    (response) => response,
    (error) => {
      const logout = useAuthStore((state) => state.logout)

      if (axios.isAxiosError(error)) {
        if (error.code === '401') {
          logout()
        }
      }
      return Promise.reject(error)
    },
  )

  return api
}
