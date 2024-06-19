import { AxiosError } from 'axios'
import { create } from 'zustand'

type GlobalAxiosErrorStore = {
  error: AxiosError | null
  setError: (error: AxiosError) => void
  clearError: () => void
}

export const useGlobalAxiosErrorStore = create<GlobalAxiosErrorStore>(
  (set) => ({
    error: null,
    setError(error) {
      set({ error })
    },
    clearError() {
      set({ error: null })
    },
  }),
)
