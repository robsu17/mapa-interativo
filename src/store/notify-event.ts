import { create } from 'zustand'

export interface Message {
  tenantUuid: string
  title: string
  text: string
}

interface MessagesStore {
  messages: Message[] | []
  setMessage: (messageToAdd: Message) => void
  clearMessages: (tenantUuidToRem: string) => void
  clearMessage: (messageToRem: Message) => void
}

export const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],
  tenantUuid: null,
  setMessage(messageToAdd) {
    set((state) => {
      if (state.messages.length >= 100) {
        return {
          messages: [
            ...state.messages.filter(
              (message) => message.tenantUuid === messageToAdd.tenantUuid,
            ),
          ],
        }
      }

      return {
        messages: [...state.messages, messageToAdd],
      }
    })
  },
  clearMessages(tenantUuidToRem) {
    set((state) => {
      return {
        messages: [
          ...state.messages.filter(
            (message) => message.tenantUuid !== tenantUuidToRem,
          ),
        ],
      }
    })
  },
  clearMessage(messageToRem) {
    set((state) => ({
      messages: [
        ...state.messages.filter(
          (message) =>
            message.tenantUuid === messageToRem.tenantUuid &&
            message.text !== messageToRem.text,
        ),
      ],
    }))
  },
}))
