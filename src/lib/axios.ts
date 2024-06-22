import { env } from '@/env'
import axios from 'axios'

export const api = (accessToken: string | null = null) => {
  const api = axios.create({
    baseURL: env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('accessToken')
        window.location.href = '/sign-in'
      }
      return Promise.reject(error)
    },
  )

  return api
}
