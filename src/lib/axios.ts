import { env } from '@/env'
import axios from 'axios'

import cookie from 'js-cookie'

const token = cookie.get('accessToken')

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
