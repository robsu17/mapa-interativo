import { env } from '@/env'
import axios from 'axios'

export const api = (accessToken: string | null = null) => {
  return axios.create({
    baseURL: env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
