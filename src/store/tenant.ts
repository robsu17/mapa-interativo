import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type TenantStore = {
  tenantUuid: string
  changeTenant: (tenantUuid: string) => void
}

export const useTenantStore = create(
  persist<TenantStore>(
    (set) => ({
      tenantUuid: '',
      changeTenant: (tenantUuid: string) => set(() => ({ tenantUuid })),
    }),
    {
      name: 'tenantUuid-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
