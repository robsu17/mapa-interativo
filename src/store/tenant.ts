import { create } from 'zustand'

type TenantStore = {
  tenantUuid: string
  changeTenant: (tenantUuid: string) => void
}

export const useTenantStore = create<TenantStore>((set) => ({
  tenantUuid: '',
  changeTenant: (tenantUuid: string) => set(() => ({ tenantUuid })),
}))
