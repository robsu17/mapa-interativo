import { env } from '@/env'
import axios from 'axios'

const token = localStorage.getItem('accessToken')

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
