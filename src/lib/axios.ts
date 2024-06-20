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

  return api
}
