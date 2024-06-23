import { create } from 'zustand'
import { isExpired } from 'react-jwt'

type TenantStore = {
  isAuthenticated: boolean
  accessToken: string | null
  login: (accessToken: string) => void
  logout: () => void
  initializeAuth: () => void
}

export const useAuthStore = create<TenantStore>((set) => ({
  isAuthenticated: false,
  accessToken: null,
  login(accessToken) {
    localStorage.setItem('accessToken', accessToken)
    set({ isAuthenticated: true, accessToken })
  },
  logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('tenantUuid-storage')
    set({ isAuthenticated: false, accessToken: null })
  },
  initializeAuth: () => {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      return
    }

    const isExpiredAccessToken = isExpired(accessToken)

    if (isExpiredAccessToken) {
      localStorage.removeItem('accessToken')
      return
    }

    set({
      isAuthenticated: true,
      accessToken,
    })
  },
}))
