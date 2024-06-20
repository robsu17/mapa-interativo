import { create } from 'zustand'

interface Message {
  title: string
  text: string
}

interface MessagesStore {
  messages: Message[] | []
  setMessage: (message: Message) => void
  clearMessages: () => void
  clearMessage: (message: Message) => void
}

export const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],
  tenantUuid: null,
  setMessage(message) {
    set((state) => {
      if (state.messages.length >= 5) {
        return {
          messages: [...state.messages],
        }
      }

      return {
        messages: [...state.messages, message],
      }
    })
  },
  clearMessages() {
    set({ messages: [] })
  },
  clearMessage(message) {
    set((state) => ({
      messages: state.messages.filter((item) => item.text !== message.text),
    }))
  },
}))
