import { create } from 'zustand'

type NotifyStore = {
  notifyMessage: string | null
  setNotifyMessage: (message: string) => void
  clearNotifyMessage: () => void
}

export const useNotifyEventStore = create<NotifyStore>((set) => ({
  notifyMessage: null,
  setNotifyMessage(message) {
    set({ notifyMessage: message })
  },
  clearNotifyMessage() {
    set({ notifyMessage: null })
  },
}))
