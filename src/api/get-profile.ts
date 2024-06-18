import { api } from '@/lib/axios'

export async function getProfile(accessToken: string | null = null) {
  const response = await api(accessToken).get('/auth/me')
  return response.data
}
