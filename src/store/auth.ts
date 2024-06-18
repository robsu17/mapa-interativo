import { create } from 'zustand'

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
    set({ isAuthenticated: false, accessToken: null })
  },
  initializeAuth: () => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      set({
        isAuthenticated: true,
        accessToken,
      })
    }
  },
}))
